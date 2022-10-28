import { Box, Fab } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogInParamList } from "../../types";
import { Ionicons } from "@expo/vector-icons";

export const FabAdd = () => {
  return (
    <Box mt={24} shadow="2" rounded="lg" bg="white">
      <Fab
        bg="white"
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Ionicons color="black" name="add" size={24} />}
      />
    </Box>
  );
};
