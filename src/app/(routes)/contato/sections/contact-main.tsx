"use client";
import { ElementReveal } from "@/components/layout/element-reveal";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactMain() {
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
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      practiceArea: String(formData.get("practiceArea") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
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
          message:
            result.error ?? "Não foi possível enviar sua solicitação agora.",
        });
        return;
      }

      event.currentTarget.reset();
      setFeedback({
        type: "success",
        message:
          result.success ??
          "Solicitação enviada com sucesso. Nossa equipe retornará em breve.",
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Erro de conexão ao enviar a solicitação.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Formulário de Alta Complexidade */}
          <div className="interactive-card interactive-card-dark rounded-[2.5rem] border border-white/5 bg-[#161617] p-8 lg:col-span-8 lg:p-16">
            <ElementReveal width="full" variant="card" distance="24px">
              <h2 className="font-bitter mb-12 text-3xl font-light text-white lg:text-4xl">
                Abertura de{" "}
                <span className="text-[#c5a47e] italic">
                  Protocolo Institucional
                </span>
              </h2>
            </ElementReveal>

            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 gap-10 md:grid-cols-2"
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="contact-name"
                  className="ml-2 text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase"
                >
                  Titular / Representante
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Nome completo"
                  required
                  minLength={3}
                  className="w-full border-b border-white/10 bg-transparent px-2 py-3 text-sm transition-all outline-none placeholder:text-white/20 focus:border-[#c5a47e]"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="contact-email"
                  className="ml-2 text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase"
                >
                  E-mail Corporativo
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="exemplo@empresa.com.br"
                  required
                  className="w-full border-b border-white/10 bg-transparent px-2 py-3 text-sm transition-all outline-none placeholder:text-white/20 focus:border-[#c5a47e]"
                />
              </div>

              <div className="flex flex-col gap-3 md:col-span-2">
                <label
                  htmlFor="contact-practice-area"
                  className="ml-2 text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase"
                >
                  Área de Atuação
                </label>
                <select
                  id="contact-practice-area"
                  name="practiceArea"
                  required
                  className="w-full cursor-pointer appearance-none border-b border-white/10 bg-transparent px-2 py-3 text-sm transition-all outline-none focus:border-[#c5a47e]"
                >
                  <option className="bg-[#161617]" value="Societário e M&A">
                    Societário e M&A
                  </option>
                  <option className="bg-[#161617]" value="Engenharia Fiscal">
                    Engenharia Fiscal
                  </option>
                  <option
                    className="bg-[#161617]"
                    value="Governança Sucessória"
                  >
                    Governança Sucessória
                  </option>
                  <option className="bg-[#161617]" value="Compliance / Outros">
                    Compliance / Outros
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-3 md:col-span-2">
                <label
                  htmlFor="contact-message"
                  className="ml-2 text-[10px] font-bold tracking-[0.3em] text-[#c5a47e] uppercase"
                >
                  Escopo da Demanda
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Descreva brevemente a complexidade do caso"
                  required
                  minLength={20}
                  className="w-full resize-none border-b border-white/10 bg-transparent px-2 py-3 text-sm transition-all outline-none placeholder:text-white/20 focus:border-[#c5a47e]"
                ></textarea>
              </div>

              {feedback && (
                <p
                  className={cn(
                    "text-sm md:col-span-2",
                    feedback.type === "success"
                      ? "text-emerald-300"
                      : "text-red-300",
                  )}
                >
                  {feedback.message}
                </p>
              )}

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex w-full items-center justify-center gap-6 overflow-hidden rounded-full border border-[#c5a47e]/30 bg-transparent py-6 text-[10px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-[#c5a47e] hover:text-[#0a0a0b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {isSubmitting
                      ? "Enviando Solicitação..."
                      : "Solicitar Consultoria"}
                  </span>
                  <ArrowRight
                    size={16}
                    className="relative z-10 transition-transform group-hover:translate-x-2"
                  />
                </button>
              </div>
            </form>
          </div>

          {/* Canais Diretos (Sidebar) */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            {[
              {
                icon: <MessageSquare size={18} />,
                title: "Canal Digital",
                detail: "WhatsApp Business",
                color: "text-[#c5a47e]",
              },
              {
                icon: <Phone size={18} />,
                title: "Linha Direta",
                detail: "+55 (11) 3000-0000",
                color: "text-[#c5a47e]",
              },
              {
                icon: <Mail size={18} />,
                title: "Correspondência",
                detail: "contato@vonmarins.com.br",
                color: "text-[#c5a47e]",
              },
            ].map((item, i) => (
              <ElementReveal
                key={i}
                width="full"
                delay={i * 0.08}
                distance="22px"
                variant="card"
                className="group interactive-card interactive-card-dark flex flex-col gap-4 rounded-[2rem] border border-white/5 bg-[#161617] p-8 transition-all hover:border-[#c5a47e]/30"
              >
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0b]",
                    item.color,
                  )}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm font-bold text-white transition-colors group-hover:text-[#c5a47e]">
                    {item.detail}
                  </p>
                </div>
              </ElementReveal>
            ))}

            {/* Selo de Segurança de Dados */}
            <div className="mt-4 rounded-3xl border border-[#c5a47e]/10 bg-[#c5a47e]/5 px-8 py-6">
              <p className="text-[10px] leading-relaxed font-light text-[#c5a47e]/60 italic">
                * Todas as informações compartilhadas são protegidas por sigilo
                profissional e protocolos de criptografia institucional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
