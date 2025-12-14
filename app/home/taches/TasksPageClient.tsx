"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateTask from "./CreateTask";
import TaskManagement from "./TaskManagement";
import { useAuth } from "../../lib/hooks/useAuth";

export default function TasksPageClient() {
  const router = useRouter();
  const { user, checkingAuth } = useAuth(); 
  const [activeTab, setActiveTab] = useState<"form" | "list">("form");

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!checkingAuth && !user) {
      router.replace("/authentification/signin");
    }
  }, [checkingAuth, user, router]);

  if (checkingAuth || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const tabs = [
    { id: "form", label: "Ajouter Tâche" },
    { id: "list", label: "Liste des Tâches" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestion des tâches</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 bg-gray-200 p-1 rounded-full w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 
              ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg" : "text-gray-700 hover:bg-indigo-200"}`}
            onClick={() => setActiveTab(tab.id as "form" | "list")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "form" && <CreateTask switchTab={() => setActiveTab("list")} />}
        {activeTab === "list" && <TaskManagement />}
      </div>
    </div>
  );
}
