import { Stack } from "expo-router";
import { COLORS } from "../../styles/constants";

export default function GyroscopeStack() {
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
        name="gyroscope"
        options={{
          title: "gyroscope",
        }}
      />
    </Stack>
  );
}
