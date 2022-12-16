import { useState, useEffect } from "react";
import { supabase } from "../libs/supabaseClient";

export const useUserInfo = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const setupUser = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select(
          "id,user_id, user_name, user_gender, user_country, user_language"
        )
        .eq("id", supabase.auth.user()?.id);
      if (profile) {
        setUser(profile[0]);
      }
    };
    setupUser();
  }, [user]);

  return user;
};

export const useUserIcon = () => {
  const user = useUserInfo();
  const [usericon, setIconImage] = useState<string | undefined>();
  useEffect(() => {
    const getUserIcon = async () => {
      if (!user) return;
      const { publicURL } = await supabase.storage
        .from("avatars")
        .getPublicUrl(user.id + "_ICON/avatar");
      if (publicURL && !usericon) {
        setIconImage(publicURL);
      }
    };
    getUserIcon();
  }, [user, usericon]);

  return usericon;
};

export const useNotifications = () => {
  const user = useUserInfo();
  const [notification, setNotification] = useState<boolean>();
  useEffect(() => {
    const getOptions = async () => {
      const { data: data } = await supabase
        .from("options")
        .select("notification")
        .eq("id", supabase.auth.user()?.id);
      if (data) {
        setNotification(data[0].notification);
      }
    };
    getOptions();
  }, [user, notification]);

  return notification;
};

export const useNotificationsHistory = () => {
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

  return notification;
};
