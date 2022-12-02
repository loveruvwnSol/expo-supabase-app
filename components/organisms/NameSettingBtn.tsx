import React, { useState, useEffect } from "react";
import { Box, Button } from "native-base";
import { supabase } from "../../libs/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";

type NameSettingBtnProps = {
  username: any;
  userid: any;
  navigation: any;
};

export const NameSettingBtn: React.FC<NameSettingBtnProps> = ({
  username,
  userid,
  navigation,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  function sendData() {
    supabase
      .from("profiles")
      .insert([
        {
          id: session?.user?.id,
          user_email: session?.user?.email,
          user_name: username,
          user_id: userid,
          user_gender: "未設定",
          user_country: "未設定",
          user_language: "日本語",
        },
      ])
      .then(({ data, error }) => {
        if (error) Alert.alert(error.message);
        setLoading(false);
        if (!error) navigation.navigate("IconSetting");
      });

    supabase
      .from("options")
      .insert([
        {
          id: session?.user?.id,
          notification: false,
          theme: "light",
        },
      ])
      .then(({ data, error }) => {
        if (error) Alert.alert(error.message);
        setLoading(false);
        if (!error) navigation.navigate("IconSetting");
      });
  }
  return (
    <Box>
      <Button w={"48"} borderRadius={0} onPress={() => sendData()}>
        次へ
      </Button>
    </Box>
  );
};
