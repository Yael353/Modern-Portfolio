"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export type SkillCategory =
  | "language"
  | "frontend"
  | "backend"
  | "devops"
  | "mobile";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: ReactNode;
}

interface SkillCardProps {
  skill: Skill;
  isInView: boolean;
  index: number;
  onHover: (skillName: string | null) => void;
  isHovered: boolean;
}

const categoryColors: Record<SkillCategory, string> = {
  language: "from-blue-500 to-cyan-500",
  frontend: "from-purple-500 to-pink-500",
  backend: "from-amber-500 to-orange-500",
  devops: "from-emerald-500 to-teal-500",
  mobile: "from-violet-500 to-fuchsia-500",
};

const categoryNames: Record<SkillCategory, string> = {
  language: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps & Cloud",
  mobile: "Mobile",
};

function Skills({ skillsData }: { skillsData: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "all">(
    "all"
  );
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredSkills =
    activeCategory === "all"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0"></div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl z-50 md:text-5xl font-bold p-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            My Skills
          </h2>
          <p className="text-center md:tracking-wider mb-4 text-md md:text-lg lg:text-2xl">
            Technologies I use to create innovative and scalable solutions
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:shadow-md"
            }`}
          >
            All Skills
          </button>

          {(Object.entries(categoryNames) as [SkillCategory, string][]).map(
            ([key, name]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === key
                    ? "bg-gradient-to-r " +
                      categoryColors[key] +
                      " text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:shadow-md"
                }`}
              >
                {name}
              </button>
            )
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 z-10"
          initial="hidden"
          animate={isInView ? "visible" : ""}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              isInView={isInView}
              index={index}
              onHover={setHoveredSkill}
              isHovered={hoveredSkill === skill.name}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  isInView,
  index,
  onHover,
  isHovered,
}: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const cardInView = useInView(ref, { once: true, margin: "-50px" });

  const progress = useMotionValue(0);
  const progressSpring = useSpring(progress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <motion.div
      ref={ref}
      className="relative group"
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ type: "spring", stiffness: 100 }}
      onHoverStart={() => onHover(skill.name)}
      onHoverEnd={() => onHover(null)}
      whileHover={{ y: -5 }}
    >
      <div
        className={`h-40  bg-white dark:bg-slate-800 rounded-xl shadow-md flex flex-col items-center justify-center p-4 transition-all duration-300 ${
          isHovered
            ? "shadow-lg ring-2 ring-opacity-50 " +
              (skill.category === "language"
                ? "ring-blue-500"
                : skill.category === "frontend"
                ? "ring-purple-500"
                : skill.category === "backend"
                ? "ring-amber-500"
                : skill.category === "devops"
                ? "ring-emerald-500"
                : "ring-violet-500")
            : ""
        }`}
      >
        {/* Skill Icon */}
        <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center text-3xl">
          {skill.icon}
        </div>

        <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-center">
          {skill.name}
        </h3>
      </div>

      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${
          categoryColors[skill.category]
        } opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}
      ></div>
    </motion.div>
  );
}

export default Skills;