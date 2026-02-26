// data/adapters/product-adapter.ts
import type { CardProduct, Product } from "../types/shop-contracts";

export function adaptProductToCardProduct(product: Product): CardProduct {
  // Encontrar a variação com menor preço
  const lowestPriceVariation = product.variations?.reduce((min, current) => {
    const currentPrice = parseFloat(current.salePrice || current.price);
    const minPrice = parseFloat(min.salePrice || min.price);
    return currentPrice < minPrice ? current : min;
  }, product.variations[0]);

  // Extrair ingredientes dos atributos
  const ingredientes =
    product.attributes
      ?.filter(
        (attr) =>
          attr.value?.attribute?.name?.toLowerCase() === "ingredientes" ||
          attr.value?.label?.toLowerCase().includes("ingrediente"),
      )
      .map((attr) => attr.value.label || attr.value.value) || [];

  // Extrair se é defumado (pode vir dos atributos ou propriedades)
  const defumado =
    product.attributes?.some(
      (attr) =>
        attr.value.label?.toLowerCase().includes("defumado") ||
        attr.value.value?.toLowerCase().includes("defumado"),
    ) || false;

  // Extrair produção familiar (pode vir das propriedades)
  const producaoFamiliar = product.properties?.producaoFamiliar || false;

  return {
    id: product.id,
    nome: product.name,
    descricao: product.description || "",
    preco: lowestPriceVariation
      ? parseFloat(lowestPriceVariation.salePrice || lowestPriceVariation.price)
      : 0,
    imagem: product.images?.find((img) => img.role === "COVER")?.url || "",
    categoria: product.category?.name || "",
    subcategoria: "",
    formato: product.properties?.formato || "",
    tamanho: product.properties?.tamanho || "",
    ingredientes: ingredientes,
    artesanal: product.properties?.artesanal || false,
    defumado: defumado,
    producaoFamiliar: producaoFamiliar,
    destaque: product.properties?.label?.sale?.state || false,
    rating: 0,
    reviews: 0,
    // Adicionar o content para usar no card
    conteudo: product.content || "",
  };
}

export function adaptProductsToCardProducts(
  products: Product[],
): CardProduct[] {
  return products.map(adaptProductToCardProduct);
}
