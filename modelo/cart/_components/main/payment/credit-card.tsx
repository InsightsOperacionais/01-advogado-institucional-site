// src/app/(public)/shop/cart/_components/main/payment/credit-card.tsx
"use client";

//#region Imports
import { FloatingInput } from "@/components/input-floating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-edited/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/hooks/use-cart";
import { Card, User } from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

//#endregion

const cardSchema = z.object({
  holder: z.string().min(4, "Nome do titular é obrigatório"),
  installments: z.coerce.number().min(1),
  number: z.string().min(16, "Número do cartão inválido"),
  expiration: z.string().min(4, "Data de expiração inválida"),
  cvv: z.string().min(3, "CVV inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  operationType: z.enum(["credit_card", "debit_card"]),
  saveCard: z.boolean().default(false),
});

declare global {
  interface Window {
    MercadoPago: any;
  }
}

interface CreditCardProps {
  user: User | null;
}

export function CreditCard({ user }: CreditCardProps) {
  const form = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      holder: "",
      installments: 1,
      number: "",
      expiration: "",
      cvv: "",
      cpf: "",
      operationType: "credit_card",
      saveCard: false,
    },
  });

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [mercadoPagoLoaded, setMercadoPagoLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mpInstance, setMpInstance] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [issuer, setIssuer] = useState<any>(null);
  const [installmentsOptions, setInstallmentsOptions] = useState<any[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { items } = useCart();

  useEffect(() => {
    if (mercadoPagoLoaded) {
      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
        locale: "pt-BR",
      });
      setMpInstance(mp);
    }
  }, [mercadoPagoLoaded]);

  // Detecta o tipo de cartão quando o número muda
  useEffect(() => {
    if (paymentMethod && form.getValues("number").length < 6) {
      setPaymentMethod(null);
      setIssuer(null);
    }

    const value = form.getValues("number");
    if (value.length < 6) return;
    detectPaymentMethod(value);
  }, [form.watch("number")]);

  useEffect(() => {
    if (form.getValues("operationType") === "debit_card") {
      form.setValue("installments", 1);
    }
  }, [form.watch("operationType")]);

  // Busca parcelas quando o paymentMethod ou valor total muda
  useEffect(() => {
    if (
      !selectedCard &&
      paymentMethod &&
      form.getValues("number").length >= 15
    ) {
      getInstallments();
    }
  }, [paymentMethod, issuer]);

  useEffect(() => {
    if (!selectedCard) {
      setInstallmentsOptions([]);
    }
    if (selectedCard) {
      console.log(selectedCard.firstSixDigits);
      getInstallmentsSelectCard();
    }
  }, [selectedCard]);

  useEffect(() => {
    const isValid = form.formState.isValid;
    setIsValid(isValid);

    if (isValid && !loading && !hasSubmitted && mpInstance) {
      setHasSubmitted(true);
      onSubmit(form.getValues());
    }
  }, [form.formState.isValid]);

  // Reset hasSubmitted quando o formulário for modificado
  useEffect(() => {
    const subscription = form.watch(() => {
      if (!form.formState.isValid) {
        setHasSubmitted(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  useEffect(() => {
    sessionStorage.setItem(
      "saveCard",
      form.getValues("saveCard") === true ? "true" : "false",
    );
  }, [form.watch("saveCard")]);

  const detectPaymentMethod = async (bin: string) => {
    if (!mpInstance || !bin || selectedCard) return;

    try {
      const { results } = await mpInstance.getPaymentMethods({ bin });

      if (results && results.length > 0) {
        const operations: Array<"credit_card" | "debit_card"> = [];

        // Verifica quais operações estão disponíveis
        if (
          results.some(
            (method: any) => method.payment_type_id === "credit_card",
          )
        ) {
          operations.push("credit_card");
        }
        if (
          results.some((method: any) => method.payment_type_id === "debit_card")
        ) {
          operations.push("debit_card");
        }

        // Seleciona o primeiro método de pagamento válido
        const validPaymentMethod = results.find(
          (method: any) =>
            method.payment_type_id === "credit_card" ||
            method.payment_type_id === "debit_card",
        );

        if (validPaymentMethod) {
          setPaymentMethod(validPaymentMethod);
          setIssuer(validPaymentMethod.issuer);

          // Define o tipo de operação padrão
          if (operations.length === 1) {
            form.setValue("operationType", operations[0]);
          } else {
            form.setValue("operationType", "credit_card"); // Default para crédito
          }
        }
      }
    } catch (err) {
      console.error("Erro ao detectar método de pagamento:", err);
      setError("Não foi possível identificar a bandeira do cartão");
    }
  };

  const getInstallments = async () => {
    if (!mpInstance || !paymentMethod) {
      // Fallback básico
      setInstallmentsOptions([
        {
          installments: 1,
          installment_amount: items.reduce((acc, item) => acc + item.price, 0),
        },
      ]);
      return;
    }

    const operationType = form.getValues("operationType");
    const isDebit = operationType === "debit_card";

    try {
      const amount = items
        .reduce((acc, item) => acc + item.price, 0)
        .toString();
      const bin = form.getValues("number");

      // Se for cartão de débito, apenas 1 parcela
      if (isDebit) {
        setInstallmentsOptions([
          {
            installments: 1,
            installment_amount: amount,
          },
        ]);
        form.setValue("installments", 1);
        return;
      }

      // Para crédito, busca as parcelas disponíveis
      const installments = await mpInstance.getInstallments({
        amount: amount,
        bin: bin,
        payment_method_id: paymentMethod.id,
      });

      if (
        installments &&
        installments.length > 0 &&
        installments[0].payer_costs
      ) {
        setInstallmentsOptions(installments[0].payer_costs);
      } else {
        // Fallback para 1 parcela se não encontrar opções
        setInstallmentsOptions([
          {
            installments: 1,
            installment_amount: amount,
          },
        ]);
      }
    } catch (err) {
      console.error("Erro ao obter parcelas:", err);
      // Fallback para 1 parcela em caso de erro
      setInstallmentsOptions([
        {
          installments: 1,
          installment_amount: items.reduce((acc, item) => acc + item.price, 0),
        },
      ]);
    }
  };

  const getInstallmentsSelectCard = async () => {
    if (!selectedCard || !mpInstance) {
      setInstallmentsOptions([
        {
          installments: 1,
          installment_amount: items.reduce((acc, item) => acc + item.price, 0),
        },
      ]);
      return;
    }

    const isDebit = selectedCard.operationType === "debit_card";

    try {
      const amount = items
        .reduce((acc, item) => acc + item.price, 0)
        .toString();

      if (isDebit) {
        setInstallmentsOptions([
          {
            installments: 1,
            installment_amount: amount,
          },
        ]);
        form.setValue("installments", 1);
        return;
      }

      const installments = await mpInstance.getInstallments({
        amount: amount,
        bin: selectedCard.firstSixDigits,
        payment_method_id: selectedCard.paymentMethodId,
      });

      if (
        installments &&
        installments.length > 0 &&
        installments[0].payer_costs
      ) {
        setInstallmentsOptions(installments[0].payer_costs);
      } else {
        // Fallback para 1 parcela se não encontrar opções
        setInstallmentsOptions([
          {
            installments: 1,
            installment_amount: amount,
          },
        ]);
      }
    } catch (err) {
      console.error("Erro ao obter parcelas:", err);
      // Fallback para 1 parcela em caso de erro
      setInstallmentsOptions([
        {
          installments: 1,
          installment_amount: items.reduce((acc, item) => acc + item.price, 0),
        },
      ]);
    }
  };

  async function onSubmit(values: z.infer<typeof cardSchema>) {
    if (!mpInstance) {
      return;
    }

    setLoading(true);

    try {
      let tokenResponse;
      if (selectedCard) {
        try {
          const decryptedCard = await axios.get(
            `/api/cards/${selectedCard.id}/decrypt`,
          );

          if (!decryptedCard.data?.number || !decryptedCard.data.cpf) {
            throw new Error("Dados do cartão incompletos");
          }

          // 2. Criar token com os dados descriptografados
          tokenResponse = await mpInstance.createCardToken({
            cardNumber: decryptedCard.data.number,
            cardholderName: decryptedCard.data.holderName,
            cardExpirationMonth: values.expiration.split("/")[0],
            cardExpirationYear: values.expiration.split("/")[1],
            securityCode: values.cvv,
            identificationType: "CPF",
            identificationNumber: decryptedCard.data.cpf,
          });

          if (tokenResponse.error) {
            throw new Error(tokenResponse.error.message);
          }

          sessionStorage.setItem(
            "mp_card_data",
            JSON.stringify({
              token: tokenResponse.id,
              installments: values.installments,
              paymentMethodId: selectedCard.paymentMethodId,
              issuerId: selectedCard.issuerId,
              cardType: values.operationType,
            }),
          );

          decryptedCard.data.number = null;
          decryptedCard.data.cpf = null;
        } catch (err) {
          throw new Error("Falha ao processar cartão salvo");
        }
      } else {
        tokenResponse = await mpInstance.createCardToken({
          cardNumber: values.number,
          cardholderName: values.holder,
          cardExpirationMonth: values.expiration.split("/")[0],
          cardExpirationYear: values.expiration.split("/")[1],
          securityCode: values.cvv,
          identificationType: "CPF",
          identificationNumber: values.cpf,
        });

        if (tokenResponse.error) {
          throw new Error(tokenResponse.error.message);
        }

        sessionStorage.setItem(
          "mp_card_data",
          JSON.stringify({
            token: tokenResponse.id,
            installments: values.installments,
            paymentMethodId: paymentMethod?.id,
            issuerId: issuer?.id,
            cardType: values.operationType,
          }),
        );

        sessionStorage.setItem(
          "mp_card_info",
          JSON.stringify({
            holder: values.holder,
            number: values.number,
            cpf: values.cpf,
            issuer: issuer?.name,
            paymentMethodId: paymentMethod?.id,
            issuerId: issuer?.id,
            operationType: values.operationType,
          }),
        );
      }
    } catch (err: any) {
      setError(err.message || "Erro ao validar cartão");
      setHasSubmitted(false);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Obter o nome amigável da bandeira do cartão
  const getCardBrandName = () => {
    if (!paymentMethod) return "";

    const brands: Record<string, string> = {
      visa: "Visa",
      master: "Mastercard",
      amex: "American Express",
      elo: "Elo",
      hipercard: "Hipercard",
      diners: "Diners Club",
    };

    return brands[paymentMethod.id.toLowerCase()] || paymentMethod.name;
  };

  const getCardBrandIcon = (name: string) => {
    switch (name) {
      case "Visa":
        return (
          <Image
            src={"/cards_brand/visa.svg"}
            alt="Visa"
            height={30}
            width={50}
          />
        );
      case "Mastercard":
        return (
          <Image
            src={"/cards_brand/mastercard.svg"}
            alt="Mastercard"
            height={30}
            width={50}
          />
        );
      case "American Express":
        return (
          <Image
            src={"/cards_brand/american-express.svg"}
            alt="American Express"
            height={30}
            width={50}
          />
        );
      case "Elo":
        return (
          <Image
            src={"/cards_brand/elo.svg"}
            alt="Elo"
            height={30}
            width={50}
          />
        );
      case "Hipercard":
        return (
          <Image
            src={"/cards_brand/hipercard.svg"}
            alt="Hipercard"
            height={30}
            width={50}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => setMercadoPagoLoaded(true)}
      />

      {user && user.cards && user.cards.length > 0 && (
        <Select
          onValueChange={(value) => {
            if (value === "null") {
              form.reset({
                holder: "",
                number: "",
                expiration: "",
                cvv: "",
                cpf: "",
                operationType: "credit_card",
                installments: 1,
                saveCard: false,
              });
              setSelectedCard(null);
              setPaymentMethod(null);
              setIssuer(null);
            } else if (value) {
              const card = JSON.parse(value);
              form.reset({
                holder: card.holderName,
                number: `**** **** **** ${card.lastFourDigits}`,
                expiration: card.expiration,
                cvv: "",
                cpf: "***.***.***-**",
                operationType: card.operationType || "credit_card",
                installments: 1,
                saveCard: false,
              });
              setSelectedCard(card);

              // Define paymentMethod e issuer baseado no cartão salvo
              if (card.paymentMethodId && card.issuerId) {
                setPaymentMethod({
                  id: card.paymentMethodId,
                  name: card.issuer,
                  thumbnail: `/images/${card.issuer.toLowerCase().replace(" ", "-")}.png`,
                });
                setIssuer({
                  id: card.issuerId,
                  name: card.issuer,
                });
              }
            }
          }}
        >
          <SelectTrigger className="w-full gap-4">
            <SelectValue placeholder="Selecione um cartão" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">Novo cartão</SelectItem>
            {user?.cards.map((card) => (
              <SelectItem key={card.id} value={JSON.stringify(card)}>
                <div className="flex items-center gap-2">
                  {getCardBrandIcon(card.issuer)}
                  <span>**** **** **** {card.lastFourDigits}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full pr-14">
          <div className="grid w-full grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="holder"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingInput
                      label="Titular do cartão"
                      fixedLabel
                      placeholder="Nome como no cartão"
                      disabled={!!selectedCard}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {selectedCard ? (
                      <FloatingInput
                        label="Número do cartão"
                        fixedLabel
                        disabled
                        {...field}
                      />
                    ) : (
                      <FloatingInput
                        label="Número do cartão"
                        fixedLabel
                        formattedValue={false}
                        format="#### #### #### ####"
                        placeholder="0000 0000 0000 0000"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingInput
                      label="CVV/CVC"
                      fixedLabel
                      placeholder="000"
                      format="###"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingInput
                      label="Validade"
                      fixedLabel
                      placeholder="MM/AA"
                      format="MM/AA"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {selectedCard ? (
                      <FloatingInput
                        label="CPF"
                        fixedLabel
                        disabled
                        {...field}
                      />
                    ) : (
                      <FloatingInput
                        label="CPF"
                        fixedLabel
                        formattedValue={false}
                        placeholder="000.000.000-00"
                        format="###.###.###-##"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="installments"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                      disabled={
                        form.watch("operationType") === "debit_card" ||
                        installmentsOptions.length === 0
                      }
                    >
                      <SelectTrigger label="Parcelas">
                        <SelectValue placeholder="Parcelas" />
                      </SelectTrigger>
                      <SelectContent>
                        {installmentsOptions.map((option) => (
                          <SelectItem
                            key={option.installments}
                            value={option.installments.toString()}
                          >
                            {option.installments >= 2
                              ? `${option.installments}x de R$ ${Number(option.installment_amount).toFixed(2)} (R$ ${option.total_amount})`
                              : `${option.installments}x de R$ ${Number(option.installment_amount).toFixed(2)}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-3 space-y-2">
              <FormField
                control={form.control}
                name="operationType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="credit_card"
                            id="credit_card"
                          />
                          <Label htmlFor="credit_card">Crédito</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="debit_card" id="debit_card" />
                          <Label htmlFor="debit_card">Débito</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {user && !selectedCard && (
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="saveCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="saveCard"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label htmlFor="saveCard">
                            Salvar cartão para compras futuras
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {paymentMethod && !selectedCard && (
              <div className="col-span-3 flex items-center gap-2">
                <Image
                  src={paymentMethod.thumbnail}
                  alt={paymentMethod.name}
                  width={24}
                  height={16}
                  className="h-6 w-auto"
                />
                <span className="text-sm font-medium">
                  {getCardBrandName()}
                  {/* {isDebitCard ? "(Débito)" : "(Crédito)"} */}
                </span>
              </div>
            )}

            {/* {error && (
              <div className="col-span-3 text-sm text-red-500">{error}</div>
            )} */}

            <div className="mt-4 flex items-center gap-2">
              {isValid ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <AlertCircle className="text-yellow-500" />
              )}
              <span>
                {isValid
                  ? "Cartão válido"
                  : "Preencha todos os campos corretamente"}
              </span>
              {loading && <Loader className="ml-2 animate-spin" />}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

export default CreditCard;
