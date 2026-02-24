// app/(projetos)/components/layout/navbar/monted-navbar.tsx (ATUALIZADO)
"use client";

import { useScrollDirection } from "@/providers/scroll-context";
import { useCart } from "@/providers/shop-context";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Menu, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { CartDrawerButton } from "../io-drawer/mounteds/cart-drawer";
import { NotificationDrawerButton } from "../io-drawer/mounteds/notification-drawer";
// Importando o novo MainMenuButton
import { MainMenuButton } from "../io-menu/mounteds/menu-content";
import { RoceriaButton } from "../roceria-button";

// Componente Navbar que usa o contexto
function NavbarContent() {
  const { itemCount } = useCart();
  const isVisible = useScrollDirection();

  return (
    <>
      {/* Container para os botões */}
      <div
        className={`absolute top-5 right-5 flex w-fit items-center justify-between gap-2 transition-all duration-300 ease-in-out ${
          isVisible
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="flex flex-col items-end gap-2">
          {/* Botão do Menu Principal - AGORA USA MainMenuButton */}
          <MainMenuButton>
            <RoceriaButton
              variant="expandible"
              size="default"
              label="Menu"
              icon={<Menu size={18} className="shrink-0" />}
            />
          </MainMenuButton>

          {/* Botão de Minha Conta - Expandible */}
          <Link href="/minha-conta">
            <RoceriaButton
              variant="expandible"
              size="default"
              label="Conta"
              icon={<User size={18} className="shrink-0" />}
            />
          </Link>

          {/* Botão de Notificações */}
          <NotificationDrawerButton>
            <RoceriaButton
              variant="expandible"
              size="default"
              label="Notificações"
              icon={<Bell size={18} className="shrink-0" />}
            />
          </NotificationDrawerButton>

          {/* Botão do Carrinho com Badge */}
          <CartDrawerButton>
            <div className="relative">
              <RoceriaButton
                variant="expandible"
                size="default"
                label="Carrinho"
                icon={
                  <div className="relative flex items-center justify-center">
                    <ShoppingBag size={18} className="shrink-0" />

                    {/* Badge do Contador Dinâmico */}
                    <AnimatePresence>
                      {itemCount > 0 && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute -top-5 -right-5 flex size-5 items-center justify-center rounded-full bg-[#fbb725] text-[11px] leading-none font-bold text-[#141414] shadow-2xl ring-[#141414]"
                        >
                          {itemCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                }
              />
            </div>
          </CartDrawerButton>
        </div>
      </div>

      {/* O IoMenuContent agora é renderizado separadamente no layout principal */}
    </>
  );
}

// Componente principal
export default function Navbar() {
  return <NavbarContent />;
}
