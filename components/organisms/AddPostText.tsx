import React, { useState } from "react";
import {
  Box,
  HStack,
  Text,
  Divider,
  TextArea,
  Button,
  useColorMode,
  Image,
  IconButton,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../libs/supabaseClient";
import { Alert } from "react-native";
import { usePost, usePostStore } from "../../hooks/useTlinfo";
import * as ImagePicker from "expo-image-picker";
import { nanoid } from "../../libs/nanoid";

type AddPostText = {
  user: any;
  onSendFinish: () => void;
};

export const AddPostText: React.FC<AddPostText> = ({ user, onSendFinish }) => {
  const { colorMode } = useColorMode();
  const [textAreaValue, setTextAreaValue] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const [formData, setFormData] = useState<string | FormData>("");
  const { getPostInfo } = usePost();
  const { update } = usePostStore();

  const AddPostData = async () => {
    if (!textAreaValue.match(/\S/g) && image) {
      var result = nanoid();
      supabase
        .from("timeline")
        .insert({
          id: user && user.id,
          text: textAreaValue,
          post_image_id: result,
        })
        .then(({ error }) => {
          if (error) Alert.alert(error.message);
          Alert.alert("投稿が完了しました");
          setTextAreaValue("");
          getPostInfo();
          onSendFinish();
        });

      const { error } = await supabase.storage
        .from("post-images")
        .upload(user.id + "/" + result, formData, { upsert: false });
      console.log(error);
    }
    if (textAreaValue.length >= 1 && !image) {
      supabase
        .from("timeline")
        .insert({
          id: user && user.id,
          text: textAreaValue,
        })
        .then(({ error }) => {
          if (error) Alert.alert(error.message);
          Alert.alert("投稿が完了しました");
          setTextAreaValue("");
          getPostInfo();
          onSendFinish();
        });
    } else if (textAreaValue.length >= 1 && image) {
      var result = nanoid();
      supabase
        .from("timeline")
        .insert({
          id: user && user.id,
          text: textAreaValue,
          post_image_id: result,
        })
        .then(({ error }) => {
          if (error) Alert.alert(error.message);
          Alert.alert("投稿が完了しました");
          setTextAreaValue("");
          getPostInfo();
          onSendFinish();
        });

      const { error } = await supabase.storage
        .from("post-images")
        .upload(user.id + "/" + result, formData, { upsert: false });

      console.log(error);
    }
    update();
  };

  const uploadFromURI = async (photo: ImagePicker.ImagePickerResult) => {
    if (!photo.cancelled) {
      const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);

      const fileName = photo.uri.replace(/^.*[\\\/]/, "");

      var formData = new FormData();
      formData.append("files", {
        // @ts-ignore-next-line
        uri: photo.uri,
        name: fileName,
        type: photo.type ? `image/${ext}` : `video/${ext}`,
      });

      setImage(photo.uri);
      setFormData(formData);
    } else {
      return photo;
    }
  };

  const pickImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    try {
      return await uploadFromURI(photo);
    } catch (e) {
      return null;
    }
  };

  return (
    <Box bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}>
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
      {image && (
        <Box alignItems="left">
          <IconButton
            onPress={() => setImage(undefined)}
            icon={<Ionicons name="close-circle-outline" size={24} />}
          />
          <Image
            mb={3}
            w={72}
            h={72}
            source={{ uri: image }}
            alt="postImage"
            borderRadius={15}
          />
        </Box>
      )}
      <Divider />
      <HStack mt={2} alignItems="center" justifyContent="space-between">
        <IconButton
          icon={<Ionicons name="image-outline" size={20} color="dodgerblue" />}
          onPress={() => pickImage()}
        />
        <Button
          onPress={AddPostData}
          w={24}
          h={10}
          bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
          borderWidth={1}
          borderColor="dodgerblue"
          borderRadius={50}
          color="black"
          alignItems="center"
          _pressed={{ bg: "dodgerblue", color: "white" }}
        >
          <Text
            color={colorMode === "dark" ? "white" : "black"}
            fontWeight="thin"
          >
            投稿する
          </Text>
        </Button>
      </HStack>
    </Box>
  );
};
