import React from "react";
import { Box, ScrollView, useColorMode } from "native-base";
import { PostDetailsTop } from "../organisms/PostDetailsTop";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TimelineParamList } from "../../types";
import { Replies } from "../organisms/Replies";

type TimelineStackscreenProps = NativeStackScreenProps<
  TimelineParamList,
  "PostDetails"
>;

export const PostDetails = ({
  navigation,
  route,
}: TimelineStackscreenProps) => {
  const { colorMode } = useColorMode();

  return (
    <ScrollView w={["96", "full"]}>
      <Box
        bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
        w="full"
        h="full"
        alignItems="center"
      >
        <PostDetailsTop
          navigation={navigation}
          post_id={route.params.post_id}
          user_name={route.params.user_name}
          user_id={route.params.user_id}
          user_icon={route.params.user_icon}
          user_gender={route.params.user_gender}
          user_country={route.params.user_country}
          user_language={route.params.user_language}
          selfIntro={route.params.selfIntro}
          text={route.params.text}
          timestamp={route.params.timestamp}
        />
        <Replies navigation={navigation} post_id={route.params.post_id} />
      </Box>
    </ScrollView>
  );
};
