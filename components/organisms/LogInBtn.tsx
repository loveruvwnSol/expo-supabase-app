import React, { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../libs/supabaseClient";
import { Box, Button } from "native-base";

type LogInBtnProps = {
  Email: any;
  Password: any;
  navigation: any;
};

export const LogInBtn: React.FC<LogInBtnProps> = ({
  Email,
  Password,
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signIn({
      email: Email,
      password: Password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);

    let { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", supabase.auth.user()?.id);

    console.log(profiles?.length);

    if (profiles?.length === 0) {
      alert("ユーザーネームの設定を行ってください");
      navigation.navigate("NameSetting");
    } else if (profiles?.length === 1) {
      navigation.navigate("Root");
    }
  }
  return (
    <Box>
      <Box mb={5}>
        <Button
          w={"48"}
          borderRadius={0}
          disabled={loading}
          onPress={() => signInWithEmail()}
        >
          ログイン
        </Button>
      </Box>
    </Box>
  );
};
