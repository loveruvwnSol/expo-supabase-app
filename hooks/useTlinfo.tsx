import { useEffect, useState } from "react";
import { supabase } from "../libs/supabaseClient";
import { create } from "zustand";

export type Post = {
  post_id: string;
  id: string;
  text: string;
  timestamp: Date;
};

export type Reply = {
  reply_id: string;
  post_id: string;
  id: string;
  text: string;
  timestamp: Date;
};

type UsePostStoreType = {
  posts: Post[];
  setPosts: (newPosts: Post[]) => void;
};

type UseReplyStoreType = {
  replies: Reply[];
  setReplies: (newReplies: Reply[]) => void;
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

export const useReplyStore = create<UseReplyStoreType>((set) => ({
  replies: [],
  setReplies: (newReplies) => set(() => ({ replies: [...newReplies] })),
}));

export const useReply = (post_id: string) => {
  const setReplies = useReplyStore((s) => s.setReplies);
  const replies = useReplyStore((s) => s.replies);
  useEffect(() => {
    getReplyInfo();
  }, []);
  const getReplyInfo = async () => {
    const { data } = await supabase
      .from("replies")
      .select("reply_id,post_id,id,text,timestamp")
      .eq("post_id", post_id);
    if (data) {
      setReplies(data);
    }
  };

  return { replies, getReplyInfo };
};

type UserInfo = {
  [x: string]: any;
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
          .select(
            "id,user_name,user_id,user_gender,user_country,user_language,selfIntro"
          )
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

export const useGetUserInfoByReplies = (replies: Reply[]) => {
  const [userInfos, setUserInfos] = useState<UserInfo[][]>([]);
  useEffect(() => {
    Promise.all(
      replies.map(async (e) => {
        return await supabase
          .from("profiles")
          .select(
            "id,user_name,user_id,user_gender,user_country,user_language,selfIntro"
          )
          .eq("id", e.id)
          .then((res) => {
            return res.data;
          });
      })
    ).then((infos: any) => {
      setUserInfos(infos as UserInfo[][]);
    });
  }, [replies]);
  return userInfos;
};
