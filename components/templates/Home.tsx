import { Box, useColorMode } from "native-base";
import { HomeCards } from "../organisms/HomeCards";
import { FabAdd } from "../atoms/FabAdd";

export default function Home() {
  const { colorMode } = useColorMode();
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
