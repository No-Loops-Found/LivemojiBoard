import { Circle, Text, Group, Rect } from "react-konva";
import { useOthers, useSelf } from "../liveblocks.config";

const COLORS = [
  "#e74c3c", "#3498db", "#2ecc71", "#f39c12",
  "#9b59b6", "#1abc9c", "#e67e22", "#e91e63",
];

function getColor(connectionId: number) {
  return COLORS[connectionId % COLORS.length];
}

function CursorLabel({ name, color }: { name: string; color: string }) {
  const padding = 4;
  const fontSize = 10;
  const labelWidth = name.length * 6 + padding * 2;
  const labelHeight = fontSize + padding * 2;

  return (
    <Group x={8} y={8}>
      <Rect
        width={labelWidth}
        height={labelHeight}
        fill={color}
        cornerRadius={4}
      />
      <Text
        text={name}
        fontSize={fontSize}
        fill="#fff"
        fontStyle="bold"
        fontFamily="Inter, system-ui, sans-serif"
        x={padding}
        y={padding}
      />
    </Group>
  );
}

export function Cursors() {
  const others = useOthers();
  const self = useSelf();

  return (
    <>
      {/* Other users' cursors */}
      {others.map(({ connectionId, presence }) => {
        if (!presence?.cursor) return null;
        const color = getColor(connectionId);
        return (
          <Group
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
          >
            <Circle
              radius={5}
              fill={color}
              opacity={0.8}
            />
            {presence.name && (
              <CursorLabel name={presence.name} color={color} />
            )}
          </Group>
        );
      })}
      {/* Own cursor */}
      {self?.presence?.cursor && (
        <Group
          x={self.presence.cursor.x}
          y={self.presence.cursor.y}
        >
          <Circle
            radius={5}
            fill="#333"
            opacity={0.8}
          />
          {self.presence.name && (
            <CursorLabel name={self.presence.name} color="#333" />
          )}
        </Group>
      )}
    </>
  );
}
