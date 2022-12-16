import React, { useState, useEffect } from "react";
import { Box, Text, HStack, Avatar, ScrollView } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useColorMode } from "native-base";
import { supabase } from "../../libs/supabaseClient";
import dayjs from "dayjs";

type NotificationsCardProps = {
  usericon: string | undefined;
};

export const NotificationsCard: React.FC<NotificationsCardProps> = ({
  usericon,
}) => {
  const { colorMode } = useColorMode();
  const [notification, setNotification] = useState<any[]>([]);

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("text,timestamp")
        .eq("user_id", supabase.auth.user()?.id);
      if (data) {
        setNotification([...notification, ...data]);
      }
    };
    getNotifications();
  }, []);

  return (
    <ScrollView>
      {notification.map((e, idx) => (
        <Box
          key={idx}
          bg={colorMode === "dark" ? "coolGray.700" : "white"}
          mt={3.5}
          mb={3.5}
          w={72}
          p={5}
          justifyContent="space-between"
          borderRadius={20}
        >
          <Box mb={2}>
            <HStack alignItems="center" justifyContent="space-between">
              <HStack>
                <Box mt={1}>
                  <Ionicons name="ellipse" size={12} color="#00A6BC" />
                </Box>
                <Box>
                  <Text fontWeight="thin" ml={2}>
                    {e.text}
                  </Text>
                  <Text fontWeight="thin" ml={1} opacity="0.5">
                    {dayjs(e.timestamp).format("YYYY/MM/DD HH:mm")}
                  </Text>
                </Box>
              </HStack>
              <Box alignItems="end">
                <Avatar
                  w={12}
                  h={12}
                  source={{ uri: usericon }}
                  size="xs"
                  ml={1}
                />
              </Box>
            </HStack>
          </Box>
        </Box>
      ))}
    </ScrollView>
  );
};
