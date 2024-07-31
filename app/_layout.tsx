import { ContextProvider } from "@/context/useStateContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  useFonts({
    'outfit': require('@/assets/fonts/Outfit-Regular.ttf'),
    'outfitd-medium': require('@/assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('@/assets/fonts/Outfit-Bold.ttf'),
  })


  return (
    <ContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ContextProvider>
  );
}
