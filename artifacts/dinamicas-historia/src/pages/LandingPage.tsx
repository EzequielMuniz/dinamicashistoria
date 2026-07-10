import { useState, useRef, useEffect } from "react";

function getTodayBR() {
  return new Date().toLocaleDateString("pt-BR");
}

function getCheckoutUrl(baseUrl: string) {
  try {
    const url = new URL(baseUrl);
    const params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'sck'].forEach(function(key) {
      const val = params.get(key);
      if (val) url.searchParams.set(key, val);
    });
    return url.toString();
  } catch (e) {
    return baseUrl;
  }
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

/* ─── Countdown ─────────────────────────────────────────── */
function Countdown() {
  return (
    <div className="bg-yellow-400 text-center py-2 text-sm font-bold tracking-wide text-gray-900">
      CONDIÇÃO ESPECIAL DISPONÍVEL HOJE · {getTodayBR()}
    </div>
  );
}

/* ─── Hero + VSL (inside the same section, white bg) ────── */
function Hero() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto text-center">
      <p className="font-extrabold tracking-[0.18em] text-xs uppercase text-gray-500 mb-4">Para professores de História</p>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-[1.05] text-gray-950">
        Aulas prontas que fazem até a turma mais dispersa
        <span className="bg-yellow-400 px-2 rounded-md inline-block md:ml-2 mt-2 transform -rotate-1">
          participar
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
        Dinâmicas, jogos, debates e atividades organizadas para você aplicar sem passar horas criando aulas do zero.
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
        QUERO ECONOMIZAR HORAS DE PLANEJAMENTO
      </a>
      <p className="mt-4 text-sm text-gray-500">Acesso imediato · Material digital · 30 dias de garantia</p>
    </section>
  );
}

