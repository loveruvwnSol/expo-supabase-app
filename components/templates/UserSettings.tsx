import { Box, Text } from "native-base";
import { UserNameSettings } from "../organisms/UserNameSettings";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserSettingsParamList } from "../../types";
import { UserIconSettings } from "../organisms/UserIconSettings";

type UserSettingsStackscreenProps =
  NativeStackScreenProps<UserSettingsParamList>;

export const UserSettings = ({ navigation }: UserSettingsStackscreenProps) => {
  return (
    <Box
      background="white"
      h="full"
      justifyContent="center"
      alignItems="center"
    >
      <Box mb={20} justifyContent="center" alignItems="center">
        <UserIconSettings navigation={navigation}/>
        <UserNameSettings navigation={navigation} />
      </Box>
    </Box>
  );
};
