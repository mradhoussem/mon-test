"use client";

import { useState } from "react";
import CreateTask from "./CreateTask";
import TaskManagement from "./TaskManagement";

export default function TachesPage() {
  const [activeTab, setActiveTab] = useState<"form" | "list">("form");

  const tabs = [
    { id: "form", label: "Ajouter Tâche" },
    { id: "list", label: "Liste des Tâches" },
  ];

  return (
    
      <div >

      <h1 className="text-3xl font-bold mb-6">Gestion des tâches</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 bg-gray-200 p-1 rounded-full w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 
              ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-indigo-200"
              }`}
            onClick={() => setActiveTab(tab.id as "form" | "list")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "form" && <CreateTask switchTab={() => setActiveTab("list")} />}
        {activeTab === "list" && <TaskManagement />}
      </div>
    </div>
  );
}
