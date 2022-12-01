import React from "react";
import { Box, HStack, Text, Button, Avatar } from "native-base";

type UserInfoTopProps = {
  user: any;
  usericon: string | undefined;
  navigation: any;
};

export const UserInfoTop: React.FC<UserInfoTopProps> = ({
  user,
  usericon,
  navigation,
}) => {
  return (
    <Box mb={10}>
      <HStack alignItems="center">
        <Box borderWidth={1} borderRadius={100} borderColor="gray.500" mr={5}>
          <Avatar w={32} h={32} source={{ uri: usericon }} size="xs">
            <Avatar.Badge size={8} bg="green.500" />
          </Avatar>
        </Box>
        <Box>
          <Text textAlign="left" fontSize={24} fontWeight="thin">
            {user.user_name}
          </Text>
          <Text
            textAlign="left"
            fontSize={12}
            fontWeight="thin"
            opacity={0.5}
            mb={5}
          >
            {"@" + user.user_id}
          </Text>
          <Button
            w={"32"}
            borderRadius={0}
            onPress={() => navigation.navigate("UserSetting")}
          >
            編集
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};
