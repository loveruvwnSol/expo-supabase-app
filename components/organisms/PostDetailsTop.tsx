import React from "react";
import {
  Box,
  HStack,
  Text,
  useColorMode,
  Avatar,
  Divider,
  Button,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";

type PostDetailsTopProps = {
  post_id: string;
  user_name: string;
  user_id: string;
  user_icon: string | undefined;
  text: string;
  timestamp: Date;
};

export const PostDetailsTop: React.FC<PostDetailsTopProps> = ({
  post_id,
  user_name,
  user_id,
  user_icon,
  text,
  timestamp,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "dark" ? "black" : "white"}
      w={96}
      justifyContent="space-between"
    >
      <Box m={4}>
        <HStack alignItems="center" justifyContent="space-between">
          <HStack>
            <Box mt={1}>
              <Avatar
                w={12}
                h={12}
                borderWidth={0.5}
                borderColor="gray.500"
                source={{ uri: user_icon }}
                size="xs"
                ml={1}
              />
              <Divider
                h={10}
                opacity={0.5}
                orientation="vertical"
                ml={6}
                mt={6}
              />
            </Box>
            <Box>
              <HStack alignItems="center" justifyContent="space-between" w={72}>
                <Text ml={2} fontSize={16}>
                  {user_name}
                </Text>
                <HStack alignItems="center" justifyContent="end">
                  <Text fontWeight="thin" fontSize={12} opacity={0.5} mr={5}>
                    {dayjs(timestamp).format("YYYY/MM/DD")}
                  </Text>
                  <Ionicons name="ellipsis-horizontal" size={20} color="gray" />
                </HStack>
              </HStack>
              <Text fontWeight="thin" ml={2} opacity="0.5" fontSize={12}>
                {"@" + user_id}
              </Text>
              <Box mt={2} ml={2} w={64}>
                <Text fontWeight="thin">{text}</Text>
              </Box>
              <Box mt={3} alignItems="flex-end">
                <Button
                  w={24}
                  h={10}
                  bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
                  borderWidth={1}
                  borderColor="dodgerblue"
                  borderRadius={50}
                  color="black"
                  alignItems="center"
                  _pressed={{ bg: "dodgerblue", color: "white" }}
                >
                  <Text
                    color={colorMode === "dark" ? "white" : "black"}
                    fontWeight="thin"
                  >
                    返信する
                  </Text>
                </Button>
              </Box>
            </Box>
          </HStack>
        </HStack>
      </Box>
      <Divider opacity={0.5} w={2} />
    </Box>
  );
};