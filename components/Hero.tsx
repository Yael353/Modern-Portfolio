"use client";

import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";

function Hero() {
  return (
    <div className="pt-28 bg-black-100">
      {" "}
      {/* Ta bort dark: */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-[90%] h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight
          className="top-28 left-[30%] h-[100vh] w-[50vw]"
          fill="blue"
        />
      </div>
      <div className="flex h-screen w-full bg-black-100 items-center justify-center bg-grid-white/[0.04] top-0 left-0 absolute">
        {" "}
        
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />{" "}
       
      </div>
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-[60vw] flex flex-col items-center justify-center">
          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Creating clean code and scalable solutions, one commit at a time."
          />
          <p className="text-center md:tracking-wider text-gray-200 mb-4 text-md md:text-lg lg:text:2xl">
            Hey there!
            <br /> I&apos;m Yaser, a Junior WebDeveloper Based In Sweden.
          </p>
          <a href="#projects">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
