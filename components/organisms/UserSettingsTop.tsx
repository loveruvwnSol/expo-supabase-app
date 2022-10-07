import { Ionicons } from "@expo/vector-icons";
import { Box, Text, Button, VStack, Avatar, Input } from "native-base";

export const UserSettingsTop = () => {
  return (
    <Box mb={20}>
      <VStack justifyContent="center" alignItems="center">
        <Box
          borderWidth={1}
          borderRadius={100}
          borderColor="gray.500"
          mr={5}
          mb={5}
        >
          <Avatar
            w={32}
            h={32}
            bg="lightBlue.400"
            // source={{
            //   uri: "",
            // }}
            size="xs"
          >
            Not set
            <Avatar.Badge background="white" size={8} borderWidth={1}>
              <Ionicons name="reload-circle-outline" size={28} />
            </Avatar.Badge>
          </Avatar>
        </Box>
        <Box mb={5}>
          <Text fontWeight="bold" mb={2}>
            ニックネーム
          </Text>
          <Input w={72} mb={5} variant="outline" placeholder="ニックネーム" />
          <Text fontWeight="bold" mb={2}>
            ユーザーID
          </Text>
          <Input w={72} variant="outline" placeholder="ユーザーID" />
        </Box>
        <Button>設定する</Button>
      </VStack>
    </Box>
  );
};
