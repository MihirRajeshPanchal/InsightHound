import { Stack } from "expo-router";
import { View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: "Index Page" }} />
    </View>
  );
}