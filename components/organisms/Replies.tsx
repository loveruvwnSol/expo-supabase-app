import React, { useEffect } from "react";
import { Box, HStack, Text, useColorMode, Avatar, Divider } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useUserIcon, useUserInfo } from "../../hooks/useUserInfo";

export const Replies = () => {
  const { colorMode } = useColorMode();

  const user = useUserInfo();
  const usericon = useUserIcon();

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
                source={{ uri: usericon }}
                size="xs"
                ml={1}
              />
            </Box>
            <Box>
              <HStack alignItems="center" justifyContent="space-between" w={72}>
                <Text ml={2} fontSize={16}>
                  {user && user.user_name}
                </Text>
                <HStack alignItems="center" justifyContent="end">
                  <Text fontWeight="thin" fontSize={12} opacity={0.5} mr={5}>
                    {/* {dayjs(timestamp).format("YYYY/MM/DD")}
                     */}
                    2022/1/1
                  </Text>
                  <Ionicons name="ellipsis-horizontal" size={20} color="gray" />
                </HStack>
              </HStack>
              <Text fontWeight="thin" ml={2} opacity="0.5" fontSize={12}>
                @ {user && user.user_id}
              </Text>
              <Box mt={2} ml={2} w={64}>
                <Text fontWeight="thin">yeah</Text>
              </Box>
            </Box>
          </HStack>
        </HStack>
      </Box>
      <Divider opacity={0.5} />
    </Box>
  );
};
