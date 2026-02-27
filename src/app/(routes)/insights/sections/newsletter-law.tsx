"use client";
import { FormEvent, useState } from "react";

export function NewsletterLaw() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        error?: string;
        success?: string;
      };

      if (!response.ok || result.error) {
        setFeedback({
          type: "error",
          message: result.error ?? "Não foi possível concluir a assinatura.",
        });
        return;
      }

      event.currentTarget.reset();
      setFeedback({
        type: "success",
        message:
          result.success ?? "Assinatura confirmada para o briefing jurídico.",
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Erro de conexão ao tentar assinar.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-[10px] font-bold tracking-[0.5em] text-[#c5a47e] uppercase">
          Conhecimento Exclusivo
        </span>
        <h2 className="font-bitter mt-6 mb-10 text-4xl font-light lg:text-6xl">
          O Briefing <span className="italic">Estratégico</span>
        </h2>
        <p className="mx-auto mb-12 max-w-2xl leading-relaxed font-light text-white/40">
          Assine nossa curadoria quinzenal e receba análises jurídicas de alto
          impacto direto no seu e-mail.
        </p>

        <form
          onSubmit={onSubmit}
          className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row"
        >
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <label htmlFor="newsletter-email" className="sr-only">
            E-mail corporativo
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="Seu e-mail corporativo"
            required
            aria-label="E-mail corporativo"
            className="flex-1 rounded-full border border-white/10 bg-white/5 px-8 py-5 text-sm transition-colors outline-none focus:border-[#c5a47e]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-[#c5a47e] px-10 py-5 text-[10px] font-bold tracking-widest text-[#0a0a0b] uppercase transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Assinando..." : "Assinar"}
          </button>
        </form>

        {feedback && (
          <p
            className={`mt-5 text-sm ${
              feedback.type === "success" ? "text-emerald-300" : "text-red-300"
            }`}
          >
            {feedback.message}
          </p>
        )}
      </div>
    </div>
  );
}
