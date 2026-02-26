// src/app/(public)/shop/cart/pix/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { formatterBr } from "@/lib/utils";
import axios from "axios";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBack, IoCopy } from "react-icons/io5";
import { toast } from "sonner";

interface PixPaymentData {
  qr_code: string;
  qr_code_base64: string;
  amount: number;
  orderId: string;
}

const PixPage = () => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<PixPaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem("pixPaymentData");

    if (!storedData) {
      toast.error("Dados do pagamento não encontrados");
      router.push("/shop/cart");
      return;
    }

    const data: PixPaymentData = JSON.parse(storedData);
    setPaymentData(data);
    setIsLoading(false);

    // Verificar status do pagamento a cada 10 segundos
    const interval = setInterval(() => {
      checkPaymentStatus(data.orderId);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const checkPaymentStatus = async (orderId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}-external/mercado-pago/orders/${orderId}`,
      );

      if (response.data.status === "approved") {
        setIsPaid(true);
        toast.success("Pagamento aprovado!");
        sessionStorage.removeItem("pixPaymentData");
        setTimeout(() => {
          router.push("/shop/cart/success");
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao verificar status do pagamento:", error);
    }
  };

  const handleCopyCode = () => {
    if (!paymentData) return;
    navigator.clipboard.writeText(paymentData.qr_code);
    toast.success("Código PIX copiado!");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Não foi possível carregar os dados do pagamento</p>
      </div>
    );
  }

  return (
    <main className="flex w-full max-w-[1300px] flex-col items-center p-4 pt-16 md:p-10">
      <div className="w-full max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/shop/cart")}
        >
          <IoArrowBack className="mr-2" /> Voltar ao carrinho
        </Button>

        <h1 className="text-2xl font-bold">
          {isPaid ? "Pagamento confirmado!" : "Aguardando pagamento via PIX"}
        </h1>

        {!isPaid && (
          <>
            <div className="bg-io-background-primary mt-8 rounded-lg p-6">
              <p className="text-lg font-semibold">
                Valor: {formatterBr.format(paymentData.amount)}
              </p>
              <p className="mt-4 text-sm">O QR Code expira em 30 minutos</p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col items-center">
                <div className="relative aspect-square w-full max-w-xs border-2 border-dashed border-gray-300 p-4">
                  <Image
                    src={`data:image/png;base64,${paymentData.qr_code_base64}`}
                    alt="QR Code PIX"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-4 text-center font-medium">
                  Escaneie o QR Code com seu banco
                </p>
              </div>

              <div className="flex flex-col">
                <h2 className="mb-4 text-lg font-semibold">
                  Código PIX (Copiar e Colar)
                </h2>
                <div className="bg-io-background-primary relative rounded-lg p-4 pr-14">
                  <p className="text-xs break-all">{paymentData.qr_code}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleCopyCode}
                  >
                    <IoCopy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-io-background-primary flex h-6 w-6 items-center justify-center rounded-full p-1 text-xs">
                      1
                    </div>
                    <p>Abra o app do seu banco e acesse a área PIX</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-io-background-primary flex h-6 w-6 items-center justify-center rounded-full p-1 text-xs">
                      2
                    </div>
                    <p>Escolha "Pagar com QR Code" ou "Copiar e Colar"</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-io-background-primary flex h-6 w-6 items-center justify-center rounded-full p-1 text-xs">
                      3
                    </div>
                    <p>Confirme as informações e finalize o pagamento</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {isPaid && (
          <div className="bg-io-background-primary mt-8 flex flex-col items-center justify-center rounded-lg p-6 text-center">
            <CheckCircleIcon className="text-io-success mb-4 h-12 w-12" />
            <p className="text-io-success text-lg font-semibold">
              Seu pagamento foi aprovado com sucesso!
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default PixPage;
