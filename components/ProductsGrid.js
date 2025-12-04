// components/ProductsGrid.js
"use client";
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";

const ProductsGrid = React.memo(function ProductsGrid({ products }) {
  return (
    <Grid container spacing={2}>
      {products.map((p) => (
        <Grid item xs={12} md={4} key={p.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={p.thumbnail || p.images?.[0]}
              alt={p.title}
            />
            <CardContent>
              <Typography variant="h6">{p.title}</Typography>
              <Typography>₹{p.price}</Typography>
              <Typography>
                {p.category} • ⭐{p.rating}
              </Typography>

              <Button
                component={Link}
                href={`/products/${p.id}`}
                variant="contained"
                size="small"
                sx={{ mt: 1 }}
              >
                View
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export default ProductsGrid;
