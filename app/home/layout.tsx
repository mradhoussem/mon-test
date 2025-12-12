"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { toast, Toaster } from "sonner";
import { useState, useEffect } from "react";
import { useAuth } from "../lib/hooks/useAuth";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, checkingAuth } = useAuth();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!checkingAuth && !user) {
      router.replace("/authentification/signin");
    }
  }, [user, checkingAuth, router]);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setDrawerOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    const supabase = (
      await import("../../supabase/browser-client")
    ).getSupabaseBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erreur lors de la déconnexion : " + error.message);
    } else {
      toast.success("Déconnecté avec succès !");
      router.push("/authentification/signin");
    }
    setLogoutDialogOpen(false);
  };

  const navItems = [
    { href: "/home/statistiques", label: "📊 Statistiques" },
    { href: "/home/taches", label: "📝 Gestion des tâches" },
  ];

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-[#5a1ded] border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster richColors position="top-right" />

      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/90 backdrop-blur-md p-4 border-b border-gray-200 shadow-md">
          <h2 className="text-xl font-bold text-[#5a1ded]">Dashboard</h2>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="text-black"
          >
            {drawerOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </header>
      )}

      <div className="flex min-h-screen bg-gray-50 text-black pt-0 md:pt-0">
        <AnimatePresence>
          {drawerOpen && (
            <>
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setDrawerOpen(false)}
                  className="fixed inset-0 bg-black z-40"
                />
              )}

              <motion.aside
                key="drawer"
                initial={{ x: isMobile ? -300 : 0 }}
                animate={{ x: 0 }}
                exit={{ x: isMobile ? -300 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-md border-r border-gray-200 p-6 flex flex-col space-y-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-[#5a1ded] hidden md:block">
                  Dashboard
                </h2>

                <nav className="flex flex-col space-y-3 text-base font-bold mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                        pathname.includes(item.href.split("/")[2])
                          ? "bg-[#5a1ded] text-white shadow-md"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => isMobile && setDrawerOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {user && (
                  <Dialog.Root
                    open={logoutDialogOpen}
                    onOpenChange={setLogoutDialogOpen}
                  >
                    <Dialog.Trigger asChild>
                      <button className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-700 text-white font-semibold hover:bg-red-800 transition-all w-full">
                        Déconnexion
                        <LogOut size={18} className="ml-2" />
                      </button>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-80 shadow-lg">
                        <Dialog.Title className="text-lg font-bold mb-4 text-red-600">
                          Confirmer la déconnexion
                        </Dialog.Title>
                        <Dialog.Description className="mb-6 text-gray-700">
                          Voulez-vous vraiment vous déconnecter ?
                        </Dialog.Description>
                        <div className="flex justify-end gap-3">
                          <Dialog.Close className="px-4 py-2 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100">
                            Non
                          </Dialog.Close>
                          <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500"
                          >
                            Oui
                          </button>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                )}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main
          className={`flex-1 p-6 md:p-10 relative overflow-hidden ${
            isMobile ? "mt-16" : ""
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0.5, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
