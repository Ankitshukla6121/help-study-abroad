// app/products/page.js
"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid, TextField, MenuItem, Select, InputLabel, FormControl, Pagination, Card, CardMedia, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useProductsStore } from "../../stores/useProductsStore";

export default function ProductsPage() {
  const { products, total, fetchProducts, fetchCategories, categories, loading } = useProductsStore();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const limit = 10;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts({ limit, skip: (page - 1) * limit, q, category });
  }, [page, q, category]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Products</Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {loading ? <CircularProgress /> : (
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid item xs={12} md={4} key={p.id}>
              <Card>
                <CardMedia component="img" height="140" image={p.thumbnail || p.images?.[0]} alt={p.title} />
                <CardContent>
                  <Typography variant="h6">{p.title}</Typography>
                  <Typography>₹{p.price}</Typography>
                  <Typography>{p.category} • ⭐{p.rating}</Typography>
                  <Button component={Link} href={`/products/${p.id}`} sx={{ mt: 1 }}>View</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Pagination sx={{ mt: 2 }} count={Math.ceil((total || products.length) / limit)} page={page} onChange={(e, v) => setPage(v)} />
    </Container>
  );
}
