import { useState, useRef, useEffect } from "react";

function getTodayBR() {
  return new Date().toLocaleDateString("pt-BR");
}

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    const onDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onUp = () => { isDown = false; el.style.cursor = "grab"; };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX);
    };
    el.style.cursor = "grab";
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);
  return ref;
}

/* ─── Upsell Modal ──────────────────────────────────────────── */
function UpsellModal({ onClose }: { onClose: () => void }) {
  const features = [
    "+350 Dinâmicas",
    "Todos os Bônus Exclusivos",
    "Acesso Vitalício",
    "Garantia Total",
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-[24px] p-8 max-w-sm w-full relative shadow-2xl">
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none"
        >
          ×
        </button>

        {/* badge */}
        <div className="flex justify-center mb-4">
          <span className="bg-[#e8533a] text-white text-xs font-extrabold px-5 py-2 rounded-full tracking-wide whitespace-nowrap shadow-md">
            OFERTA EXCLUSIVA
          </span>
        </div>

        {/* title */}
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-1">
          Leve o Plano Premium!
        </h2>

        {/* price */}
        <div className="text-center mb-5">
          <span className="block text-gray-400 line-through text-sm">De R$17,90</span>
          <span className="block text-green-600 font-extrabold text-4xl">Por R$14,90</span>
        </div>

        {/* features */}
        <ul className="space-y-3 mb-6">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 20 20" fill="white" className="w-3 h-3">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://pay.lowify.com.br/go.php?offer=r4c17em"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-extrabold py-4 px-6 rounded-full text-base shadow-[3px_3px_0px_0px_rgba(0,100,0,0.4)] transition-transform hover:-translate-y-1 mb-4"
        >
          SIM, QUERO O DESCONTO!
        </a>

        {/* decline */}
        <a
          href="https://pay.lowify.com.br/go.php?offer=d0ivo51"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-gray-400 text-sm underline hover:text-gray-600"
        >
          Não, quero apenas o pacote básico
        </a>
      </div>
    </div>
  );
}

/* ─── Countdown ─────────────────────────────────────────────── */
function Countdown() {
  return (
    <div className="bg-yellow-400 text-center py-2 text-sm font-bold tracking-wide text-gray-900">
      ⏰ OFERTA VÁLIDA SOMENTE HOJE: {getTodayBR()}
    </div>
  );
}

/* ─── Hero + VSL (inside the same section, white bg) ─────────── */
function Hero() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
        <span className="bg-yellow-400 px-2 rounded-md inline-block transform -rotate-1">
          +250 Dinâmicas
        </span>
        <br />
        de História
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
        Transforme suas aulas em viagens no tempo inesquecíveis e prenda a atenção dos alunos do início ao fim.
      </p>

      {/* VSL — inside hero, between subtitle and CTA */}
      <div className="my-8 mx-auto max-w-[600px] relative rounded-[20px] overflow-hidden bg-black">
        <video
          src="/video.mp4"
          poster="/poster.jpg"
          preload="metadata"
          controls={playing}
          playsInline
          onPlay={() => setPlaying(true)}
          className="w-full rounded-[20px] shadow-[0px_16px_32px_rgba(0,0,0,0.15)] border-4 border-[#fadf32]"
        />
        {!playing && (
          <button
            onClick={() => {
              setPlaying(true);
              const v = document.querySelector("video");
              v?.play();
            }}
            className="absolute inset-0 flex items-center justify-center rounded-[16px]"
            aria-label="Reproduzir vídeo"
          >
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0px_8px_24px_rgba(0,0,0,0.35)] border-4 border-black hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" fill="black" className="w-8 h-8 ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* CTA below VSL */}
      <a
        href="#checkout"
        className="bg-black text-yellow-400 font-bold py-4 px-10 rounded-full text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-1 inline-flex items-center gap-2 cursor-pointer"
      >
        🎯 Quero minhas dinâmicas agora!
      </a>
    </section>
  );
}

