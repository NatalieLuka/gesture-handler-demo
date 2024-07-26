import { COLORS } from "../styles/constants";
import { Tabs } from "expo-router";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => {
              return <FontAwesome name="home" size={24} color={color} />;
            },
          }}
        />

        <Tabs.Screen
          name="(animation1)"
          options={{
            title: "Animation 1",
            tabBarIcon: ({ color }) => {
              return (
                <MaterialCommunityIcons
                  name="animation"
                  size={24}
                  color={color}
                />
              );
            },
          }}
        />

        <Tabs.Screen
          name="(gyroscope)"
          options={{
            title: "Gyroscope",
            tabBarIcon: ({ color }) => {
              return (
                <MaterialCommunityIcons
                  name="animation-play"
                  size={24}
                  color={color}
                />
              );
            },
          }}
        />

        <Tabs.Screen
          name="(escape-game)"
          options={{
            title: "Escape Game",
            tabBarIcon: ({ color }) => {
              return <FontAwesome name="gamepad" size={24} color={color} />;
            },
          }}
        />

        <Tabs.Screen
          name="(rotation)"
          options={{
            title: "Rotation",
            tabBarIcon: ({ color }) => {
              return <FontAwesome5 name="compass" size={24} color={color} />;
            },
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
