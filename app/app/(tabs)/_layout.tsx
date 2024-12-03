import { Tabs } from "expo-router";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { TabBarIcon } from "~/components/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarHideOnKeyboard: true,
        tabBarAccessibilityLabel: "TabBar",
        tabBarShowLabel: false,
        // tabBarItemStyle: {
        //   display: "flex",
        //   flexDirection: "column"
        // },
        tabBarStyle: {
          backgroundColor: "#040404",
          borderTopColor: "#0A0A0A",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HoundMe",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={MaterialCommunityIcons} size={26} name="cards" color={color} />
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