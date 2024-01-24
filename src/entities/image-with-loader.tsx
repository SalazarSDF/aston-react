import { useEffect, useState } from "react";

import Spinner from "./spinner";

type Props = {
  src: string;
  alt: string;
};

export default function ImageWithLoader({ src, alt }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);
  if (!imageLoaded) {
    return <Spinner />;
  }
  return <img src={src} alt={alt} />;
}
