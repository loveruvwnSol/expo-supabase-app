import { useState, useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import { useUserInfo } from "./useUserInfo";

export const usePost = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const getPostInfo = async () => {
      const { data } = await supabase
        .from("timeline")
        .select("id,user_name,user_id,text,timestamp");
      if (data) {
        setPosts([...posts, ...data]);
      }
    };
    getPostInfo();
  }, []);

  return posts;
};

export const usePostUserIcon = () => {
  const user = useUserInfo();
  const [usericon, setIconImage] = useState<string | undefined>();
  useEffect(() => {
    const getIcon = async () => {
      if (!user) return;
      const { publicURL } = await supabase.storage
        .from("avatars")
        .getPublicUrl(supabase.from("timeline").select("id") + "_ICON/avatar");
      if (publicURL && !usericon) {
        setIconImage(publicURL);
      }
    };
    getIcon();
  }, [usericon]);

  return usericon;
};
