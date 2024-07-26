import { View, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { COLORS } from "../../styles/constants";
import { useState, useEffect } from "react";
import { Gyroscope } from "expo-sensors";

export default function EscapeGamePage() {
  const [subscription, setSubscription] = useState(null);
  const ballPosition = useSharedValue(0);
  const { width } = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: (ballPosition.value * width) / 2,
    };
  });

  function subscribe() {
    const subscriptionHandle = Gyroscope.addListener(({ y }) => {
      if (Math.abs(y) > 1) {
        console.log("Yeah!");
        let newValue;
        let signature = y / Math.abs(y);
        if (Math.abs(ballPosition.value + y / 5) > 1) {
          newValue = signature;
        } else {
          newValue = ballPosition.value + y / 5;
        }
        ballPosition.value = withSpring(newValue, {
          mass: 4,
          stiffness: 250,
          damping: 4,
        });
      }
    });
    setSubscription(subscriptionHandle);
  }

  function unsubscribe() {
    if (subscription) {
      subscription.remove();
    }
  }

  useEffect(() => {
    setSubscription(subscribe());
    Gyroscope.setUpdateInterval(50);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <View style={styles.gameContainer}>
        <Animated.View style={[styles.circle, animatedStyle]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  circle: {
    position: "relative",
    width: 60,
    height: 60,
    backgroundColor: COLORS.primary,
    borderRadius: "100%",
  },
});
