import { useMemo, useState } from "react";
import "../styles/candle.scss";

import candleImg from "../assets/media/candle.png";
import lightImg from "../assets/media/light.svg";

type CandleData = {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
};

const Candle = () => {
  const candles = useMemo<CandleData[]>(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        top: Math.random() * 72 + 4,
        left: Math.random() * 88 + 2,
        size: Math.random() * 55 + 55,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 3,
      })),
    []
  );

  const [litCandles, setLitCandles] = useState<Record<number, boolean>>({});

  const toggleCandle = (id: number) => {
    setLitCandles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="candles">
      {candles.map((candle) => {
        const isLit = litCandles[candle.id];

        return (
          <div
            key={candle.id}
            className={`candle ${isLit ? "candle--lit" : ""}`}
            style={{
              top: `${candle.top}%`,
              left: `${candle.left}%`,
              width: `${candle.size}px`,
            }}
            onMouseEnter={() => toggleCandle(candle.id)}
          >
            <div
              className="candle__float"
              style={{
                animationDuration: `${candle.duration}s`,
                animationDelay: `${candle.delay}s`,
              }}
            >
              {isLit && (
                <img className="candle__light" src={lightImg} alt="" />
              )}

              <img
                className="candle__image"
                src={candleImg}
                alt="Floating candle"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Candle;