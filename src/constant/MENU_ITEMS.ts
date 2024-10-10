import {
  LayoutDashboard,
  BoxesIcon,
  Users,
  FileBadge,
  ReceiptIcon,
  ReceiptText,
  UserCog,
} from 'lucide-react'

export const MENU_ITEMS = [
  {
    icon: LayoutDashboard,
    label: 'Panel',
    path: '/dashboard',
  },
  {
    icon: ReceiptText,
    label: 'Nueva Factura',
    path: '/dashboard/new-invoice',
  },
  {
    icon: ReceiptIcon,
    label: 'Facturas',
    path: '/dashboard/billing',
  },
  {
    icon: UserCog,
    label: 'Proveedores',
    path: '/dashboard/providers',
  },
  {
    icon: BoxesIcon,
    label: 'Inventario',
    path: '/dashboard/inventory',
  },
  {
    icon: Users,
    label: 'Usuarios',
    path: '/dashboard/users',
  },
]

export const ROLE_PERMISSIONS: any = {
  admin: [
    'Panel',
    'Nueva Factura',
    'Facturas',
    'Proveedores',
    'Inventario',
    'Usuarios',
  ],
  seller: ['Nueva Factura', 'Facturas'],
  inventory: ['Inventario'],
}
