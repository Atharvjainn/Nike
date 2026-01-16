// pages/Signup.tsx
'use client'
import { useState } from "react";
import { signUp } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import { signInSocial } from "@/lib/actions/auth-actions";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await signUp(
      email,
      password,
      name,
    );
    if(!result.user) alert("Signup Unsuccessful");
    else alert("Signup successful");
    router.push('/logout')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => signInSocial("google")}
      >
        Sign up with Google
      </button>

      <button
        type="button"
        className="cursor-pointer"
        onClick={() => signInSocial("github")}
      >
        Sign up with GitHub
      </button>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button type="submit" className="cursor-pointer">Sign Up</button>
    </form>
  );
}
