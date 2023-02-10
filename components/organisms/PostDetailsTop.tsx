import React, { useEffect } from "react";
import { Box, HStack, Text, useColorMode, Avatar, Divider } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { PostIcons } from "../molecules/PostIcons";

type PostDetailsTopProps = {
  post_id: string;
  user_name: string;
  user_id: string;
  user_icon: string | undefined;
  text: string;
  timestamp: Date;
  isLiked: boolean;
  callLikedPosts: () => void;
};

export const PostDetailsTop: React.FC<PostDetailsTopProps> = ({
  post_id,
  user_name,
  user_id,
  user_icon,
  text,
  timestamp,
  isLiked,
  callLikedPosts,
}) => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    callLikedPosts;
  }, []);

  return (
    <Box
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
                source={{ uri: user_icon }}
                size="xs"
                ml={1}
              />
            </Box>
            <Box>
              <HStack alignItems="center" justifyContent="space-between" w={72}>
                <Text ml={2} fontSize={16}>
                  {user_name}
                </Text>
                <HStack alignItems="center" justifyContent="end">
                  <Text fontWeight="thin" fontSize={12} opacity={0.5} mr={5}>
                    {dayjs(timestamp).format("YYYY/MM/DD")}
                  </Text>
                  <Ionicons name="ellipsis-horizontal" size={20} color="gray" />
                </HStack>
              </HStack>
              <Text fontWeight="thin" ml={2} opacity="0.5" fontSize={12}>
                {"@" + user_id}
              </Text>
              <Box mt={2} ml={2} w={64}>
                <Text fontWeight="thin">{text}</Text>
              </Box>
              <PostIcons
                post_id={post_id}
                toggle={isLiked}
                callLikedPosts={callLikedPosts}
              />
            </Box>
          </HStack>
        </HStack>
      </Box>
      <Divider opacity={0.5} />
    </Box>
  );
};
