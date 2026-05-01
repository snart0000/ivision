import { useEffect, useRef, useState } from "react";
import wandCursor from "../assets/media/wand.cur";
import "../styles/cursor.scss";

type Particle = {
  id: number;
  x: number;
  y: number;
};

type CursorProps = {
  targetSelector: string;
};

const Cursor = ({ targetSelector }: CursorProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  useEffect(() => {
    const target = document.querySelector(targetSelector) as HTMLElement | null;

    if (!target) return;

    target.style.cursor = `url(${wandCursor}) 4 4, auto`;

    const interactiveElements = target.querySelectorAll("button, a");

    interactiveElements.forEach((el) => {
      (el as HTMLElement).style.cursor = `url(${wandCursor}) 4 4, pointer`;
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();

      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isInside) return;

      const newParticle = {
        id: particleId.current++,
        x: e.clientX,
        y: e.clientY,
      };

      setParticles((prev) => [...prev.slice(-20), newParticle]);

      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((particle) => particle.id !== newParticle.id)
        );
      }, 650);
    };

    target.addEventListener("mousemove", handleMouseMove);

    return () => {
      target.style.cursor = "";
      interactiveElements.forEach((el) => {
        (el as HTMLElement).style.cursor = "";
      });

      target.removeEventListener("mousemove", handleMouseMove);
    };
  }, [targetSelector]);

  return (
    <div className="magic-cursor">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="magic-cursor__particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Cursor;