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
                right: 130,
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
                    padding: "6px 12px",
                    borderRadius: 999,
                    border: `2.5px solid ${theme.border}`,
                    background: theme.fill,
                    color: "#1a1a1a",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "'Inter', system-ui, sans-serif",
                }}
            >
                ⚙️
            </button>
        </div>
    );
}
