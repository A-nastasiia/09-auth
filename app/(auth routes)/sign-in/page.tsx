"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { toast } from "react-hot-toast";
import css from "./SignInPage.module.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userData = await signIn({ email, password });
      setUser(userData);
      toast.success("Logged in successfully");
      router.push("/profile");
    } catch {
      toast.error("Login failed. Check credentials.");
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className={css.mainContent}>
        <form className={css.form} onSubmit={handleSubmit}>
          <h1 className={css.formTitle}>Sign in</h1>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
               value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </div>

             {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.submitButton} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}