import React, { useState } from "react";
import { IFormData, IOAuthProviders, ISignInFlow } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignUpardProps {
  setState: (state: ISignInFlow) => void;
}

export const SignUpCard = (props: SignUpardProps) => {
  const { setState } = props;
  const { signIn } = useAuthActions();

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setPending(true);
    signIn("password", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      flow: "signUp",
    })
      .then(({ signingIn }) => {
        if (signingIn) {
          window.location.href = "/";
        }
      })
      .catch(() => {
        setError("Something went wrong");
        setPending(false);
      })
      .finally(() => {
        setPending(false);
        setError("");
      });
  };

  const onProviderSignUp = (value: IOAuthProviders) => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  const onChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: IFormData
  ) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: value,
    }));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-sm flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            value={formData.name}
            onChange={(e) => onChangeFormData(e, "name")}
            placeholder="Full name"
            type="text"
            required
            disabled={pending}
          />
          <Input
            value={formData.email}
            onChange={(e) => onChangeFormData(e, "email")}
            placeholder="Email"
            type="email"
            required
            disabled={pending}
          />
          <Input
            value={formData.password}
            onChange={(e) => onChangeFormData(e, "password")}
            placeholder="Password"
            type="password"
            required
            disabled={pending}
          />
          <Input
            value={formData.confirmPassword}
            onChange={(e) => onChangeFormData(e, "confirmPassword")}
            placeholder="Confirm Password"
            type="password"
            required
            disabled={pending}
          />
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignUp("google")}
            className="w-full relative"
            variant="outline"
            size="lg"
            disabled={pending}
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
        </div>
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignUp("github")}
            className="w-full relative"
            variant="outline"
            size="lg"
            disabled={pending}
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