/* ─── O Que Você Vai Receber ────────────────────────────── */
function WhatYouGet() {
  const items = [
    { icon: "📦", title: "+250 Dinâmicas Prontas", desc: "Atividades interativas para o Ensino Fundamental II e o Ensino Médio." },
    { icon: "⏱️", title: "Aplicação Passo a Passo", desc: "Orientações claras para escolher, preparar e conduzir cada atividade." },
    { icon: "⚡", title: "Acesso Imediato", desc: "Receba por e-mail e comece a preparar sua próxima aula no mesmo dia." },
    { icon: "🖨️", title: "Use Como Preferir", desc: "Consulte no celular, abra no computador ou imprima para levar à escola." },
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

/* ─── Material por dentro ───────────────────────────────── */
function ProductPreview() {
  const steps = [
    ["1", "Escolha a dinâmica", "Encontre uma atividade adequada ao tema e à turma."],
    ["2", "Prepare em poucos minutos", "Confira duração, objetivo e materiais necessários."],
    ["3", "Aplique com segurança", "Siga o passo a passo e conduza a participação dos alunos."],
  ];
  return (
    <section className="py-16 px-4 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-yellow-400 font-extrabold tracking-widest text-xs uppercase mb-3">Não é só uma lista de ideias</p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5">Abra o material e saiba exatamente o que fazer na próxima aula</h2>
          <p className="text-gray-300 mb-7">As dinâmicas foram organizadas para reduzir o improviso: você entende a proposta, separa materiais simples e aplica.</p>
          <div className="space-y-5">
            {steps.map(([number, title, desc]) => (
              <div key={number} className="flex gap-4">
                <span className="w-9 h-9 shrink-0 rounded-full bg-yellow-400 text-black font-extrabold flex items-center justify-center">{number}</span>
                <div><h3 className="font-bold mb-1">{title}</h3><p className="text-sm text-gray-400">{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 bg-yellow-400 rounded-[28px] rotate-2" />
          <img src="/product.jpg" alt="Kit completo de Dinâmicas Interativas de História" className="relative w-full rounded-[22px] shadow-2xl" />
          <div className="relative mt-5 grid grid-cols-3 gap-2 text-center text-xs font-bold">
            <span className="bg-white/10 rounded-xl px-2 py-3">Fundamental II</span>
            <span className="bg-white/10 rounded-xl px-2 py-3">Ensino Médio</span>
            <span className="bg-white/10 rounded-xl px-2 py-3">Pronto para usar</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimeValue() {
  return (
    <section className="py-16 px-4 bg-yellow-400">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-extrabold tracking-widest text-xs uppercase mb-3">Seu tempo também tem valor</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mb-5">Criar 250 atividades do zero pode consumir mais de 40 horas</h2>
        <p className="text-gray-800 text-lg">Mesmo gastando apenas 10 minutos em cada atividade, seriam 41 horas de pesquisa e planejamento. Aqui, o trabalho pesado já está organizado para você.</p>
      </div>
    </section>
  );
}

/* ─── Bônus Exclusivos ──────────────────────────────────── */
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

/* ─── Por Que Escolher ──────────────────────────────────── */
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

/* ─── Depoimentos ───────────────────────────────────────── */
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

/* ─── Para Quem ─────────────────────────────────────────── */
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

/* ─── Pricing ───────────────────────────────────────────── */
function CheckIcon() {
  return <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-black">✓</span>;
}

function Pricing() {
  const trackCheckout = () => {
    if (typeof window !== "undefined" && (window as any).fbq) (window as any).fbq("track", "InitiateCheckout");
  };
  return (
    <section id="checkout" className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-bold tracking-widest text-xs uppercase mb-2 text-gray-500">Escolha o que faz sentido para sua rotina</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-950">Menos tempo planejando. Mais participação em sala.</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Os dois planos incluem acesso imediato e 30 dias de garantia. O Completo reúne todos os recursos e tem o melhor custo-benefício.</p>
        <div className="flex flex-col md:flex-row gap-7 justify-center items-stretch mt-10">
          <article className="rounded-[24px] bg-white border-2 border-gray-200 p-7 max-w-sm w-full mx-auto md:mx-0 flex flex-col text-left">
            <p className="font-bold text-sm text-gray-500 mb-2">Para começar com as dinâmicas</p>
            <h3 className="font-extrabold text-2xl text-gray-950">Plano Essencial</h3>
            <ul className="space-y-3 my-7 flex-1">
              {["250 dinâmicas de História", "Fundamental II e Ensino Médio", "Orientações de aplicação", "Acesso digital imediato", "Garantia de 30 dias"].map((f) => <li key={f} className="flex gap-2 text-sm font-medium"><CheckIcon />{f}</li>)}
            </ul>
            <div className="mb-5"><span className="text-sm text-gray-500 block">Pagamento único</span><strong className="text-4xl text-gray-950">R$14,90</strong></div>
            <a href={getCheckoutUrl("https://pay.lowify.com.br/go.php?offer=r4c17em")} target="_blank" rel="noopener noreferrer" onClick={trackCheckout} className="w-full text-center bg-white hover:bg-gray-50 text-gray-950 font-extrabold py-4 px-5 rounded-full border-2 border-gray-950 transition-transform hover:-translate-y-1">QUERO O PLANO ESSENCIAL</a>
          </article>

          <article className="rounded-[24px] bg-gray-950 text-white border-4 border-yellow-400 p-7 max-w-sm w-full mx-auto md:mx-0 flex flex-col text-left shadow-2xl relative md:-translate-y-3">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-extrabold px-5 py-2 rounded-full whitespace-nowrap">ESCOLHIDO PELA MAIORIA</span>
            <p className="font-bold text-sm text-yellow-400 mb-2 mt-2">Para ter o kit completo</p>
            <h3 className="font-extrabold text-2xl">Plano Completo</h3>
            <img src="/product.png" alt="Plano Completo de Dinâmicas de História" className="w-full rounded-2xl my-5" />
            <ul className="space-y-3 mb-7 flex-1">
              {["250 dinâmicas de História", "50 linhas do tempo ilustradas", "30 jogos históricos", "Apostila de mapas históricos", "40 debates estruturados", "Banco de avaliações", "Todos os bônus inclusos"].map((f) => <li key={f} className="flex gap-2 text-sm font-medium"><CheckIcon />{f}</li>)}
            </ul>
            <div className="mb-5"><span className="text-sm text-gray-400 block">Pagamento único</span><strong className="text-4xl">R$17,90</strong></div>
            <a href={getCheckoutUrl("https://pay.lowify.com.br/checkout.php?product_id=2OOlYi")} target="_blank" rel="noopener noreferrer" onClick={trackCheckout} className="w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold py-4 px-5 rounded-full border-2 border-yellow-400 transition-transform hover:-translate-y-1">QUERO O KIT COMPLETO</a>
            <p className="text-center text-xs text-gray-400 mt-4">Apenas R$3 a mais que o Essencial</p>
          </article>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm font-semibold text-gray-600"><span>✓ Acesso imediato</span><span>✓ Pagamento seguro</span><span>✓ Garantia de 30 dias</span></div>
      </div>
    </section>
  );
}

/* ─── Autora ────────────────────────────────────────────── */
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

function Objections() {
  const items = [
    ["Minha turma é muito agitada", "As propostas trazem uma estrutura clara para dividir a turma e conduzir cada etapa."],
    ["Não tenho materiais especiais", "A maior parte das atividades utiliza papel, quadro e recursos comuns da escola."],
    ["Dou aula para anos diferentes", "As dinâmicas podem ser usadas e adaptadas no Ensino Fundamental II e no Ensino Médio."],
    ["Não tenho tempo para aprender algo complicado", "Você escolhe a atividade, confere as orientações e prepara a aplicação."],
  ];
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-center font-extrabold tracking-widest text-xs uppercase text-gray-500 mb-3">Talvez você esteja pensando...</p>
        <h2 className="text-3xl font-extrabold text-center text-gray-950 mb-10">Isso funcionará com as minhas turmas?</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {items.map(([title, desc]) => <div key={title} className="rounded-2xl border border-gray-200 p-6"><h3 className="font-extrabold text-gray-950 mb-2">“{title}”</h3><p className="text-sm text-gray-600">{desc}</p></div>)}
        </div>
      </div>
    </section>
  );
}

/* ─── Garantia ──────────────────────────────────────────── */
function Guarantee() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">Garantia de 30 Dias</h2>
        <div className="bg-green-50 border-2 border-green-400 rounded-[24px] p-10 max-w-2xl mx-auto mt-8">
          <div className="text-5xl mb-4">🛡️</div>
          <h3 className="font-extrabold text-xl mb-3 text-gray-950">Você pode conferir o material com tranquilidade</h3>
          <p className="text-gray-700 text-base">Abra os arquivos, conheça as dinâmicas e veja se fazem sentido para suas turmas. Caso não queira continuar, solicite o reembolso dentro do prazo de garantia.</p>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────── */
function FAQ() {
  const faqs = [
    { q: "Para quem é esse material?", a: "Para professores de História do Ensino Fundamental e Médio que querem tornar suas aulas mais dinâmicas, engajantes e produtivas." },
    { q: "Em quanto tempo recebo o material?", a: "O acesso é imediato após a confirmação do pagamento. Você receberá um e-mail com os links de download." },
    { q: "O material funciona em qual formato?", a: "O material é entregue em PDF de alta qualidade, compatível com qualquer dispositivo: computador, tablet ou celular." },
    { q: "Tem garantia?", a: "Sim. Você tem 30 dias para conhecer o material e solicitar o reembolso caso não queira continuar." },
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

/* ─── Final CTA ─────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-20 px-4 bg-yellow-400 text-center">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Sua próxima aula não precisa começar do zero</h2>
        <p className="font-semibold text-sm mb-6 text-gray-800">
          Mais de 2.800 professores já descobriram como tornar a história irresistível. Chegou a sua vez.
        </p>
        <a
          href="#checkout"
          className="btn-pulse block w-full text-center bg-green-500 hover:bg-green-600 text-white font-extrabold py-4 px-6 rounded-full text-base transition-transform hover:-translate-y-1 mb-4"
        >
          QUERO ECONOMIZAR HORAS TODA SEMANA
        </a>
        <p className="text-sm text-gray-700 font-semibold mb-6">
          ✅ Acesso imediato &nbsp;&nbsp; ✅ Garantia 30 dias &nbsp;&nbsp; ✅ Pagamento seguro
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-8 px-4 text-center text-gray-400 text-sm bg-white border-t border-gray-100">
      <p>© 2026 Dinâmicas de História. Todos os direitos reservados.</p>
      <p className="mt-1">Este produto é digital. Você receberá acesso por e-mail após o pagamento.</p>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white pb-20 md:pb-0">
      <Countdown />
      <Hero />
      <WhatYouGet />
      <ProductPreview />
      <Bonuses />
      <WhyChoose />
      <Testimonials />
      <ForWho />
      <TimeValue />
      <Pricing />
      <Author />
      <Objections />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <Footer />
      <a href="#checkout" className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-gray-950 text-yellow-400 text-center font-extrabold py-4 px-5 rounded-full shadow-2xl border-2 border-yellow-400">VER PLANOS A PARTIR DE R$14,90</a>
    </div>
  );
}
