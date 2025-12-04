"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useAuthStore } from "@/stores/useAuthStore";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = (e) => {
  e.preventDefault();

  if (
    username.trim().toLowerCase() === "emilys" &&
    password.trim() === "emilyspass"
  ) {
    login(
      {
        id: 1,
        name: "Emily Johnson",
        email: "emily.johnson@x.dummyjson.com",
      },
      "dummy-token"
    );

    router.push("/users"); // ✅ proper redirect
  } else {
    setError("Invalid username or password");
  }
};


  return (
    <Container maxWidth="sm">
      <Box mt={10} p={3} border={1} borderRadius={2}>
        <Typography variant="h5" mb={2}>Admin Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
        </form>
      </Box>
    </Container>
  );
}
