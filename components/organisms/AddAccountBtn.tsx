import React, { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../libs/supabaseClient";
import { Box, Button } from "native-base";

type AddAccountBtnProps = {
  Email: any;
  Password: any;
};

export const AddAccountBtn: React.FC<AddAccountBtnProps> = ({
  Email,
  Password,
}) => {
  const [loading, setLoading] = useState(false);
  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
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
          onPress={() => signUpWithEmail()}
        >
          アカウント作成
        </Button>
      </Box>
    </Box>
  );
};
