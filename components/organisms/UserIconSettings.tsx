import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, Text, Button, VStack, Avatar, Input } from "native-base";

export const UserIconSettings = () => {
  return (
    <Box>
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
          <Ionicons name="person-outline" size={60} color="white" />
          <Avatar.Badge
            background="white"
            size={8}
            borderWidth={1}
            borderColor="black"
          >
            <Box ml={0.99}>
              <Ionicons name="reload-circle-outline" size={28} />
            </Box>
          </Avatar.Badge>
        </Avatar>
      </Box>
    </Box>
  );
};
