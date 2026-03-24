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
        padding: "8px 16px",
        borderRadius: 20,
        border: "none",
        background: copied ? "#2ecc71" : "#333",
        color: "#fff",
        fontSize: "0.85rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontWeight: 500,
        transition: "background 0.2s",
      }}
    >
      {copied ? "✓ Copiado" : "🔗 Compartir"}
    </button>
  );
}
