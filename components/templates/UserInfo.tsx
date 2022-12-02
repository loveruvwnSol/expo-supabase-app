import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, useColorMode } from "native-base";
import { UserSettingsParamList } from "../../types";
import { UserInfoList } from "../organisms/UserInfoList";
import { UserInfoTop } from "../organisms/UserInfoTop";
import { supabase } from "../../libs/supabaseClient";

type UserSettingsStackscreenProps =
  NativeStackScreenProps<UserSettingsParamList>;

export const UserInfo = ({ navigation }: UserSettingsStackscreenProps) => {
  const [user, setUser] = useState<any>(null);
  const [usericon, setUsericon] = useState<string | undefined>();
  const [notification, setNotification] = useState<boolean>();
  const { colorMode } = useColorMode();

  useEffect(() => {
    const setupUser = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select(
          "id,user_id, user_name, user_gender, user_country, user_language"
        )
        .eq("id", supabase.auth.user()?.id);
      if (profile) {
        setUser(profile[0]);
      }
    };
    setupUser();
  }, [user]);

  useEffect(() => {
    const getUserIcon = async () => {
      if (!user) return;
      const { publicURL, error } = await supabase.storage
        .from("avatars")
        .getPublicUrl(user.id + "_ICON/avatar");
      if (publicURL) {
        setUsericon(publicURL);
      }
    };
    getUserIcon();
  }, [user, usericon]);

  useEffect(() => {
    const getOptions = async () => {
      const { data: data } = await supabase
        .from("options")
        .select("notification")
        .eq("id", supabase.auth.user()?.id);
      if (data) {
        setNotification(data[0].notification);
      }
    };
    getOptions();
  }, [user, notification]);

  if (!user) return null;
  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.800" : "blueGray.100"}
      h="full"
      justifyContent="center"
      alignItems="center"
    >
      <UserInfoTop navigation={navigation} user={user} usericon={usericon} />
      <UserInfoList
        navigation={navigation}
        user={user}
        usericon={usericon}
        notification={notification}
      />
    </Box>
  );
};
