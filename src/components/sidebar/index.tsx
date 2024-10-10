'use client'
import Image from "next/image";
import { createContext, useState, useEffect, useRef } from "react";
import { ArchiveRestore, ChevronFirst, ChevronLast, DatabaseBackup, LogOut, PlusCircle } from "lucide-react";
import profileIcon from "@/assets/icons/profile.png";
import Link from "next/link";
import { logout } from "@/actions/session";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { generateBackupDB, restoreBackupDB } from "@/services/ddbb";
import { AlertDialogModal } from "../alertDialogModal";

interface ISidebarItemProps {
  children: React.ReactNode;
  className: string;
  role_user: string | null
}

export const SidebarContext = createContext({ expanded: true });

export const Sidebar = ({ children, className, role_user }: ISidebarItemProps) => {
  const [expanded, setExpanded] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setUsername(getCookie('username') as string);
    setEmail(getCookie('email') as string);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleGenerateBackupDB = async () => {
    toast.loading('Generando respaldo..', {
      description: 'Por favor espere un momento'
    })

    const response = await generateBackupDB()
    toast.dismiss()

    if (response.success) {
      toast.success('Se ha guardado el respaldo de la base de datos')
    } else {
      toast.error('Algo salio mal al generar la base de datos', {
        description: response.message
      })
    }
  }


  const handleRestoreDB = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      if (file.name.endsWith('.sql')) {
        toast.loading('Iniciando restauración de base de datos')

        const response = await restoreBackupDB(file.name)
        toast.dismiss()

        if (response.success) {
          toast.success('Se ha restaurado la base de datos', {
            description: 'Porfavor recargue la pagina'
          })
        } else {
          toast.error('Hubo un error al restaurar la base de datos', {
            description: response.message
          })
        }
      } else {
        toast.info('Por favor, selecciona un archivo con la extensión .sql')
      }
    }
  };

  return (
    <div className={`h-screen bg-white border-r shadow-sm transition-all ${className} ${expanded ? "w-[260px]" : "w-[70px]"}`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          {expanded && <h1 className="font-semibold">TESIS</h1>}
          {/* <button
            className="p-1.5 rounded-lg bg-gray-50 transition-colors shadow-sm hover:bg-gray-100"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button> */}
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {children}

            {role_user === 'admin' && <div className="border-t-2 p-3 flex flex-col gap-3">
              <AlertDialogModal onConfirm={handleGenerateBackupDB} title="Generar respaldo de  la base de datos"
                nameButton="Generar respaldo"
                description="El archivo se guardara automaticamente"
                buttonStyle={{
                  background: '#222',
                  padding: '.5em',
                  borderRadius: '5px',
                  color: '#fff'
                }}
              />

              <label htmlFor="restore_db" className="w-full h-32 bg-gray-100 rounded-sm flex items-center justify-center cursor-pointer"
              >
                <span className="flex flex-col items-center text-gray-500">
                  <ArchiveRestore width={17} /> <span>Restaurar</span>
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="restore_db"
                  id="restore_db"
                  hidden
                  accept=".sql"
                  onChange={handleRestoreDB}
                />
              </label>
            </div>
            }
          </ul>
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
