import { supabase } from "../../libs/supabaseClient";
import { Box, Button, Input, Text } from "native-base";
import { HomeCards } from "../organisms/HomeCards";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogInParamList } from "../../types";
import { Ionicons } from "@expo/vector-icons";

type LogInStackscreenProps = NativeStackScreenProps<LogInParamList>;

export default function Home({ navigation }: LogInStackscreenProps) {
  const signOut = () => {
    navigation.navigate("LogIn");
    supabase.auth.signOut();
  };
  return (
    <Box
      w="full"
      h="full"
      justifyContent="center"
      textAlign="center"
      background="blueGray.100"
    >
      <HomeCards />
      <Box
        position="sticky"
        p={4}
        w={12}
        mt={5}
        mr={5}
        background="white"
        borderRadius={50}
        alignItems="center"
        ml="auto"
      >
        <Ionicons name="add" size={16} />
      </Box>
      {/* <Box>
        <Button
          onPress={() => {
            signOut();
          }}
        >
          sign out
        </Button>
      </Box> */}
    </Box>
  );
}
