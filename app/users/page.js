"use client";
import { useEffect, useState, useCallback } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  TextField,
  Pagination,
} from "@mui/material";
import Link from "next/link";
import { useUsersStore } from "@/store/useUsersStore";
import ProtectedRoute from "@/components/ProtectedRoute";

function UsersPage() {
  const { users = [], total = 0, fetchUsers, loading } = useUsersStore();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const limit = 10;

  const load = useCallback(() => {
    fetchUsers({ limit, skip: (page - 1) * limit, q });
  }, [page, q, limit, fetchUsers]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search users..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setPage(1);
            }}
          />
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {users.map((u) => (
            <Grid item xs={12} md={6} key={u.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {u.firstName} {u.lastName}
                  </Typography>
                  <Typography>{u.email}</Typography>
                  <Typography>
                    {u.gender} • {u.phone}
                  </Typography>
                  <Typography>{u.company?.name}</Typography>
                  <Button
                    component={Link}
                    href={`/users/${u.id}`}
                    sx={{ mt: 1 }}
                    variant="contained"
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Pagination
        sx={{ mt: 2 }}
        count={Math.max(1, Math.ceil(total / limit))}
        page={page}
        onChange={(e, v) => setPage(v)}
      />
    </Container>
  );
}

export default function UsersPageWrapper() {
  return (
    <ProtectedRoute>
      <UsersPage />
    </ProtectedRoute>
  );
}
