/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Home from "../components/templates/Home";
import { UserInfo } from "../components/templates/UserInfo";
import { UserSettings } from "../components/templates/UserSettings";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  RootTabParamList,
  RootTabScreenProps,
  UserSettingsParamList,
} from "../types";
import { supabase } from "../libs/supabaseClient";
import { Box, Avatar } from "native-base";
import ModalScreen from "../screens/ModalScreen";
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const [user, setUser] = useState<any>(null);
  const [usericon, setUsericon] = useState<string | undefined>();

  useEffect(() => {
    const setupUser = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id,user_id, user_name")
        .eq("id", supabase.auth.user()?.id);
      if (profile) {
        setUser(profile[0]);
      }
    };
    setupUser();
  }, [user]);

  useEffect(() => {
    const getUserIcon = async () => {
      if (!user) return;
      const { publicURL, error } = await supabase.storage
        .from("avatars")
        .getPublicUrl(user.id + "_ICON/avatar");
      if (publicURL) {
        setUsericon(publicURL);
      }
    };
    getUserIcon();
  }, [user, usericon]);

  if (!user) return null;

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={Home}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "ホーム",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("UserSettingsModal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Box
                borderWidth={0.8}
                borderRadius={100}
                borderColor="gray.500"
                mr={5}
              >
                <Avatar w={8} h={8} source={{ uri: usericon }} size="xs" />
              </Box>
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={ModalScreen}
        options={{
          title: "ユーザー",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const UserSettingsStack = createNativeStackNavigator<UserSettingsParamList>();

export function UserSettingsNavigator() {
  return (
    <UserSettingsStack.Navigator initialRouteName="UserInfo">
      <UserSettingsStack.Group
        screenOptions={{
          animation: "simple_push",
        }}
      >
        <UserSettingsStack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{ headerShown: false }}
        />
        <UserSettingsStack.Screen
          name="UserSetting"
          component={UserSettings}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerBackButtonMenuEnabled: false,
          }}
        />
      </UserSettingsStack.Group>
    </UserSettingsStack.Navigator>
  );
}
