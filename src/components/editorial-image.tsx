import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  /** Base name without size suffix, e.g. "hero-collage" */
  name: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function EditorialImage({
  name,
  alt,
  sizes = "(max-width: 1152px) 100vw, 1152px",
  priority = false,
  className,
}: EditorialImageProps) {
  const src768 = withBasePath(`/images/${name}-768.webp`);
  const src1536 = withBasePath(`/images/${name}-1536.webp`);
  const srcSet = `${src768} 768w, ${src1536} 1536w`;

  return (
    <picture className="block size-full">
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={src768}
        alt={alt}
        width={768}
        height={512}
        sizes={sizes}
        srcSet={srcSet}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn("size-full object-cover object-center", className)}
      />
    </picture>
  );
}
