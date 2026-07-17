import Image from "next/image";
import { cn } from "@/lib/utils";

type Variant = "laptop" | "phone" | "tablet" | "monitor";

type Props = {
  variant: Variant;
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** When true, render as inline block (for use inside the kinetic stack). */
  bare?: boolean;
};

const dims: Record<Variant, { w: number; h: number; aspect: string; radius: string }> = {
  laptop: { w: 1200, h: 750, aspect: "aspect-[16/10]", radius: "rounded-[10px]" },
  phone: { w: 400, h: 800, aspect: "aspect-[9/18]", radius: "rounded-[32px]" },
  tablet: { w: 1024, h: 768, aspect: "aspect-[4/3]", radius: "rounded-[16px]" },
  monitor: { w: 1600, h: 900, aspect: "aspect-[16/9]", radius: "rounded-[8px]" },
};

export function DeviceFrame({ variant, src, alt, className, priority, bare }: Props) {
  const d = dims[variant];
  const isPhone = variant === "phone";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-onyx",
        d.aspect,
        d.radius,
        isPhone
          ? "border-[6px] border-onyx"
          : "border border-onyx/15 shadow-[0_20px_60px_-25px_rgba(10,10,10,0.35)]",
        bare && "shadow-none",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={d.w}
        height={d.h}
        priority={priority}
        className="h-full w-full object-cover object-top"
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 700px"
      />
    </div>
  );
}
