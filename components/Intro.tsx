"use client";

import React, { useState } from "react";
import { ContainerScroll } from "./ui/ContainerScroll";
import { motion, useScroll, useTransform } from "framer-motion";

function Intro() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const titleComponent = "";
  return (
    <div id="about">
      <div className="flex flex-col">
        <ContainerScroll titleComponent={titleComponent}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:pt-16 items-center px-6 ">
            <div className="text-center md:text-left space-y-6">
              <h3 className="text-3xl text-purple font-bold">About Me</h3>
              <p className="text-white text-xl leading-relaxed">
                As a frontend developer in the early stages of my career, I’m
                driven by a genuine love for coding and a constant desire to
                grow and improve within programming. I find motivation in
                discovering new, smarter solutions and exploring ways to write
                better, cleaner code. <br /> I see every project as an
                opportunity to sharpen my skills, expand my knowledge, and push
                the boundaries of what I can create.
              </p>
            </div>
            <div className="flex justify-center">
              <motion.img
                src="/profile.jpg"
                style={{ rotate, scale }}
                className="max-w-xs md:max-w-sm rounded-full cursor-pointer"
                whileHover={{ scale: 1.1 }}
              />
            </div>
          </div>
        </ContainerScroll>
      </div>
    </div>
  );
}

export default Intro;
