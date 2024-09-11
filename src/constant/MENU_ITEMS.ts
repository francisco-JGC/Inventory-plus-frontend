import {
  LayoutDashboard,
  BoxesIcon,
  Users,
  FileBadge,
  ReceiptIcon,
  ReceiptText,
} from "lucide-react";

export const MENU_ITEMS = [
  {
    icon: LayoutDashboard,
    label: "Panel",
    path: "/dashboard",
  },
  {
    icon: ReceiptText,
    label: "Nueva Factura",
    path: "/dashboard/new-invoice",
  },
  {
    icon: ReceiptIcon,
    label: "Facturas",
    path: "/dashboard/billing",
  },
  {
    icon: BoxesIcon,
    label: "Inventario",
    path: "/dashboard/inventory",
  },
  {
    icon: Users,
    label: "Usuarios",
    path: "/dashboard/users",
  },
  {
    icon: FileBadge,
    label: "Reportes",
    path: "/dashboard/reports",
  },
];
