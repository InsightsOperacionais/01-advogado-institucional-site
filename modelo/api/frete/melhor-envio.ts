// src/app/(public)/api/frete/melhor-envio.ts
import { CartDelivery } from "@/types";
import axios from "axios";

interface MelhorEnvioShippingOption {
  id: number;
  name: string;
  price: string; // Note que o preço vem como string
  delivery_time: number;
  delivery_range: {
    min: number;
    max: number;
  };
  company: {
    name: string;
    picture: string;
  };
}

export const calculateShipping = async (
  fromPostalCode: string,
  toPostalCode: string,
  packageDimensions: {
    weight: number;
    width: number;
    height: number;
    length: number;
  },
): Promise<CartDelivery[]> => {
  try {
    const response = await axios.post("/api/frete", {
      from: {
        postal_code: fromPostalCode,
      },
      to: {
        postal_code: toPostalCode,
      },
      package: {
        weight: packageDimensions.weight,
        width: packageDimensions.width,
        height: packageDimensions.height,
        length: packageDimensions.length,
      },
      options: {
        receipt: false,
        own_hand: false,
        insurance_value: 0,
      },
    });

    // Verifica se a resposta é um array
    if (!Array.isArray(response.data)) {
      throw new Error("Resposta da API em formato inesperado");
    }

    // Transforma a resposta do Melhor Envio para o formato do seu sistema
    return response.data
      .map((option: MelhorEnvioShippingOption) => {
        // Verificação de segurança para os campos obrigatórios
        if (!option.delivery_range || !option.company) {
          return null;
        }

        return {
          id: option.id.toString(),
          name: option.name,
          price: parseFloat(option.price),
          delivery_time: option.delivery_time,
          delivery_range: {
            min: option.delivery_range.min,
            max: option.delivery_range.max,
          },
          company: {
            name: option.company.name,
            picture: option.company.picture,
          },
          originalData: option,
        };
      })
      .filter(Boolean) as CartDelivery[]; // Remove valores nulos
  } catch (error) {
    console.error("Erro ao calcular frete:", error);
    throw error;
  }
};
