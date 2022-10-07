import { Box, Text } from "native-base";
import { UserSettingsTop } from "../organisms/UserSettingsTop";

export const UserSettings = () => {
  return (
    <Box
      background="white"
      h="full"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <UserSettingsTop />
      </Box>
    </Box>
  );
};
