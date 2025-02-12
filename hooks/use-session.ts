import { Session } from "better-auth";
import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

export function useSession() {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await authClient.getSession();
        console.log(session);
        setSession(session.data?.session);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setSession(undefined);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);
  return { session, loading };
}
