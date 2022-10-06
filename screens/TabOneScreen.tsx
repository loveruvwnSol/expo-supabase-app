import { StyleSheet } from "react-native";
import Account from "../components/Account";
import LogIn from "../components/templates/LogIn";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import { useEffect, useState } from "react";
import { supabase } from "../libs/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { Box } from "native-base";

export default function TabOneScreen() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <Box h="full" background="white">
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Box></Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
