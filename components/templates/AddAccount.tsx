import React, { useState } from "react";
import { Box, Input, Text, Pressable, Icon, Link } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogInParamList } from "../../types";
import { AddAccountBtn } from "../organisms/AddAccountBtn";

type LogInStackscreenProps = NativeStackScreenProps<LogInParamList>;

export default function AddAccount({ navigation }: LogInStackscreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);

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
      <AddAccountBtn Email={email} Password={password} />
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
