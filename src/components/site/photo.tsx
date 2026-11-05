export function Photo({
  src,
  alt,
  width,
  height,
  loading,
  className = "",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  className?: string;
}) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <img src={src} alt={alt} width={width} height={height} loading={loading} className="h-full w-full object-cover" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2 bottom-1.5 select-none font-display text-[8px] font-medium tracking-[0.12em] text-white/20"
      >
        lotok24
      </span>
    </span>
  );
}
