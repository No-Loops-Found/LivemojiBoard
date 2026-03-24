import { useState, useMemo, useCallback } from "react";
import { nanoid } from "nanoid";
import type { EmojiColorTheme } from "../types";
import { t } from "../data/i18n";

const STORAGE_KEY = "livemoji-user-id";
const NAME_KEY = "livemoji-user-name";
const COLOR_KEY = "livemoji-user-color";
const SETUP_KEY = "livemoji-has-setup";

function getDefaultName(userId: string) {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash + userId.charCodeAt(i)) | 0;
  }
  return t.animals[Math.abs(hash) % t.animals.length];
}

export function useUserId() {
  const userId = useMemo(() => {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = nanoid(8);
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  }, []);

  const [name, setNameState] = useState(() => {
    return localStorage.getItem(NAME_KEY) || getDefaultName(userId);
  });

  const [colorTheme, setColorThemeState] = useState<EmojiColorTheme>(() => {
    return (localStorage.getItem(COLOR_KEY) as EmojiColorTheme) || "yellow";
  });

  const [hasSetup, setHasSetupState] = useState(() => {
    return localStorage.getItem(SETUP_KEY) === "true";
  });

  const setName = useCallback((newName: string) => {
    const trimmed = newName.trim() || getDefaultName(userId);
    localStorage.setItem(NAME_KEY, trimmed);
    setNameState(trimmed);
  }, [userId]);

  const setColorTheme = useCallback((color: EmojiColorTheme) => {
    localStorage.setItem(COLOR_KEY, color);
    setColorThemeState(color);
  }, []);

  const completeSetup = useCallback(() => {
    localStorage.setItem(SETUP_KEY, "true");
    setHasSetupState(true);
  }, []);

  return { userId, name, colorTheme, hasSetup, setName, setColorTheme, completeSetup };
}
