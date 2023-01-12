import { Box, Fab, useColorMode } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const FabAdd = () => {
  const { colorMode } = useColorMode();
  return (
    <Box mt={24} shadow="2" rounded="lg">
      <Fab
        bg={colorMode === "dark" ? "black" : "white"}
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={
          <Ionicons
            color={colorMode === "dark" ? "white" : "black"}
            name="add"
            size={24}
          />
        }
      />
    </Box>
  );
};
