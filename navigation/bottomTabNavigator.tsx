/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect } from "react";
import { Pressable } from "react-native";
import Home from "../components/templates/Home";
import { UserInfo } from "../components/templates/UserInfo";
import { UserSettings } from "../components/templates/UserSettings";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  RootTabParamList,
  RootTabScreenProps,
  TimelineParamList,
  UserSettingsParamList,
} from "../types";
import { Box, Avatar, useColorModeValue, IconButton } from "native-base";
// import { UserDetailSetting } from "../components/templates/UserDetailSetting";
// import { OptionSetting } from "../components/templates/OptionSetting";
import { NotificationsPage } from "../components/templates/NotificationsPage";
import * as Notifications from "expo-notifications";
import { useUserIcon, useUserInfo } from "../hooks/useUserInfo";
import { Settings } from "../components/templates/Settings";
import { Timeline } from "../components/templates/Timeline";
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const user = useUserInfo();
  const usericon = useUserIcon();

  const requestPermissionsAsync = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) {
      return;
    }

    await Notifications.requestPermissionsAsync();
  };

  useEffect(() => {
    requestPermissionsAsync();
  });

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
          headerTitle: "for today",
          headerTitleStyle: {
            fontWeight: "200",
          },
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
                borderWidth={0.5}
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
        component={Timeline}
        options={({ navigation }: RootTabScreenProps<"TabTwo">) => ({
          title: "みんなの投稿",
          headerTitleStyle: {
            fontWeight: "200",
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("AddPost")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Box
                borderWidth={0.5}
                borderRadius={4}
                borderColor="gray.500"
                mr={5}
              >
                <Box m={1}>
                  <Ionicons name="pencil-sharp" color="dodgerblue" size={20} />
                </Box>
              </Box>
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabThree"
        component={NotificationsPage}
        options={{
          title: "通知",
          headerTitleStyle: {
            fontWeight: "200",
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={Settings}
        options={{
          title: "設定",
          headerTitleStyle: {
            fontWeight: "200",
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const UserSettingsStack = createNativeStackNavigator<UserSettingsParamList>();

export function UserSettingsNavigator() {
  return (
    <UserSettingsStack.Navigator initialRouteName="UserInfo" screenOptions={{}}>
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
            headerShown: false,
            headerTitle: "",
            headerShadowVisible: false,
            headerBackButtonMenuEnabled: false,
            headerStyle: {
              backgroundColor: useColorModeValue(
                "coolGray.800",
                "blueGray.100"
              ),
            },
          }}
        />
        {/* <UserSettingsStack.Screen
          name="UserDetailSetting"
          component={UserDetailSetting}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerBackButtonMenuEnabled: false,
          }}
        />
        <UserSettingsStack.Screen
          name="OptionSetting"
          component={OptionSetting}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerBackButtonMenuEnabled: false,
          }}
        /> */}
      </UserSettingsStack.Group>
    </UserSettingsStack.Navigator>
  );
}

const TimelineStack = createNativeStackNavigator<TimelineParamList>();

export function TimelineNavigator() {
  return (
    <TimelineStack.Navigator initialRouteName="Timeline">
      <TimelineStack.Group
        screenOptions={{
          animation: "simple_push",
        }}
      >
        <TimelineStack.Screen name="Timeline" component={Timeline} />
      </TimelineStack.Group>
    </TimelineStack.Navigator>
  );
}
