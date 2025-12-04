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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Link from "next/link";
import { useProductsStore } from "@/store/useProductsStore";
import ProtectedRoute from "@/components/ProtectedRoute";

function ProductsPage() {
  const { products, total, loading, categories, fetchProducts, fetchCategories } = useProductsStore();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const limit = 10;

  const load = useCallback(() => {
    fetchProducts({ limit, skip: (page - 1) * limit, q, category });
  }, [page, q, category, fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") setPage(1); }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid item xs={12} md={4} key={p.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{p.title}</Typography>
                  <img src={p.thumbnail} alt={p.title} width="100%" />
                  <Typography>${p.price}</Typography>
                  <Typography>{p.category}</Typography>
                  <Typography> {p.rating}</Typography>
                  <Button
                    component={Link}
                    href={`/products/${p.id}`}
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

export default function ProductsPageWrapper() {
  return (
    <ProtectedRoute>
      <ProductsPage />
    </ProtectedRoute>
  );
}
