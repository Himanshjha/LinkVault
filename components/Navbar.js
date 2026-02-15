"use client";

import { logoutUser, signInWithGoogle } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div className="w-full flex justify-between items-center py-4 px-4 sm:px-10 glass rounded-2xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
          🔗 LinkVault
        </h1>
        <p className="text-xs sm:text-sm text-white/60">
          Smart Bookmark Manager
        </p>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="flex items-center gap-2">

              <img
                src={user.photoURL}
                alt="profile"
                className="w-9 h-9 rounded-full border border-white/20"
              />
              <div className="text-sm">
                <p className="font-semibold leading-tight">{user.displayName}</p>
                <p className="text-xs text-white/60 leading-tight">
                  {user.email}
                </p>
              </div>
            </div>

            <button onClick={logoutUser} className="btn-danger">
              Logout
            </button>
          </>
        ) : (
          <button onClick={signInWithGoogle} className="btn-primary">
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
