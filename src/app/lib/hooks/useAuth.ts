"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/supabase/browser-client";
import { User } from "@supabase/supabase-js";

/**
 * Hook to verify Supabase user session and listen for auth changes.
 */
export function useAuth() {
  const supabase = getSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) console.error("Session error:", sessionError);

        const sessionUser = sessionData?.session?.user ?? null;
        if (!sessionUser) {
          setUser(null);
          setCheckingAuth(false);
          return;
        }

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) console.error("getUser error:", userError);

        if (!userData?.user) {
          await supabase.auth.signOut();
          setUser(null);
        } else {
          setUser(userData.user);
        }

        setCheckingAuth(false);
      } catch (err) {
        console.error("Unexpected verifyUser error:", err);
        setUser(null);
        setCheckingAuth(false);
      }
    };

    verifyUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return { user, checkingAuth };
}