/* ─── O Que Você Vai Receber ─────────────────────────────────── */
function WhatYouGet() {
  const items = [
    { icon: "📦", title: "Material Completo", desc: "Acesso a todas as +250 dinâmicas interativas e recursos de história" },
    { icon: "⚡", title: "Acesso Imediato", desc: "Comece a usar no mesmo dia. Sem espera, sem burocracia" },
    { icon: "📅", title: "Planejamento", desc: "Planejamentos anuais estruturados e prontos para usar em suas aulas" },
  ];
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">O Que Você Vai Receber</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-6 bg-yellow-50 border border-yellow-200 rounded-[16px]">
              <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm text-xl">
                {item.icon}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg mb-1 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Bônus Exclusivos ───────────────────────────────────────── */
function Bonuses() {
  const dragRef = useDragScroll();
  const bonuses = [
    { img: "/50-linhas-tempo.jpg", title: "50 Linhas do Tempo Ilustradas", value: "R$57", desc: "Guia visual completo de períodos históricos para todas as idades" },
    { img: "/jogos-hist.jpg", title: "30 Jogos Históricos Prontos", value: "R$47", desc: "Atividades lúdicas completas com passo a passo detalhado" },
    { img: "/atlas-mapa.jpg", title: "Apostila de Mapas Históricos", value: "R$47", desc: "Exercícios práticos com mapas, cronologias e eventos" },
    { img: "/debates.jpg", title: "40 Dinâmicas de Debate Histórico Prontas", value: "R$50", desc: "Roteiros prontos de debates sobre temas históricos polêmicos e relevantes, com perguntas orientadoras e divisão de grupos." },
    { img: "/100-avaliacoes.jpg", title: "Banco de Avaliações e Atividades Avaliativas", value: "R$40", desc: "Banco completo de avaliações e atividades prontas para aplicar em sala de aula." },
  ];
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="bg-yellow-400 text-black text-xs font-extrabold px-4 py-1 rounded-full tracking-wide">
            R$241 — HOJE GRÁTIS
          </span>
        </div>
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Bônus Exclusivos</h2>
        <div ref={dragRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-4 mt-8 select-none">
          {bonuses.map((b) => (
            <div key={b.title} className="shrink-0 rounded-[16px] overflow-hidden shadow-md bg-white border-2 border-yellow-400 w-60">
              <img src={b.img} alt={b.title} className="w-full h-40 object-cover pointer-events-none" />
              <div className="px-4 py-4">
                <div className="text-red-500 font-bold text-xs line-through mb-1">{b.value}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{b.title}</h3>
                <p className="text-gray-500 text-xs">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-xs mt-2">← deslize para ver mais →</p>
      </div>
    </section>
  );
}

/* ─── Por Que Escolher ───────────────────────────────────────── */
function WhyChoose() {
  const reasons = [
    { icon: "🎯", title: "Engajamento Garantido", desc: "Atividades testadas em sala de aula com resultados comprovados de engajamento." },
    { icon: "🔄", title: "Sempre Atualizado", desc: "Material alinhado à BNCC e sempre com as melhores práticas pedagógicas." },
    { icon: "👩‍🏫", title: "+2.800 Professores", desc: "Uma comunidade enorme de educadores que já transformaram suas aulas." },
    { icon: "✅", title: "Pronto para Usar", desc: "Zero trabalho de formatação. Baixou, imprimiu (ou abriu no tablet) e usou." },
  ];
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Por Que Escolher Este Material?</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {reasons.map((r) => (
            <div key={r.title} className="flex items-start gap-4 p-6 bg-yellow-50 border border-yellow-200 rounded-[16px] text-left">
              <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm text-xl">
                {r.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-gray-900">{r.title}</h3>
                <p className="text-gray-600 text-sm">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Depoimentos ────────────────────────────────────────────── */
function Testimonials() {
  const dragRef = useDragScroll();
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-3">
          <div className="flex">
            {Array(5).fill(null).map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" fill="#f59e0b" className="w-6 h-6">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <div className="font-extrabold text-xl text-gray-900 mb-1">4.9/5</div>
        <p className="text-gray-500 text-sm mb-8">(+2.800 professores)</p>
        <h2 className="text-3xl font-bold mb-3 text-center text-gray-900">O Que Dizem os Professores</h2>
        <div ref={dragRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-4 mt-8 justify-start select-none">
          {Array.from({ length: 10 }, (_, i) => (
            <img
              key={i}
              src={`/wpp${i + 1}.jpg`}
              alt={`Depoimento ${i + 1}`}
              className="shrink-0 w-48 rounded-[16px] shadow-md object-contain bg-white border border-gray-100 pointer-events-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Para Quem ──────────────────────────────────────────────── */
function ForWho() {
  const items = [
    { icon: "🏫", text: "Professores do Ensino Fundamental e Médio" },
    { icon: "⏰", text: "Quem não tem tempo de criar aulas do zero" },
    { icon: "📚", text: "Quem quer aulas de História mais dinâmicas e envolventes" },
    { icon: "🔄", text: "Quem busca renovar o planejamento sem gastar horas" },
    { icon: "🖨️", text: "Quem quer praticidade: baixou, imprimiu e aplicou" },
    { icon: "🎯", text: "Quem quer que os alunos participem mais e se engajem" },
  ];
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-bold tracking-widest text-xs uppercase mb-2 text-gray-400">Feito para você?</p>
        <h2 className="text-3xl font-bold mb-3 text-gray-900">Esse material é ideal para...</h2>
        <p className="text-gray-500 text-sm mb-8">
          Veja se as +250 Dinâmicas de História foram feitas para o seu momento
        </p>
        <div className="space-y-4 text-left">
          {items.map((item) => (
            <div key={item.text} className="flex items-center gap-4 bg-yellow-50 border border-yellow-100 rounded-[14px] px-5 py-4">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <span className="text-gray-800 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ────────────────────────────────────────────────── */
function Pricing({ onBasicClick }: { onBasicClick: () => void }) {
  return (
    <section id="checkout" className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-bold tracking-widest text-xs uppercase mb-2 text-gray-400">Oferta especial por tempo limitado</p>
        <h2 className="text-3xl font-bold mb-3 text-gray-900">Escolha seu Plano</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-start mt-10">

          {/* Básico */}
          <div className="rounded-[24px] shadow-[0px_12px_24px_-4px_rgba(0,0,0,0.18)] flex flex-col relative bg-white border border-gray-100 pt-3 max-w-sm w-full mx-auto md:mx-0">
            <div className="mx-3 mt-3 rounded-2xl overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-gray-300 text-center">
                <h3 className="font-extrabold text-xl text-gray-900 mb-2">Pacote Básico</h3>
              </div>
            </div>
            <div className="mx-3 rounded-2xl px-6 py-5 text-center">
              <ul className="space-y-3 mb-5 text-left">
                {["250 Atividades Avaliativas", "Acesso Imediato", "Garantia de 30 dias"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-medium text-gray-800">
                    <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 20 20" fill="white" className="w-3 h-3">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
                {["Bônus Exclusivos", "Linhas do Tempo Ilustradas", "Mapas Históricos"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-red-400 font-bold text-base flex-shrink-0">✕</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mb-4 text-center">
                <span className="text-gray-400 line-through text-sm block">De R$ 17,90</span>
                <span className="text-2xl align-top mt-2 inline-block text-gray-900 font-bold">R$ </span>
                <span className="font-extrabold text-4xl text-gray-900">5,90</span>
              </div>
            </div>
            <div className="p-5 text-center">
              <button
                onClick={onBasicClick}
                className="block w-full text-center bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-6 rounded-full border-2 border-gray-900 transition-transform hover:-translate-y-1"
              >
                Quero o Plano Básico!
              </button>
              <p className="mt-3 text-sm text-gray-400">⬇️ Veja a oferta mais vantajosa abaixo! ⬇️</p>
            </div>
          </div>

          {/* Premium */}
          <div className="bg-[#f5f5e8] rounded-[24px] shadow-[0px_12px_24px_-4px_rgba(0,0,0,0.08)] border border-gray-300 flex flex-col relative max-w-sm w-full mx-auto md:mx-0 pt-3">
            {/* badge */}
            <div className="flex justify-center mb-2">
              <span className="bg-[#e8533a] text-white text-xs font-extrabold px-5 py-2 rounded-full tracking-wide whitespace-nowrap shadow-md">
                ⭐ MAIS VENDIDO ⭐
              </span>
            </div>
            <div className="mx-3 mt-1 rounded-2xl overflow-hidden">
              <div className="px-6 pt-4 pb-4 border-b border-gray-300 text-center">
                <h3 className="font-extrabold text-xl text-gray-900 mb-2">👑 Pacote Premium!</h3>
              </div>
            </div>
            <div className="mx-3 px-4 py-4">
              <img src="/product.png" alt="Kit Completo" className="w-full rounded-2xl mb-4 object-cover" />
              <ul className="space-y-3 mb-6 text-left">
                {[
                  "350 Atividades Avaliativas",
                  "Acesso Imediato",
                  "Garantia de 30 dias",
                  "50 Linhas do Tempo Ilustradas",
                  "30 Jogos Históricos Prontos",
                  "Apostila de Mapas Históricos",
                  "40 Debates Históricos",
                  "Banco de Avaliações",
                  "Todos os Bônus Exclusivos",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-medium text-gray-800">
                    <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 20 20" fill="white" className="w-3 h-3">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="text-center mb-4">
                <span className="text-gray-400 line-through text-sm block">R$ 241,00</span>
                <span className="text-2xl align-top mt-2 inline-block text-gray-900 font-bold">R$ </span>
                <span className="font-extrabold text-4xl text-gray-900">17,90</span>
              </div>
              <a
                href="https://pay.lowify.com.br/checkout.php?product_id=2OOlYi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 active:translate-y-0 active:shadow-none inline-flex items-center justify-center gap-2 cursor-pointer w-full mb-3"
              >
                QUERO O PLANO PREMIUM
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Autora ─────────────────────────────────────────────────── */
function Author() {
  const stats = [
    { value: "10+", label: "anos de experiência" },
    { value: "2.800+", label: "professores impactados" },
    { value: "250+", label: "dinâmicas criadas" },
  ];
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Sobre a Autora</h2>
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-2xl mx-auto border border-gray-100">
          <img
            src="/autora.png"
            alt="Ana Carolina Ferreira"
            className="w-32 h-32 rounded-full object-cover object-top mx-auto mb-4 border-4 border-yellow-400 shadow-md"
          />
          <h3 className="font-extrabold text-xl text-gray-900 mb-1">Ana Carolina Ferreira</h3>
          <p className="text-gray-500 text-sm mb-6">Professora e Especialista em Didática da História</p>
          <div className="flex justify-center gap-8 mb-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-extrabold text-2xl text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
          <blockquote className="italic text-gray-600 text-sm border-l-4 border-yellow-400 pl-4 text-left">
            "Acredito que a História pode ser a matéria favorita de qualquer aluno — só precisa ser ensinada do jeito certo."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ─── Garantia ───────────────────────────────────────────────── */
function Guarantee() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">Garantia de 30 Dias</h2>
        <div className="bg-green-50 border-2 border-green-400 rounded-[24px] p-10 max-w-2xl mx-auto mt-8">
          <div className="text-5xl mb-4">🛡️</div>
          <p className="text-gray-700 text-base">
            Se você não ficar 100% satisfeito com o material por qualquer motivo, devolvemos todo o seu dinheiro. Sem perguntas, sem burocracia.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ() {
  const faqs = [
    { q: "Para quem é esse material?", a: "Para professores de História do Ensino Fundamental e Médio que querem tornar suas aulas mais dinâmicas, engajantes e produtivas." },
    { q: "Em quanto tempo recebo o material?", a: "O acesso é imediato após a confirmação do pagamento. Você receberá um e-mail com os links de download." },
    { q: "O material funciona em qual formato?", a: "O material é entregue em PDF de alta qualidade, compatível com qualquer dispositivo: computador, tablet ou celular." },
    { q: "Tem garantia?", a: "Sim! Oferecemos 30 dias de garantia incondicional. Se não gostar, devolvemos 100% do valor pago." },
    { q: "Posso usar com qualquer ano escolar?", a: "Sim! O material foi pensado para ser adaptável a diferentes anos escolares do Ensino Fundamental II e Médio." },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">Perguntas Frequentes</h2>
        <div className="bg-white border border-gray-200 rounded-[24px] p-8 max-w-2xl mx-auto shadow-sm mt-8 text-left">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <button
                  className="w-full text-left font-semibold text-gray-800 text-sm flex justify-between items-center"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className="text-gray-400 ml-4 flex-shrink-0 text-lg">{open === i ? "−" : "+"}</span>
                </button>
                {open === i && (
                  <p className="mt-4 text-sm text-gray-700">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-20 px-4 bg-yellow-400 text-center">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Transforme suas Aulas Hoje!</h2>
        <p className="font-semibold text-sm mb-6 text-gray-800">
          Mais de 2.800 professores já descobriram como tornar a história irresistível. Chegou a sua vez.
        </p>
        <a
          href="#checkout"
          className="btn-pulse block w-full text-center bg-green-500 hover:bg-green-600 text-white font-extrabold py-4 px-6 rounded-full text-base transition-transform hover:-translate-y-1 mb-4"
        >
          🚀 Quero começar agora!
        </a>
        <p className="text-sm text-gray-700 font-semibold mb-6">
          ✅ Acesso imediato &nbsp;&nbsp; ✅ Garantia 30 dias &nbsp;&nbsp; ✅ Pagamento seguro
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-8 px-4 text-center text-gray-400 text-sm bg-white border-t border-gray-100">
      <p>© 2026 Dinâmicas de História. Todos os direitos reservados.</p>
      <p className="mt-1">Este produto é digital. Você receberá acesso por e-mail após o pagamento.</p>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function LandingPage() {
  const [showUpsell, setShowUpsell] = useState(false);

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      {showUpsell && <UpsellModal onClose={() => setShowUpsell(false)} />}
      <Countdown />
      <Hero />
      <WhatYouGet />
      <Bonuses />
      <WhyChoose />
      <Testimonials />
      <ForWho />
      <Pricing onBasicClick={() => setShowUpsell(true)} />
      <Author />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
