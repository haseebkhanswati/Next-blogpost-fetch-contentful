"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <img 
          src={session.user.image}
          alt={session.user.name}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-white">Welcome, {session.user.name}</span>
        <button 
          onClick={() => signOut()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sign out
        </button>
      </div>
    );
  }
  
  return (
    <button 
      onClick={() => signIn('google')}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  );
}