"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getSupabaseBrowserClient } from "../../../supabase/browser-client";

interface TaskCounts {
  total: number;
  a_faire: number;
  en_cours: number;
  termine: number;
}

export default function StatistiquesPage() {
  const supabase = getSupabaseBrowserClient();
  const [counts, setCounts] = useState<TaskCounts>({
    total: 0,
    a_faire: 0,
    en_cours: 0,
    termine: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("taches").select("statut");

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const total = data.length;
      const a_faire = data.filter((t) => t.statut === "a_faire").length;
      const en_cours = data.filter((t) => t.statut === "en_cours").length;
      const termine = data.filter((t) => t.statut === "termine").length;

      setCounts({ total, a_faire, en_cours, termine });
      setLoading(false);
    };

    fetchStats();
  }, [supabase]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-12 h-12 border-4 border-[#5a1ded] border-dashed rounded-full animate-spin"></div>
      </div>
    );
    

  const chartData = [
    { statut: "À faire", count: counts.a_faire, color: "#f59e0b" }, // amber
    { statut: "En cours", count: counts.en_cours, color: "#3b82f6" }, // blue
    { statut: "Terminées", count: counts.termine, color: "#10b981" }, // green
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Statistiques des tâches</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
          <p className="text-gray-500">Total tâches</p>
          <p className="text-3xl font-bold mt-2">{counts.total}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
          <p className="text-gray-500">À faire</p>
          <p className="text-3xl font-bold mt-2">{counts.a_faire}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
          <p className="text-gray-500">En cours</p>
          <p className="text-3xl font-bold mt-2">{counts.en_cours}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
          <p className="text-gray-500">Terminées</p>
          <p className="text-3xl font-bold mt-2">{counts.termine}</p>
        </div>
      </div>

      {/* Modern Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Répartition par statut</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
            <XAxis
              dataKey="statut"
              tick={{ fontSize: 14, fill: "#6b7280", fontWeight: 500 }}
            />
            <YAxis
              tick={{ fontSize: 14, fill: "#6b7280", fontWeight: 500 }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={50}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
