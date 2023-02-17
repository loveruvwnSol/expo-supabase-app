import React from "react";
import {
  Box,
  HStack,
  Text,
  useColorMode,
  Avatar,
  Divider,
  Link,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useGetUserInfoByReplies, useReply } from "../../hooks/useTlinfo";
import { supabase } from "../../libs/supabaseClient";

type RepliesProps = {
  navigation: any;
  post_id: string;
};

export const Replies: React.FC<RepliesProps> = ({ navigation, post_id }) => {
  const { colorMode } = useColorMode();
  const { replies } = useReply(post_id);
  const userInfos = useGetUserInfoByReplies(replies);

  return (
    <Box>
      {replies.map((e, idx) => {
        const { publicURL } = supabase.storage
          .from("avatars")
          .getPublicUrl(e.id + "_ICON/avatar");

        const data = userInfos.find((s) => s[0].id === e.id);
        if (!data) return null;

        return (
          <Box
            key={idx}
            bg={colorMode === "dark" ? "black" : "white"}
            w={96}
            justifyContent="space-between"
          >
            <Box m={4}>
              <HStack alignItems="center" justifyContent="space-between">
                <HStack>
                  <Link
                    onPress={() =>
                      navigation.navigate("TimelineUserInfos", {
                        id: data[0].id,
                        user_name: data[0].user_name,
                        user_id: data[0].user_id,
                        user_icon: publicURL,
                        user_gender: data[0].user_gender,
                        user_country: data[0].user_country,
                        user_language: data[0].user_language,
                      })
                    }
                  >
                    <Box mt={1}>
                      <Avatar
                        w={12}
                        h={12}
                        borderWidth={0.5}
                        borderColor="gray.500"
                        source={{ uri: publicURL ?? "" }}
                        size="xs"
                        ml={1}
                      />
                    </Box>
                  </Link>
                  <Box>
                    <HStack
                      alignItems="center"
                      justifyContent="space-between"
                      w={72}
                    >
                      <Text ml={2} fontSize={16}>
                        {data[0].user_name}
                      </Text>
                      <HStack alignItems="center" justifyContent="end">
                        <Text
                          fontWeight="thin"
                          fontSize={12}
                          opacity={0.5}
                          mr={5}
                        >
                          {dayjs(e.timestamp).format("YYYY/MM/DD")}
                        </Text>
                        <Ionicons
                          name="ellipsis-horizontal"
                          size={20}
                          color="gray"
                        />
                      </HStack>
                    </HStack>
                    <Text fontWeight="thin" ml={2} opacity="0.5" fontSize={12}>
                      {"@" + data[0].user_id}
                    </Text>
                    <Box mt={2} ml={2} w={64}>
                      <Text fontWeight="thin">{e.text}</Text>
                    </Box>
                  </Box>
                </HStack>
              </HStack>
            </Box>
            <Divider opacity={0.5} />
          </Box>
        );
      })}
    </Box>
  );
};
