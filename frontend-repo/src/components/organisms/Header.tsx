"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import { auth } from "@/config/firebase";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";

export default function Header({ title }: { title: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <Button color="error" startIcon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}

