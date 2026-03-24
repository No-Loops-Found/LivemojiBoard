import { LiveMap } from "@liveblocks/client";
import { RoomProvider } from "./liveblocks.config";
import { useUserId } from "./hooks/useUserId";
import { EmojiCanvas } from "./components/EmojiCanvas";

const GLOBAL_ROOM_ID = "emoji-canvas-global";

function App() {
    const { userId, name } = useUserId();

    return (
        <RoomProvider
            id={GLOBAL_ROOM_ID}
            initialPresence={{ cursor: null, userId, name }}
            initialStorage={{ emojis: new LiveMap() }}
        >
            <EmojiCanvas />
        </RoomProvider>
    );
}

export default App;
