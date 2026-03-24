import { useState } from "react";
import type { EmojiColorTheme } from "../types";

const COLOR_OPTIONS: {
    key: EmojiColorTheme;
    fill: string;
    border: string;
    shadow: string;
}[] = [
    { key: "yellow", fill: "#ffe056", border: "#b89c1e", shadow: "#8a7516" },
    { key: "pink", fill: "#ffb3d9", border: "#c4708a", shadow: "#994e6a" },
    { key: "blue", fill: "#7ec8ff", border: "#4a8ab8", shadow: "#356a91" },
    { key: "green", fill: "#6ee09a", border: "#3a9e5c", shadow: "#2a7844" },
];

type Props = {
    name: string;
    colorTheme: EmojiColorTheme;
    onSave: (name: string, color: EmojiColorTheme) => void;
    onClose: () => void;
    isFirstTime: boolean;
};

export function SettingsPopup({
    name,
    colorTheme,
    onSave,
    onClose,
    isFirstTime,
}: Props) {
    const [localName, setLocalName] = useState(name);
    const [localColor, setLocalColor] = useState<EmojiColorTheme>(colorTheme);

    const selectedTheme =
        COLOR_OPTIONS.find((c) => c.key === localColor) ?? COLOR_OPTIONS[0];

    const handleSave = () => {
        onSave(localName, localColor);
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.3)",
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget && !isFirstTime) onClose();
            }}
        >
            <div style={{ position: "relative" }}>
                {/* 3D offset shadow */}
                <div
                    style={{
                        position: "absolute",
                        top: 4,
                        left: 4,
                        right: -4,
                        bottom: -4,
                        background: selectedTheme.shadow,
                        borderRadius: 24,
                        zIndex: -1,
                    }}
                />
                {/* Main card */}
                <div
                    style={{
                        background: selectedTheme.fill,
                        border: `2.5px solid ${selectedTheme.border}`,
                        borderRadius: 24,
                        padding: "28px 32px",
                        width: 320,
                        maxWidth: "calc(100vw - 48px)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                >
                    <h2
                        style={{
                            margin: "0 0 20px",
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "#1a1a1a",
                            textAlign: "center",
                        }}
                    >
                        {isFirstTime ? "¡Bienvenido! 👋" : "⚙️ Ajustes"}
                    </h2>

                    {/* Name input */}
                    <label
                        style={{
                            display: "block",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: "#1a1a1a",
                            marginBottom: 6,
                        }}
                    >
                        Tu nombre
                    </label>
                    <div style={{ position: "relative", marginBottom: 20 }}>
                        <div
                            style={{
                                position: "absolute",
                                top: 3,
                                left: 3,
                                right: -3,
                                bottom: -3,
                                background: selectedTheme.shadow,
                                borderRadius: 999,
                                zIndex: 0,
                            }}
                        />
                        <input
                            type="text"
                            value={localName}
                            onChange={(e) => setLocalName(e.target.value)}
                            maxLength={20}
                            style={{
                                position: "relative",
                                zIndex: 1,
                                width: "100%",
                                padding: "8px 14px",
                                borderRadius: 999,
                                border: `2.5px solid ${selectedTheme.border}`,
                                background: "#fff",
                                fontSize: "0.85rem",
                                fontFamily: "'Inter', system-ui, sans-serif",
                                fontWeight: 500,
                                outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    {/* Color selector */}
                    <label
                        style={{
                            display: "block",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: "#1a1a1a",
                            marginBottom: 8,
                        }}
                    >
                        Color de tus emojis
                    </label>
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            justifyContent: "center",
                            marginBottom: 24,
                        }}
                    >
                        {COLOR_OPTIONS.map((opt) => (
                            <div
                                key={opt.key}
                                style={{ position: "relative", cursor: "pointer" }}
                                onClick={() => setLocalColor(opt.key)}
                            >
                                {/* 3D shadow */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 3,
                                        left: 3,
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        background: opt.shadow,
                                        zIndex: 0,
                                    }}
                                />
                                <div
                                    style={{
                                        position: "relative",
                                        zIndex: 1,
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        background: opt.fill,
                                        border:
                                            localColor === opt.key
                                                ? `3px solid #1a1a1a`
                                                : `2.5px solid ${opt.border}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {localColor === opt.key ? "✓" : ""}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Save button */}
                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                position: "absolute",
                                top: 3,
                                left: 3,
                                right: -3,
                                bottom: -3,
                                background: selectedTheme.shadow,
                                borderRadius: 999,
                                zIndex: 0,
                            }}
                        />
                        <button
                            onClick={handleSave}
                            style={{
                                position: "relative",
                                zIndex: 1,
                                width: "100%",
                                padding: "10px 0",
                                borderRadius: 999,
                                border: `2.5px solid ${selectedTheme.border}`,
                                background: "#fff",
                                color: "#1a1a1a",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                fontFamily: "'Inter', system-ui, sans-serif",
                                cursor: "pointer",
                            }}
                        >
                            {isFirstTime ? "¡Empezar! 🎉" : "Guardar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
