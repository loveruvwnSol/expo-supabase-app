import React from "react";
import { Box, useColorMode } from "native-base";
import { PostDetailsTop } from "../organisms/PostDetailsTop";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TimelineParamList } from "../../types";

type TimelineStackscreenProps = NativeStackScreenProps<
  TimelineParamList,
  "PostDetails"
>;

export const PostDetails = ({ route }: TimelineStackscreenProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
      w="full"
      h="full"
      alignItems="center"
    >
      <PostDetailsTop
        post_id={route.params.post_id}
        user_name={route.params.user_name}
        user_id={route.params.user_id}
        user_icon={route.params.user_icon}
        text={route.params.text}
        timestamp={route.params.timestamp}
        isLiked={route.params.isLiked}
        callLikedPosts={route.params.callLikedPosts}
      />
    </Box>
  );
};
