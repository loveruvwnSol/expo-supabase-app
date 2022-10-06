import React, { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../libs/supabaseClient";
import { Box, Button, Input, Text, Pressable, Icon, Link } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogInParamList } from "../../types";

type LogInStackscreenProps = NativeStackScreenProps<LogInParamList>;

export default function AddAccount({ navigation }: LogInStackscreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = React.useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  // async function signOut() {
  //   const { error } = await supabase.auth.signOut();
  // }

  return (
    <Box h="full" alignItems="center" justifyContent="center">
      <Text fontSize={24} fontWeight="bold" textAlign="center" mb={5}>
        アカウント作成
      </Text>
      <Box mb={5}>
        <Input
          w={72}
          variant="underlined"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
        />
      </Box>
      <Box mb={5}>
        <Input
          w={72}
          variant="underlined"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          autoCapitalize={"none"}
          type={show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          placeholder="パスワード"
        />
      </Box>
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
      <Box>
        <Link
          isExternal
          _text={{
            color: "blue.400",
          }}
          onPress={() => {
            navigation.navigate("LogIn");
          }}
        >
          ログインする
        </Link>
      </Box>
    </Box>
  );
}
