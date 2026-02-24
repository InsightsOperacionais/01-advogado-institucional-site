"use client";

import Image from "next/image";

interface RoceriaLogoProps {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}

function RoceriaLogo({
  size,
  width,
  height,
  className = "",
}: RoceriaLogoProps) {
  const finalWidth = size || width || 120;
  const finalHeight = size || height || 120;

  return (
    <div
      className={`absolute top-5 left-5 z-100 flex cursor-pointer gap-5 ${className}`}
      style={{ width: finalWidth, height: "auto" }}
    >
      <Image
        src="/assets/logos/roceria_logo-p.svg" // Caminho direto da pasta public
        alt="Roceria Logo"
        width={finalWidth}
        height={finalHeight}
        priority
        className="block h-auto w-full object-contain"
      />
    </div>
  );
}

export default RoceriaLogo;
