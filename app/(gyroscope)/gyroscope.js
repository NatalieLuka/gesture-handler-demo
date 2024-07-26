import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { globalStyles } from "../../styles/gobalStyles";
import { COLORS } from "../../styles/constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Gyroscope } from "expo-sensors";

export default function GyroscopePage() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  function runSlow() {
    return Gyroscope.setUpdateInterval(1000);
  }

  function runFast() {
    return Gyroscope.setUpdateInterval(100);
  }

  function subscribe() {
    const subscriptionHandle = Gyroscope.addListener((gyroscopeData) => {
      setData(gyroscopeData);
    });
    setSubscription(subscriptionHandle);
  }

  function unsubscribe() {
    if (subscription) {
      subscription.remove();
    }
  }

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  return (
    <View style={globalStyles.pageContainer}>
      <Text style={globalStyles.paragraph}>Gyroscope:</Text>
      <Text style={globalStyles.paragraph}>x: {x}</Text>
      <Text style={globalStyles.paragraph}>y: {y}</Text>
      <Text style={globalStyles.paragraph}>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={subscription ? unsubscribe : subscribe}
          style={styles.button}
        >
          <Text>{subscription ? "On" : "Off"}</Text>
        </Pressable>
        <Pressable
          onPress={runSlow}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Slow</Text>
        </Pressable>
        <Pressable onPress={runFast} style={styles.button}>
          <Text>Fast</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
