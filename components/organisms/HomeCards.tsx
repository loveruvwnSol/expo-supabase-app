import { Box, HStack, Text, useColorMode } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { WalkCard } from "../molecules/WalkCard";
import { SleepCard } from "../molecules/SleepCard";
import { TrainingCard } from "../molecules/TrainingCard";
import { CaloriesCard } from "../molecules/CaloriesCard";

export const HomeCards = () => {
  const { colorMode } = useColorMode();
  const Month = new Date().getMonth();
  const Day = new Date().getDate();
  const Time = new Date().toLocaleTimeString();
  return (
    <Box ml={5} mr={5}>
      <HStack
        bg={colorMode === "dark" ? "coolGray.700" : "white"}
        mb={5}
        alignItems="center"
        justifyContent="space-between"
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
      <HStack justifyContent="space-around" mb={5}>
        <WalkCard />
        <SleepCard />
      </HStack>
      <HStack justifyContent="space-around">
        <TrainingCard />
        <CaloriesCard />
      </HStack>
    </Box>
  );
};
