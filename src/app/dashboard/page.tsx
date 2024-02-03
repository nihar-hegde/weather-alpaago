"use client";
import { UserAuth } from "@/contexts/AuthContexts";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  // @ts-ignore
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  return (
    <div className="p-4">
      {loading ? (
        <h1 className="text-xl">Loading...</h1>
      ) : user ? (
        <p>
          Welcome, {user.displayName} - you are logged in to the profile page -
          a protected route.
        </p>
      ) : (
        <p>You must be logged in to view this page - protected route.</p>
      )}
    </div>
  );
};

export default Dashboard;
