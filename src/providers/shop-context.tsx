// contexts/shop-context.tsx
"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// ===== CART CONTEXT =====
export interface CartItem {
  productId: string;
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
  tamanho?: string;
  categoria?: string;
  subcategoria?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantidade: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "@roceria/cart";

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const parsedItems = JSON.parse(storedCart);
        setItems(parsedItems);
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (item) => item.productId === newItem.productId,
      );

      if (existingItem) {
        return prev.map((item) =>
          item.productId === newItem.productId
            ? { ...item, quantidade: item.quantidade + newItem.quantidade }
            : item,
        );
      }

      return [...prev, newItem];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantidade: number) => {
      if (quantidade <= 0) {
        removeItem(productId);
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantidade } : item,
        ),
      );
    },
    [removeItem],
  );

  const itemCount = items.reduce((acc, item) => acc + item.quantidade, 0);

  const total = items.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0,
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      total,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, itemCount, total],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// ===== SHOP PROVIDER COMPOSTO =====
export function ShopProvider({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
