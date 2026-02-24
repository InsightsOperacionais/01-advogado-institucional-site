import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**", // Permite todos os caminhos dentro do Cloudinary
            },
            // Se você tiver outros provedores de imagem futuramente, adicione-os aqui
        ],
    },
}

export default nextConfig
