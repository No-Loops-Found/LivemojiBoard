import { useRef } from "react";
import { Group, Rect, Text } from "react-konva";
import type Konva from "konva";
import type { EmojiItem, EmojiColorTheme } from "../types";

const COLOR_THEMES: Record<
    EmojiColorTheme,
    { gradientStart: string; gradientEnd: string; border: string }
> = {
    yellow: {
        gradientStart: "#fff9c4",
        gradientEnd: "#fffacd",
        border: "#e6c40078",
    },
    pink: {
        gradientStart: "#ffd6e8",
        gradientEnd: "#ffc4db",
        border: "#ff85c078",
    },
    blue: {
        gradientStart: "#cce7ff",
        gradientEnd: "#b3deff",
        border: "#6eb5ff78",
    },
    green: {
        gradientStart: "#d4f4dd",
        gradientEnd: "#c3edcc",
        border: "#52c47a78",
    },
};

type Props = {
    item: EmojiItem;
    isOwn: boolean;
    onDragEnd: (id: string, x: number, y: number) => void;
    onDelete: (id: string) => void;
};

const BOX_SIZE = 52;
const BORDER_WIDTH = 2;

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
            {/* Background with gradient */}
            <Rect
                width={size}
                height={size}
                cornerRadius={size / 2}
                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                fillLinearGradientEndPoint={{ x: size, y: size }}
                fillLinearGradientColorStops={[
                    0,
                    theme.gradientStart,
                    1,
                    theme.gradientEnd,
                ]}
                stroke={theme.border}
                strokeWidth={BORDER_WIDTH}
            />
            {/* Emoji centered */}
            <Text
                text={item.emoji}
                fontSize={28 * item.scale}
                width={size}
                height={size}
                align="center"
                verticalAlign="middle"
            />
        </Group>
    );
}
