import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { LogInParamList } from "../types";
import LogIn from "../components/templates/LogIn";
import AddAccount from "../components/templates/AddAccount";
import { NameSetting } from "../components/templates/NameSetting";
import { IconSetting } from "../components/templates/IconSetting";

const LogInStack = createNativeStackNavigator<LogInParamList>();

export function LogInNavigator() {
  return (
    <LogInStack.Navigator initialRouteName="LogIn">
      <LogInStack.Group
        screenOptions={{
          headerShown: false,
          animation: "simple_push",
          navigationBarHidden: true,
        }}
      >
        <LogInStack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <LogInStack.Screen
          name="AddAccount"
          component={AddAccount}
          options={{ headerShown: false }}
        />
        <LogInStack.Screen
          name="NameSetting"
          component={NameSetting}
          options={{ headerShown: false }}
        />
        <LogInStack.Screen
          name="IconSetting"
          component={IconSetting}
          options={{ headerShown: false }}
        />
      </LogInStack.Group>
    </LogInStack.Navigator>
  );
}
