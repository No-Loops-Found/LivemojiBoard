import { useState, useCallback } from "react";
import type { UITheme } from "../data/themes";

type Props = {
  theme: UITheme;
};

export function ShareButton({ theme }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
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
          background: copied ? "#2a7844" : theme.shadow,
          borderRadius: 999,
          zIndex: -1,
        }}
      />
      <button
        onClick={handleShare}
        style={{
          padding: "7px 14px",
          borderRadius: 999,
          border: copied ? "2.5px solid #3a9e5c" : `2.5px solid ${theme.border}`,
          background: copied ? "#6ee09a" : theme.fill,
          color: "#1a1a1a",
          fontSize: "0.8rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontWeight: 500,
          fontFamily: "'Inter', system-ui, sans-serif",
          transition: "all 0.15s ease",
        }}
      >
        {copied ? "✓ Copiado" : "🔗 Compartir"}
      </button>
    </div>
  );
}
