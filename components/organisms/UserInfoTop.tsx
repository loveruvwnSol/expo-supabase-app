import { Box, HStack, Text, Button, Avatar } from "native-base";

type UserInfoTopProps = {
  navigation: any;
};

export const UserInfoTop: React.FC<UserInfoTopProps> = ({ navigation }) => {
  return (
    <Box mb={10}>
      <HStack alignItems="center">
        <Box borderWidth={1} borderRadius={100} borderColor="gray.500" mr={5}>
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
            <Avatar.Badge size={8} bg="green.500" />
          </Avatar>
        </Box>
        <Box>
          <Text textAlign="center" fontSize={24} fontWeight="bold">
            username
          </Text>
          <Text
            textAlign="left"
            fontSize={10}
            fontWeight="bold"
            opacity={0.5}
            mb={5}
          >
            @dfgthyjuikolp
          </Text>
          <Button
            borderRadius={0}
            onPress={() => {
              navigation.navigate("UserSetting");
            }}
          >
            <Text color="white">編集</Text>
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};
