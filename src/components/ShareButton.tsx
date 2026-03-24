import { useState, useCallback } from "react";

export function ShareButton() {
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
    <button
      onClick={handleShare}
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 20,
        padding: "7px 14px",
        borderRadius: 10,
        border: copied ? "1.5px solid #52c47a" : "1.5px solid #d0d0d0",
        background: copied ? "#d4f4dd" : "#ffffff",
        color: copied ? "#2a7a42" : "#1a1a1a",
        fontSize: "0.8rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontWeight: 500,
        fontFamily: "'Inter', system-ui, sans-serif",
        transition: "all 0.15s ease",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {copied ? "✓ Copiado" : "🔗 Compartir"}
    </button>
  );
}
