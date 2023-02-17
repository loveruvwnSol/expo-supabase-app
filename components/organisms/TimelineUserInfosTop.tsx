import React from "react";
import { Box, HStack, Text, Avatar } from "native-base";

type TimelineUserInfosTopProps = {
  user_name: string;
  user_id: string;
  user_icon: string | undefined;
};

export const TimelineUserInfosTop: React.FC<TimelineUserInfosTopProps> = ({
  user_name,
  user_id,
  user_icon,
}) => {
  return (
    <Box mb={10}>
      <HStack alignItems="center">
        <Box borderWidth={1} borderRadius={100} borderColor="gray.500" mr={5}>
          <Avatar w={32} h={32} source={{ uri: user_icon }} size="xs">
            <Avatar.Badge size={8} bg="green.500" />
          </Avatar>
        </Box>
        <Box>
          <Text textAlign="left" fontSize={24} fontWeight="thin">
            {user_name}
          </Text>
          <Text
            textAlign="left"
            fontSize={12}
            fontWeight="thin"
            opacity={0.5}
            mb={5}
          >
            {"@" + user_id}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};
