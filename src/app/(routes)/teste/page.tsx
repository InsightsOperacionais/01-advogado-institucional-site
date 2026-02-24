// app/teste/page.tsx
"use client";

import fetchAttributes, {
  AttributesResponse,
} from "@/data/api/fetch-attributes";
import fetchCategories from "@/data/api/fetch-categories";
import fetchProducts from "@/data/api/fetch-products";
import { Product, ProductCategory } from "@/data/types/shop";
import { useEffect, useState } from "react";

export default function TestePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[] | null>(null);
  const [attributes, setAttributes] = useState<AttributesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedAttribute, setExpandedAttribute] = useState<string | null>(
    null,
  );
  const [expandedAttributeValue, setExpandedAttributeValue] = useState<
    string | null
  >(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        console.log("🚀 Iniciando busca de dados...");
        console.log("API URL:", process.env.NEXT_PUBLIC_BACKEND_API_URL);
        console.log("Token presente:", !!process.env.NEXT_PUBLIC_API_TOKEN);

        const [productsData, categoriesData, attributesData] =
          await Promise.allSettled([
            fetchProducts({ limit: 10 }),
            fetchCategories(),
            fetchAttributes(),
          ]);

        // Processa produtos
        if (productsData.status === "fulfilled") {
          console.log("📦 Produtos recebidos:", productsData.value);
          setProducts(productsData.value);
        } else {
          console.error("❌ Erro nos produtos:", productsData.reason);
        }

        // Processa categorias
        if (categoriesData.status === "fulfilled") {
          console.log("📁 Categorias recebidas:", categoriesData.value);
          setCategories(categoriesData.value.tree);
        } else {
          console.error("❌ Erro nas categorias:", categoriesData.reason);
        }

        // Processa atributos
        if (attributesData.status === "fulfilled") {
          console.log("🏷️ Atributos recebidos:", attributesData.value);
          setAttributes(attributesData.value);
        } else {
          console.error("❌ Erro nos atributos:", attributesData.reason);
        }
      } catch (err) {
        console.error("❌ Erro geral:", err);
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#fbb725]"></div>
              <p className="text-center text-gray-600">
                Carregando dados da Roçaria...
              </p>
              <p className="text-sm text-gray-400">
                Buscando produtos, categorias e atributos...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="text-center">
              <p className="font-semibold text-red-600">Erro: {error}</p>
              <p className="mt-2 text-gray-600">
                Verifique se:
                <br />
                1. O backend está rodando em http://localhost:3000
                <br />
                2. O CORS está configurado com
                ALLOWED_ORIGINS=http://localhost:3001
                <br />
                3. O token API está correto no .env
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded bg-[#fbb725] px-4 py-2 text-white hover:bg-[#e8a91d]"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Verifica se os dados foram carregados
  const hasProducts = products && products.length > 0;
  const hasCategories = categories && categories.length > 0;
  const hasAttributes =
    attributes && attributes.attributes && attributes.attributes.length > 0;

  // Calcular estatísticas
  const totalProducts = products?.length || 0;
  const totalCategories = categories?.length || 0;
  const totalAttributes = attributes?.count || 0;

  // Calcular total de valores de atributos
  const totalAttributeValues =
    attributes?.attributes?.reduce(
      (acc, attr) => acc + (attr.values?.length || 0),
      0,
    ) || 0;

  const totalProductsInCategories =
    categories?.reduce((acc, cat) => acc + (cat._count?.products || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Teste da API - Roçaria</h1>
          <div className="text-sm text-gray-500">
            Última atualização: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Produtos</h2>
                <p className="text-3xl font-bold text-[#fbb725]">
                  {totalProducts}
                </p>
              </div>
              <div className="bg-opacity-20 rounded-full bg-[#fbb725] p-3">
                <span className="text-2xl">📦</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              {totalProducts} produtos disponíveis
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-500">
                  Categorias
                </h2>
                <p className="text-3xl font-bold text-[#fbb725]">
                  {totalCategories}
                </p>
              </div>
              <div className="bg-opacity-20 rounded-full bg-[#fbb725] p-3">
                <span className="text-2xl">📁</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              {totalProductsInCategories} produtos categorizados
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Atributos</h2>
                <p className="text-3xl font-bold text-[#fbb725]">
                  {totalAttributes}
                </p>
              </div>
              <div className="bg-opacity-20 rounded-full bg-[#fbb725] p-3">
                <span className="text-2xl">🏷️</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              {totalAttributeValues} valores no total
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Status</h2>
                <p className="text-xl font-bold text-green-600">✅ Online</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <span className="text-2xl">🌐</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              API respondendo normalmente
            </p>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Seção de Produtos */}
          {hasProducts ? (
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 flex items-center justify-between text-xl font-semibold">
                <span>📦 Produtos ({totalProducts})</span>
                <span className="text-sm font-normal text-gray-500">Top 5</span>
              </h2>
              <div className="max-h-[500px] space-y-4 overflow-auto">
                {products.slice(0, 5).map((product) => {
                  const lowestPrice =
                    product.variations?.reduce((min, v) => {
                      const price = parseFloat(v.salePrice || v.price);
                      return price < min ? price : min;
                    }, Infinity) || 0;

                  return (
                    <div
                      key={product.id}
                      className="border-b pb-3 last:border-0"
                    >
                      <div
                        className="flex cursor-pointer items-start justify-between"
                        onClick={() =>
                          setExpandedProduct(
                            expandedProduct === product.id ? null : product.id,
                          )
                        }
                      >
                        <div>
                          <h3 className="font-medium hover:text-[#fbb725]">
                            {product.name}
                          </h3>
                          <p className="line-clamp-2 text-sm text-gray-600">
                            {product.description || "Sem descrição"}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <span className="bg-opacity-10 inline-flex items-center rounded-full bg-[#fbb725] px-2 py-0.5 text-xs font-medium text-[#fbb725]">
                              {product.category?.name || "Sem categoria"}
                            </span>
                            {product.properties?.artesanal && (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                Artesanal
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#fbb725]">
                            R$ {lowestPrice.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.variations?.length || 0} variações
                          </p>
                        </div>
                      </div>

                      {expandedProduct === product.id && (
                        <div className="mt-3 rounded-md bg-gray-50 p-3 text-xs">
                          <p>
                            <span className="font-medium">ID:</span>{" "}
                            {product.id}
                          </p>
                          <p>
                            <span className="font-medium">Slug:</span>{" "}
                            {product.slug}
                          </p>
                          <p>
                            <span className="font-medium">Status:</span>{" "}
                            {product.status}
                          </p>
                          <p>
                            <span className="font-medium">Tipo:</span>{" "}
                            {product.type}
                          </p>
                          <p>
                            <span className="font-medium">Categoria ID:</span>{" "}
                            {product.categoryId}
                          </p>
                          {product.images && product.images.length > 0 && (
                            <p>
                              <span className="font-medium">Imagens:</span>{" "}
                              {product.images.length}
                            </p>
                          )}
                          {product.attributes &&
                            product.attributes.length > 0 && (
                              <div className="mt-1">
                                <p>
                                  <span className="font-medium">
                                    Atributos do produto:
                                  </span>{" "}
                                  {product.attributes.length}
                                </p>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {product.attributes.map((attr) => (
                                    <span
                                      key={attr.id}
                                      className="rounded-full bg-gray-200 px-2 py-0.5"
                                    >
                                      {attr.value.label}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold">📦 Produtos</h2>
              <p className="text-center text-gray-500">
                Nenhum produto encontrado
              </p>
            </div>
          )}

          {/* Seção de Categorias */}
          {hasCategories ? (
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 flex items-center justify-between text-xl font-semibold">
                <span>📁 Categorias ({totalCategories})</span>
                <span className="text-sm font-normal text-gray-500">Todas</span>
              </h2>
              <div className="max-h-[500px] space-y-3 overflow-auto">
                {categories.map((category) => (
                  <div key={category.id} className="border-b pb-2">
                    <div
                      className="flex cursor-pointer items-center justify-between"
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === category.id ? null : category.id,
                        )
                      }
                    >
                      <div>
                        <span className="font-medium hover:text-[#fbb725]">
                          {category.name}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          slug: {category.slug}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="bg-opacity-10 inline-flex items-center rounded-full bg-[#fbb725] px-2 py-0.5 text-xs font-medium text-[#fbb725]">
                          {category._count?.products || 0} produtos
                        </span>
                      </div>
                    </div>

                    {expandedCategory === category.id && (
                      <div className="mt-2 grid grid-cols-2 gap-2 rounded-md bg-gray-50 p-2 text-xs">
                        <div>
                          <p className="font-medium">ID:</p>
                          <p className="truncate">{category.id}</p>
                        </div>
                        <div>
                          <p className="font-medium">Ordem:</p>
                          <p>{category.order}</p>
                        </div>
                        <div>
                          <p className="font-medium">Visível:</p>
                          <p>{category.visibility ? "✅" : "❌"}</p>
                        </div>
                        <div>
                          <p className="font-medium">Subcategorias:</p>
                          <p>{category._count?.children || 0}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="font-medium">Descrição:</p>
                          <p className="italic">
                            {category.description || "Sem descrição"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold">📁 Categorias</h2>
              <p className="text-center text-gray-500">
                Nenhuma categoria encontrada
              </p>
            </div>
          )}

          {/* Seção de Atributos - VERSÃO CORRIGIDA */}
          {hasAttributes ? (
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 flex items-center justify-between text-xl font-semibold">
                <span>🏷️ Atributos ({totalAttributes})</span>
                <span className="text-sm font-normal text-gray-500">
                  {totalAttributeValues} valores
                </span>
              </h2>
              <div className="max-h-[500px] space-y-4 overflow-auto">
                {attributes.attributes.map((attribute) => (
                  <div
                    key={attribute.id}
                    className="border-b pb-3 last:border-0"
                  >
                    {/* Cabeçalho do Atributo */}
                    <div
                      className="flex cursor-pointer items-center justify-between"
                      onClick={() =>
                        setExpandedAttribute(
                          expandedAttribute === attribute.id
                            ? null
                            : attribute.id,
                        )
                      }
                    >
                      <div>
                        <h3 className="font-medium text-[#fbb725] hover:text-[#e8a91d]">
                          {attribute.name}
                        </h3>
                        <div className="mt-1 flex gap-2 text-xs">
                          <span className="text-gray-500">
                            slug: {attribute.slug}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">
                            {attribute.values?.length || 0} valores
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {attribute.showInFilter && (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                            Filtro
                          </span>
                        )}
                        {attribute.showInProduct && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                            Produto
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Detalhes do Atributo (expandido) */}
                    {expandedAttribute === attribute.id && (
                      <div className="mt-3 rounded-md bg-gray-50 p-3 text-xs">
                        <p>
                          <span className="font-medium">ID:</span>{" "}
                          {attribute.id}
                        </p>
                        <p>
                          <span className="font-medium">Nome:</span>{" "}
                          {attribute.name}
                        </p>
                        <p>
                          <span className="font-medium">Slug:</span>{" "}
                          {attribute.slug}
                        </p>
                        <p>
                          <span className="font-medium">Ordem:</span>{" "}
                          {attribute.order}
                        </p>
                        <p>
                          <span className="font-medium">
                            Mostrar no filtro:
                          </span>{" "}
                          {attribute.showInFilter ? "✅" : "❌"}
                        </p>
                        <p>
                          <span className="font-medium">
                            Mostrar no produto:
                          </span>{" "}
                          {attribute.showInProduct ? "✅" : "❌"}
                        </p>
                        <p>
                          <span className="font-medium">Criado em:</span>{" "}
                          {new Date(attribute.createdAt).toLocaleString()}
                        </p>
                        <p>
                          <span className="font-medium">Atualizado em:</span>{" "}
                          {new Date(attribute.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    )}

                    {/* Lista de Valores */}
                    {attribute.values && attribute.values.length > 0 && (
                      <div className="mt-2 pl-2">
                        <p className="mb-1 text-xs font-medium text-gray-600">
                          Valores:
                        </p>
                        <div className="space-y-1">
                          {attribute.values.slice(0, 5).map((value) => (
                            <div key={value.id}>
                              <div
                                className="flex cursor-pointer items-center justify-between rounded px-2 py-1 hover:bg-gray-100"
                                onClick={() =>
                                  setExpandedAttributeValue(
                                    expandedAttributeValue === value.id
                                      ? null
                                      : value.id,
                                  )
                                }
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">
                                    {value.label || value.value}
                                  </span>
                                  {value.label &&
                                    value.label !== value.value && (
                                      <span className="text-xs text-gray-400">
                                        (valor: {value.value})
                                      </span>
                                    )}
                                </div>
                                <span className="text-xs text-gray-400">
                                  ID: {value.id.substring(0, 6)}...
                                </span>
                              </div>

                              {/* Detalhes do Valor (expandido) */}
                              {expandedAttributeValue === value.id && (
                                <div className="mt-1 ml-4 rounded-md bg-gray-100 p-2 text-xs">
                                  <p>
                                    <span className="font-medium">
                                      ID completo:
                                    </span>{" "}
                                    {value.id}
                                  </p>
                                  <p>
                                    <span className="font-medium">Valor:</span>{" "}
                                    {value.value}
                                  </p>
                                  <p>
                                    <span className="font-medium">Label:</span>{" "}
                                    {value.label || "(vazio)"}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Attribute ID:
                                    </span>{" "}
                                    {value.attributeId}
                                  </p>
                                  <p>
                                    <span className="font-medium">Ordem:</span>{" "}
                                    {value.order}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}

                          {attribute.values.length > 5 && (
                            <p className="text-center text-xs text-gray-500">
                              ... e mais {attribute.values.length - 5} valores
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {(!attribute.values || attribute.values.length === 0) && (
                      <p className="mt-2 pl-2 text-xs text-gray-400 italic">
                        Nenhum valor cadastrado para este atributo
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold">🏷️ Atributos</h2>
              <p className="text-center text-gray-500">
                Nenhum atributo encontrado
              </p>
            </div>
          )}
        </div>

        {/* Informações Detalhadas */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* JSON Products */}
          {hasProducts && (
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-lg font-semibold">
                📋 Primeiro Produto (JSON)
              </h3>
              <pre className="max-h-60 overflow-auto rounded-lg bg-gray-50 p-3 text-xs">
                {JSON.stringify(products[0], null, 2)}
              </pre>
            </div>
          )}

          {/* JSON Categories */}
          {hasCategories && (
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-lg font-semibold">
                📋 Primeira Categoria (JSON)
              </h3>
              <pre className="max-h-60 overflow-auto rounded-lg bg-gray-50 p-3 text-xs">
                {JSON.stringify(categories[0], null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* JSON Attributes - Debug */}
        {hasAttributes && (
          <div className="mt-6 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-semibold">
              🏷️ Primeiro Atributo (JSON)
            </h3>
            <pre className="max-h-60 overflow-auto rounded-lg bg-gray-50 p-3 text-xs">
              {JSON.stringify(attributes.attributes[0], null, 2)}
            </pre>
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-8 rounded-lg bg-gray-800 p-6 text-white">
          <h3 className="mb-2 flex items-center text-lg font-semibold">
            <span className="mr-2">🔧</span> Informações de Debug
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div className="space-y-1">
              <p>
                <span className="text-gray-400">API URL:</span>{" "}
                {process.env.NEXT_PUBLIC_BACKEND_API_URL}
              </p>
              <p>
                <span className="text-gray-400">Token Configurado:</span>{" "}
                {process.env.NEXT_PUBLIC_API_TOKEN ? "✅ Sim" : "❌ Não"}
              </p>
              <p>
                <span className="text-gray-400">Timestamp:</span>{" "}
                {new Date().toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p>
                <span className="text-gray-400">Total Produtos:</span>{" "}
                {totalProducts}
              </p>
              <p>
                <span className="text-gray-400">Total Categorias:</span>{" "}
                {totalCategories}
              </p>
              <p>
                <span className="text-gray-400">Total Atributos:</span>{" "}
                {totalAttributes}
              </p>
              <p>
                <span className="text-gray-400">Total Valores:</span>{" "}
                {totalAttributeValues}
              </p>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-700 pt-4 text-xs text-yellow-300">
            <p className="font-medium">📊 Resumo dos dados:</p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                Produtos carregados: {totalProducts > 0 ? "✅" : "❌"}{" "}
                {totalProducts > 0 && `(${totalProducts})`}
              </li>
              <li>
                Categorias carregadas: {totalCategories > 0 ? "✅" : "❌"}{" "}
                {totalCategories > 0 && `(${totalCategories})`}
              </li>
              <li>
                Atributos carregados: {totalAttributes > 0 ? "✅" : "❌"}{" "}
                {totalAttributes > 0 && `(${totalAttributes})`}
              </li>
              <li>
                Valores de atributos: {totalAttributeValues > 0 ? "✅" : "❌"}{" "}
                {totalAttributeValues > 0 && `(${totalAttributeValues})`}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
