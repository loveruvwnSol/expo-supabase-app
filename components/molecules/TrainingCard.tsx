import { Box, Text, HStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const TrainingCard = () => {
  return (
    <Box background="white" w={40} h={32} p={5} borderRadius={20}>
      <HStack alignItems="center" justifyContent="space-between" mb={7}>
        <Text fontWeight="thin" fontSize={16}>
          トレーニング
        </Text>
        <Ionicons name="alarm-outline" size={16} />
      </HStack>
      <HStack alignItems="center">
        <Text fontWeight="thin" fontSize={24}>
          10
        </Text>
        <Text ml={2} fontWeight="thin" opacity={0.8}>
          min
        </Text>
      </HStack>
    </Box>
  );
};
