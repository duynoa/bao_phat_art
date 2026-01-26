"use client";

import {
  Menu as MenuIcon,
  Inventory as InventoryIcon,
  BarChart as BarChartIcon,
  ContactMail as ContactMailIcon,
} from "@mui/icons-material";
import Link from "next/link";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const menuItems = [
    { icon: InventoryIcon, label: "Sản phẩm", href: "/admin/products" },
    { icon: BarChartIcon, label: "Dự án", href: "/admin/projects" },
    { icon: ContactMailIcon, label: "Liên hệ", href: "/admin/contacts" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-gray-800 transition-all duration-300 ${
        sidebarOpen ? "w-[200px]" : "w-20"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {sidebarOpen && (
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 hover:bg-gray-700"
        >
          <MenuIcon className="h-6 w-6 text-gray-300" />
        </button>
      </div>

      <nav className="mt-4 space-y-2 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <item.icon className="h-5 w-5 text-gray-300" />
            {sidebarOpen && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}