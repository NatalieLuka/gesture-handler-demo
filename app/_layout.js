import { COLORS } from "../styles/constants";
import { Tabs } from "expo-router";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Fontisto,
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
      </Tabs>
    </GestureHandlerRootView>
  );
}
