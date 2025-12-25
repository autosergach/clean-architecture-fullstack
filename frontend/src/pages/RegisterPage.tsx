import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthFormValues } from "../features/auth/model/auth-schema";
import { useAuthStore } from "../features/auth/model/auth-store";
import { Button, Card, Input } from "../shared/ui";
import "../features/auth/ui/auth.css";

export function RegisterPage(): JSX.Element {
  const { register: registerUser, error, status } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (values: AuthFormValues) => {
    await registerUser(values);
  };

  React.useEffect(() => {
    if (status === "authenticated") {
      navigate("/", { replace: true });
    }
  }, [navigate, status]);

  return (
    <div className="auth-shell">
      <div>
        <h1>Create your workspace.</h1>
        <p>We will bootstrap the task system around your account.</p>
      </div>
      <Card>
        <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
          <label className="auth-field">
            Email
            <Input type="email" hasError={Boolean(errors.email)} {...register("email")} />
            {errors.email ? <span className="auth-hint">Enter a valid email.</span> : null}
          </label>
          <label className="auth-field">
            Password
            <Input
              type="password"
              hasError={Boolean(errors.password)}
              {...register("password")}
            />
            {errors.password ? (
              <span className="auth-hint">Password must be 8-72 characters.</span>
            ) : null}
          </label>
          {error ? <div className="auth-error">{error}</div> : null}
          <div className="auth-actions">
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Creating..." : "Create account"}
            </Button>
            <Link to="/login">Already have an account?</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
