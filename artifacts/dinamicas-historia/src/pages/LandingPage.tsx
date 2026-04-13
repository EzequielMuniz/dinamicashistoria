import { useState, useRef, useEffect } from "react";

function getTodayBR() {
  return new Date().toLocaleDateString("pt-BR");
}

function getCheckoutUrl(baseUrl: string) {
  try {
    const url = new URL(baseUrl);
    const params = new URLSearchParams(window.location.search);
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "src",
      "sck",
    ].forEach((key) => {
      const val = params.get(key);
      if (val) url.searchParams.set(key, val);
    });
    return url.toString();
  } catch {
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

    const onUp = () => {
      isDown = false;
      el.style.cursor = "grab";
    };

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

/* ================= Upsell ================= */
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-extrabold text-center mb-1">
          Leve o Plano Premium!
        </h2>

        <div className="text-center mb-5">
          <span className="block text-gray-400 line-through text-sm">
            De R$17,90
          </span>
          <span className="block text-green-600 font-extrabold text-4xl">
            Por R$14,90
          </span>
        </div>

        <ul className="space-y-3 mb-6">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              ✅ {f}
            </li>
          ))}
        </ul>

        <a
          href={getCheckoutUrl(
            "https://pay.lowify.com.br/go.php?offer=r4c17em"
          )}
          className="block w-full text-center bg-green-500 text-white py-4 rounded-full mb-4"
        >
          SIM, QUERO O DESCONTO!
        </a>

        <a
          href={getCheckoutUrl(
            "https://pay.lowify.com.br/go.php?offer=d0ivo51"
          )}
          className="block text-center text-gray-400 text-sm underline"
        >
          Não, quero apenas o pacote básico
        </a>
      </div>
    </div>
  );
}

/* ================= Countdown ================= */
function Countdown() {
  return (
    <div className="bg-yellow-400 text-center py-2 text-sm font-bold">
      ⏰ OFERTA VÁLIDA SOMENTE HOJE: {getTodayBR()}
    </div>
  );
}

/* ================= Hero ================= */
function Hero() {
  return (
    <section className="py-16 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
        <span className="bg-yellow-400 px-2 rounded-md">
          +250 Dinâmicas
        </span>
        <br />
        de História
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Transforme suas aulas em viagens no tempo inesquecíveis e prenda a atenção dos alunos do início ao fim.
      </p>

      <a
        href="#checkout"
        className="bg-black text-yellow-400 font-bold py-4 px-10 rounded-full"
      >
        🎯 Quero minhas dinâmicas agora!
      </a>
    </section>
  );
}

/* ================= Page ================= */
export default function LandingPage() {
  const [showUpsell, setShowUpsell] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {showUpsell && <UpsellModal onClose={() => setShowUpsell(false)} />}
      <Countdown />
      <Hero />
    </div>
  );
}
