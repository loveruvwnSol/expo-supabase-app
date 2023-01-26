import React from "react";
import {
  Box,
  HStack,
  Text,
  ScrollView,
  useColorMode,
  Avatar,
  Divider,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { usePost } from "../../hooks/useTlinfo";
import { supabase } from "../../libs/supabaseClient";
import { PostIcons } from "../molecules/PostIcons";

export const Posts = () => {
  const { colorMode } = useColorMode();
  const posts = usePost();

  return (
    <ScrollView w={["96", "full"]}>
      {posts.map((e, idx) => {
        const { publicURL } = supabase.storage
          .from("avatars")
          .getPublicUrl(e.id + "_ICON/avatar");
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
                        {e.user_name}
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
                      {e.user_id}
                    </Text>
                    <Box mt={2} ml={2} w={64}>
                      <Text fontWeight="thin">{e.text}</Text>
                    </Box>
                    <PostIcons />
                  </Box>
                </HStack>
              </HStack>
            </Box>
            <Divider h={"0.4"} />
          </Box>
        );
      })}
    </ScrollView>
  );
};
