import { useOthers, useStatus } from "../liveblocks.config";
import type { UITheme } from "../data/themes";

type Props = {
  theme: UITheme;
};

export function ConnectionStatus({ theme }: Props) {
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
      }}
    >
      {/* 3D offset shadow */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: 4,
          right: -4,
          bottom: -4,
          background: theme.shadow,
          borderRadius: 999,
          zIndex: -1,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: theme.fill,
          border: `2.5px solid ${theme.border}`,
          padding: "6px 12px",
          borderRadius: 999,
          fontSize: "0.78rem",
          color: "#1a1a1a",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 500,
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
    </div>
  );
}
