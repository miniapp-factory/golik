"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function FunnyPictures() {
  const [meme, setMeme] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const memes = data.data.memes;
        const random = memes[Math.floor(Math.random() * memes.length)];
        setMeme(random.url);
      })
      .catch(console.error);
  }, []);

  const sendMeme = async () => {
    if (!meme) return;
    try {
      await fetch("/api/send-funny-pictures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: meme }),
      });
      alert("Meme sent!");
    } catch (e) {
      console.error(e);
      alert("Failed to send meme.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {meme ? (
        <img src={meme} alt="Funny meme" className="max-w-full h-auto rounded" />
      ) : (
        <p>Loading meme...</p>
      )}
      <Button onClick={sendMeme} disabled={!meme}>
        Send Meme
      </Button>
    </div>
  );
}
