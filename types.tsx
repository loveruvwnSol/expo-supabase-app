/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  LogInNavi: undefined;
  NameSetting: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  UserSettingsModal: undefined;
  AddPost: undefined;
  NotFound: undefined;
};

export type LogInParamList = {
  LogIn: undefined;
  AddAccount: undefined;
  NameSetting: undefined;
  IconSetting: undefined;
};

export type UserSettingsParamList = {
  UserInfo: undefined;
  UserSetting: undefined;
  UserDetailSetting: undefined;
  OptionSetting: undefined;
};

export type TimelineParamList = {
  Timeline: undefined;
  PostDetails: {
    post_id: string;
    user_name: string;
    user_id: string;
    user_icon: string | undefined;
    user_gender: string;
    user_country: string;
    user_language: string;
    selfIntro: string;
    text: string;
    timestamp: Date;
  };
  AddReply: {
    post_id: string;
  };
  TimelineUserInfos: {
    id: string;
    user_name: string;
    user_id: string;
    user_icon: string | undefined;
    user_gender: string;
    user_country: string;
    user_language: string;
    selfIntro: string;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
  TabFour: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
