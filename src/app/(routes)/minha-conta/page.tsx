/* eslint-disable react/no-unescaped-entities */
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Award,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Edit,
  Eye,
  EyeOff,
  Heart,
  LogOut,
  Mail,
  MapPin,
  Package,
  Phone,
  Plus,
  Save,
  Settings,
  ShoppingBag,
  Star,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Tipos
type TabType =
  | "perfil"
  | "pedidos"
  | "favoritos"
  | "enderecos"
  | "configuracoes";

// Dados simulados do usuário
const usuarioData = {
  nome: "João Silva",
  email: "joao.silva@email.com",
  telefone: "(11) 99999-9999",
  dataCadastro: "15 de março de 2024",
  avatar: "/avatars/default.jpg",
  pedidos: 12,
  favoritos: 8,
  cupons: 3,
};

// Dados simulados de pedidos
const pedidosData = [
  {
    id: "RO-2024-001",
    data: "10/02/2024",
    status: "entregue",
    total: 189.9,
    itens: 4,
    produtos: [
      {
        nome: "Queijo Minas Curado",
        quantidade: 2,
        preco: 58.9,
        imagem: "/Queijo Minas Curado 1.png",
      },
      {
        nome: "Linguiça Calabresa",
        quantidade: 1,
        preco: 36.9,
        imagem: "/Linguiça Calabresa 1.png",
      },
      {
        nome: "Pimenta Caseira",
        quantidade: 1,
        preco: 28.9,
        imagem: "/Pimenta Caseira - Malagueta Selecionada 1.png",
      },
    ],
  },
  {
    id: "RO-2024-002",
    data: "25/01/2024",
    status: "enviado",
    total: 242.7,
    itens: 3,
    produtos: [
      {
        nome: "Cesta Familiar",
        quantidade: 1,
        preco: 129.9,
        imagem: "/Cesta Familiar - Sabores da Roça 1.png",
      },
      {
        nome: "Doce de Leite",
        quantidade: 2,
        preco: 32.9,
        imagem: "/Doce de Leite - Panelão de Cobre 1.png",
      },
      {
        nome: "Mel de Engenho",
        quantidade: 1,
        preco: 38.9,
        imagem: "/Mel de Engenho 1.png",
      },
    ],
  },
  {
    id: "RO-2024-003",
    data: "03/01/2024",
    status: "processando",
    total: 159.9,
    itens: 4,
    produtos: [
      {
        nome: "Kit Queijos Artesanais",
        quantidade: 1,
        preco: 159.9,
        imagem: "/Kit Queijos Artesanais - 4 Tipos 1.png",
      },
    ],
  },
];

// Dados simulados de favoritos
const favoritosData = [
  {
    id: 1,
    nome: "Queijo Canastra",
    preco: 72.9,
    imagem: "/Queijo Canastra 1.png",
    avaliacao: 5,
  },
  {
    id: 2,
    nome: "Bacon de Fumeiro",
    preco: 48.9,
    imagem: "/Bacon de Fumeiro 1.png",
    avaliacao: 5,
  },
  {
    id: 3,
    nome: "Geleia de Pimenta",
    preco: 28.9,
    imagem: "/Geleia de Pimenta - Doce e Picante 1.png",
    avaliacao: 4,
  },
  {
    id: 4,
    nome: "Café da Fazenda",
    preco: 45.9,
    imagem: "/Café da Fazenda - Torra Artesanal 1.png",
    avaliacao: 5,
  },
];

// Dados simulados de endereços
const enderecosData = [
  {
    id: 1,
    nome: "Casa",
    endereco: "Rua das Flores, 123",
    complemento: "Apto 42",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    principal: true,
  },
  {
    id: 2,
    nome: "Trabalho",
    endereco: "Av. Paulista, 1000",
    complemento: "Sala 101",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100",
    principal: false,
  },
];

