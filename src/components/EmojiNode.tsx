import { useRef } from "react";
import { Group, Rect, Text } from "react-konva";
import type Konva from "konva";
import type { EmojiItem, EmojiColorTheme } from "../types";

const COLOR_THEMES: Record<
    EmojiColorTheme,
    { fill: string; border: string; shadow: string }
> = {
    yellow: {
        fill: "#ffe056",
        border: "#b89c1e",
        shadow: "#8a7516",
    },
    pink: {
        fill: "#ffb3d9",
        border: "#c4708a",
        shadow: "#994e6a",
    },
    blue: {
        fill: "#7ec8ff",
        border: "#4a8ab8",
        shadow: "#356a91",
    },
    green: {
        fill: "#6ee09a",
        border: "#3a9e5c",
        shadow: "#2a7844",
    },
};

type Props = {
    item: EmojiItem;
    isOwn: boolean;
    onDragEnd: (id: string, x: number, y: number) => void;
    onDelete: (id: string) => void;
};

const BOX_SIZE = 56;
const BORDER_WIDTH = 2.5;

export function EmojiNode({ item, isOwn, onDragEnd, onDelete }: Props) {
    const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const theme = COLOR_THEMES[item.colorTheme ?? "yellow"];
    const size = BOX_SIZE * item.scale;

    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
        const node = e.target;
        onDragEnd(item.id, node.x(), node.y());
    };

    const handleContextMenu = (e: Konva.KonvaEventObject<PointerEvent>) => {
        e.evt.preventDefault();
        if (isOwn) onDelete(item.id);
    };

    const handleTouchStart = () => {
        if (!isOwn) return;
        longPressTimer.current = setTimeout(() => {
            onDelete(item.id);
        }, 600);
    };

    const handleTouchEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
    };

    return (
        <Group
            x={item.x}
            y={item.y}
            offsetX={size / 2}
            offsetY={size / 2}
            draggable={isOwn}
            onDragEnd={handleDragEnd}
            onContextMenu={handleContextMenu}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchEnd}
            listening={true}
        >
            {/* 3D offset shadow */}
            <Rect
                width={size}
                height={size}
                cornerRadius={size / 2}
                fill={theme.shadow}
                x={4}
                y={4}
            />
            {/* Background */}
            <Rect
                width={size}
                height={size}
                cornerRadius={size / 2}
                fill={theme.fill}
                stroke={theme.border}
                strokeWidth={BORDER_WIDTH}
            />
            {/* Emoji centered */}
            <Text
                text={item.emoji}
                fontSize={30 * item.scale}
                width={size}
                height={size}
                align="center"
                verticalAlign="middle"
            />
        </Group>
    );
}
