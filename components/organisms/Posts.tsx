import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Text,
  ScrollView,
  useColorMode,
  Avatar,
  Divider,
  Link,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useGetUserInfoByPosts, usePost } from "../../hooks/useTlinfo";
import { supabase } from "../../libs/supabaseClient";
import { PostIcons } from "../molecules/PostIcons";

type PostsProps = {
  navigation: any;
};

export const Posts: React.FC<PostsProps> = ({ navigation }) => {
  const { colorMode } = useColorMode();
  const { posts } = usePost();
  const userInfos = useGetUserInfoByPosts(posts);
  const [likedPostIds, setLikedPostIds] = useState<string[] | null>([]);

  const callLikedPosts = () => {
    supabase
      .from("likes")
      .select("post_id")
      .filter("id", "eq", supabase.auth.user()?.id)
      .then((res) => {
        const postIds: string[] = res.data?.map((post) => post.post_id) ?? [];
        setLikedPostIds(postIds);
      });
  };

  useEffect(() => {
    callLikedPosts();
  }, []);
  if (!likedPostIds) return null;

  return (
    <ScrollView w={["96", "full"]}>
      {posts.map((e, idx) => {
        const { publicURL } = supabase.storage
          .from("avatars")
          .getPublicUrl(e.id + "_ICON/avatar");

        const isLiked = likedPostIds.includes(e.post_id);

        const data = userInfos.find((s) => s[0].id === e.id);
        if (!data) return null;

        return (
          <Link
            key={idx}
            onPress={() =>
              navigation.navigate("PostDetails", {
                post_id: e.post_id,
                user_name: data[0].user_name,
                user_id: data[0].user_id,
                user_icon: publicURL,
                text: e.text,
                timestamp: e.timestamp,
              })
            }
          >
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
                      <Text
                        fontWeight="thin"
                        ml={2}
                        opacity="0.5"
                        fontSize={12}
                      >
                        {"@" + data[0].user_id}
                      </Text>
                      <Box mt={2} ml={2} w={64}>
                        <Text fontWeight="thin">{e.text}</Text>
                      </Box>
                      <PostIcons
                        post_id={e.post_id}
                        toggle={isLiked}
                        callLikedPosts={callLikedPosts}
                      />
                    </Box>
                  </HStack>
                </HStack>
              </Box>
              <Divider opacity={0.5} />
            </Box>
          </Link>
        );
      })}
    </ScrollView>
  );
};
