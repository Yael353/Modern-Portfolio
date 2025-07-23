"use client";
import React from "react";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { socialMedia } from "@/data";

function Footer() {
  return (
    <footer className="w-full pt-20 pb-10 md:pt-32 md:pb-20" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">Your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-20 my-5 text-center">
          Reach out to me today!
        </p>
        <a href="mailto:yaser.elkhabiry@outlook.com">
          <MagicButton
            title="lets get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 flex-row justify-between items-center">
        <p className="md:text-base text-sm md:font-normail font font-light">
          Copyright © 2025 Yaser
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((profile) => (
            <a
              key={profile.id}
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img
                src={profile.img}
                alt={`Icon for ${profile.id}`}
                width={20}
                height={20}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
