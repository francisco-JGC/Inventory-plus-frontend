'use client'
import { useContext } from "react";
import { SidebarContext } from ".";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ISidebarItemProps {
  icon: React.ReactNode;
  text: string;
  alert?: boolean;
  path: string
}

export const SidebarItem = ({ icon, text, alert, path }: ISidebarItemProps) => {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname;

  const { expanded } = useContext(SidebarContext);
  return (
    <Link href={path} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
      ${isActive(path)
        ? "bg-indigo-50 text-indigo-600"
        : "hover:bg-indigo-50 text-gray-600"}`}
    >
      {icon}

      <span className={`overflow-hidden transition-all
        ${expanded ? "w-52 ml-3" : "w-0"}`}
      >
        {text}
      </span>

      {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />}

      {
        !expanded && (
          <div className="absolute left-full rounded-md px-2 py-1 ml-6
        bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-a;;
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      ">
            {text}
          </div>
        )
      }
    </Link>
  )
}