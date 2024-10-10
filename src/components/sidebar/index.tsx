'use client'
import Image from "next/image";
import { createContext, useState, useEffect } from "react";
import { ChevronFirst, ChevronLast, LogOut } from "lucide-react";
import profileIcon from "@/assets/icons/profile.png";
import Link from "next/link";
import { logout } from "@/actions/session";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

interface ISidebarItemProps {
  children: React.ReactNode;
  className: string;
}

export const SidebarContext = createContext({ expanded: true });

export const Sidebar = ({ children, className }: ISidebarItemProps) => {
  const [expanded, setExpanded] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setUsername(getCookie('username') as string);
    setEmail(getCookie('email') as string);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={`h-screen bg-white border-r shadow-sm transition-all ${className} ${expanded ? "w-[260px]" : "w-[70px]"}`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          {expanded && <h1 className="font-semibold">TESIS</h1>}
          <button
            className="p-1.5 rounded-lg bg-gray-50 transition-colors shadow-sm hover:bg-gray-100"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <Link href="/dashboard/profile" className="w-10 h-10">
            <Image
              src={profileIcon}
              alt="Profile Icon"
              className="w-10 h-10 rounded-s-md"
              width={40}
              height={40}
            />
          </Link>

          <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
            <div className="leading-4">
              <h4 className="font-semibold">{username}</h4>
              <span className="text-xs text-gray-600">{email}</span>
            </div>
            <div>
              <LogOut
                className="text-red-400 cursor-pointer"
                onClick={() => {
                  const response = logout();
                  if (response) {
                    router.push('/login');
                  }
                }}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
