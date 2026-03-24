import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import "./types";

const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY as string,
});

export const {
  RoomProvider,
  useRoom,
  useMyPresence,
  useUpdateMyPresence,
  useOthers,
  useSelf,
  useStorage,
  useMutation,
  useStatus,
} = createRoomContext(client);
