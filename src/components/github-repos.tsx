"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

export function GithubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("https://api.github.com/users/iphrick/repos?sort=updated&per_page=3");
        if (res.ok) {
          const data = await res.json();
          setRepos(data);
        }
      } catch (error) {
        console.error("Failed to fetch Github repos", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-8 border border-white/5 bg-[#050505]">
        <div className="w-4 h-4 border-2 border-[#10b981] border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 font-mono text-xs text-[#666]">Fetching active nodes...</span>
      </div>
    );
  }

  if (repos.length === 0) return null;

  return (
    <div className="w-full space-y-4 mt-12 border-t border-white/10 pt-12">
      <div className="flex items-center gap-3 font-mono text-[10px] text-[#10b981] tracking-widest uppercase mb-6">
        <span className="w-1.5 h-1.5 bg-[#10b981] rounded-none animate-pulse" />
        Live GitHub Telemetry
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {repos.map((repo, idx) => (
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 border border-white/5 bg-[#0a0a0a] hover:bg-[#111] hover:border-[#10b981]/30 transition-all rounded-sm group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#10b981]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <h4 className="text-white font-bold font-mono text-sm mb-2 group-hover:text-[#10b981] transition-colors line-clamp-1">{repo.name}</h4>
            <p className="text-[#888] text-xs font-mono line-clamp-2 mb-4 h-8">
              {repo.description || "No description provided."}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="text-[10px] font-mono text-[#a3a3a3] flex items-center gap-1.5 border border-white/10 px-2 py-0.5 rounded-sm bg-[#050505]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                {repo.language || "Unknown"}
              </span>
              
              <span className="text-[10px] font-mono text-[#666] flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                {repo.stargazers_count}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
