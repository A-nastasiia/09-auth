'use client';

import css from './page.module.css';
import { userRequest } from '@/types/user';
import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const handleSubmit = async (formData: FormData) => {
    try {
      const registerUser = Object.fromEntries(formData);
      const data: userRequest = {
        email: registerUser.email as string,
        password: registerUser.password as string,
      };
      const response = await register(data);
      if (response) {
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
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
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
