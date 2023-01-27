import { useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import { create } from "zustand";

type Post = {
  id: string;
  user_name: string;
  user_id: string;
  timestamp: Date;
  text: string;
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
      .select("id,user_name,user_id,text,timestamp");
    if (data) {
      console.log(data);
      setPosts(data);
    }
  };

  return { posts, getPostInfo };
};
