"use client";

import { toJpeg } from "html-to-image";
import { Download } from "lucide-react";
import { useState } from "react";

interface PostDownloadProps {
  postId: number;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export function PostDownload({ postId, contentRef }: PostDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!contentRef.current) return;

    try {
      setIsDownloading(true);

      // Salvar estilos originais
      const originalStyles = {
        width: contentRef.current.style.width,
        height: contentRef.current.style.height,
        transform: contentRef.current.style.transform,
      };

      // Forçar o tamanho correto para captura (1080x1350)
      contentRef.current.style.width = "1080px";
      contentRef.current.style.height = "1350px";
      contentRef.current.style.transform = "scale(1)";

      // Aguardar um frame para o CSS se atualizar
      await new Promise((resolve) => requestAnimationFrame(resolve));

      // Configurações para melhor qualidade
      const dataUrl = await toJpeg(contentRef.current, {
        quality: 1.0,
        pixelRatio: 1, // Mudar para 1 já que estamos definindo o tamanho exato
        cacheBust: true,
        backgroundColor: "#0a0a0b",
        style: {
          width: "1080px",
          height: "1350px",
        },
        // Adicionar canvas para melhor qualidade
        canvasWidth: 1080,
        canvasHeight: 1350,
      });

      // Restaurar estilos originais
      contentRef.current.style.width = originalStyles.width;
      contentRef.current.style.height = originalStyles.height;
      contentRef.current.style.transform = originalStyles.transform;

      // Criar link de download
      const link = document.createElement("a");
      link.download = `vonmarins-post-${postId}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
      // Restaurar estilos em caso de erro
      if (contentRef.current) {
        contentRef.current.style.width = "";
        contentRef.current.style.height = "";
        contentRef.current.style.transform = "";
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="rounded-full bg-white/5 p-2 transition-colors hover:bg-[#c5a47e]/20 disabled:opacity-50"
      title="Baixar imagem do post"
    >
      <Download
        size={14}
        className={`text-[#c5a47e] ${isDownloading ? "animate-pulse" : ""}`}
      />
    </button>
  );
}
