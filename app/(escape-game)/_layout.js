import { Stack } from "expo-router";
import { COLORS } from "../../styles/constants";

export default function EscapeGameStack() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTitleStyle: {
          color: COLORS.text,
          fontSize: 20,
        },
        contentStyle: {
          backgroundColor: COLORS.background,
          paddingHorizontal: 20,
        },
      }}
    >
      <Stack.Screen
        name="escape-game"
        options={{
          title: "Escape Game",
        }}
      />
    </Stack>
  );
}
