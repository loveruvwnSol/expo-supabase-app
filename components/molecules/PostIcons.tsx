import React, { useState } from "react";
import { HStack, Text, IconButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const PostIcons = () => {
  const [toggleIcon, setToggleIcon] = useState(true);
  const [nol, setNol] = useState(0);

  const touchHeart = () => {
    setToggleIcon(!toggleIcon);
    if (toggleIcon === true) {
      setNol(nol + 1);
    } else {
      setNol(nol - 1);
    }
  };

  return (
    <HStack ml={2} mt={2} alignItems="center">
      <HStack alignItems="center">
        <Ionicons name="chatbubble-outline" color="gray" size={16} />
        <Text ml={2} opacity={0.5}>
          0
        </Text>
      </HStack>
      <HStack alignItems="center" ml={6}>
        <IconButton
          borderRadius="full"
          onTouchStart={touchHeart}
          icon={
            toggleIcon ? (
              <Ionicons name="heart-outline" size={16} color="gray" />
            ) : (
              <Ionicons name="heart" color="red" size={16} />
            )
          }
        />
        <Text opacity={0.5}>{nol}</Text>
      </HStack>
    </HStack>
  );
};
