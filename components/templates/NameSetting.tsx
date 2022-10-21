import React, { useState } from "react";
import { Box, Input, Text } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogInParamList } from "../../types";
import { NameSettingBtn } from "../organisms/NameSettingBtn";

type LogInStackscreenProps = NativeStackScreenProps<LogInParamList>;

export const NameSetting = ({ navigation }: LogInStackscreenProps) => {
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  return (
    <Box h="full" alignItems="center" justifyContent="center">
      <Text fontSize={24} fontWeight="bold" textAlign="center" mb={5}>
        名前設定
      </Text>
      <Box mb={5}>
        <Input
          w={72}
          variant="underlined"
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="ニックネーム"
        />
      </Box>
      <Box mb={5}>
        <Input
          w={72}
          variant="underlined"
          onChangeText={(text) => setUserid(text)}
          value={userid}
          placeholder="ユーザーID"
        />
      </Box>
      <NameSettingBtn
        username={username}
        userid={userid}
        navigation={navigation}
      />
    </Box>
  );
};
