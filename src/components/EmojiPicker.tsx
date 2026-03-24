import { EMOJIS } from "../data/emojis";
import type { UITheme } from "../data/themes";

type Props = {
    selectedEmoji: string | null;
    onSelect: (emoji: string) => void;
    theme: UITheme;
};

export function EmojiPicker({ selectedEmoji, onSelect, theme }: Props) {
    return (
        <div
            style={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 20,
                maxWidth: "calc(100vw - 32px)",
            }}
        >
            {/* 3D offset shadow */}
            <div
                style={{
                    position: "absolute",
                    top: 4,
                    left: 4,
                    right: -4,
                    bottom: -6,
                    background: theme.shadow,
                    borderRadius: 999,
                    zIndex: -1,
                }}
            />
            {/* Main pill */}
            <div
                style={{
                    background: theme.fill,
                    border: `2.5px solid ${theme.border}`,
                    borderRadius: 999,
                    padding: "0px 6px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: 4,
                        overflowX: "auto",
                        scrollbarWidth: "none",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    {EMOJIS.map((emoji) => (
                        <button
                            key={emoji}
                            onClick={() => onSelect(emoji)}
                            style={{
                                fontSize: "1.6rem",
                                padding: 6,
                                border:
                                    selectedEmoji === emoji
                                        ? `3px solid ${theme.border}`
                                        : "3px solid transparent",
                                borderRadius: "50%",
                                background:
                                    selectedEmoji === emoji
                                        ? theme.shadow
                                        : "transparent",
                                cursor: "pointer",
                                minWidth: 46,
                                minHeight: 46,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.12s ease",
                                outline: "none",
                                flexShrink: 0,
                                boxShadow: "none",
                            }}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
