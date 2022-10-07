import React, { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../libs/supabaseClient";
import { Box, Button } from "native-base";

type LogInBtnProps = {
  Email: any;
  Password: any;
};

export const LogInBtn: React.FC<LogInBtnProps> = ({ Email, Password }) => {
  const [loading, setLoading] = useState(false);
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signIn({
      email: Email,
      password: Password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
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
