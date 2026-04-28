"use client";

import { motion } from "framer-motion";

interface Topic {
  name: string;
  count: number;
}

interface TopicExpertiseProps {
  topics: Topic[];
}

export default function TopicExpertise({ topics }: TopicExpertiseProps) {
  if (topics.length === 0) {
    return (
      <div className="py-8 italic text-text-secondary text-xs text-center">
        No specific topic expertise detected.
      </div>
    );
  }

  const maxCount = Math.max(...topics.map(t => t.count));

  return (
    <div className="flex flex-wrap gap-3">
      {topics.map((topic, idx) => {
        const size = 0.8 + (topic.count / maxCount) * 0.4; // 0.8rem to 1.2rem
        const opacity = 0.4 + (topic.count / maxCount) * 0.6;

        return (
          <motion.div
            key={topic.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
            className="px-4 py-2 rounded-full border border-white/5 bg-white/5 flex items-center gap-2 cursor-default group"
          >
            <span 
              className="font-black uppercase tracking-widest text-text-primary"
              style={{ fontSize: `${size * 10}px`, opacity }}
            >
              #{topic.name}
            </span>
            <span className="text-[8px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              x{topic.count}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
