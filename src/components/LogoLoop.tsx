import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  ReactNode,
  CSSProperties,
  Key,
} from "react";
import "../styles/logoLoop.scss";

type LogoItem = {
  node: ReactNode;
  title: string;
  href?: string;
  ariaLabel?: string;
};

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

const toCssLength = (value?: number | string) =>
  typeof value === "number" ? `${value}px` : value ?? undefined;

const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 34,
    gap = 42,
    hoverSpeed = 15,
    fadeOut = true,
    fadeOutColor,
    scaleOnHover = true,
    ariaLabel = "Technology logos",
    className,
    style,
  }: LogoLoopProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const seqRef = useRef<HTMLUListElement | null>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const offsetRef = useRef(0);
    const velocityRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      const directionMultiplier = direction === "left" ? 1 : -1;
      const speedMultiplier = speed < 0 ? -1 : 1;

      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceWidth = seqRef.current?.getBoundingClientRect().width ?? 0;

      if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));

        const copiesNeeded =
          Math.ceil(containerWidth / sequenceWidth) +
          ANIMATION_CONFIG.COPY_HEADROOM;

        setCopyCount(
          Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded)
        );
      }
    }, []);

    useEffect(() => {
      updateDimensions();

      const handleResize = () => updateDimensions();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, [updateDimensions, logos, gap, logoHeight]);

    useEffect(() => {
      const track = trackRef.current;
      if (!track || seqWidth <= 0) return;

      offsetRef.current =
        ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;

      const animate = (timestamp: number) => {
        if (lastTimestampRef.current === null) {
          lastTimestampRef.current = timestamp;
        }

        const deltaTime =
          Math.max(0, timestamp - lastTimestampRef.current) / 1000;

        lastTimestampRef.current = timestamp;

        const target = isHovered ? hoverSpeed : targetVelocity;

        const easingFactor =
          1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);

        velocityRef.current +=
          (target - velocityRef.current) * easingFactor;

        let nextOffset =
          offsetRef.current + velocityRef.current * deltaTime;

        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;

        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);

      return () => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }

        lastTimestampRef.current = null;
      };
    }, [targetVelocity, seqWidth, isHovered, hoverSpeed]);

    const cssVariables = useMemo(
      () =>
        ({
          "--logoloop-gap": `${gap}px`,
          "--logoloop-logoHeight": `${logoHeight}px`,
          ...(fadeOutColor && {
            "--logoloop-fadeColor": fadeOutColor,
          }),
        } as CSSProperties),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClassName = [
      "logoloop",
      fadeOut && "logoloop--fade",
      scaleOnHover && "logoloop--scale-hover",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const renderLogoItem = useCallback((item: LogoItem, key: Key) => {
      const content = (
        <span className="logoloop__node" aria-hidden>
          {item.node}
        </span>
      );

      return (
        <li className="logoloop__item" key={key} role="listitem">
          {item.href ? (
            <a
              className="logoloop__link"
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={item.ariaLabel || item.title}
              title={item.title}
            >
              {content}
            </a>
          ) : (
            <div className="logoloop__logo" title={item.title}>
              {content}
            </div>
          )}
        </li>
      );
    }, []);

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="logoloop__list"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) =>
              renderLogoItem(item, `${copyIndex}-${itemIndex}`)
            )}
          </ul>
        )),
      [copyCount, logos, renderLogoItem]
    );

    return (
      <div
        ref={containerRef}
        className={rootClassName}
        style={{
          width: toCssLength(width),
          ...cssVariables,
          ...style,
        }}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="logoloop__track" ref={trackRef}>
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;