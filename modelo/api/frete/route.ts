// app/api/frete/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

const SANDBOX_API = "https://melhorenvio.com.br/api/v2/me/shipment/calculate";

export async function POST(request: Request) {
  // Verificação rigorosa do token
  const authToken = process.env.MELHOR_ENVIO_TOKEN?.trim();
  if (!authToken || authToken.length < 30) {
    console.error("Token inválido ou não configurado");
    return NextResponse.json(
      { error: "Configuração do serviço de frete incompleta" },
      { status: 503 },
    );
  }

  try {
    const requestData = await request.json();

    // Validação dos dados de entrada
    if (!requestData.to?.postal_code) {
      return NextResponse.json(
        { error: "CEP de destino é obrigatório" },
        { status: 400 },
      );
    }

    const payload = {
      from: {
        postal_code: requestData.from?.postal_code || "01001000", // CEP padrão do sandbox
      },
      to: {
        postal_code: requestData.to.postal_code,
      },
      package: {
        weight: requestData.package?.weight || 1,
        width: requestData.package?.width || 20,
        height: requestData.package?.height || 20,
        length: requestData.package?.length || 20,
      },
      options: {
        receipt: false,
        own_hand: false,
        insurance_value: 0,
      },
    };

    // console.log("Enviando para Melhor Envio:", {
    //   url: SANDBOX_API,
    //   payload: JSON.stringify(payload),
    //   token: authToken ? "***" + authToken.slice(-4) : "NÃO DEFINIDO",
    // });

    const response = await axios.post(SANDBOX_API, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "User-Agent": "skykingmix.dev@gmail.com",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 8000,
    });

    // console.log("Resposta recebida:", response.status, response.data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    // console.error("Erro detalhado:", {
    //   config: error.config,
    //   status: error.response?.status,
    //   data: error.response?.data,
    //   headers: error.response?.headers,
    // });

    return NextResponse.json(
      {
        error: "Falha no cálculo do frete",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 },
    );
  }
}
