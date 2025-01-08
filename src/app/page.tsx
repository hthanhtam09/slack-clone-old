"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();

  const onSignOut = () => {
    signOut().then(() => {
      window.location.href = "/auth";
    });
  };

  return (
    <div>
      Logged in <Button onClick={onSignOut}>Log out</Button>
    </div>
  );
}
