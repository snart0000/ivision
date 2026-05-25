import { useEffect, useRef } from "react";
import bgMusic from "../assets/media/bgm-hp.mp3";

const BgMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const stopMusic = () => {
      audio.pause();
      audio.currentTime = 0;

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };

    const playMusic = async () => {
      if (hasPlayedRef.current) return;

      try {
        audio.volume = 0.35;
        audio.currentTime = 0;

        await audio.play();

        hasPlayedRef.current = true;

        timeoutRef.current = window.setTimeout(() => {
          stopMusic();
        }, 15000);
      } catch (error) {
        console.log("Browser blocked autoplay. Music will play after interaction.");
      }
    };

    const unlockAudio = () => {
      playMusic();

      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("scroll", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    playMusic();

    window.addEventListener("click", unlockAudio);
    window.addEventListener("scroll", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      stopMusic();

      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("scroll", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  return <audio ref={audioRef} src={bgMusic} preload="auto" />;
};

export default BgMusic;