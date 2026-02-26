// components/PaymentForm.tsx

"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

interface PaymentFormProps {
  amount: number;
  description: string;
}

export default function PaymentForm({ amount, description }: PaymentFormProps) {
  const [mercadoPagoLoaded, setMercadoPagoLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("card");
  const [cardForm, setCardForm] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mercadoPagoLoaded && paymentMethod === "card") {
      initializeCardForm();
    }
  }, [mercadoPagoLoaded, paymentMethod]);

  const initializeCardForm = () => {
    const mp = new window.MercadoPago(
      "TEST-310cfd0d-5eae-4af2-a170-3231a6edf59e",
      {
        locale: "pt-BR",
      },
    );

    const form = mp.cardForm({
      amount: amount.toString(),
      autoMount: true,
      form: {
        id: "form-checkout",
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular do cartão",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do cartão",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/AA",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de segurança",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número do documento",
        },
      },
      callbacks: {
        onFormMounted: () => {
          setError(null);
        },
        onSubmit: async (event: Event) => {
          event.preventDefault();
          setLoading(true);

          try {
            const paymentData = form.getCardFormData();

            const response = await fetch("/api/payments/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                items: [
                  {
                    title: description,
                    unit_price: amount,
                    quantity: 1,
                  },
                ],
                payer: {
                  email: paymentData.cardholderEmail,
                },
              }),
            });

            const { id } = await response.json();

            // Processar o pagamento com os dados do cartão
            const result = await mp.createPayment({
              transaction_amount: amount,
              token: paymentData.token,
              description,
              installments: parseInt(paymentData.installments),
              payment_method_id: paymentData.paymentMethodId,
              issuer_id: paymentData.issuerId,
              payer: {
                email: paymentData.cardholderEmail,
                identification: {
                  type: paymentData.identificationType,
                  number: paymentData.identificationNumber,
                },
              },
            });

            if (result.error) {
              throw new Error(result.error.message);
            }

            // Redirecionar para página de sucesso ou mostrar mensagem
          } catch (err: any) {
            setError(err.message || "Erro ao processar pagamento");
          } finally {
            setLoading(false);
          }
        },
        onError: (error: any) => {
          setError(error.message);
          setLoading(false);
        },
      },
    });

    setCardForm(form);
  };

  return (
    <div className="payment-form">
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => setMercadoPagoLoaded(true)}
      />

      <div className="payment-methods">
        <button
          className={`payment-method ${paymentMethod === "card" ? "active" : ""}`}
          onClick={() => setPaymentMethod("card")}
        >
          Cartão de crédito
        </button>
        <button
          className={`payment-method ${paymentMethod === "pix" ? "active" : ""}`}
          onClick={() => setPaymentMethod("pix")}
        >
          Pix
        </button>
      </div>

      {paymentMethod === "card" && (
        <form id="form-checkout" className="card-form">
          <div id="form-checkout__cardholderName" />
          <div id="form-checkout__cardholderEmail" />
          <div id="form-checkout__cardNumber" />
          <div className="row">
            <div id="form-checkout__expirationDate" />
            <div id="form-checkout__securityCode" />
          </div>
          <div id="form-checkout__installments" />
          <div className="row">
            <div id="form-checkout__identificationType" />
            <div id="form-checkout__identificationNumber" />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Processando..." : `Pagar R$ ${amount.toFixed(2)}`}
          </button>
        </form>
      )}

      {paymentMethod === "pix" && (
        <div className="pix-method">{/* Implementação do Pix aqui */}</div>
      )}
    </div>
  );
}
