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

        <h2 className="text-2xl font-extrabold text-center mb-2">
          Leve o Plano Premium!
        </h2>

        <div className="text-center mb-6">
          <span className="line-through text-gray-400">De R$17,90</span>
          <div className="text-green-600 text-4xl font-extrabold">
            R$14,90
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {features.map((f) => (
            <li key={f}>✅ {f}</li>
          ))}
        </ul>

        <a
          href={getCheckoutUrl(
            "https://pay.lowify.com.br/go.php?offer=r4c17em"
          )}
          className="block text-center bg-green-500 text-white py-3 rounded-full mb-3"
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
    <div className="bg-yellow-400 text-center py-2 font-bold">
      ⏰ OFERTA VÁLIDA SOMENTE HOJE: {getTodayBR()}
    </div>
  );
}

/* ================= Hero ================= */
function Hero() {
  return (
    <section className="text-center py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-4">
        +250 Dinâmicas de História
      </h1>

      <p className="text-gray-600 mb-6">
        Transforme suas aulas em experiências envolventes e inesquecíveis.
      </p>

      <a
        href="#checkout"
        className="bg-black text-yellow-400 px-6 py-3 rounded-full font-bold"
      >
        🎯 Quero minhas dinâmicas agora!
      </a>
    </section>
  );
}

/* ================= Pricing ================= */
function Pricing({ onBasicClick }: { onBasicClick: () => void }) {
  return (
    <section id="checkout" className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-6">Escolha seu Plano</h2>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="border p-6 rounded-xl">
          <h3 className="font-bold mb-3">Pacote Básico</h3>
          <p className="line-through">R$17,90</p>
          <p className="text-3xl font-bold">R$5,90</p>

          <button
            onClick={onBasicClick}
            className="mt-4 border px-4 py-2 rounded-full"
          >
            Quero o Plano Básico
          </button>
        </div>

        <div className="border p-6 rounded-xl bg-yellow-100">
          <h3 className="font-bold mb-3">👑 Premium</h3>
          <p className="line-through">R$241</p>
          <p className="text-3xl font-bold">R$17,90</p>

          <a
            href={getCheckoutUrl(
              "https://pay.lowify.com.br/checkout.php?product_id=2OOlYi"
            )}
            className="block mt-4 bg-yellow-400 py-3 rounded-full font-bold"
          >
            QUERO O PREMIUM
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================= Page ================= */
export default function LandingPage() {
  const [showUpsell, setShowUpsell] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      {showUpsell && <UpsellModal onClose={() => setShowUpsell(false)} />}
      <Countdown />
      <Hero />
      <Pricing onBasicClick={() => setShowUpsell(true)} />
    </div>
  );
}
