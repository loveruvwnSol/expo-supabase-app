import React, { useEffect, useState } from "react";
import { Box, HStack, Text, Button, Avatar } from "native-base";
import { supabase } from "../../libs/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { Ionicons } from "@expo/vector-icons";

type UserInfoTopProps = {
  navigation: any;
};

export const UserInfoTop: React.FC<UserInfoTopProps> = ({ navigation }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // useEffect(() => {
  //   const setupUser = async () => {
  //     const { data: profile } = await supabase
  //       .from("profiles")
  //       .select("*")
  //       .eq("id", session?.user?.id)
  //       .order("user_id")
  //       .single();
  //     setUser(profile);
  //   };
  // });

  return (
    <Box mb={10}>
      <HStack alignItems="center">
        <Box borderWidth={1} borderRadius={100} borderColor="gray.500" mr={5}>
          <Avatar
            w={32}
            h={32}
            bg="lightBlue.400"
            // source={{
            //   uri: "",
            // }}
            size="xs"
          >
            <Ionicons name="person-outline" size={60} color="white" />
            <Avatar.Badge size={8} bg="green.500" />
          </Avatar>
        </Box>
        <Box>
          <Text textAlign="center" fontSize={24} fontWeight="bold">
            {/* {user && user} */}
          </Text>
          <Text
            textAlign="left"
            fontSize={10}
            fontWeight="bold"
            opacity={0.5}
            mb={5}
          >
            {/* {user && user?.user_id} */}
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
