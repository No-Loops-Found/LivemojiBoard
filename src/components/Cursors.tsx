import { Circle, Text, Group } from "react-konva";
import { useOthers } from "../liveblocks.config";

const COLORS = [
  "#e74c3c", "#3498db", "#2ecc71", "#f39c12",
  "#9b59b6", "#1abc9c", "#e67e22", "#e91e63",
];

function getColor(connectionId: number) {
  return COLORS[connectionId % COLORS.length];
}

export function Cursors() {
  const others = useOthers();

  return (
    <>
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
              radius={6}
              fill={color}
              opacity={0.7}
            />
            {presence.name && (
              <Text
                text={presence.name}
                fontSize={11}
                fill={color}
                x={10}
                y={-6}
                fontStyle="bold"
              />
            )}
          </Group>
        );
      })}
    </>
  );
}
