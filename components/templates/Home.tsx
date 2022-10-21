import { supabase } from "../../libs/supabaseClient";
import { Box, Button, Input, Text } from "native-base";
import { HomeTop } from "../organisms/HomeTop";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogInParamList } from "../../types";

type LogInStackscreenProps = NativeStackScreenProps<LogInParamList>;

export default function Home({ navigation }: LogInStackscreenProps) {
  const signOut = () => {
    navigation.navigate("LogIn");
    supabase.auth.signOut();
  };
  return (
    <Box
      h="full"
      justifyContent="center"
      textAlign="center"
      background="blueGray.100"
    >
      <HomeTop />
      <Box>
        <Button
          onPress={() => {
            signOut();
          }}
        >
          sign out
        </Button>
      </Box>
    </Box>
  );
}