// Função para obter cor do status
const getStatusColor = (status: string) => {
  switch (status) {
    case "entregue":
      return "text-green-600 bg-green-50 border-green-200";
    case "enviado":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "processando":
      return "text-[#fbb725] bg-[#fbb725]/10 border-[#fbb725]/20";
    case "cancelado":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

// Função para obter ícone do status
const getStatusIcon = (status: string) => {
  switch (status) {
    case "entregue":
      return <CheckCircle className="h-4 w-4" />;
    case "enviado":
      return <Truck className="h-4 w-4" />;
    case "processando":
      return <Clock className="h-4 w-4" />;
    case "cancelado":
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

// Componente de navegação lateral
const Sidebar = ({
  tabAtiva,
  setTabAtiva,
}: {
  tabAtiva: TabType;
  setTabAtiva: (tab: TabType) => void;
}) => {
  const menuItems = [
    { id: "perfil" as TabType, label: "Perfil", icon: User },
    {
      id: "pedidos" as TabType,
      label: "Meus Pedidos",
      icon: Package,
      count: usuarioData.pedidos,
    },
    {
      id: "favoritos" as TabType,
      label: "Favoritos",
      icon: Heart,
      count: usuarioData.favoritos,
    },
    { id: "enderecos" as TabType, label: "Endereços", icon: MapPin },
    { id: "configuracoes" as TabType, label: "Configurações", icon: Settings },
  ];

  return (
    <div className="w-full flex-shrink-0 lg:w-72">
      <div className="sticky top-32 rounded-2xl border border-[#fbb725]/10 bg-[#f1f1f1] p-4">
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = tabAtiva === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setTabAtiva(item.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition-all",
                  isActive
                    ? "bg-[#141414] text-white"
                    : "text-[#141414]/60 hover:bg-[#fbb725]/10 hover:text-[#141414]",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-[#fbb725]" : "text-[#141414]/40",
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.count && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs",
                        isActive
                          ? "bg-[#fbb725] text-[#141414]"
                          : "bg-[#fbb725]/10 text-[#141414]/60",
                      )}
                    >
                      {item.count}
                    </span>
                  )}
                  <ChevronRight
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-[#fbb725]" : "text-[#141414]/20",
                    )}
                  />
                </div>
              </button>
            );
          })}

          <div className="my-3 border-t border-[#fbb725]/10" />

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 transition-all hover:bg-red-50">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de cabeçalho do perfil
const ProfileHeader = ({
  modoEdicao,
  setModoEdicao,
}: {
  modoEdicao: boolean;
  setModoEdicao: (value: boolean) => void;
}) => {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-[#fbb725] bg-[#fbb725]/10">
            <img
              src={usuarioData.avatar}
              alt={usuarioData.nome}
              className="h-full w-full object-cover"
            />
          </div>
          <button className="absolute -right-1 -bottom-1 rounded-full border-2 border-white bg-[#fbb725] p-1.5">
            <Edit className="h-3 w-3 text-[#141414]" />
          </button>
        </div>
        <div>
          <h2 className="font-bitter text-2xl font-light text-[#141414]">
            Olá,{" "}
            <span className="font-bold">{usuarioData.nome.split(" ")[0]}</span>
          </h2>
          <p className="text-sm text-[#141414]/60">
            Membro desde {usuarioData.dataCadastro}
          </p>
        </div>
      </div>

      <button
        onClick={() => setModoEdicao(!modoEdicao)}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
          modoEdicao
            ? "bg-[#141414] text-white"
            : "border border-[#fbb725] text-[#141414] hover:bg-[#fbb725]/10",
        )}
      >
        {modoEdicao ? (
          <>
            <EyeOff className="h-4 w-4" />
            Cancelar Edição
          </>
        ) : (
          <>
            <Edit className="h-4 w-4" />
            Editar Perfil
          </>
        )}
      </button>
    </div>
  );
};

