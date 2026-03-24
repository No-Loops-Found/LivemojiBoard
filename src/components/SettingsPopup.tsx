import { useState } from "react";
import type { EmojiColorTheme } from "../types";
import { UI_THEMES } from "../data/themes";

const COLOR_OPTIONS: EmojiColorTheme[] = ["yellow", "pink", "blue", "green"];

type Props = {
    name: string;
    colorTheme: EmojiColorTheme;
    onSave: (name: string, color: EmojiColorTheme) => void;
    onColorChange: (color: EmojiColorTheme) => void;
    onClose: () => void;
    isFirstTime: boolean;
};

export function SettingsPopup({
    name,
    colorTheme,
    onSave,
    onColorChange,
    onClose,
    isFirstTime,
}: Props) {
    const [localName, setLocalName] = useState(name);
    const [localColor, setLocalColor] = useState<EmojiColorTheme>(colorTheme);

    const selectedTheme = UI_THEMES[localColor];

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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                        }}
                    >
                        {isFirstTime ? "¡Bienvenido! 👋" : (
                            <>
                                {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg> */}
                                Ajustes
                            </>
                        )}
                    </h2>

                    {isFirstTime && (
                        <div
                            style={{
                                fontSize: "0.78rem",
                                color: "#1a1a1a",
                                lineHeight: 1.5,
                                marginBottom: 16,
                                textAlign: "center",
                            }}
                        >
                            <p style={{ margin: "0 0 4px" }}>1. Elige un emoji de la barra inferior</p>
                            <p style={{ margin: "0 0 4px" }}>2. Toca el canvas para colocarlo</p>
                            <p style={{ margin: 0 }}>3. Mantén pulsado para eliminar los tuyos</p>
                        </div>
                    )}

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
                        {COLOR_OPTIONS.map((colorKey) => {
                            const theme = UI_THEMES[colorKey];
                            const isSelected = localColor === colorKey;
                            return (
                                <button
                                    key={colorKey}
                                    onClick={() => {
                                        setLocalColor(colorKey);
                                        onColorChange(colorKey);
                                    }}
                                    style={{
                                        position: "relative",
                                        width: 44,
                                        height: 44,
                                        padding: 0,
                                        border: isSelected
                                            ? `3px solid #1a1a1a`
                                            : `2.5px solid ${theme.border}`,
                                        background: theme.fill,
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    
                                </button>
                            );
                        })}
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
