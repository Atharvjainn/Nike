// components/LogoutButton.tsx
'use client'
import { signOut } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";


export default function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    const result = await signOut();
    if(result.success){
        alert("Logged out");
        router.push('/signup')
    } 
    else alert("error")
    
  }

  return <button onClick={handleLogout} className="cursor-pointer">Logout</button>;
}
