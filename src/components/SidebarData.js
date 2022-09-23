import React from "react";

import { Home, Inventory, Group, Category } from "@mui/icons-material";

export const SidebarData = [
  {
    title: "Inicio",
    icon: <Home />,
    link: "/",
  },
  {
    title: "Productos",
    icon: <Inventory />,
    link: "/show",
  },
  {
    title: "Categorias",
    icon: <Category />,
    link: "/category",
  },
  {
    title: "Usuarios",
    icon: <Group />,
    link: "/users",
  },
];
