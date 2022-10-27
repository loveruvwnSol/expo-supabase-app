import { Box, Text } from "native-base";
import { UserSettingsTop } from "../organisms/UserSettingsTop";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserSettingsParamList } from "../../types";

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
      <Box>
        <UserSettingsTop navigation={navigation} />
      </Box>
    </Box>
  );
};
