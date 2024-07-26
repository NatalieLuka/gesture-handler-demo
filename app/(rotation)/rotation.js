import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/gobalStyles";
import { DeviceMotion } from "expo-sensors";
import { useState, useEffect } from "react";
import { COLORS } from "../../styles/constants";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function RotationPage() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [subscription, setSubscription] = useState(null);
  const [stageDimensions, setStageDimensions] = useState(null);
  // {width:200, height: 200}
  const [rotation, setRotation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  function subscribe() {
    const subscriptionHandle = DeviceMotion.addListener(({ rotation }) => {
      if (rotation.gamma < -0.2) {
        translateX.value = withSpring(-stageDimensions.width / 2);
      } else if (rotation.gamma > 0.2) {
        translateX.value = withSpring(stageDimensions.width / 2);
      } else {
        translateX.value = withSpring(0);
      }

      if (rotation.beta < -0.2) {
        translateY.value = withSpring(-stageDimensions.height / 2);
      } else if (rotation.beta > 0.2) {
        translateY.value = withSpring(stageDimensions.height / 2);
      } else {
        translateY.value = withSpring(0);
      }

      setRotation(rotation);
    });
    setSubscription(subscriptionHandle);
  }

  function unsubscribe() {
    if (subscription) {
      subscription.remove();
    }
  }

  useEffect(() => {
    if (stageDimensions) {
      subscribe();
    }
    return () => unsubscribe();
  }, [stageDimensions]);

  return (
    <>
      <Text style={globalStyles.heading}>Rotation</Text>
      <Text style={globalStyles.paragraph}>
        alpha: {Math.round(rotation.alpha * 10) / 10}
      </Text>
      <Text style={globalStyles.paragraph}>
        beta: {Math.round(rotation.beta * 10) / 10}
      </Text>
      <Text style={globalStyles.paragraph}>
        gamma: {Math.round(rotation.gamma * 10) / 10}
      </Text>
      <Text style={globalStyles.paragraph}>
        Stage Dimension: {stageDimensions?.height} x {stageDimensions?.width}
      </Text>
      <View
        onLayout={({ nativeEvent }) => {
          console.log(nativeEvent);
          setStageDimensions({
            height: nativeEvent.layout.height,
            width: nativeEvent.layout.width,
          });
        }}
        style={styles.stage}
      >
        <Animated.View style={[styles.circle, animatedStyle]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: "relative",
    width: 60,
    height: 60,
    backgroundColor: COLORS.primary,
    borderRadius: "100%",
  },

  stage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
