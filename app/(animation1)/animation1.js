import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { globalStyles } from "../../styles/gobalStyles";
import { COLORS } from "../../styles/constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Animation1Page() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const previousTranslateX = useSharedValue(0);
  const previousTranslateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const previousScale = useSharedValue(1);
  const [animationStateLoaded, setAnimationStateLoaded] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  useEffect(() => {
    async function loadAnimationState() {
      try {
        const jsonData = await AsyncStorage.getItem("animation-state");
        if (jsonData) {
          const data = JSON.parse(jsonData);
          console.log(data);

          translateX.value = data.translateX;
          translateY.value = data.translateY;
          scale.value = data.scale;
        }
        setAnimationStateLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }
    loadAnimationState();
  }, []);

  async function resetStorage() {
    try {
      AsyncStorage.clear();
    } catch (err) {
      console.log(err);
    }
  }

  async function persistAnimationState() {
    try {
      const data = {
        scale: scale.value,
        translateX: translateX.value,
        translateY: translateY.value,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("animation-state", jsonData);
    } catch (err) {
      console.log(err);
    }
  }

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = e.scale * previousScale.value;
    })
    .onEnd(() => {
      previousScale.value = scale.value;
      persistAnimationState();
    })
    .runOnJS(true);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value =
        e.translationX / scale.value + previousTranslateX.value;
      translateY.value =
        e.translationY / scale.value + previousTranslateY.value;
    })
    .onEnd(() => {
      previousTranslateX.value = translateX.value;
      previousTranslateY.value = translateY.value;
      persistAnimationState();
    })
    .runOnJS(true);

  const composedGesture = Gesture.Simultaneous(pinchGesture, pan);

  if (!animationStateLoaded) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.circle, animatedStyle]} />
        </GestureDetector>
      </View>
      <Button onPress={resetStorage} title="Reset Animation State"></Button>
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
