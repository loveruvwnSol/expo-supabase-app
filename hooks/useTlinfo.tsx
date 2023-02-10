import { useEffect, useState } from "react";
import { supabase } from "../libs/supabaseClient";
import { create } from "zustand";

export type Post = {
  post_id: string;
  id: string;
  text: string;
  timestamp: Date;
};

type UsePostStoreType = {
  posts: Post[];
  setPosts: (newPosts: Post[]) => void;
};

export const usePostStore = create<UsePostStoreType>((set) => ({
  posts: [],
  setPosts: (newPosts) => set(() => ({ posts: [...newPosts] })),
}));

export const usePost = () => {
  const setPosts = usePostStore((s) => s.setPosts);
  const posts = usePostStore((s) => s.posts);
  useEffect(() => {
    getPostInfo();
  }, []);
  const getPostInfo = async () => {
    const { data } = await supabase
      .from("timeline")
      .select("post_id,id,text,timestamp");
    if (data) {
      setPosts(data);
    }
  };

  return { posts, getPostInfo };
};
type UserInfo = {
  id: string;
  user_id: string;
  user_name: string;
};

export const useGetUserInfoByPosts = (posts: Post[]) => {
  const [userInfos, setUserInfos] = useState<UserInfo[][]>([]);
  useEffect(() => {
    Promise.all(
      posts.map(async (e) => {
        return await supabase
          .from("profiles")
          .select("id,user_name,user_id")
          .eq("id", e.id)
          .then((res) => {
            return res.data;
          });
      })
    ).then((infos: any) => {
      setUserInfos(infos as UserInfo[][]);
    });
  }, [posts]);
  return userInfos;
};
