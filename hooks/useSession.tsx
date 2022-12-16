import { useState, useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import { Session } from "@supabase/supabase-js";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session;
};
