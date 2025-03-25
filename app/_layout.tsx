import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import { useThemeStore } from "@/store/theme-store";
import { colors } from "@/constants/colors";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const { theme } = useThemeStore();
  
  return (
    <>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors[theme].background}
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="reminder/[id]" 
          options={{ 
            title: "Reminder Details",
            headerStyle: {
              backgroundColor: colors[theme].background,
            },
            headerTintColor: colors[theme].text,
          }} 
        />
        <Stack.Screen 
          name="reminder/create" 
          options={{ 
            title: "New Reminder",
            headerStyle: {
              backgroundColor: colors[theme].background,
            },
            headerTintColor: colors[theme].text,
            presentation: 'modal',
          }} 
        />
      </Stack>
    </>
  );
}