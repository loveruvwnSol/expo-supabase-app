import React, { useEffect, useState } from "react";
import { Box, HStack, Text, Button, Avatar } from "native-base";
import { supabase } from "../../libs/supabaseClient";

type UserInfoTopProps = {
  navigation: any;
};

export const UserInfoTop: React.FC<UserInfoTopProps> = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);
  const [usericon, setUsericon] = useState<string | undefined>();

  useEffect(() => {
    const setupUser = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id,user_id, user_name")
        .eq("id", supabase.auth.user()?.id);
      if (profile) {
        setUser(profile[0]);
      }
    };
    setupUser();
  }, [user]);

  useEffect(() => {
    const getUserIcon = async () => {
      if (!user) return;
      const { publicURL, error } = await supabase.storage
        .from("avatars")
        .getPublicUrl(user.id + "_ICON/avatar");
      if (publicURL) {
        setUsericon(publicURL);
      }
    };
    getUserIcon();
  }, [user]);

  if (!user) return null;

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
            borderRadius={0}
            onPress={() => {
              navigation.navigate("UserSetting");
            }}
          >
            <Text color="white">編集</Text>
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};
