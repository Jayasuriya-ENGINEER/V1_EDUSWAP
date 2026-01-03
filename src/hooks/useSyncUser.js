import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useSyncUser() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    fetch(`${API_URL}/api/user/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkId: user.id,
        name: user.fullName || "User",
        email: user.primaryEmailAddress.emailAddress,
      }),
    }).catch(console.error);
  }, [isSignedIn, user]);
}
