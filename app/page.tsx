"use client";

import { characters } from "@/lib/characters";
import Image from "next/image";
import { useState, useEffect } from "react";

const lineVisibleDuration: Readonly<number> = 2000 as const;

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  const today = new Date();
  const todayCharacter = characters.filter(
    ({ birthday }) =>
      birthday.day === today.getDate() &&
      birthday.month === today.getMonth() + 1
  );

  const pad = (num: number, size: number): string => {
    return String(num).padStart(size, "0");
  };

  // HACK: What the fuck is this?
  useEffect(() => {
    const resetVisibleLines = () => {
      setVisibleLines([]);
      const lines = characters[currentIndex]!.extraContent;

      lines.forEach((_, index) =>
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, index]);
        }, index * lineVisibleDuration)
      );
    };

    const promise = new Promise(resetVisibleLines);

    return () => {
      promise.finally();
    };
  }, [currentIndex]);

  if (todayCharacter.length === 0) {
    return (
      <div className="h-screen w-screen bg-neutral-800 text-neutral-200 text-2xl flex items-center justify-center">
        No character found
      </div>
    );
  }

  return (
    <>
      {/* Background */}
      <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden inset-0 select-none">
        <Image
          className="animate-fade-in object-cover absolute h-full"
          src={todayCharacter[currentIndex].assets.background}
          alt="background"
          width="2160"
          height="1440"
          loading="eager"
        />
      </div>

      {/* Character information */}
      <div className="flex flex-col h-screen relative top-0 left-0 w-screen text-white z-50 md:w-lg lg:w-xl xl:w-2xl 2xl:w-4xl mx-auto gap-4 p-4">
        <div className="mb-auto"></div>

        <div className="my-auto flex gap-8 flex-col">
          {/* Information */}
          <div>
            {/* Name and birthday */}
            <div className="flex items-end gap-2">
              <div className="font-bold text-4xl">
                {characters[currentIndex]!.name}
              </div>
              <div className="text-md flex gap-2 text-neutral-300">
                <span>{pad(characters[currentIndex]!.birthday.month, 2)}</span>
                <span>/</span>
                <span>{pad(characters[currentIndex]!.birthday.day, 2)}</span>
              </div>
            </div>

            {/* Character source */}
            <div className="text-sm text-neutral-300">
              {characters[currentIndex]!.from}
            </div>
          </div>

          {/* Extra content */}
          <div className="text-2xl flex flex-col">
            {characters[currentIndex]!.extraContent.map((line, index) => (
              <span
                key={index}
                className={`transition ${visibleLines.includes(index) ? "line-fade-in" : "opacity-0"}`}
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Characters view */}
        {todayCharacter.length > 1 ? (
          <div className="mt-auto flex gap-x-1">
            {todayCharacter.map((c, i) => (
              <button type="button" key={i} onClick={() => setCurrentIndex(i)}>
                <Image
                  className="size-8 rounded-full"
                  src={c.assets.avatar}
                  alt="avatar"
                  width="64"
                  height="64"
                  loading="eager"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-auto"></div>
        )}
      </div>
    </>
  );
};

export default Home;
