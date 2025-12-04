// components/Layout/Sidebar.js
"use client";
import React from "react";
import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import Link from "next/link";

export default function Sidebar() {
  return (
    <Drawer variant="permanent" open>
      <Toolbar />
      <List sx={{ width: 240 }}>
        <ListItemButton component={Link} href="/">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} href="/users">
          <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton component={Link} href="/products">
          <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton component={Link} href="/login">
          <ListItemText primary="Login" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
