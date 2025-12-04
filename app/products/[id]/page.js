"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";
import Link from "next/link";

export default function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!product) return <Typography>Product not found.</Typography>;

  return (
    <Container>
      <Button component={Link} href="/products" variant="contained" sx={{ mb: 2 }}>
        Back to Products
      </Button>

      <Typography variant="h4" gutterBottom>{product.title}</Typography>
      <Grid container spacing={2}>
        {product.images.map((img, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <img src={img} alt={product.title} width="100%" />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" mt={2}>${product.price}</Typography>
      <Typography>{product.description}</Typography>
      <Typography>Category: {product.category}</Typography>
      <Typography>Rating:  {product.rating}</Typography>
      <Typography>Stock: {product.stock}</Typography>
  </Container>
  );
}
