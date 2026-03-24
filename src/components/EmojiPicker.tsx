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
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid #e0e0e0",
        padding: "8px 0",
      }}
    >
      {/* Category tabs */}
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: "0 8px 6px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {EMOJI_CATEGORIES.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(i)}
            style={{
              padding: "4px 10px",
              borderRadius: 12,
              border: "none",
              background: activeCategory === i ? "#333" : "transparent",
              color: activeCategory === i ? "#fff" : "#666",
              fontSize: "0.75rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontWeight: activeCategory === i ? 600 : 400,
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
          gap: 2,
          padding: "0 8px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            style={{
              fontSize: "1.6rem",
              padding: "6px",
              border: "none",
              borderRadius: 8,
              background:
                selectedEmoji === emoji
                  ? "rgba(59,130,246,0.2)"
                  : "transparent",
              cursor: "pointer",
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline:
                selectedEmoji === emoji
                  ? "2px solid rgb(59,130,246)"
                  : "none",
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
