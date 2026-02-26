"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/app/(auth)/actions/login";
import { LoginSchema } from "@/app/(auth)/schemas";
import { AddressForm } from "@/components/address/address-form";
import { FloatingInput } from "@/components/input-floating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Address } from "@/types";

interface NoUserBillingProps {
  setSelectedAddress: (address: Address) => void;
  setCartState?: (state: number) => void;
}

export default function NoUserBilling({
  setSelectedAddress,
  setCartState,
}: NoUserBillingProps) {
  const [asGuest, setAsGuest] = useState(false);
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("selectedAddress")) {
      setAddress(JSON.parse(localStorage.getItem("selectedAddress")!));
    }

    if (localStorage.getItem("asGuest")) {
      setAsGuest(true);
    }
  }, []);

  const saveGuest = () => {
    setAsGuest(true);
    localStorage.setItem("asGuest", "true");
  };

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setIsPending(true);

    try {
      const result = await login(values);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        // Login bem-sucedido - atualiza a página para refletir o estado de autenticação
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {asGuest ? (
          <AddressForm
            user={null}
            address={address}
            onSelect={setSelectedAddress}
          />
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="flex w-96 flex-col">
              <p className="text-io-text-primary text-xl font-bold">
                Entrar em sua conta
              </p>
              <p className="text-io-text-secondary mt-4 text-sm">
                Você não possui uma conta?
                <span className="text-io-primary ml-2 font-bold underline">
                  Crie uma agora
                </span>
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 flex flex-col gap-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingInput
                            label="Email"
                            disabled={isPending}
                            {...field}
                            fixedLabel
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col items-end">
                    <Button
                      className="text-io-text-secondary mb-1 p-0 text-xs"
                      variant={"link"}
                      size={"sm"}
                      type="button"
                    >
                      Esqueceu a senha?
                    </Button>

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <FloatingInput
                              label="Senha"
                              variant="password"
                              disabled={isPending}
                              {...field}
                              fixedLabel
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {error && (
                    <p className="text-destructive text-sm font-medium">
                      {error}
                    </p>
                  )}

                  <Button
                    className="w-full"
                    size={"lg"}
                    disabled={isPending}
                    type="submit"
                  >
                    {isPending ? "Entrando..." : "Entrar"}
                  </Button>

                  <div className="flex w-full items-center gap-4">
                    <div className="bg-io-input-border h-[1px] w-full"></div>
                    <p>Ou</p>
                    <div className="bg-io-input-border h-[1px] w-full"></div>
                  </div>

                  <Button
                    className="w-full"
                    size={"lg"}
                    variant={"outline"}
                    onClick={() => saveGuest()}
                    type="button"
                    disabled={isPending}
                  >
                    Continuar como visitante
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
