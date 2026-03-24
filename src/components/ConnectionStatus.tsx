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
        background: "#ffffff",
        border: "1.5px solid #d0d0d0",
        padding: "6px 12px",
        borderRadius: 10,
        fontSize: "0.78rem",
        color: "#1a1a1a",
        fontFamily: "'Inter', system-ui, sans-serif",
        fontWeight: 500,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
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
