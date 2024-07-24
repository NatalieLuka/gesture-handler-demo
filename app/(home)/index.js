import { View, Text } from "react-native";
import { Link } from "expo-router";
import { globalStyles } from "../../styles/gobalStyles";

export default function HomePage() {
  return (
    <>
      <Text style={globalStyles.heading}>I am the Homepage</Text>
    </>
  );
}
