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
  Image,
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
        const { publicURL: user_icon } = supabase.storage
          .from("avatars")
          .getPublicUrl(e.id + "_ICON/avatar");

        const isLiked = likedPostIds.includes(e.post_id);

        const data = userInfos.find((s) => s[0].id === e.id);
        if (!data) return null;

        let post_image: string | null = null;
        if (e.post_image_id) {
          const { publicURL } = supabase.storage
            .from("post-images")
            .getPublicUrl(data[0].id + "/" + e.post_image_id);
          post_image = publicURL;
        }

        return (
          <Link
            key={idx}
            onPress={() =>
              navigation.navigate("PostDetails", {
                post_id: e.post_id,
                user_name: data[0].user_name,
                user_id: data[0].user_id,
                user_icon: user_icon,
                user_gender: data[0].user_gender,
                user_country: data[0].user_country,
                user_language: data[0].user_language,
                selfIntro: data[0].selfIntro,
                text: e.text,
                timestamp: e.timestamp,
                post_image: post_image,
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
                      <Link
                        onPress={() =>
                          navigation.navigate("TimelineUserInfos", {
                            id: data[0].id,
                            user_name: data[0].user_name,
                            user_id: data[0].user_id,
                            user_icon: user_icon,
                            user_gender: data[0].user_gender,
                            user_country: data[0].user_country,
                            user_language: data[0].user_language,
                            selfIntro: data[0].selfIntro,
                          })
                        }
                      >
                        <Avatar
                          w={12}
                          h={12}
                          borderWidth={0.5}
                          borderColor="gray.500"
                          source={{ uri: user_icon ?? "" }}
                          size="xs"
                          ml={1}
                        />
                      </Link>
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
                      <Box justifyContent="center" alignItems="center">
                        {post_image && (
                          <Link
                            onPress={() =>
                              navigation.navigate("PostImage", {
                                post_image: post_image,
                              })
                            }
                          >
                            <Image
                              w={72}
                              mt={4}
                              h={72}
                              source={{ uri: post_image ?? "" }}
                              alt=""
                              borderRadius={15}
                            />
                          </Link>
                        )}
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
