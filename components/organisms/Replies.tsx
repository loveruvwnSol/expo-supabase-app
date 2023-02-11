import React from "react";
import { Box, HStack, Text, useColorMode, Avatar, Divider } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useGetUserInfoByReplies, useReply } from "../../hooks/useTlinfo";
import { supabase } from "../../libs/supabaseClient";

export const Replies = () => {
  const { colorMode } = useColorMode();
  const { replies } = useReply();
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
