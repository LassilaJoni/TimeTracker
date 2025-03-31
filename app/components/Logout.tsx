"use client";
import { signOut } from "@/app/actions/auth";
import React, { useState } from "react";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    await signOut();
    setLoading(false);
  };

  return (
      <form onSubmit={handleLogout}>
        <button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing out..." : "Sign out"}
        </button>
      </form>
  );
};

export default Logout;