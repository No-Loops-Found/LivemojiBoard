import { useState, useCallback, useRef, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import type Konva from "konva";
import { nanoid } from "nanoid";
import {
    useStorage,
    useMutation,
    useUpdateMyPresence,
} from "../liveblocks.config";
import { useUserId } from "../hooks/useUserId";
import { EmojiNode } from "./EmojiNode";
import { EmojiPicker } from "./EmojiPicker";
import { Cursors } from "./Cursors";
import { ShareButton } from "./ShareButton";
import { ConnectionStatus } from "./ConnectionStatus";
import type { EmojiItem } from "../types";

export function EmojiCanvas() {
    const { userId } = useUserId();
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const stageRef = useRef<Konva.Stage>(null);
    const updateMyPresence = useUpdateMyPresence();

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const emojis = useStorage((root) => {
        const items: EmojiItem[] = [];
        root.emojis.forEach((val, key) => {
            items.push({ ...val, id: key });
        });
        return items;
    });

    const placeEmoji = useMutation(
        ({ storage }, emoji: string, x: number, y: number) => {
            const id = nanoid(10);
            const themes = ["yellow", "pink", "blue", "green"] as const;
            const item: EmojiItem = {
                id,
                emoji,
                x,
                y,
                placedBy: userId,
                scale: 1,
                colorTheme: themes[Math.floor(Math.random() * themes.length)],
            };
            storage.get("emojis").set(id, item);
        },
        [userId],
    );

    const moveEmoji = useMutation(
        ({ storage }, id: string, x: number, y: number) => {
            const emojiMap = storage.get("emojis");
            const existing = emojiMap.get(id);
            if (existing && existing.placedBy === userId) {
                emojiMap.set(id, { ...existing, x, y });
            }
        },
        [userId],
    );

    const deleteEmoji = useMutation(
        ({ storage }, id: string) => {
            const emojiMap = storage.get("emojis");
            const existing = emojiMap.get(id);
            if (existing && existing.placedBy === userId) {
                emojiMap.delete(id);
            }
        },
        [userId],
    );

    const handleStageClick = useCallback(
        (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
            if (!selectedEmoji) return;
            // Don't place if clicking on an existing emoji
            if (e.target !== e.target.getStage()) return;

            const stage = e.target.getStage();
            if (!stage) return;
            const pos = stage.getPointerPosition();
            if (!pos) return;

            // Convert to stage coordinates (accounting for zoom/pan)
            const transform = stage.getAbsoluteTransform().copy().invert();
            const stagePos = transform.point(pos);

            placeEmoji(selectedEmoji, stagePos.x, stagePos.y);
            setSelectedEmoji(null);
        },
        [selectedEmoji, placeEmoji],
    );

    const handleMouseMove = useCallback(
        (e: Konva.KonvaEventObject<MouseEvent>) => {
            const stage = e.target.getStage();
            if (!stage) return;
            const pos = stage.getPointerPosition();
            if (!pos) return;
            const transform = stage.getAbsoluteTransform().copy().invert();
            const stagePos = transform.point(pos);
            updateMyPresence({ cursor: { x: stagePos.x, y: stagePos.y } });
        },
        [updateMyPresence],
    );

    const handleMouseLeave = useCallback(() => {
        updateMyPresence({ cursor: null });
    }, [updateMyPresence]);

    const handleWheel = useCallback((e: Konva.KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const stage = stageRef.current;
        if (!stage) return;

        const scaleBy = 1.08;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        const direction = e.evt.deltaY > 0 ? -1 : 1;
        const newScale =
            direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        const clampedScale = Math.max(0.3, Math.min(3, newScale));

        stage.scale({ x: clampedScale, y: clampedScale });
        stage.position({
            x: pointer.x - mousePointTo.x * clampedScale,
            y: pointer.y - mousePointTo.y * clampedScale,
        });
    }, []);

    // Pinch-to-zoom for mobile
    const lastPinchDist = useRef<number | null>(null);
    const lastPinchCenter = useRef<{ x: number; y: number } | null>(null);

    const handleTouchMove = useCallback(
        (e: Konva.KonvaEventObject<TouchEvent>) => {
            const touch = e.evt.touches;
            if (touch.length !== 2) {
                lastPinchDist.current = null;
                lastPinchCenter.current = null;
                return;
            }

            e.evt.preventDefault();
            const stage = stageRef.current;
            if (!stage) return;

            const p1 = { x: touch[0].clientX, y: touch[0].clientY };
            const p2 = { x: touch[1].clientX, y: touch[1].clientY };
            const dist = Math.sqrt(
                (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2,
            );
            const center = {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2,
            };

            if (lastPinchDist.current === null || lastPinchCenter.current === null) {
                lastPinchDist.current = dist;
                lastPinchCenter.current = center;
                return;
            }

            const oldScale = stage.scaleX();
            const newScale = Math.max(
                0.3,
                Math.min(3, oldScale * (dist / lastPinchDist.current)),
            );

            const mousePointTo = {
                x: (lastPinchCenter.current.x - stage.x()) / oldScale,
                y: (lastPinchCenter.current.y - stage.y()) / oldScale,
            };

            stage.scale({ x: newScale, y: newScale });
            stage.position({
                x: center.x - mousePointTo.x * newScale,
                y: center.y - mousePointTo.y * newScale,
            });

            lastPinchDist.current = dist;
            lastPinchCenter.current = center;
        },
        [],
    );

    const handleTouchEnd = useCallback(() => {
        lastPinchDist.current = null;
        lastPinchCenter.current = null;
    }, []);

    const isEmpty = !emojis || emojis.length === 0;

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                touchAction: "none",
            }}
        >
            <Stage
                ref={stageRef}
                width={dimensions.width}
                height={dimensions.height}
                onClick={handleStageClick}
                onTap={handleStageClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onWheel={handleWheel}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                draggable={!selectedEmoji}
                style={{ cursor: selectedEmoji ? "crosshair" : "grab" }}
            >
                <Layer>
                    <Cursors />
                    {emojis?.map((item) => (
                        <EmojiNode
                            key={item.id}
                            item={item}
                            isOwn={item.placedBy === userId}
                            onDragEnd={moveEmoji}
                            onDelete={deleteEmoji}
                        />
                    ))}
                </Layer>
            </Stage>

            {isEmpty && !selectedEmoji && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        color: "#888",
                        fontSize: "1.2rem",
                        pointerEvents: "none",
                        userSelect: "none",
                    }}
                >
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                        👆
                    </div>
                    <div>Selecciona un emoji y toca el canvas</div>
                </div>
            )}

            {selectedEmoji && (
                <div
                    style={{
                        position: "absolute",
                        top: 16,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(0,0,0,0.8)",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: 20,
                        fontSize: "0.9rem",
                        pointerEvents: "none",
                        zIndex: 10,
                    }}
                >
                    Toca el canvas para colocar {selectedEmoji}
                </div>
            )}

            <EmojiPicker
                selectedEmoji={selectedEmoji}
                onSelect={(emoji) =>
                    setSelectedEmoji(selectedEmoji === emoji ? null : emoji)
                }
            />
            <ShareButton />
            <ConnectionStatus />
        </div>
    );
}
