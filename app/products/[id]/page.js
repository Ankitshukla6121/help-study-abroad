// app/products/[id]/page.js
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Paper, Button } from "@mui/material";
import { useProductsStore } from "../../../stores/useProductsStore";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ProductDetail() {
  const { id } = useParams();
  const fetchProductById = useProductsStore((s) => s.fetchProductById);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const p = await fetchProductById(id);
      setProduct(p);
    })();
  }, [id]);

  if (!product) return <Container><Typography>Loading...</Typography></Container>;

  return (
    <Container>
      <Button component={Link} href="/products" sx={{ mb: 2 }}>Back to Products</Button>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4">{product.title}</Typography>
        <Carousel showThumbs>
          {product.images?.map((img, idx) => <div key={idx}><img src={img} alt={product.title} /></div>)}
        </Carousel>
        <Typography variant="h6" sx={{ mt: 2 }}>Price: ₹{product.price}</Typography>
        <Typography sx={{ mt: 1 }}>{product.description}</Typography>
        <Typography sx={{ mt: 1 }}>Category: {product.category}</Typography>
        <Typography sx={{ mt: 1 }}>Rating: {product.rating}</Typography>
      </Paper>
    </Container>
  );
}
