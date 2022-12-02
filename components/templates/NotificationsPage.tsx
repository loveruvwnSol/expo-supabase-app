import React, { useState, useEffect } from "react";
import { Box } from "native-base";
import { useColorMode } from "native-base";
import { supabase } from "../../libs/supabaseClient";
import { NotificationsCard } from "../organisms/NotificationsCard";

export const NotificationsPage = () => {
  const { colorMode } = useColorMode();
  const [user, setUser] = useState<any>(null);
  const [usericon, setUsericon] = useState<string | undefined>();

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

  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.800" : "blueGray.100"}
      w="full"
      h="full"
      alignItems="center"
    >
      <NotificationsCard usericon={usericon} />
    </Box>
  );
};
