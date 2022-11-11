import React from "react";
import { Box, Text } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogInParamList } from "../../types";
import { IconSettingBtn } from "../organisms/IconSettingBtn";

type LogInStackscreenProps = NativeStackScreenProps<LogInParamList>;

export const IconSetting = ({ navigation }: LogInStackscreenProps) => {
  return (
    <Box h="full" alignItems="center" justifyContent="center">
      <Text fontSize={24} textAlign="center" mb={5} fontWeight="thin">
        アイコン設定
      </Text>
      <IconSettingBtn navigation={navigation} />
    </Box>
  );
};
