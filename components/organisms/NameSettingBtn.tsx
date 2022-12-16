import React, { useState } from "react";
import { Box, Button } from "native-base";
import { supabase } from "../../libs/supabaseClient";
import { Alert } from "react-native";
import { useSession } from "../../hooks/useSession";

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
  const session = useSession();
  const [loading, setLoading] = useState(false);

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
      .then(({ error }) => {
        if (error) Alert.alert(error.message);
        setLoading(false);
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
      .then(({ error }) => {
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