// Componente de estatísticas
const StatsCards = () => {
  const stats = [
    {
      label: "Pedidos Realizados",
      value: usuarioData.pedidos,
      icon: ShoppingBag,
      color: "#fbb725",
    },
    {
      label: "Produtos Favoritos",
      value: usuarioData.favoritos,
      icon: Heart,
      color: "#141414",
    },
    {
      label: "Cupons Disponíveis",
      value: usuarioData.cupons,
      icon: Award,
      color: "#fbb725",
    },
    { label: "Avaliações", value: 24, icon: Star, color: "#141414" },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl border border-[#fbb725]/10 bg-white p-4 text-center"
          >
            <div className="mb-2 flex justify-center">
              <div
                className="rounded-full p-2"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <Icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#141414]">{stat.value}</p>
            <p className="text-xs text-[#141414]/60">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

// Componente do perfil
const PerfilTab = ({ modoEdicao }: { modoEdicao: boolean }) => {
  const [formData, setFormData] = useState({
    nome: usuarioData.nome,
    email: usuarioData.email,
    telefone: usuarioData.telefone,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="rounded-xl border border-[#fbb725]/10 bg-white p-6">
        <h3 className="font-bitter mb-4 text-lg font-medium text-[#141414]">
          Informações Pessoais
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium text-[#141414]/60">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#fbb725]" />
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                disabled={!modoEdicao}
                className={cn(
                  "w-full rounded-lg border py-2 pr-4 pl-10 text-sm transition-all",
                  modoEdicao
                    ? "border-[#fbb725]/30 outline-none focus:border-[#fbb725] focus:ring-1 focus:ring-[#fbb725]"
                    : "border-transparent bg-gray-50 text-[#141414]/60",
                )}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[#141414]/60">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#fbb725]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!modoEdicao}
                className={cn(
                  "w-full rounded-lg border py-2 pr-4 pl-10 text-sm transition-all",
                  modoEdicao
                    ? "border-[#fbb725]/30 outline-none focus:border-[#fbb725] focus:ring-1 focus:ring-[#fbb725]"
                    : "border-transparent bg-gray-50 text-[#141414]/60",
                )}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[#141414]/60">
              Telefone
            </label>
            <div className="relative">
              <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#fbb725]" />
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                disabled={!modoEdicao}
                className={cn(
                  "w-full rounded-lg border py-2 pr-4 pl-10 text-sm transition-all",
                  modoEdicao
                    ? "border-[#fbb725]/30 outline-none focus:border-[#fbb725] focus:ring-1 focus:ring-[#fbb725]"
                    : "border-transparent bg-gray-50 text-[#141414]/60",
                )}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[#141414]/60">
              Data de Cadastro
            </label>
            <div className="relative">
              <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#fbb725]" />
              <input
                type="text"
                value={usuarioData.dataCadastro}
                disabled
                className="w-full rounded-lg border-transparent bg-gray-50 py-2 pr-4 pl-10 text-sm text-[#141414]/60"
              />
            </div>
          </div>
        </div>

        {modoEdicao && (
          <div className="mt-6 flex justify-end">
            <button className="flex items-center gap-2 rounded-full bg-[#fbb725] px-6 py-2 text-sm font-medium text-[#141414] transition-all hover:bg-[#fbb725]/80">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </button>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-[#fbb725]/10 bg-white p-6">
        <h3 className="font-bitter mb-4 text-lg font-medium text-[#141414]">
          Segurança
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium text-[#141414]/60">
              Senha Atual
            </label>
            <div className="relative">
              {showPassword ? (
                <EyeOff
                  className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 cursor-pointer text-[#fbb725]"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 cursor-pointer text-[#fbb725]"
                  onClick={() => setShowPassword(true)}
                />
              )}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-lg border border-[#fbb725]/30 px-4 py-2 text-sm outline-none focus:border-[#fbb725] focus:ring-1 focus:ring-[#fbb725]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[#141414]/60">
              Nova Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-[#fbb725]/30 px-4 py-2 text-sm outline-none focus:border-[#fbb725] focus:ring-1 focus:ring-[#fbb725]"
            />
          </div>
        </div>

        <div className="mt-4">
          <button className="text-sm text-[#fbb725] hover:underline">
            Alterar senha
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Componente de pedidos
const PedidosTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {pedidosData.map((pedido) => (
        <div
          key={pedido.id}
          className="rounded-xl border border-[#fbb725]/10 bg-white p-6"
        >
          <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-bitter font-medium text-[#141414]">
                  Pedido #{pedido.id}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full border px-2 py-1 text-xs",
                    getStatusColor(pedido.status),
                  )}
                >
                  {getStatusIcon(pedido.status)}
                  {pedido.status.charAt(0).toUpperCase() +
                    pedido.status.slice(1)}
                </span>
              </div>
              <p className="mt-1 text-sm text-[#141414]/60">
                Realizado em {pedido.data} • {pedido.itens}{" "}
                {pedido.itens === 1 ? "item" : "itens"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#141414]">
                R$ {pedido.total.toFixed(2)}
              </p>
              <button className="mt-1 text-xs text-[#fbb725] hover:underline">
                Ver detalhes
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {pedido.produtos.slice(0, 3).map((produto, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-lg bg-[#f1f1f1] p-2"
              >
                <div className="h-10 w-10 overflow-hidden rounded-md bg-white">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#141414]">
                    {produto.nome}
                  </p>
                  <p className="text-[10px] text-[#141414]/60">
                    {produto.quantidade}x R$ {produto.preco.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            {pedido.produtos.length > 3 && (
              <div className="flex items-center rounded-lg bg-[#f1f1f1] px-3 text-sm text-[#141414]/60">
                +{pedido.produtos.length - 3}
              </div>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

// Componente de favoritos
const FavoritosTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      {favoritosData.map((item) => (
        <div
          key={item.id}
          className="group overflow-hidden rounded-xl border border-[#fbb725]/10 bg-white transition-all hover:shadow-lg"
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={item.imagem}
              alt={item.nome}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <button className="absolute top-2 right-2 rounded-full bg-white p-1.5 shadow-md transition-colors hover:bg-[#fbb725]">
              <Heart className="h-4 w-4 fill-[#fbb725] text-[#fbb725]" />
            </button>
          </div>
          <div className="p-3">
            <h3 className="mb-1 text-sm font-medium text-[#141414]">
              {item.nome}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#141414]">
                R$ {item.preco.toFixed(2)}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < item.avaliacao
                        ? "fill-[#fbb725] text-[#fbb725]"
                        : "text-[#141414]/20",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

// Componente de endereços
const EnderecosTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-full bg-[#fbb725] px-4 py-2 text-sm font-medium text-[#141414] transition-all hover:bg-[#fbb725]/80">
          <Plus className="h-4 w-4" />
          Novo Endereço
        </button>
      </div>

      {enderecosData.map((endereco) => (
        <div
          key={endereco.id}
          className="rounded-xl border border-[#fbb725]/10 bg-white p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-bitter font-medium text-[#141414]">
                  {endereco.nome}
                </h3>
                {endereco.principal && (
                  <span className="rounded-full bg-[#fbb725] px-2 py-0.5 text-[10px] font-medium text-[#141414]">
                    Principal
                  </span>
                )}
              </div>
              <p className="text-sm text-[#141414]/80">
                {endereco.endereco}, {endereco.complemento}
              </p>
              <p className="text-sm text-[#141414]/80">
                {endereco.bairro} - {endereco.cidade}/{endereco.estado}
              </p>
              <p className="text-sm text-[#141414]/80">CEP: {endereco.cep}</p>
            </div>

            <div className="flex gap-2">
              <button className="p-2 text-[#141414]/40 transition-colors hover:text-[#fbb725]">
                <Edit className="h-4 w-4" />
              </button>
              {!endereco.principal && (
                <button className="p-2 text-[#141414]/40 transition-colors hover:text-red-500">
                  <XCircle className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

// Componente de configurações
const ConfiguracoesTab = () => {
  const [notificacoes, setNotificacoes] = useState({
    email: true,
    sms: false,
    promocoes: true,
    pedidos: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="rounded-xl border border-[#fbb725]/10 bg-white p-6">
        <h3 className="font-bitter mb-4 text-lg font-medium text-[#141414]">
          Preferências de Notificação
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between rounded-lg bg-[#f1f1f1] p-3">
            <div>
              <p className="font-medium text-[#141414]">
                Notificações por E-mail
              </p>
              <p className="text-xs text-[#141414]/60">
                Receba atualizações sobre pedidos e ofertas
              </p>
            </div>
            <button
              onClick={() =>
                setNotificacoes({ ...notificacoes, email: !notificacoes.email })
              }
              className={cn(
                "relative h-6 w-12 rounded-full transition-colors",
                notificacoes.email ? "bg-[#fbb725]" : "bg-gray-300",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                  notificacoes.email ? "left-7" : "left-1",
                )}
              />
            </button>
          </label>

          <label className="flex items-center justify-between rounded-lg bg-[#f1f1f1] p-3">
            <div>
              <p className="font-medium text-[#141414]">Notificações por SMS</p>
              <p className="text-xs text-[#141414]/60">
                Confirmações e atualizações via mensagem
              </p>
            </div>
            <button
              onClick={() =>
                setNotificacoes({ ...notificacoes, sms: !notificacoes.sms })
              }
              className={cn(
                "relative h-6 w-12 rounded-full transition-colors",
                notificacoes.sms ? "bg-[#fbb725]" : "bg-gray-300",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                  notificacoes.sms ? "left-7" : "left-1",
                )}
              />
            </button>
          </label>

          <label className="flex items-center justify-between rounded-lg bg-[#f1f1f1] p-3">
            <div>
              <p className="font-medium text-[#141414]">
                Promoções e Novidades
              </p>
              <p className="text-xs text-[#141414]/60">
                Receba ofertas especiais e lançamentos
              </p>
            </div>
            <button
              onClick={() =>
                setNotificacoes({
                  ...notificacoes,
                  promocoes: !notificacoes.promocoes,
                })
              }
              className={cn(
                "relative h-6 w-12 rounded-full transition-colors",
                notificacoes.promocoes ? "bg-[#fbb725]" : "bg-gray-300",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                  notificacoes.promocoes ? "left-7" : "left-1",
                )}
              />
            </button>
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-[#fbb725]/10 bg-white p-6">
        <h3 className="font-bitter mb-4 text-lg font-medium text-[#141414]">
          Privacidade
        </h3>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-[#141414]">
              Dados Compartilhados
            </p>
            <p className="text-sm text-[#141414]/60">
              Seus dados são utilizados apenas para processar pedidos e melhorar
              sua experiência. Não compartilhamos suas informações com
              terceiros.
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[#141414]">
              Excluir Conta
            </p>
            <p className="mb-3 text-sm text-[#141414]/60">
              Ao excluir sua conta, todos os seus dados serão permanentemente
              removidos.
            </p>
            <button className="text-sm text-red-500 hover:underline">
              Solicitar exclusão de conta
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Página principal
export default function MyAccountPage() {
  const [tabAtiva, setTabAtiva] = useState<TabType>("perfil");
  const [modoEdicao, setModoEdicao] = useState(false);

  return (
    <div className="min-h-screen bg-[#f1f1f1] py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#141414]/60">
          <Link href="/" className="hover:text-[#fbb725]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#141414]">Minha Conta</span>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <Sidebar tabAtiva={tabAtiva} setTabAtiva={setTabAtiva} />

          {/* Conteúdo Principal */}
          <div className="flex-1">
            <ProfileHeader
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
            />

            {tabAtiva === "perfil" && <StatsCards />}

            <AnimatePresence mode="wait">
              {tabAtiva === "perfil" && (
                <PerfilTab key="perfil" modoEdicao={modoEdicao} />
              )}
              {tabAtiva === "pedidos" && <PedidosTab key="pedidos" />}
              {tabAtiva === "favoritos" && <FavoritosTab key="favoritos" />}
              {tabAtiva === "enderecos" && <EnderecosTab key="enderecos" />}
              {tabAtiva === "configuracoes" && (
                <ConfiguracoesTab key="configuracoes" />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
