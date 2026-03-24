import type { LiveMap } from "@liveblocks/client";

export type EmojiColorTheme = "yellow" | "pink" | "blue" | "green";

export type EmojiItem = {
    id: string;
    emoji: string;
    x: number;
    y: number;
    placedBy: string;
    scale: number;
    colorTheme: EmojiColorTheme;
};

export type Presence = {
    cursor: { x: number; y: number } | null;
    userId: string;
    name: string;
};

export type Storage = {
    emojis: LiveMap<string, EmojiItem>;
};

declare global {
    interface Liveblocks {
        Presence: Presence;
        Storage: Storage;
    }
}
