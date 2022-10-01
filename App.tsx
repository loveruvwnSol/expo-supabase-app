import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { useEffect, useState } from "react";
import { supabase } from "./libs/supabaseClient";
import { Session } from "@supabase/supabase-js";
import Account from "./components/Account";
import { View } from "react-native";
import LogIn from "./components/LogIn";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <SafeAreaProvider>
          <View>
            {session && session.user ? (
              <Account key={session.user.id} session={session} />
            ) : (
              <LogIn />
            )}
          </View>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
