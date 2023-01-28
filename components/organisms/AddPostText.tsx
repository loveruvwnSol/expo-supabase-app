import React, { useState } from "react";
import { Box, HStack, Text, Divider, TextArea, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../libs/supabaseClient";
import { Alert } from "react-native";
import { usePost } from "../../hooks/useTlinfo";

type AddPostText = {
  user: any;
  onSendFinish: () => void;
};

export const AddPostText: React.FC<AddPostText> = ({ user, onSendFinish }) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const { getPostInfo } = usePost();
  const AddPostData = async () => {
    if (!textAreaValue || !textAreaValue.match(/\S/g)) return;
    if (textAreaValue.length >= 1) {
      supabase
        .from("timeline")
        .insert({
          id: user && user.id,
          user_name: user && user.user_name,
          user_id: user && user.user_id,
          text: textAreaValue,
        })
        .then(({ error }) => {
          if (error) Alert.alert(error.message);
          Alert.alert("投稿が完了しました");
          setTextAreaValue("");
          getPostInfo();
          onSendFinish();
        });
    }
  };

  return (
    <Box>
      <HStack alignItems="center" justifyContent="space-between" w={72}>
        <Text ml={2} fontSize={16}>
          {user && user.user_name}
        </Text>
      </HStack>
      <Text fontWeight="thin" ml={2} opacity="0.5" fontSize={12}>
        @{user && user.user_id}
      </Text>
      <Box mt={2} w={64} h={32}>
        <TextArea
          fontSize={16}
          variant="unstyled"
          placeholder="今日の出来事を書こう"
          value={textAreaValue}
          onChangeText={(text) => setTextAreaValue(text)}
          borderWidth={0}
          autoCompleteType={undefined}
        />
      </Box>
      <Divider />
      <HStack mt={2} alignItems="center" justifyContent="space-between">
        <Ionicons name="image-outline" size={20} color="dodgerblue" />
        <Button
          onPress={AddPostData}
          w={24}
          h={10}
          bg="blueGray.100"
          borderWidth={1}
          borderColor="dodgerblue"
          borderRadius={50}
          color="black"
          alignItems="center"
          _pressed={{ bg: "dodgerblue", color: "white" }}
        >
          <Text color="black" fontWeight="thin">
            投稿する
          </Text>
        </Button>
      </HStack>
    </Box>
  );
};
