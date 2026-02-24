// app/teste-cors/page.tsx
"use client";

import { useState } from "react";

export default function TesteCorsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function testEndpoint(url: string, name: string) {
    try {
      setLoading(true);
      const start = Date.now();

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      const time = Date.now() - start;

      if (response.ok) {
        const data = await response.json();
        setResults((prev) => [
          ...prev,
          {
            name,
            url,
            status: response.status,
            time,
            success: true,
            data: data,
          },
        ]);
      } else {
        const errorText = await response.text();
        setResults((prev) => [
          ...prev,
          {
            name,
            url,
            status: response.status,
            time,
            success: false,
            error: errorText,
          },
        ]);
      }
    } catch (error) {
      setResults((prev) => [
        ...prev,
        {
          name,
          url,
          success: false,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function runTests() {
    setResults([]);
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    await testEndpoint(`${baseUrl}/shop/categories`, "Categorias");
    await testEndpoint(`${baseUrl}/shop/products?limit=1`, "Produtos");
    await testEndpoint(`${baseUrl}/shop/attributes`, "Atributos");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Teste CORS - Diagnóstico</h1>

        <button
          onClick={runTests}
          disabled={loading}
          className="mb-8 rounded bg-[#fbb725] px-6 py-3 font-semibold text-white hover:bg-[#e8a91d] disabled:opacity-50"
        >
          {loading ? "Testando..." : "Executar Testes"}
        </button>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{result.name}</h2>
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    result.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {result.success ? "✅ Sucesso" : "❌ Falha"}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">URL:</span> {result.url}
                </p>
                {result.status && (
                  <p>
                    <span className="font-medium">Status:</span> {result.status}
                  </p>
                )}
                {result.time && (
                  <p>
                    <span className="font-medium">Tempo:</span> {result.time}ms
                  </p>
                )}

                {result.success ? (
                  <div>
                    <p className="mb-2 font-medium">Dados recebidos:</p>
                    <pre className="max-h-40 overflow-auto rounded bg-gray-50 p-3 text-xs">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="rounded bg-red-50 p-3 text-red-700">
                    <p className="font-medium">Erro:</p>
                    <p className="text-sm">{result.error}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h3 className="mb-2 font-semibold">
            🔧 Instruções para resolver CORS:
          </h3>
          <ol className="list-inside list-decimal space-y-2 text-sm">
            <li>
              Verifique se o backend está rodando em http://localhost:3000
            </li>
            <li>
              Certifique-se que no .env do backend tem:{" "}
              <code className="rounded bg-blue-100 px-2 py-1">
                ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3000
              </code>
            </li>
            <li>Reinicie o backend completamente (Ctrl+C e npm run dev)</li>
            <li>
              Verifique se o middleware do backend está configurado para OPTIONS
              requests
            </li>
            <li>
              Teste diretamente a API no navegador:{" "}
              <a
                href="http://localhost:3000/api/shop/categories"
                target="_blank"
                className="text-blue-600 underline"
              >
                http://localhost:3000/api/shop/categories
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
