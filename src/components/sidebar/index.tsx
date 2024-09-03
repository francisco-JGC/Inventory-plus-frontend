'use client'
import Image from "next/image";
import { createContext, useState } from "react";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import profileIcon from "@/assets/icons/profile.png";

interface ISidebarItemProps {
  children: React.ReactNode
  className: string
}

export const SidebarContext = createContext({ expanded: true });

export const Sidebar = ({ children, className }: ISidebarItemProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`h-screen bg-white border-r shadow-sm transition-all ${className && className} ${expanded ? "w-[260px]" : "w-[70px]"}`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          {
            expanded && <h1 className="font-semibold">TESIS</h1>
          }
          <button className={`p-1.5 rounded-lg bg-gray-50 
            transition-colors shadow-sm
            hover:bg-gray-100
          `}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {children}
          </ul>
        </SidebarContext.Provider>


        <div className="border-t flex p-3">
          <Image src={profileIcon} alt=""
            className="w-10 h-10 rounded-s-md"
            width={40}
            height={40}
          />

          <div className={`flex justify-between items-center overflow-hidden transition-all
            ${expanded ? "w-52 ml-3" : "w-0"}`} >
            <div className="leading-4">
              <h4 className="font-semibold">Jhon Doe</h4>
              <span className="text-xs text-gray-600">Francisco@gmail.com</span>
            </div>

            <MoreVertical size={20} />
          </div>

        </div>
      </nav>
    </aside>
  );
}