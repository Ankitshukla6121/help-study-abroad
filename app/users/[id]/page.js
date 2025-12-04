// app/users/[id]/page.js
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container, Paper, Typography, Button } from "@mui/material";
import { useUsersStore } from "../../../stores/useUsersStore";
import Link from "next/link";

export default function UserDetail() {
  const params = useParams();
  const id = params.id;
  const fetchUserById = useUsersStore((s) => s.fetchUserById);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchUserById(id);
      setUser(data);
    })();
  }, [id]);

  if (!user) return <Container><Typography>Loading...</Typography></Container>;

  return (
    <Container>
      <Button component={Link} href="/users" sx={{ mb: 2 }}>Back to Users</Button>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">{user.firstName} {user.lastName}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Gender: {user.gender}</Typography>
        <Typography>Company: {user.company?.name}</Typography>
        <Typography>Address: {user.address?.address}, {user.address?.city}</Typography>
      </Paper>
    </Container>
  );
}
