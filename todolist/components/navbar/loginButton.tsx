"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <Button
      onClick={() => signIn()}
      title="Se connecter ou s'inscrire"
      aria-label="Se connecter ou s'inscrire"
      className="w-full"
    >
      Login
    </Button>
  );
}
