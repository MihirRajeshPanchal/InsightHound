import { Tabs } from "expo-router";
import { FontAwesome5, Foundation } from "@expo/vector-icons";
import { TabBarIcon } from "~/components/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "AppHound",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={FontAwesome5} size={26} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="questionnaire"
        options={{
          title: "Questionnaire",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={Foundation} size={26} name="page-search" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}