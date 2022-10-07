/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable } from "react-native";
import Navigation from ".";
import { UserInfo } from "../components/templates/UserInfo";
import { UserSettings } from "../components/templates/UserSettings";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
// import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootTabParamList,
  RootTabScreenProps,
  UserSettingsParamList,
} from "../types";
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "ホーム",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={UserSettingsNavigator}
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
