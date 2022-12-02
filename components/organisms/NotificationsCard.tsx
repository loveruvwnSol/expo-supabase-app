import React from "react";
import { Box, Text, HStack, Avatar } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useColorMode } from "native-base";

type NotificationsCardProps = {
  usericon: string | undefined;
};

export const NotificationsCard: React.FC<NotificationsCardProps> = ({
  usericon,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.700" : "white"}
      mt={7}
      mb={7}
      w={72}
      p={5}
      justifyContent="space-between"
      borderRadius={20}
    >
      <Box mb={2}>
        <HStack alignItems="center" justifyContent="space-between">
          <HStack>
            <Box mt={1}>
              <Ionicons name="ellipse" size={12} color="#00A6BC" />
            </Box>
            <Box>
              <Text fontWeight="thin" ml={2}>
                changed your icon
              </Text>
              <Text fontWeight="thin" ml={1} opacity="0.5">
                2022/1/1 15:00:PM
              </Text>
            </Box>
          </HStack>
          <Box alignItems="end">
            <Avatar w={12} h={12} source={{ uri: usericon }} size="xs" ml={1} />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};
