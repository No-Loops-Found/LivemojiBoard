import type { EmojiColorTheme } from "../types";

export type UITheme = {
    fill: string;
    border: string;
    shadow: string;
};

export const UI_THEMES: Record<EmojiColorTheme, UITheme> = {
    yellow: { fill: "#ffe056", border: "#b89c1e", shadow: "#8a7516" },
    pink: { fill: "#ffb3d9", border: "#c4708a", shadow: "#994e6a" },
    blue: { fill: "#7ec8ff", border: "#4a8ab8", shadow: "#356a91" },
    green: { fill: "#6ee09a", border: "#3a9e5c", shadow: "#2a7844" },
};
