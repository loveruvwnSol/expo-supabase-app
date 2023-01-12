import React from "react";
import { Box, Text, useColorMode } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogInParamList } from "../../types";
import { IconSettingBtn } from "../organisms/IconSettingBtn";

type LogInStackscreenProps = NativeStackScreenProps<LogInParamList>;

export const IconSetting = ({ navigation }: LogInStackscreenProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      h="full"
      alignItems="center"
      justifyContent="center"
      bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
    >
      <Text
        fontSize={24}
        textAlign="center"
        mb={5}
        fontWeight="thin"
        color={colorMode === "dark" ? "white" : "black"}
      >
        アイコン設定
      </Text>
      <IconSettingBtn navigation={navigation} />
    </Box>
  );
};
