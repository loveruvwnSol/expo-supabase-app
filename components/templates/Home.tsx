import { Box, useColorMode } from "native-base";
import { HomeCards } from "../organisms/HomeCards";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogInParamList } from "../../types";
import { FabAdd } from "../atoms/FabAdd";

type LogInStackscreenProps = NativeStackScreenProps<LogInParamList>;

export default function Home({ navigation }: LogInStackscreenProps) {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.800" : "blueGray.100"}
      w="full"
      h="full"
      justifyContent="center"
      textAlign="center"
    >
      <HomeCards />
      <FabAdd />
    </Box>
  );
}
