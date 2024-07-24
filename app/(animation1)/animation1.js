// app/contact.js
import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { globalStyles } from "../../styles/gobalStyles";
import { COLORS } from "../../styles/constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function Animation1Page() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const pinchGesture = Gesture.Pinch().onUpdate((e) => {
    scale.value = e.value;
  });

  const pan = Gesture.Pan().onUpdate((e) => {
    translateX.value = e.translationX;
    translateY.value = e.translationY;
  });

  const composedGesture = Gesture.Simultaneous(pinchGesture, pan);

  return (
    <>
      <View style={styles.container}>
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.circle, animatedStyle]} />
        </GestureDetector>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
    borderRadius: "100%",
  },
});
