import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, Avatar, IconButton } from "native-base";
import { supabase } from "../../libs/supabaseClient";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

type UserIconSettingsProps = {
  navigation: any;
};

export const UserIconSettings: React.FC<UserIconSettingsProps> = ({
  navigation,
}) => {
  const [iconImage, setIconImage] = useState<string | undefined>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", supabase.auth.user()?.id);
      if (profile) {
        setUser(profile[0]);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const getUserIcon = async () => {
      if (!user) return;
      const { publicURL } = await supabase.storage
        .from("avatars")
        .getPublicUrl(user.id + "_ICON/avatar");
      if (publicURL && !iconImage) {
        setIconImage(publicURL);
      }
    };
    getUserIcon();
  }, [user, iconImage]);

  const changeIconNotificationAsync = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        body: "アイコンを変更しました",
        badge: 0,
      },
      trigger: {
        seconds: 1,
      },
    });
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    supabase
      .from("notifications")
      .insert({
        user_id: supabase.auth.user()?.id,
        text: "アイコンを変更しました",
      })
      .eq("id", supabase.auth.user()?.id)
      .then(({ error }) => {
        if (error) Alert.alert(error.message);
      });
  };

  const updateFromURI = async (photo: ImagePicker.ImagePickerResult) => {
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
        .update(user.id + "_ICON/avatar", formData, { upsert: true });
      console.log(data, error);
      setIconImage(photo.uri);
      if (!error) {
        changeIconNotificationAsync();
        navigation.navigate("UserInfo");
      }

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
      return await updateFromURI(photo);
    } catch (e) {
      return null;
    }
  };

  return (
    <Box borderWidth={1} borderRadius={100} borderColor="gray.500" mr={5}>
      <Avatar w={32} h={32} source={{ uri: iconImage }} size="xs">
        <Avatar.Badge
          background="white"
          size={8}
          borderWidth={1}
          borderColor="black"
        >
          <Box alignItems="center" justifyContent="center">
            <IconButton
              onPress={pickImage}
              p={1}
              icon={<Ionicons name="reload-circle-outline" size={24} />}
            />
          </Box>
        </Avatar.Badge>
      </Avatar>
    </Box>
  );
};
