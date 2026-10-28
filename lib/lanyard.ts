"use client";

import { useEffect, useState } from "react";
import { LanyardData } from "./types";

const LANYARD_WS = "wss://api.lanyard.rest/socket";
const LANYARD_REST = "https://api.lanyard.rest/v1/users";

export function useLanyard(discordId?: string) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(discordId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!discordId || discordId.trim() === "") {
      setData(null);
      setLoading(false);
      return;
    }

    let ws: WebSocket | null = null;
    let heartbeatInterval: NodeJS.Timeout | null = null;
    let isSubscribed = true;

    // Fast initial fetch via REST
    fetch(`${LANYARD_REST}/${discordId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && isSubscribed) {
          setData(json.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Lanyard REST fallback error:", err);
      });

    // WebSocket connection for real-time presence
    function connect() {
      try {
        ws = new WebSocket(LANYARD_WS);

        ws.onopen = () => {
          // Connected
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            const { op, d, t } = message;

            // Opcode 1: Hello from Lanyard
            if (op === 1) {
              const interval = d.heartbeat_interval;
              heartbeatInterval = setInterval(() => {
                if (ws && ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ op: 3 })); // Opcode 3: Heartbeat
                }
              }, interval);

              // Opcode 2: Initialize subscription
              if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(
                  JSON.stringify({
                    op: 2,
                    d: {
                      subscribe_to_id: discordId,
                    },
                  })
                );
              }
            }

            // Events: INIT_STATE or PRESENCE_UPDATE
            if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
              if (isSubscribed) {
                setData(d);
                setLoading(false);
              }
            }
          } catch (err) {
            console.error("Lanyard WS parse error:", err);
          }
        };

        ws.onerror = () => {
          setError("Lanyard connection issue");
        };

        ws.onclose = () => {
          if (heartbeatInterval) clearInterval(heartbeatInterval);
        };
      } catch (err) {
        console.warn("WebSocket not supported or blocked:", err);
      }
    }

    connect();

    return () => {
      isSubscribed = false;
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (ws) {
        ws.close();
      }
    };
  }, [discordId]);

  return { data, loading, error };
}
