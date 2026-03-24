import type { UITheme } from "../data/themes";

type Props = {
    onClick: () => void;
    theme: UITheme;
};

export function SettingsButton({ onClick, theme }: Props) {
    return (
        <div
            style={{
                position: "absolute",
                top: 16,
                right: 140,
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
            <button
                onClick={onClick}
                style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: `2.5px solid ${theme.border}`,
                    background: theme.fill,
                    color: "#1a1a1a",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "'Inter', system-ui, sans-serif",
                }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            </button>
        </div>
    );
}
