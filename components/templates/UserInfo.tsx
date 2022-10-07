import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box } from "native-base";
import { UserSettingsParamList } from "../../types";
import { UserInfoList } from "../organisms/UserInfoList";
import { UserInfoTop } from "../organisms/UserInfoTop";

type UserSettingsStackscreenProps =
  NativeStackScreenProps<UserSettingsParamList>;

export const UserInfo = ({ navigation }: UserSettingsStackscreenProps) => {
  return (
    <Box
      background="blueGray.100"
      h="full"
      justifyContent="center"
      alignItems="center"
    >
      <UserInfoTop navigation={navigation} />
      <UserInfoList />
    </Box>
  );
};
