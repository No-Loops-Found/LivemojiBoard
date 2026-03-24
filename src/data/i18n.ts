export type Locale = "es" | "en";

const translations = {
    es: {
        welcome: "¡Bienvenido! 👋",
        settings: "Ajustes",
        instruction1: "1. Elige un emoji de la barra inferior",
        instruction2: "2. Toca el canvas para colocarlo",
        instruction3: "3. Mantén pulsado para eliminar los tuyos",
        yourName: "Tu nombre",
        emojiColor: "Color de tus emojis",
        start: "¡Empezar! 🎉",
        save: "Guardar",
        copied: "Copiado",
        share: "Compartir",
        connecting: "Conectando…",
        reconnecting: "Reconectando…",
        disconnected: "Desconectado",
        selectEmoji: "Selecciona un emoji y toca el canvas",
        tapToPlace: (emoji: string) => `Toca el canvas para colocar ${emoji}`,
        animals: [
            "Panda", "Zorro", "Búho", "Gato", "Lobo", "Oso", "Koala", "León",
            "Tigre", "Delfín", "Pulpo", "Tucán", "Foca", "Mapache", "Ciervo",
        ],
    },
    en: {
        welcome: "Welcome! 👋",
        settings: "Settings",
        instruction1: "1. Pick an emoji from the bar below",
        instruction2: "2. Tap the canvas to place it",
        instruction3: "3. Long-press to delete your own",
        yourName: "Your name",
        emojiColor: "Your emoji color",
        start: "Let's go! 🎉",
        save: "Save",
        copied: "Copied",
        share: "Share",
        connecting: "Connecting…",
        reconnecting: "Reconnecting…",
        disconnected: "Disconnected",
        selectEmoji: "Select an emoji and tap the canvas",
        tapToPlace: (emoji: string) => `Tap the canvas to place ${emoji}`,
        animals: [
            "Panda", "Fox", "Owl", "Cat", "Wolf", "Bear", "Koala", "Lion",
            "Tiger", "Dolphin", "Octopus", "Toucan", "Seal", "Raccoon", "Deer",
        ],
    },
} as const;

export type Translations = {
    welcome: string;
    settings: string;
    instruction1: string;
    instruction2: string;
    instruction3: string;
    yourName: string;
    emojiColor: string;
    start: string;
    save: string;
    copied: string;
    share: string;
    connecting: string;
    reconnecting: string;
    disconnected: string;
    selectEmoji: string;
    tapToPlace: (emoji: string) => string;
    animals: readonly string[];
};

function detectLocale(): Locale {
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith("es")) return "es";
    return "en";
}

export const locale: Locale = detectLocale();
export const t: Translations = translations[locale];
