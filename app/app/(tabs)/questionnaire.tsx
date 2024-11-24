import { Stack } from "expo-router";
import { View } from "react-native";

export default function Questionnaire() {
  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: "Questionnaire" }} />
    </View>
  );
}