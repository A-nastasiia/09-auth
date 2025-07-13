"use client";

import { useState } from "react";
import css from "./SignUpPage.module.css";
import { signUp } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
const { setUser } = useAuthStore();
 const router = useRouter();
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

 try {
      const userData = await signUp({ email, password });
      setUser(userData);
      router.push("/profile");
      toast.success("Registration successful!");

    } catch {
      setError("Registration failed. Please try again.");
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className={css.mainContent}>
        <form className={css.form} onSubmit={handleSubmit}>
          <h1 className={css.formTitle}>Sign up</h1>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={css.input}
            required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
             value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={css.input}
            required
            />
          </div>
                {error && <p className={css.error}>{error}</p>}
          <div className={css.actions}>
            <button type="submit" className={css.submitButton} disabled={isLoading}>
             {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
