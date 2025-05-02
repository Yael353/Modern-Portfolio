"use client";

import React, { Children } from "react";
import { ContainerScroll } from "./ui/ContainerScroll";

function Intro() {
  const titleComponent = "";
  return (
    <div id="about">
      <p>Hej</p>
      <div className="flex flex-col">
        <ContainerScroll titleComponent={titleComponent}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-16 px-6">
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
              <img
                src="/me.png"
                alt="b5"
                className="max-w-xs md:max-w-sm lg:max-w-md rounded-full"
              />
            </div>
          </div>
        </ContainerScroll>
      </div>
    </div>
  );
}

export default Intro;
