import { Box, Text, HStack, useColorMode } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const CaloriesCard = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.700" : "white"}
      w={40}
      h={32}
      p={5}
      borderRadius={20}
    >
      <HStack alignItems="center" justifyContent="space-between" mb={7}>
        <Text fontWeight="thin" fontSize={16}>
          カロリー
        </Text>
        <Ionicons
          name="fast-food-outline"
          size={16}
          color={colorMode === "dark" ? "white" : "black"}
        />
      </HStack>
      <HStack alignItems="center">
        <Text fontWeight="thin" fontSize={24}>
          1000
        </Text>
        <Text ml={2} fontWeight="thin" opacity={0.8}>
          kcal
        </Text>
      </HStack>
    </Box>
  );
};
