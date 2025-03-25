import React from "react";
import { Tabs } from "expo-router";
import { useThemeStore } from "@/store/theme-store";
import { colors } from "@/constants/colors";
import { Home, Calendar, Settings } from "lucide-react-native";

export default function TabLayout() {
  const { theme } = useThemeStore();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[theme].primary,
        tabBarInactiveTintColor: colors[theme].subtext,
        tabBarStyle: {
          backgroundColor: colors[theme].background,
          borderTopColor: colors[theme].border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colors[theme].background,
        },
        headerTintColor: colors[theme].text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "Upcoming",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}