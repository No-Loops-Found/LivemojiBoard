import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useParams,
} from "react-router-dom";
import { LiveMap } from "@liveblocks/client";
import { nanoid } from "nanoid";
import { RoomProvider } from "./liveblocks.config";
import { useUserId } from "./hooks/useUserId";
import { EmojiCanvas } from "./components/EmojiCanvas";

function Room() {
    const { roomId } = useParams<{ roomId: string }>();
    const { userId, name } = useUserId();

    if (!roomId) return <Navigate to={`/${nanoid(8)}`} replace />;

    return (
        <RoomProvider
            id={`emoji-canvas-${roomId}`}
            initialPresence={{ cursor: null, userId, name }}
            initialStorage={{ emojis: new LiveMap() }}
        >
            <EmojiCanvas />
        </RoomProvider>
    );
}

function RedirectToNewRoom() {
    return <Navigate to={`/${nanoid(8)}`} replace />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:roomId" element={<Room />} />
                <Route path="/" element={<RedirectToNewRoom />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
