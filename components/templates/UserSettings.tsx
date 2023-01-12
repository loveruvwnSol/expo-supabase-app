import { Box, useColorMode, IconButton } from "native-base";
import { UserNameSettings } from "../organisms/UserNameSettings";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserSettingsParamList } from "../../types";
import { UserIconSettings } from "../organisms/UserIconSettings";
import { Ionicons } from "@expo/vector-icons";

type UserSettingsStackscreenProps =
  NativeStackScreenProps<UserSettingsParamList>;

export const UserSettings = ({ navigation }: UserSettingsStackscreenProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
      h="full"
      justifyContent="center"
    >
      <Box justifyContent="left" alignItems="left" mb={8}>
        <IconButton
          onPress={() => {
            navigation.navigate("UserInfo");
          }}
          icon={
            <Ionicons
              name="chevron-back-outline"
              color={colorMode === "dark" ? "white" : "black"}
              size={28}
            />
          }
        />
      </Box>
      <Box mb={20} justifyContent="center" alignItems="center">
        <UserIconSettings navigation={navigation} />
        <UserNameSettings navigation={navigation} />
      </Box>
    </Box>
  );
};
