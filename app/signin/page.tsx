// pages/Login.tsx
'use client'
import { useState } from "react";
import { signIn } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn(
          email,
          password,
        );
        if(!result.user) alert("Signin Unsuccessful");
        else alert("Signin successful");
        router.push('/logout')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="cursor-pointer">Login</button>
    </form>
  );
}
