import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IFormData, IOAuthProviders, ISignInFlow } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignInCardProps {
  setState: (state: ISignInFlow) => void;
}

export const SignInCard = (props: SignInCardProps) => {
  const { setState } = props;
  const { signIn } = useAuthActions();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    signIn("password", {
      email: formData.email,
      password: formData.password,
      flow: "signIn",
    })
      .then(({ signingIn }) => {
        if (signingIn) {
          window.location.href = "/";
        }
      })
      .catch(() => {
        setError("Invalid email or password");
        setPending(false);
      })
      .finally(() => {
        setPending(false);
        setError("");
      });
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

  const onProviderSignIn = (value: IOAuthProviders) => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
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
        <form className="space-y-2.5" onSubmit={onPasswordSignIn}>
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
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignIn("google")}
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
            onClick={() => onProviderSignIn("github")}
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
          Don&apos;t have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signUp")}
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
