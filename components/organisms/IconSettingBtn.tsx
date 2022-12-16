import React, { useState } from "react";
import { Box, Avatar, Button } from "native-base";
import { supabase } from "../../libs/supabaseClient";
import * as ImagePicker from "expo-image-picker";
import { useUserInfo } from "../../hooks/useUserInfo";

type IconSettingBtnProps = {
  navigation: any;
};

export const IconSettingBtn: React.FC<IconSettingBtnProps> = ({
  navigation,
}) => {
  const user = useUserInfo();
  const [iconImage, setIconImage] = useState<string | undefined>();

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

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(user.id + "_ICON/avatar", formData, { upsert: true });
      console.log(error);
      setIconImage(photo.uri);
      navigation.navigate("Root");

      if (error) throw new Error(error.message);

      return { ...photo, imageData: data };
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
    <Box alignItems="center" justifyContent="center">
      <Box borderWidth={1} borderRadius={100} borderColor="gray.500" mb={5}>
        <Avatar w={32} h={32} source={{ uri: iconImage }} size="xs" />
      </Box>
      <Box>
        <Button w={"48"} borderRadius={0} onPress={() => pickImage()}>
          設定して始める
        </Button>
      </Box>
    </Box>
  );
};
