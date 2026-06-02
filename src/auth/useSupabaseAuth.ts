import { supabase } from "@src/auth/supabaseClient";
import { isDefined } from "@src/utils/isDefined";
import constate from "constate";
import { type Session, type User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

interface UseSupabaseAuth {
  session: Session | null;
  user: User | null;
  role: string | undefined;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getAccessToken: () => Promise<string | undefined>;
}

function useSupabaseAuth(): UseSupabaseAuth {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }

    if (!data.session) {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        throw new Error('Failed to sign in. Please verify your credentials and try again.');
      }
      setSession(sessionData.session);
      return;
    }

    setSession(data.session);
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    setSession(null);
  }, []);

  const getAccessToken = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token;
  }, []);

  const role =
    (session?.user.user_metadata?.role as string | undefined) ??
    (session?.user.app_metadata?.role as string | undefined);

  return {
    session,
    user: session?.user ?? null,
    role,
    isAuthenticated: isDefined(session),
    loading,
    signIn,
    signOut,
    getAccessToken,
  };
}

export const [SupabaseAuthProvider, useSupabaseAuthContext] = constate(useSupabaseAuth);
