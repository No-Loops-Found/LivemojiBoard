import { useState } from "react";
import { EMOJI_CATEGORIES } from "../data/emojis";

type Props = {
  selectedEmoji: string | null;
  onSelect: (emoji: string) => void;
};

export function EmojiPicker({ selectedEmoji, onSelect }: Props) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 12,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        background: "#ffffff",
        backdropFilter: "blur(12px)",
        border: "1.5px solid #e0e0e0",
        borderRadius: 16,
        padding: "10px 12px 8px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        maxWidth: "calc(100vw - 24px)",
        width: "auto",
      }}
    >
      {/* Category tabs */}
      <div
        style={{
          display: "flex",
          gap: 2,
          padding: "0 0 8px",
          overflowX: "auto",
          scrollbarWidth: "none",
          borderBottom: "1px solid #f0f0f0",
          marginBottom: 8,
        }}
      >
        {EMOJI_CATEGORIES.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(i)}
            style={{
              padding: "4px 10px",
              borderRadius: 8,
              border: activeCategory === i ? "1.5px solid #333" : "1.5px solid transparent",
              background: activeCategory === i ? "#f5f5f5" : "transparent",
              color: activeCategory === i ? "#1a1a1a" : "#888",
              fontSize: "0.72rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontWeight: activeCategory === i ? 600 : 500,
              fontFamily: "'Inter', system-ui, sans-serif",
              transition: "all 0.15s ease",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {/* Emoji grid */}
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: 0,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            style={{
              fontSize: "1.5rem",
              padding: "6px",
              border: selectedEmoji === emoji
                ? "2px solid #333"
                : "2px solid transparent",
              borderRadius: "50%",
              background:
                selectedEmoji === emoji
                  ? "#f0f0f0"
                  : "transparent",
              cursor: "pointer",
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
              outline: "none",
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
