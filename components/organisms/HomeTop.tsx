import { Box, HStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const HomeTop = () => {
  const Month = new Date().getMonth();
  const Day = new Date().getDate();
  const Time = new Date().toLocaleTimeString();
  return (
    <Box>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        background="white"
        p={7}
        borderRadius={20}
      >
        <Box>
          <Text fontWeight="thin" fontSize={32}>
            {Time}
          </Text>
          <Text fontWeight="thin" fontSize={24}>
            {Month}月{Day}日
          </Text>
        </Box>
        <HStack>
          <Ionicons name="sunny-outline" size={32} color="orange" />
          <Text fontWeight="thin" fontSize={24}>
            晴れ
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};
