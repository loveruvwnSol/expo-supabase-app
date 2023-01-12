import { Box, useColorMode } from "native-base";
import { HomeCards } from "../organisms/HomeCards";
import { FabAdd } from "../atoms/FabAdd";
import { useNotifications } from "../../hooks/useUserInfo";

export default function Home() {
  const { colorMode } = useColorMode();
  useNotifications(); // get theme
  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
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
