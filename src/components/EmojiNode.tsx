import { useRef } from "react";
import { Text } from "react-konva";
import type Konva from "konva";
import type { EmojiItem } from "../types";

type Props = {
  item: EmojiItem;
  isOwn: boolean;
  onDragEnd: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
};

export function EmojiNode({ item, isOwn, onDragEnd, onDelete }: Props) {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <Text
      x={item.x}
      y={item.y}
      text={item.emoji}
      fontSize={32 * item.scale}
      draggable={isOwn}
      onDragEnd={handleDragEnd}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchEnd}
      offsetX={16 * item.scale}
      offsetY={16 * item.scale}
      listening={true}
    />
  );
}
