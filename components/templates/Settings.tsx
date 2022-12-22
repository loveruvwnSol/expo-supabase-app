import React from "react";
import { Box, useColorMode } from "native-base";
import { Common } from "../organisms/Common";
import { Account } from "../organisms/Account";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogInParamList } from "../../types";
import { Security } from "../organisms/Security";

type LogInscreenProps = NativeStackScreenProps<LogInParamList>;

export const Settings = ({ navigation }: LogInscreenProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.800" : "blueGray.100"}
      h="full"
      justifyContent="center"
      alignItems="center"
    >
      <Box mb={7}>
        <Common />
      </Box>
      <Box mb={7}>
        <Account navigation={navigation} />
      </Box>
      <Box mb={7}>
        <Security />
      </Box>
    </Box>
  );
};
