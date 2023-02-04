import { useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import { create } from "zustand";

export type Post = {
  post_id: string;
  id: string;
  user_name: string;
  user_id: string;
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
      .select("post_id,id,user_name,user_id,text,timestamp");
    if (data) {
      setPosts(data);
    }
  };

  return { posts, getPostInfo };
};
