"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../stores/useAuthStore";

export default function Topbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    logout();
    router.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>

        {status === "authenticated" && (
          <>
            <Typography sx={{ mr: 2 }}>
              {session?.user?.email}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
