import { supabase } from "../../libs/supabaseClient";
import { Box, Button, Fab, Input, Text, Icon } from "native-base";
import { HomeCards } from "../organisms/HomeCards";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogInParamList } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import { FabAdd } from "../atoms/FabAdd";

type LogInStackscreenProps = NativeStackScreenProps<LogInParamList>;

export default function Home({ navigation }: LogInStackscreenProps) {
  const signOut = () => {
    navigation.navigate("LogIn");
    supabase.auth.signOut();
  };
  return (
    <Box w="full" h="full" justifyContent="center" textAlign="center">
      <HomeCards />
      <FabAdd />
    </Box>
  );
}
