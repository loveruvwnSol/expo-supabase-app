import React, { useEffect, useState } from "react";
import { HStack, Text, IconButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../libs/supabaseClient";
import { Alert } from "react-native";

type PostIconsProps = {
  post_id: string;
  toggle: boolean;
  callLikedPosts: () => void;
};

export const PostIcons: React.FC<PostIconsProps> = ({
  post_id,
  toggle,
  callLikedPosts,
}) => {
  const [toggleIcon, setToggleIcon] = useState(toggle);
  const [likesColumn, setLikesColumn] = useState<number>();
  useEffect(() => {
    setToggleIcon(toggle);
    const getLikesColumn = async () => {
      const { data } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", post_id);
      if (data) {
        setLikesColumn(data.length);
      }
    };
    getLikesColumn();
  }, [toggle]);

  const onPressLike = async () => {
    if (!toggleIcon) {
      await supabase
        .from("likes")
        .insert({
          post_id: post_id,
          id: supabase.auth.user()?.id,
        })
        .then(({ error }) => {
          if (error) Alert.alert(error.message);
        });
      setToggleIcon(false);
    } else {
      await supabase
        .from("likes")
        .delete()
        .eq("post_id", post_id)
        .eq("id", supabase.auth.user()?.id)
        .then(({ error }) => {
          if (error) Alert.alert(error.message);
        });
      setToggleIcon(true);
    }
    await supabase
      .from("timeline")
      .update({})
      .eq("post_id", post_id)
      .then(({ error }) => {
        if (error) Alert.alert(error.message);
      });
    callLikedPosts();
  };

  return (
    <HStack ml={2} mt={2} alignItems="center">
      <HStack alignItems="center">
        <Ionicons name="chatbubble-outline" color="gray" size={16} />
        <Text ml={2} opacity={0.5}>
          0
        </Text>
      </HStack>
      <HStack alignItems="center" ml={6}>
        <IconButton
          borderRadius="full"
          onPress={onPressLike}
          icon={
            toggleIcon ? (
              <Ionicons name="heart" color="red" size={16} />
            ) : (
              <Ionicons name="heart-outline" size={16} color="gray" />
            )
          }
        />
        <Text
          opacity={toggleIcon ? 1 : 0.5}
          color={toggleIcon ? "red.600" : "black"}
        >
          {likesColumn}
        </Text>
      </HStack>
    </HStack>
  );
};
