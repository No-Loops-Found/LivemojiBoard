import { useOthers, useStatus } from "../liveblocks.config";

export function ConnectionStatus() {
  const status = useStatus();
  const others = useOthers();
  const connectedCount = others.length + 1; // include self

  const statusConfig: Record<string, { label: string; color: string }> = {
    connected: { label: "", color: "#2ecc71" },
    connecting: { label: "Conectando…", color: "#f39c12" },
    reconnecting: { label: "Reconectando…", color: "#e74c3c" },
    disconnected: { label: "Desconectado", color: "#e74c3c" },
    initial: { label: "Conectando…", color: "#f39c12" },
  };

  const config = statusConfig[status] ?? statusConfig.connecting;

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        padding: "6px 12px",
        borderRadius: 16,
        fontSize: "0.8rem",
        color: "#333",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: config.color,
          display: "inline-block",
        }}
      />
      {config.label && <span>{config.label}</span>}
      <span>👥 {connectedCount}</span>
    </div>
  );
}
