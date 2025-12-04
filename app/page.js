// app/page.js
"use client";
import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Users</Typography>
            <Typography>List and manage users</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Products</Typography>
            <Typography>Browse and inspect products</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Performance</Typography>
            <Typography>Caching & optimizations</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
