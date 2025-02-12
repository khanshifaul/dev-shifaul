"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserBox = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await authClient.getSession();
        setSession(sessionData);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, []);

  return (
    <div>
      {!session?.data ? (
        <div className="flex gap-4">
          <Button
            className="cursor-pointer"
            onClick={() => router.push("/sign-in")}
          >
            Sign In
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => router.push("/sign-up")}
          >
            Sign Up
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div>{session.data?.user?.name}</div>
          <Button
            onClick={async () => {
              try {
                await authClient.signOut();
                if (session.data?.session?.token) {
                  await authClient.revokeSession({
                    token: session.data.session.token,
                  });
                }
                router.push("/sign-in");
              } catch (error) {
                console.error("Error signing out:", error);
              }
            }}
            className="text-red-600 hover:text-white hover:bg-red-600 cursor-pointer"
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserBox;
