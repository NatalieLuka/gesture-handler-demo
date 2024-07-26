import { View, Text } from "react-native";
import { Link } from "expo-router";
import { globalStyles } from "../../styles/gobalStyles";
import { DeviceMotion } from "expo-sensors";
import { useState, useEffect } from "react";

export default function RotationPage() {
  const [subscription, setSubscription] = useState(null);
  const [rotation, setRotation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  function subscribe() {
    const subscriptionHandle = DeviceMotion.addListener(({ rotation }) => {
      setRotation(rotation);

      console.log(alpha);
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
    <>
      <Text style={globalStyles.heading}>Rotation</Text>
      <Text style={globalStyles.heading}>alpha: {rotation.alpha}</Text>
      <Text style={globalStyles.heading}>beta: {rotation.beta}</Text>
      <Text style={globalStyles.heading}>gamma: {rotation.gamma}</Text>
    </>
  );
}
