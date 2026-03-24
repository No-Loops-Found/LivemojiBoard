import { useMemo } from "react";
import { nanoid } from "nanoid";

const STORAGE_KEY = "livemoji-user-id";

const ANIMAL_NAMES = [
  "Panda", "Zorro", "Búho", "Gato", "Lobo", "Oso", "Koala", "León",
  "Tigre", "Delfín", "Pulpo", "Tucán", "Foca", "Mapache", "Ciervo",
];

export function useUserId() {
  const userId = useMemo(() => {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = nanoid(8);
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  }, []);

  const name = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = ((hash << 5) - hash + userId.charCodeAt(i)) | 0;
    }
    return ANIMAL_NAMES[Math.abs(hash) % ANIMAL_NAMES.length];
  }, [userId]);

  return { userId, name };
}
