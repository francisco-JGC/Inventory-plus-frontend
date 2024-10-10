'use client'
import { Inter } from "next/font/google";

import { Sidebar } from "@/components/sidebar";
import { MENU_ITEMS, ROLE_PERMISSIONS } from "@/constant/MENU_ITEMS";
import { SidebarItem } from "@/components/sidebar/item";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(getCookie('role') as string);
  }, []);

  const filteredMenuItems = MENU_ITEMS.filter(item =>
    ROLE_PERMISSIONS[role || 'admin']?.includes(item.label)
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar className="sticky top-0 h-full"
            role_user={role}
          >
            {
              filteredMenuItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  icon={<item.icon size={20} />}
                  text={item.label}
                  path={item.path}
                />
              ))
            }
          </Sidebar>
          <div className="p-4 w-full overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
