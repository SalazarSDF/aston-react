import { useEffect, useState } from "react";
import { Spinner } from "./spiner";

export default function ImageWithLoader({ src, alt }: { src: string; alt: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  });
  return <>{!imageLoaded ? <Spinner /> : <img src={src} alt={alt} />}</>;
}

