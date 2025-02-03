'use client';

import { useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth
} from '@clerk/nextjs'

async function updateUser() {
  const response = await fetch("/api/updateUser", {
    method: "PUT",
  });

  const data = await response.json();
  console.log(data.message);
}

export function TopNav() {
  const { isSignedIn } = useAuth(); // Use useAuth directly inside the component

  useEffect(() => {
    if (isSignedIn) {
      updateUser(); // Call the API to update the user data on the server
    }
  }, [isSignedIn]); // Re-run the effect when the user changes
  
    return (
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold">Top Nav</div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    );
  }