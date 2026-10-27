import { useEffect, useRef } from "react";
import type { ReactNode, RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

export function Pointer() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100),
    y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 30 }),
    sy = useSpring(y, { stiffness: 260, damping: 30 });
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduce || !media.matches) return;
    const root = document.documentElement;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      root.style.setProperty("--pointer-x", `${e.clientX}px`);
      root.style.setProperty("--pointer-y", `${e.clientY}px`);
      ring.current?.classList.add("is-visible");
    };
    const over = (e: PointerEvent) => {
      const target =
        e.target instanceof Element
          ? e.target.closest<HTMLElement>("[data-cursor], a, button, summary")
          : null;
      ring.current?.classList.toggle("is-active", !!target);
      if (ring.current)
        ring.current.dataset.label = target?.dataset.cursor || "";
    };
    const hide = () => ring.current?.classList.remove("is-visible");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
    };
  }, [reduce, x, y]);
  if (reduce) return null;
  return (
    <div className="pointer-system" aria-hidden="true">
      <motion.div className="pointer-dot" style={{ x, y }} />
      <motion.div
        ref={ring}
        className="pointer-ring"
        style={{ x: sx, y: sy }}
      />
    </div>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -45px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function useTilt(ref: RefObject<HTMLDivElement | null>) {
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      reduce ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect();
        const px = (e.clientX - box.left) / box.width - 0.5,
          py = (e.clientY - box.top) / box.height - 0.5;
        el.style.setProperty("--rx", `${-py * 5}deg`);
        el.style.setProperty("--ry", `${px * 5}deg`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [ref, reduce]);
}
