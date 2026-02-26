//src/app/(public)/shop/cart/_components/main/payment/cart-data.tsx

import { CartDelivery, CartPayment } from "@/types";
import { FaBicycle, FaCreditCard } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { LuTruck } from "react-icons/lu";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { SiMercadopago } from "react-icons/si";

export const PaymentMethodData: CartPayment[] = [
  {
    id: "0",
    slug: "pix",
    name: "Pix",
    description: "Pague com Pix",
    enabled: true,
    isCreditCard: false,
    icon: <FaPix className="size-full" />,
  },
  {
    id: "1",
    slug: "stripe",
    name: "Cartão Crédito/Débito",
    description: "Nós aceitamos Mastercard, Visa, Elo and Stripe.",
    enabled: false,
    isCreditCard: true,
    icon: <FaCreditCard className="size-full" />,
  },
  {
    id: "2",
    slug: "mercado-pago",
    name: "Mercado Pago",
    description:
      "Com Mercado Pago, aceitamos Mastercard, Visa, Elo, Pix, etc...",
    enabled: true,
    isCreditCard: false,
    icon: <SiMercadopago className="size-full" />,
  },
  {
    id: "3",
    slug: "credit",
    name: "Cartão Crédito/Débito",
    description: "Nós aceitamos Mastercard, Visa, Elo.",
    enabled: true,
    isCreditCard: true,
    icon: <FaCreditCard className="size-full" />,
  },
];

export const DeliveryMethodData: CartDelivery[] = [
  {
    id: "0",
    name: "Free",
    price: 0,
    delivery_time: 7,
    delivery_range: {
      min: 5,
      max: 7,
    },
    company: {
      name: "",
      picture: "",
    },
    icon: <FaBicycle className="size-full" />,
    originalData: {},
  },
  {
    id: "1",
    name: "Standard",
    price: 10,
    delivery_time: 5,
    delivery_range: {
      min: 3,
      max: 5,
    },
    company: {
      name: "",
      picture: "",
    },
    originalData: {},
    icon: <LuTruck className="size-full" />,
  },
  {
    id: "2",
    name: "Express",
    price: 20,
    delivery_time: 3,
    delivery_range: {
      min: 2,
      max: 3,
    },
    company: {
      name: "",
      picture: "",
    },
    originalData: {},

    icon: <MdOutlineRocketLaunch className="size-full" />,
  },
];
