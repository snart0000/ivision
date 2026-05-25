import { useEffect, useRef, useMemo } from "react";
import "../styles/profilecard.scss";

type ProfileCardProps = {
  avatarUrl: string;
  name: string;
  behindGlowColor?: string;
  innerGradient?: string;
  enableMobileTilt?: boolean;
  behindGlowEnabled?: boolean;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  onContactClick?: () => void;
};

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const ProfileCard = ({
  avatarUrl,
  name,
  behindGlowColor = "rgba(255,255,255,.4)",
  innerGradient = "linear-gradient(145deg,#ffffff20 0%,#ffffff05 100%)",
  enableTilt = true,
  enableMobileTilt = false,
  behindGlowEnabled = true,
  onContactClick,
}: ProfileCardProps) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enableTilt) return;

    const wrapper = wrapRef.current;

    if (!wrapper) return;

    const handleMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();

      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;

      const rx = ((py - 50) / 4) * -1;
      const ry = (px - 50) / 5;

      wrapper.style.setProperty("--pointer-x", `${clamp(px)}%`);
      wrapper.style.setProperty("--pointer-y", `${clamp(py)}%`);
      wrapper.style.setProperty("--rotate-x", `${rx}deg`);
      wrapper.style.setProperty("--rotate-y", `${ry}deg`);
    };

    const resetTilt = () => {
      wrapper.style.setProperty("--rotate-x", `0deg`);
      wrapper.style.setProperty("--rotate-y", `0deg`);
      wrapper.style.setProperty("--pointer-x", `50%`);
      wrapper.style.setProperty("--pointer-y", `50%`);
    };

    wrapper.addEventListener("mousemove", handleMove);
    wrapper.addEventListener("mouseleave", resetTilt);

    return () => {
      wrapper.removeEventListener("mousemove", handleMove);
      wrapper.removeEventListener("mouseleave", resetTilt);
    };
  }, [enableTilt]);

  const style = useMemo(
    () =>
      ({
        "--behind-glow-color": behindGlowColor,
        "--inner-gradient": innerGradient,
      } as React.CSSProperties),
    [behindGlowColor, innerGradient]
  );

  return (
    <div className="pc-wrapper" ref={wrapRef} style={style}>
     {behindGlowEnabled && <div className="pc-glow" />}

      <div className="pc-card">

        <div className="pc-card__image">
          <img src={avatarUrl} alt={name} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;