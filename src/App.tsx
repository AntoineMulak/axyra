import { useState, useEffect, useRef } from "react";
import { Routes, Route, useParams } from "react-router-dom";


function TeamMemberCard({ member }: { member: { initials: string; name: string; role: string; bg: string; tags: string[]; bio: string; fileId?: string; linkedin?: string } }) {
  return (
    <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: "32px 28px", transition: "transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(127,119,221,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: member.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 18, fontWeight: 600, color: "#fff", letterSpacing: "-0.5px" }}>
        {member.initials}
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1A1A2E", marginBottom: 4, letterSpacing: "-0.3px" }}>{member.name}</h3>
      <p style={{ fontSize: 13, color: "#3C3489", fontWeight: 500, marginBottom: 16 }}>{member.role}</p>
      <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 20 }}>{member.bio}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: member.linkedin ? 20 : 0 }}>
        {member.tags.map(tag => (
          <span key={tag} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "#EEEDFE", color: "#3C3489", fontWeight: 500 }}>{tag}</span>
        ))}
      </div>
      {member.linkedin && (
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#7F77DD", textDecoration: "none", fontWeight: 500, transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#7F77DD" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Voir le profil
        </a>
      )}
    </div>
  );
}

const VIOLET = "#7F77DD";
const NIGHT = "#1A1A2E";
const MIST = "#EEEDFE";
const VIOLET_LIGHT = "#AFA9EC";
const VIOLET_DARK = "#3C3489";

const LOGO_SVGS: Record<string, { bg: string; svg: React.ReactNode }> = {
  SC: {
    bg: "#0A1628",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "80%", height: "80%" }}>
        {/* Waves */}
        <path d="M6 30 Q12 26 18 30 Q24 34 30 30 Q36 26 42 30" stroke="#4A90D9" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M6 34 Q12 30 18 34 Q24 38 30 34 Q36 30 42 34" stroke="#4A90D9" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
        {/* Hull */}
        <path d="M10 28 L14 18 L34 18 L38 28 Z" fill="#4A90D9" opacity="0.9"/>
        {/* Superstructure */}
        <rect x="18" y="12" width="12" height="7" rx="1" fill="#7BB8E8"/>
        {/* Mast */}
        <line x1="24" y1="6" x2="24" y2="12" stroke="#7BB8E8" strokeWidth="1.5"/>
        <line x1="20" y1="8" x2="28" y2="8" stroke="#7BB8E8" strokeWidth="1"/>
      </svg>
    ),
  },
  OC: {
    bg: "#1A2A1A",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "80%", height: "80%" }}>
        {/* Building blocks */}
        <rect x="8" y="28" width="10" height="14" rx="1" fill="#E8A44A"/>
        <rect x="20" y="20" width="10" height="22" rx="1" fill="#F0B85A"/>
        <rect x="32" y="24" width="10" height="18" rx="1" fill="#E8A44A"/>
        {/* Windows */}
        <rect x="10" y="30" width="3" height="3" rx="0.5" fill="#1A2A1A" opacity="0.5"/>
        <rect x="10" y="36" width="3" height="3" rx="0.5" fill="#1A2A1A" opacity="0.5"/>
        <rect x="22" y="22" width="3" height="3" rx="0.5" fill="#1A2A1A" opacity="0.5"/>
        <rect x="22" y="28" width="3" height="3" rx="0.5" fill="#1A2A1A" opacity="0.5"/>
        <rect x="22" y="34" width="3" height="3" rx="0.5" fill="#1A2A1A" opacity="0.5"/>
        <rect x="34" y="26" width="3" height="3" rx="0.5" fill="#1A2A1A" opacity="0.5"/>
        <rect x="34" y="32" width="3" height="3" rx="0.5" fill="#1A2A1A" opacity="0.5"/>
        {/* Ground */}
        <line x1="6" y1="42" x2="42" y2="42" stroke="#E8A44A" strokeWidth="2" strokeLinecap="round"/>
        {/* Crane */}
        <line x1="38" y1="8" x2="38" y2="24" stroke="#CBD5C0" strokeWidth="1.5"/>
        <line x1="30" y1="8" x2="42" y2="8" stroke="#CBD5C0" strokeWidth="1.5"/>
        <line x1="36" y1="8" x2="38" y2="16" stroke="#CBD5C0" strokeWidth="1"/>
      </svg>
    ),
  },
};

function LogoAvatar({ logo, size = 48, radius = 12 }: { logo: string; size?: number; radius?: number }) {
  const config = LOGO_SVGS[logo];
  if (!config) return (
    <div style={{ width: size, height: size, borderRadius: radius, background: "rgba(127,119,221,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: size * 0.28, fontWeight: 700, color: VIOLET_LIGHT }}>{logo}</span>
    </div>
  );
  return (
    <div style={{ width: size, height: size, borderRadius: radius, background: config.bg, border: "0.5px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
      {config.svg}
    </div>
  );
}

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

type Article = {
  slug: string;
  tag: string;
  tagColor: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  content: { type: "p" | "h2" | "h3" | "ul"; text?: string; items?: string[] }[];
};


const ARTICLES: Article[] = [
  {
    slug: "automatisation-ia-pme",
    tag: "Stratégie",
    tagColor: "#4F46E5",
    title: "Automatisation IA : par où commencer quand on est une PME ?",
    excerpt: "L'IA peut tout automatiser — mais pas tout en même temps. Voici la méthode que nous appliquons pour identifier les premiers cas d'usage à fort ROI dans une PME.",
    readTime: "5 min",
    date: "10 fév. 2025",
    content: [
      { type: "p", text: "Quand on dirige une PME, le sujet IA arrive de partout à la fois — des articles, des concurrents qui en parlent, des commerciaux qui proposent des outils. La question n'est plus \"faut-il se lancer ?\" mais \"par où commencer sans se tromper ?\"." },
      { type: "p", text: "Après avoir accompagné des dizaines de PME et ETI françaises, nous avons identifié une méthode simple qui évite les deux erreurs classiques : commencer trop grand (et échouer), ou commencer trop petit (et se décourager)." },
      { type: "h2", text: "L'erreur la plus courante : choisir l'outil avant le problème" },
      { type: "p", text: "La majorité des projets IA qui échouent en PME commencent par la technologie : \"on va déployer un chatbot\", \"on va utiliser ChatGPT\", \"on va faire du machine learning sur nos données\". Sans avoir répondu à la question fondamentale : quel problème précis est-ce que ça résout, et quel est l'impact mesurable ?" },
      { type: "p", text: "Un projet IA réussi commence toujours par un problème opérationnel concret — pas par une technologie." },
      { type: "h2", text: "Notre méthode en 3 étapes" },
      { type: "h3", text: "1. Cartographier vos processus chronophages" },
      { type: "p", text: "La première étape est d'identifier, dans vos opérations quotidiennes, les tâches qui consomment le plus de temps humain sans nécessiter de vrai jugement. Ce sont les meilleures candidates à l'automatisation IA. Exemples typiques : saisie manuelle de données, réponses aux questions récurrentes, génération de rapports, traitement de documents entrants." },
      { type: "h3", text: "2. Prioriser par ROI potentiel" },
      { type: "p", text: "Toutes les automatisations ne se valent pas. Nous utilisons une matrice simple : impact (temps gagné × fréquence × coût horaire) vs complexité de mise en oeuvre. Les cas d'usage en haut à gauche — fort impact, faible complexité — sont vos quick wins. C'est là qu'il faut commencer." },
      { type: "h3", text: "3. Lancer un POC en 4 semaines maximum" },
      { type: "p", text: "Un premier projet IA ne doit pas durer 6 mois. Si vous ne voyez pas de résultats tangibles en 4 semaines, c'est que le périmètre est trop large ou le cas d'usage mal choisi. Nous recommandons systématiquement de commencer par un périmètre réduit, de mesurer, puis d'étendre." },
      { type: "h2", text: "Les 5 cas d'usage les plus fréquents en PME" },
      { type: "ul", items: [
        "Réponse automatique aux emails et demandes clients répétitives",
        "Extraction de données depuis des factures, bons de commande, contrats",
        "Génération de comptes-rendus de réunion et de rapports hebdomadaires",
        "Assistant interne pour retrouver l'information dans vos documents",
        "Qualification automatique des leads entrants"
      ]},
      { type: "h2", text: "Ce qu'Axyra propose" },
      { type: "p", text: "Notre audit IA (2 à 4 semaines) part exactement de cette méthode. Nous cartographions vos processus, identifions les 3 cas d'usage à plus fort ROI, et vous livrons une roadmap priorisée avec des estimations de gains réalistes. C'est la base de tout projet IA réussi — et c'est ce qui vous permet de convaincre en interne avant d'investir." },
    ],
  },
  {
    slug: "agent-ia-vs-chatbot",
    tag: "Pédagogie",
    tagColor: "#7F77DD",
    title: "Agent IA vs chatbot : quelle différence, et lequel choisir ?",
    excerpt: "Chatbot, assistant IA, agent autonome... Les termes se multiplient mais les réalités sont très différentes. On démêle tout ça avec des exemples concrets.",
    readTime: "6 min",
    date: "5 mar. 2025",
    content: [
      { type: "p", text: "\"On va mettre en place un agent IA\", \"on cherche un chatbot\", \"on veut une IA qui répond à nos clients\"... Ces formulations sont souvent utilisées de façon interchangeable, mais elles désignent des réalités très différentes — avec des coûts, des délais et des usages qui n'ont rien à voir." },
      { type: "p", text: "Voici une grille de lecture claire pour comprendre ce que vous choisissez vraiment." },
      { type: "h2", text: "Le chatbot classique : simple et limité" },
      { type: "p", text: "Un chatbot classique est un système à base de règles ou de mots-clés. Il répond à des questions prédéfinies selon un arbre de décision. Si l'utilisateur sort du script, le chatbot ne sait pas quoi faire." },
      { type: "ul", items: [
        "Rapide et peu coûteux à déployer",
        "Efficace pour des FAQ simples et répétitives",
        "Incapable de comprendre une formulation inattendue",
        "Aucune capacité d'apprentissage ou d'adaptation"
      ]},
      { type: "p", text: "Usage typique : un widget \"Aide\" sur un site e-commerce qui répond à \"où est ma commande ?\" ou \"quels sont vos horaires ?\"." },
      { type: "h2", text: "L'assistant IA : beaucoup plus souple" },
      { type: "p", text: "Un assistant IA (comme ceux basés sur GPT-4, Claude ou Mistral) comprend le langage naturel. Il peut tenir une conversation, reformuler, s'adapter au contexte de la question. Il peut être connecté à vos documents internes via un système RAG (Retrieval-Augmented Generation) pour répondre avec vos propres données." },
      { type: "ul", items: [
        "Comprend des formulations variées et imprévues",
        "Peut être nourri avec votre documentation interne",
        "Répond avec nuance et peut demander des précisions",
        "Ne prend pas d'initiative — il attend qu'on lui parle"
      ]},
      { type: "p", text: "Usage typique : un assistant interne qui répond aux questions RH, IT ou commerciales de vos collaborateurs en s'appuyant sur vos procédures, contrats et bases de connaissance." },
      { type: "h2", text: "L'agent IA autonome : une autre dimension" },
      { type: "p", text: "Un agent IA est un système qui peut agir de façon autonome pour accomplir une tâche complexe en plusieurs étapes. Il ne se contente pas de répondre — il planifie, exécute, utilise des outils (emails, bases de données, APIs), vérifie les résultats et s'adapte en cours de route." },
      { type: "ul", items: [
        "Capable de décomposer une tâche complexe en sous-étapes",
        "Peut interagir avec vos outils (CRM, ERP, email, calendrier...)",
        "Fonctionne en autonomie sur des workflows définis",
        "Nécessite une conception soignée et un encadrement humain"
      ]},
      { type: "p", text: "Usage typique : un agent commercial qui, à partir d'un email entrant d'un prospect, qualifie la demande, enrichit le contact dans votre CRM, génère une proposition personnalisée et envoie un email de suivi — sans intervention humaine." },
      { type: "h2", text: "Lequel choisir ?" },
      { type: "p", text: "La réponse dépend de votre cas d'usage. Voici la règle simple qu'on applique chez Axyra :" },
      { type: "ul", items: [
        "FAQ simple et volume élevé → chatbot classique",
        "Questions variées sur vos données internes → assistant IA avec RAG",
        "Tâche complexe multi-étapes avec des outils → agent IA autonome"
      ]},
      { type: "p", text: "Le piège classique : déployer un agent IA pour un usage qui ne le justifie pas (complexité inutile, coût élevé) ou, à l'inverse, se limiter à un chatbot pour un cas d'usage qui nécessiterait un vrai assistant. L'audit que nous proposons permet précisément d'éviter ce type d'erreur." },
    ],
  },
  {
    slug: "5-processus-eti-francaises",
    tag: "Cas d'usage",
    tagColor: "#059669",
    title: "5 processus que les ETI françaises automatisent en premier",
    excerpt: "Après des dizaines de missions, voici les 5 processus où l'IA apporte le ROI le plus rapide dans les PME et ETI françaises — et pourquoi.",
    readTime: "5 min",
    date: "1 avr. 2025",
    content: [
      { type: "p", text: "Quand on accompagne une PME ou une ETI dans sa transformation IA, la question du \"par où commencer\" revient systématiquement. Et après des dizaines de missions dans des secteurs très différents — industrie, services, distribution, BTP, santé — on observe toujours les mêmes patterns : certains processus se prêtent naturellement à l'automatisation et génèrent du ROI rapide. D'autres sont trop complexes ou trop sensibles pour démarrer." },
      { type: "p", text: "Voici les 5 processus que nos clients automatisent en premier, et pourquoi." },
      { type: "h2", text: "1. Le traitement des emails entrants" },
      { type: "p", text: "C'est souvent le premier quick win. Dans une PME de 50 personnes, un commercial ou un assistant passe en moyenne 1h30 par jour à trier, qualifier et router des emails. Une IA peut lire chaque email entrant, identifier sa nature (demande de devis, réclamation, question SAV, candidature...), extraire les informations clés et le router vers la bonne personne ou déclencher une réponse automatique." },
      { type: "p", text: "Gain observé : entre 45 minutes et 2 heures par personne et par jour. ROI en moins de 3 mois." },
      { type: "h2", text: "2. L'extraction de données depuis des documents" },
      { type: "p", text: "Factures, bons de commande, devis fournisseurs, contrats, fiches produits... La plupart des PME reçoivent des dizaines de documents par jour et ressaisissent manuellement des données dans leur ERP ou leurs tableaux Excel. L'IA peut extraire automatiquement les données structurées (montants, références, dates, coordonnées) avec une précision supérieure à 95% dans la plupart des cas." },
      { type: "p", text: "Ce processus est particulièrement impactant dans les secteurs avec des flux documentaires importants : négoce, BTP, logistique, services à d'autres entreprises." },
      { type: "h2", text: "3. La génération de rapports et comptes-rendus" },
      { type: "p", text: "Comptes-rendus de réunion, rapports d'activité hebdomadaires, synthèses de performance commerciale, rapports de chantier... Ces documents prennent du temps à rédiger et sont souvent bâclés parce que personne n'a envie de s'y consacrer. L'IA peut générer ces documents automatiquement à partir de notes, de données structurées ou d'enregistrements — dans le format et le style de votre entreprise." },
      { type: "h2", text: "4. La réponse aux questions internes répétitives" },
      { type: "p", text: "\"Comment je fais une note de frais ?\", \"C'est quoi la procédure pour les congés ?\", \"Où est le contrat du client X ?\". Dans toute entreprise, une partie significative du temps des équipes RH, IT et administratives est absorbée par des questions récurrentes auxquelles la réponse est déjà écrite quelque part. Un assistant IA connecté à vos documents internes répond instantanément, 24h/24, et libère vos équipes pour des tâches à valeur ajoutée." },
      { type: "h2", text: "5. La qualification et le suivi commercial" },
      { type: "p", text: "Pour les équipes commerciales, l'IA peut qualifier automatiquement les leads entrants selon des critères que vous définissez, enrichir les fiches dans votre CRM, générer des propositions personnalisées à partir de modèles, et envoyer des relances de suivi aux bons moments. Ce type d'automatisation est particulièrement efficace pour les entreprises avec un volume significatif de prospects entrants." },
      { type: "h2", text: "Le point commun de ces 5 processus" },
      { type: "p", text: "Ils sont répétitifs — le même type de tâche se reproduit des dizaines de fois par semaine — et ils ne nécessitent pas de jugement complexe sur chaque cas individuel. Ce sont exactement les conditions dans lesquelles l'IA excelle et génère un ROI rapide et mesurable. Si vous vous reconnaissez dans un ou plusieurs de ces processus, notre audit IA de 2 à 4 semaines vous permettra de confirmer la faisabilité et d'estimer les gains précisément, avant d'investir quoi que ce soit." },
    ],
  },
];

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}
      onClick={onClose}>
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,20,0.7)", backdropFilter: "blur(4px)" }} />
      {/* Panel */}
      <div style={{ position: "relative", width: "min(680px, 100vw)", height: "100vh", background: "#13122A", borderLeft: `0.5px solid rgba(127,119,221,0.2)`, overflowY: "auto", padding: "48px 48px 80px" }}
        onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, background: "rgba(127,119,221,0.1)", border: "0.5px solid rgba(127,119,221,0.2)", borderRadius: "50%", width: 36, height: 36, color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: `${article.tagColor}22`, color: article.tagColor }}>{article.tag}</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{article.date}</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>·</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{article.readTime} de lecture</span>
        </div>
        {/* Title */}
        <h1 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.3, marginBottom: 32, color: "#fff" }}>{article.title}</h1>
        {/* Divider */}
        <div style={{ width: 40, height: 2, background: article.tagColor, borderRadius: 2, marginBottom: 36 }} />
        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {article.content.map((block, i) => {
            if (block.type === "p") return <p key={i} style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.85 }}>{block.text}</p>;
            if (block.type === "h2") return <h2 key={i} style={{ fontSize: 20, fontWeight: 600, color: "#fff", letterSpacing: "-0.3px", marginTop: 12 }}>{block.text}</h2>;
            if (block.type === "h3") return <h3 key={i} style={{ fontSize: 17, fontWeight: 600, color: VIOLET_LIGHT, letterSpacing: "-0.2px" }}>{block.text}</h3>;
            if (block.type === "ul") return (
              <ul key={i} style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {block.items?.map((item, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: VIOLET, flexShrink: 0, marginTop: 8 }} />
                    {item}
                  </li>
                ))}
              </ul>
            );
            return null;
          })}
        </div>
        {/* CTA */}
        <div style={{ marginTop: 56, padding: 32, background: `rgba(127,119,221,0.08)`, border: `0.5px solid rgba(127,119,221,0.2)`, borderRadius: 16, textAlign: "center" }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 8 }}>Vous avez un projet similaire ?</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>Échangeons 30 minutes sur vos cas d'usage.</p>
          <button onClick={onClose} style={{ background: VIOLET, color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Prendre contact →
          </button>
        </div>
      </div>
    </div>
  );
}

const EXPERTISE = [
  {
    id: "generative",
    label: "IA Générative & Agents",
    icon: "✦",
    tagline: "Des assistants IA qui agissent, pas seulement qui répondent.",
    description: "Nous déployons des agents IA et des systèmes de génération augmentée capables d'interagir avec vos outils, vos données internes et vos équipes — en langage naturel.",
    subs: [
      {
        name: "Chatbots & Assistants métiers",
        usecases: ["Assistant interne connecté à votre base documentaire", "Chatbot support client disponible 24/7", "Assistant onboarding pour les nouveaux collaborateurs", "Réponse automatique aux emails entrants"],
        pain: "Vos équipes perdent des heures à répondre aux mêmes questions. Vos clients attendent trop longtemps.",
      },
      {
        name: "Agents autonomes",
        usecases: ["Agent de recherche et de synthèse documentaire", "Agent de qualification et suivi commercial", "Agent de monitoring et d'alerte", "Orchestration multi-agents sur des workflows complexes"],
        pain: "Certaines tâches sont trop complexes pour un simple chatbot — elles nécessitent plusieurs étapes, plusieurs outils.",
      },
      {
        name: "RAG & Base de connaissance",
        usecases: ["Moteur de recherche sur vos documents internes", "Q&A sur vos contrats, rapports, procédures", "Mise à jour dynamique des connaissances", "Intégration avec SharePoint, Notion, Google Drive"],
        pain: "Vos données internes sont inutilisées. Personne ne sait où est l'information, encore moins comment l'interroger.",
      },
      {
        name: "Génération de contenu",
        usecases: ["Rédaction de rapports et synthèses automatisées", "Génération de propositions commerciales personnalisées", "Traduction et adaptation de documents", "Comptes-rendus de réunion automatiques"],
        pain: "La rédaction prend trop de temps. Les formats ne sont jamais cohérents d'un collaborateur à l'autre.",
      },
    ],
  },
  {
    id: "automation",
    label: "Automatisation",
    icon: "⚙",
    tagline: "Supprimez les tâches répétitives. Gardez l'expertise humaine là où elle compte.",
    description: "Nous identifions dans vos processus les tâches à faible valeur ajoutée et les automatisons — en connectant vos outils existants sans tout reconstruire.",
    subs: [
      {
        name: "Workflows & Orchestration",
        usecases: ["Automatisation de processus multi-étapes entre vos outils", "Routage intelligent de tâches selon des règles métier", "Déclencheurs automatiques sur événements (email, formulaire, API)", "Synchronisation de données entre vos systèmes"],
        pain: "Vos équipes font du copier-coller entre 4 outils différents, tous les jours.",
      },
      {
        name: "Traitement documentaire",
        usecases: ["Extraction automatique de données depuis des PDF, factures, contrats", "Classification et archivage de documents entrants", "OCR et structuration de documents scannés", "Validation et contrôle de cohérence automatiques"],
        pain: "Des dizaines de documents arrivent chaque jour. Les traiter manuellement prend un temps disproportionné.",
      },
      {
        name: "Intégration SI",
        usecases: ["Connexion de vos outils via API (ERP, CRM, GED...)", "Middleware IA entre vos systèmes legacy et modernes", "Synchronisation en temps réel ou en batch", "Tableaux de bord consolidés depuis plusieurs sources"],
        pain: "Vos outils ne se parlent pas. L'information est dans des silos, la consolidation est manuelle.",
      },
      {
        name: "RPA & Bots de saisie",
        usecases: ["Bots de saisie automatique dans vos interfaces métier", "Automatisation de la collecte de données web", "Rapports automatiques générés et envoyés par email", "Génération de documents à partir de modèles"],
        pain: "Certaines applications ne disposent pas d'API. Vos équipes saisissent manuellement des données déjà disponibles ailleurs.",
      },
    ],
  },
  {
    id: "data",
    label: "Data & Analyse",
    icon: "◈",
    tagline: "Vos données ont une valeur. Encore faut-il pouvoir l'extraire.",
    description: "Nous structurons, consolidons et visualisons vos données pour que vos équipes puissent prendre de meilleures décisions — plus vite, avec plus de confiance.",
    subs: [
      {
        name: "Reporting & Dashboards",
        usecases: ["Tableaux de bord temps réel connectés à vos sources", "KPIs automatiquement calculés et mis à jour", "Rapports hebdomadaires ou mensuels auto-générés", "Alertes sur dépassement de seuils critiques"],
        pain: "Vos reporting prennent une journée à préparer. Ils sont déjà obsolètes quand vous les lisez.",
      },
      {
        name: "Analyse documentaire",
        usecases: ["Extraction d'informations clés depuis des corpus de documents", "Comparaison et synthèse de grandes volumétries", "Détection de patterns et d'incohérences", "Structuration de données non-structurées"],
        pain: "Vous avez des centaines de documents avec de l'information précieuse que personne n'a le temps de lire.",
      },
      {
        name: "Consolidation & Data quality",
        usecases: ["Centralisation de données éparpillées dans plusieurs outils", "Nettoyage et normalisation automatique des données", "Détection de doublons et d'anomalies", "Référentiel unique de données client ou produit"],
        pain: "Chaque département a sa propre version des chiffres. Impossible de s'accorder sur une source de vérité.",
      },
      {
        name: "Insights & Segmentation",
        usecases: ["Segmentation automatique de votre base clients", "Identification de tendances et d'opportunités", "Analyse de la rentabilité par segment, produit, région", "Recommandations d'actions basées sur les données"],
        pain: "Vous avez de la data, mais pas le temps ni les outils pour en tirer des conclusions actionnables.",
      },
    ],
  },
  {
    id: "predictive",
    label: "IA Prédictive",
    icon: "◎",
    tagline: "Anticipez ce qui va se passer. Décidez avant que ça arrive.",
    description: "Nous construisons des modèles de machine learning qui apprennent de vos données historiques pour vous aider à prévoir, scorer et anticiper — avec des explications que vos équipes comprennent.",
    subs: [
      {
        name: "Scoring & Priorisation",
        usecases: ["Scoring de leads par probabilité de conversion", "Scoring de risque client ou fournisseur", "Priorisation automatique de tickets ou de dossiers", "Classement de prospects par potentiel"],
        pain: "Vos équipes traitent tous les leads ou dossiers de la même façon. Les meilleurs passent après les autres.",
      },
      {
        name: "Prévisions & Forecasting",
        usecases: ["Prévision de la demande et des ventes", "Planification des stocks et des ressources", "Prévision de trésorerie à court et moyen terme", "Forecasting de la charge opérationnelle"],
        pain: "Vos prévisions sont faites dans un Excel, à la main, sans modéliser la saisonnalité ni les variables externes.",
      },
      {
        name: "Détection d'anomalies",
        usecases: ["Détection de transactions ou comportements anormaux", "Surveillance de la qualité de production en temps réel", "Alertes sur des dérives de KPIs clés", "Identification de fraudes ou d'erreurs de saisie"],
        pain: "Les anomalies sont découvertes trop tard — quand le dommage est déjà fait.",
      },
      {
        name: "Maintenance prédictive",
        usecases: ["Prédiction des pannes équipements avant qu'elles surviennent", "Optimisation des cycles de maintenance", "Analyse des signaux faibles capteurs (IoT)", "Réduction des arrêts non planifiés"],
        pain: "Votre maintenance est calendaire ou curative. Vous subissez les pannes plutôt que de les anticiper.",
      },
    ],
  },
];

const DEMO_CASES = [
  {
    id: "factures", label: "Traitement de factures", shortLabel: "Factures",
    document: {
      filename: "FACTURE_AN-2024-0847.pdf",
      lines: ["ACIER DU NORD SAS — SIRET 421 897 234", "Facture n° AN-2024-0847", "Date : 15/03/2024   Échéance : 14/04/2024", "───────────────────────────────────", "Profilés acier HEA 200   12 000 kg", "PU 1,24 €/kg       HT  14 880,00 €", "TVA 20%                  2 976,00 €", "TOTAL TTC :             17 856,00 €", "───────────────────────────────────", "Réf. commande : BC-2024-0231"],
    },
    steps: [
      { label: "Lecture OCR", detail: "PDF scanné · extraction du texte brut", ms: 700 },
      { label: "Identification fournisseur", detail: "SIRET 421 897 234 → Acier du Nord SAS ✓", ms: 700 },
      { label: "Extraction des montants", detail: "HT 14 880 € · TVA 2 976 € · TTC 17 856 €", ms: 750 },
      { label: "Rapprochement bon de commande", detail: "BC-2024-0231 trouvé · Écart 0,00 € ✓", ms: 800 },
      { label: "Intégration ERP", detail: "Écriture Sage créée · Comptable notifié", ms: 600 },
    ],
    output: ["Écriture comptable pré-saisie dans Sage", "BC rapproché automatiquement · 0 erreur", "Archivage GED · Comptable notifié par email"],
    time: "8 secondes", saving: "–94% de temps de saisie manuelle",
  },
  {
    id: "chantier", label: "Rapport de chantier", shortLabel: "Chantier",
    document: {
      filename: "voice_note_23_03.m4a — transcription",
      lines: ["« Alors ce matin on était 14 sur le site,", "les fondations du bâtiment B sont finies,", "y'a un problème avec la livraison acier", "qui arrive pas avant jeudi, les gars sur", "la dalle vont devoir attendre.", "Faut que Mathieu appelle le fournisseur.", "Avancement global j'dirais 68%. »"],
    },
    steps: [
      { label: "Transcription audio", detail: "Voice note 1min12 → texte structuré", ms: 700 },
      { label: "Extraction des données clés", detail: "Effectif 14 · Avancement 68% · 1 blocage", ms: 750 },
      { label: "Structuration du rapport", detail: "Format standard Opale Construction appliqué", ms: 700 },
      { label: "Identification des actions", detail: "Action : Mathieu → appel fournisseur acier", ms: 700 },
      { label: "Génération & diffusion", detail: "PDF généré · Chef de projet notifié", ms: 600 },
    ],
    output: ["Rapport PDF au format standard généré", "Planning mis à jour (avancement 68%)", "Action assignée à Mathieu · Rappel J+1"],
    time: "12 secondes", saving: "–80% du temps de rédaction par chef de chantier",
  },
  {
    id: "ao", label: "Veille appels d'offres", shortLabel: "Appels d'offres",
    document: {
      filename: "AO_BOAMP_2024-089341.pdf",
      lines: ["AVIS DE MARCHÉ — Travaux publics", "Maître d'ouvrage : Ville de Dunkerque", "Objet : Réhabilitation école Pasteur", "Montant estimé : 2,4 M€ HT", "Critères : Prix 50% · Références 30%", "           Délais 20%", "Deadline : 18/04/2024", "──────────────────────────────────", "Capacités : chantiers publics", "Qualibat 2111 exigée"],
    },
    steps: [
      { label: "Lecture du dossier AO", detail: "42 pages analysées en 4 secondes", ms: 650 },
      { label: "Scoring de pertinence", detail: "Géo ✓ · Capacités ✓ · Qualibat 2111 ✓", ms: 800 },
      { label: "Analyse des critères", detail: "Prix 50% · Délais 20% · Références 30%", ms: 700 },
      { label: "Sélection des références", detail: "3 chantiers similaires identifiés dans la base", ms: 850 },
      { label: "Alerte & agenda", detail: "Commercial notifié · Rappel J-7 créé", ms: 550 },
    ],
    output: ["Score pertinence : 87/100 — À répondre", "Dossier de réponse pré-rempli (références)", "Deadline agenda · Équipe commerciale notifiée"],
    time: "6 secondes", saving: "+40% de dossiers AO traités par semaine",
  },
];

function AIDemoSection({ isMobile }: { isMobile: boolean }) {
  const [activeId, setActiveId] = useState("factures");
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [showOutput, setShowOutput] = useState(false);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = (c: typeof DEMO_CASES[0]) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setVisibleSteps([]); setShowOutput(false); setRunning(true);
    let delay = 500;
    c.steps.forEach((step, i) => {
      const t = setTimeout(() => setVisibleSteps(prev => [...prev, i]), delay);
      timers.current.push(t);
      delay += step.ms;
    });
    const t2 = setTimeout(() => { setShowOutput(true); setRunning(false); }, delay + 200);
    timers.current.push(t2);
  };

  useEffect(() => {
    const c = DEMO_CASES.find(x => x.id === activeId)!;
    run(c);
    return () => timers.current.forEach(clearTimeout);
  }, [activeId]);

  const cas = DEMO_CASES.find(x => x.id === activeId)!;

  return (
    <section style={{ padding: isMobile ? "72px 5%" : "100px 6%", background: NIGHT }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: VIOLET, marginBottom: 16, fontWeight: 500 }}>Démo interactive</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 16, marginBottom: 40 }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 600, letterSpacing: "-1px", margin: 0 }}>
            Quelques cas<br />d'application.
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", maxWidth: 280, lineHeight: 1.6, margin: 0 }}>Simulation basée sur nos projets réels. Données fictives.</p>
        </div>

        {/* Sélecteur */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" as const }}>
          {DEMO_CASES.map(c => (
            <button key={c.id} onClick={() => setActiveId(c.id)} style={{ padding: "9px 18px", borderRadius: 10, border: activeId === c.id ? `1px solid ${VIOLET}` : "1px solid rgba(255,255,255,0.1)", background: activeId === c.id ? `${VIOLET}22` : "rgba(255,255,255,0.03)", color: activeId === c.id ? "#fff" : "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: activeId === c.id ? 600 : 400, cursor: "pointer", transition: "all 0.15s" }}>
              {isMobile ? c.shortLabel : c.label}
            </button>
          ))}
        </div>

        {/* Zone demo */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>

          {/* Document source */}
          <div style={{ background: "#07060F", border: "0.5px solid rgba(127,119,221,0.18)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "11px 16px", borderBottom: "0.5px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.02)" }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
              </div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginLeft: 6, fontFamily: "monospace" }}>{cas.document.filename}</span>
            </div>
            <div style={{ padding: "20px 22px", fontFamily: "monospace", fontSize: isMobile ? 11 : 12, lineHeight: 1.9, color: "rgba(255,255,255,0.65)" }}>
              {cas.document.lines.map((line, i) => (
                <div key={i} style={{ opacity: running && i > 3 ? 0.3 : 1, transition: "opacity 0.5s", color: line.startsWith("───") ? "rgba(127,119,221,0.3)" : undefined }}>
                  {line || "\u00A0"}
                </div>
              ))}
              {running && (
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 7, height: 14, background: VIOLET, animation: "blink 1s step-end infinite" }} />
                  <span style={{ fontSize: 11, color: VIOLET_LIGHT }}>Lecture en cours…</span>
                </div>
              )}
            </div>
          </div>

          {/* Étapes + output */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#07060F", border: "0.5px solid rgba(127,119,221,0.18)", borderRadius: 16, padding: "18px 20px", flex: 1 }}>
              <p style={{ fontSize: 10, color: "rgba(127,119,221,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 18, fontFamily: "monospace" }}>▶ agent_axyra.log</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {cas.steps.map((step, i) => {
                  const on = visibleSteps.includes(i);
                  const active = on && running && i === Math.max(...visibleSteps);
                  return (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", opacity: on ? 1 : 0.18, transition: "opacity 0.4s ease" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: on ? (active ? VIOLET : "#28CA41") : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "background 0.3s" }}>
                        {active ? <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", animation: "blink 0.7s ease infinite" }} /> : on ? <span style={{ fontSize: 9, color: "#fff", fontWeight: 700 }}>✓</span> : null}
                      </div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: on ? "#fff" : "rgba(255,255,255,0.25)", margin: "0 0 2px", fontFamily: "monospace" }}>{step.label}</p>
                        <p style={{ fontSize: 11, color: on ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)", margin: 0, fontFamily: "monospace" }}>{on ? step.detail : "en attente…"}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {showOutput && (
              <div style={{ background: "rgba(40,202,65,0.05)", border: "0.5px solid rgba(40,202,65,0.25)", borderRadius: 16, padding: "18px 20px", animation: "fadeInUp 0.4s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#28CA41", animation: "glow-green 2s ease infinite" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#28CA41", fontFamily: "monospace" }}>{cas.time} — Traitement terminé</span>
                </div>
                {cas.output.map((o, i) => (
                  <p key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "0 0 5px", fontFamily: "monospace" }}>→ {o}</p>
                ))}
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: "0.5px solid rgba(40,202,65,0.12)" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#28CA41", margin: 0 }}>{cas.saving}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function useCountUp(target: number, duration = 1400, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function AnimatedStats({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const v1 = useCountUp(40, 1200, active);
  const v2 = useCountUp(3, 1000, active);
  const v3 = useCountUp(30, 1400, active);
  const stats = [
    { prefix: "–", value: v1, suffix: "%", label: "de temps passé sur l'analyse de documents" },
    { prefix: "", value: v2, suffix: "×", label: "plus vite pour traiter un dossier de conformité" },
    { prefix: "+", value: v3, suffix: "%", label: "de productivité sur les tâches répétitives" },
  ];
  return (
    <section ref={ref} style={{ padding: isMobile ? "56px 5%" : "80px 6%", background: VIOLET, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", width: 1, background: "rgba(255,255,255,0.8)", top: 0, bottom: 0, left: `${(i + 1) * 14}%`, animation: `float ${3 + i * 0.4}s ease-in-out infinite ${i * 0.3}s` }} />
        ))}
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 32 : 40, textAlign: "center", position: "relative" }}>
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-2px", color: "#fff", marginBottom: 8, fontVariantNumeric: "tabular-nums" as any }}>
              {s.prefix}{s.value}{s.suffix}
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const w = canvas.offsetWidth || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    // Delay to ensure DOM layout is applied
    const initTimer = setTimeout(resize, 20);
    window.addEventListener("resize", resize);

    const W = window.innerWidth;
    const H = window.innerHeight;
    const nodes = Array.from({ length: 38 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 1.2, pulse: Math.random() * Math.PI * 2,
      bright: Math.random() > 0.85,
    }));

    let raf: number;
    const draw = () => {
      const W2 = canvas.width || W, H2 = canvas.height || H;
      ctx.clearRect(0, 0, W2, H2);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.018;
        if (n.x < 0 || n.x > W2) n.vx *= -1;
        if (n.y < 0 || n.y > H2) n.vy *= -1;
      });
      // Connexions
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 190) {
            const alpha = (1 - d / 190) * 0.22;
            ctx.strokeStyle = `rgba(127,119,221,${alpha})`;
            ctx.lineWidth = (1 - d / 190) * 1.2;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }
      // Nœuds
      nodes.forEach(n => {
        const a = 0.4 + Math.sin(n.pulse) * 0.2;
        if (n.bright) {
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.5);
          grad.addColorStop(0, `rgba(150,140,255,0.35)`);
          grad.addColorStop(1, "rgba(127,119,221,0)");
          ctx.fillStyle = grad;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = `rgba(127,119,221,${a})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); clearTimeout(initTimer); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function AgentWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "agent" | "user"; text: string }[]>([
    { role: "agent", text: "Bonjour ! Je suis l'agent Axyra. Posez-moi vos questions sur nos offres, délais ou secteurs — je vous réponds instantanément." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  type Rule = { test: (q: string) => boolean; reply: string };
  const RULES: Rule[] = [
    {
      test: q => /bonjour|salut|hello|bonsoir|coucou/.test(q),
      reply: "Bonjour ! Ravi de vous accueillir. Je peux vous répondre sur nos offres, nos délais, nos secteurs ou la sécurité de vos données. Par quoi commencez-vous ?"
    },
    {
      test: q => /qu.est.ce qu|c.est quoi|qui êtes.vous|qui est axyra|présent/.test(q),
      reply: "Axyra est une agence IA spécialisée dans les PME et ETI françaises. On vous aide à identifier les bons cas d'usage, puis on les développe et les déploie — de l'audit jusqu'à la maintenance."
    },
    {
      test: q => /prix|tarif|co[ûu]t|combien|budget|facturation|facture/.test(q),
      reply: "Nos missions démarrent par un audit IA (2 à 4 semaines). Le budget varie selon la complexité du projet. La meilleure façon d'avoir une estimation précise : 30 min d'échange gratuit avec notre équipe."
    },
    {
      test: q => /par o[ùu] commencer|d[ée]marrer|premi[èe]re [ée]tape|se lancer|d[ée]but|comment [ée]a marche|comment fonctionne/.test(q),
      reply: "Tout démarre par un audit de 2 à 4 semaines : on cartographie vos processus, on identifie les 3 cas d'usage à fort ROI, et on vous présente un plan d'action chiffré. C'est la seule vraie façon de ne pas se tromper."
    },
    {
      test: q => /d[ée]lai|dur[ée]e|livraison|semaines?|mois|combien de temps/.test(q),
      reply: "Premier livrable en 4 semaines pour l'audit. Développement complet : 6 à 16 semaines selon la complexité. ROI constaté en moins de 3 mois en moyenne chez nos clients."
    },
    {
      test: q => /secteur|industrie|btp|navale?|construction|logistique|agro|sant[ée]|n[ée]goce|transport/.test(q),
      reply: "On travaille avec des PME et ETI dans de nombreux secteurs : BTP, construction navale, logistique, industrie, distribution, agroalimentaire, santé, négoce... Le point commun : des processus répétitifs à fort volume."
    },
    {
      test: q => /donn[ée]es|s[ée]curit[ée]|confidentialit[ée]|rgpd|cloud|on.premise|h[ée]berg/.test(q),
      reply: "Vos données restent dans votre périmètre. On privilégie les architectures on-premise ou cloud dédié — jamais d'environnements mutualisés. Conformité RGPD incluse dans chaque mission."
    },
    {
      test: q => /roi|r[ée]sultat|gain|[ée]conomie|productivit[ée]|retour sur|impact/.test(q),
      reply: "En moyenne : –45 min par personne par jour sur les tâches automatisées, ROI en moins de 3 mois. On s'engage sur des métriques précises avant de commencer — pas de promesses floues."
    },
    {
      test: q => /[ée]quipe|consultant|expert|qui travaille|profil/.test(q),
      reply: "Notre équipe associe des experts métier (anciens directeurs d'exploitation, responsables supply chain, DAF) et des ingénieurs IA seniors. Pas de juniors sur vos projets."
    },
    {
      test: q => /contact|rendez.vous|appel|parler|audit gratuit|discuter|rencontrer/.test(q),
      reply: "Pour prendre contact : remplissez le formulaire en bas de page ou écrivez-nous à contact@axyra.ai. L'audit de 30 minutes est gratuit et sans engagement."
    },
  ];

  const getReply = (text: string): string => {
    const q = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const rule = RULES.find(r => r.test(q));
    return rule?.reply ?? "Je ne suis pas sûr de comprendre votre question. Vous pouvez me demander nos offres, nos délais, nos secteurs, ou prendre contact directement via le formulaire en bas de page.";
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!input.trim() || typing) return;
    const text = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "agent", text: getReply(text) }]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 300 }}>
      {open && (
        <div style={{ position: "absolute", bottom: 68, right: 0, width: 320, background: "#0F0E20", border: "0.5px solid rgba(127,119,221,0.3)", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.6)", animation: "fadeInUp 0.25s ease" }}>
          <div style={{ background: `linear-gradient(135deg, ${VIOLET}, #5B54C4)`, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28CA41", flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Agent Axyra</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginLeft: "auto" }}>En ligne</span>
          </div>
          <div style={{ maxHeight: 280, overflowY: "auto", padding: "16px 14px 8px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 10, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "84%", padding: "9px 13px", borderRadius: m.role === "agent" ? "4px 12px 12px 12px" : "12px 4px 12px 12px", background: m.role === "agent" ? "rgba(127,119,221,0.15)" : VIOLET, fontSize: 13, color: "#fff", lineHeight: 1.55 }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "8px 12px", background: "rgba(127,119,221,0.1)", borderRadius: "4px 12px 12px 12px", width: "fit-content", marginBottom: 10 }}>
                {[0, 0.2, 0.4].map(d => <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: VIOLET_LIGHT, animation: `blink 1s ease ${d}s infinite` }} />)}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: "10px 12px 14px", display: "flex", gap: 8, borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Posez votre question..." style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 12px", color: "#fff", fontSize: 13, outline: "none" }} />
            <button onClick={handleSend} style={{ background: VIOLET, color: "#fff", border: "none", borderRadius: 8, padding: "9px 14px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>→</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} style={{ width: 52, height: 52, borderRadius: "50%", background: open ? "#2A2940" : VIOLET, color: "#fff", border: `1px solid ${open ? "rgba(127,119,221,0.3)" : "transparent"}`, cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 24px ${VIOLET}55`, transition: "all 0.2s" }}>
        {open ? "✕" : "✦"}
      </button>
    </div>
  );
}

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function AnimatedMockup({ isMobile }: { isMobile: boolean }) {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState("");
  const QUERY = "Traiter les factures du mois";
  const TASKS = ["Lecture de 47 documents entrants", "Extraction automatique des données", "Synchronisation avec votre ERP", "Rapport de synthèse généré"];
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>;
    if (phase === 0) {
      let i = 0;
      timer = setInterval(() => {
        i++;
        setTyped(QUERY.slice(0, i));
        if (i >= QUERY.length) { clearInterval(timer); timer = setTimeout(() => setPhase(1), 600); }
      }, 55);
    } else if (phase >= 1 && phase <= TASKS.length) {
      timer = setTimeout(() => setPhase(p => p + 1), 900);
    } else if (phase > TASKS.length) {
      timer = setTimeout(() => { setPhase(0); setTyped(""); }, 3000);
    }
    return () => { clearInterval(timer as any); clearTimeout(timer as any); };
  }, [phase]);

  return (
    <div style={{ position: "relative", maxWidth: isMobile ? "100%" : 400, width: "100%" }}>
      <div style={{ background: "#0D0C1E", border: "1px solid rgba(127,119,221,0.35)", borderRadius: 20, padding: "22px 22px 18px", animation: "float 5s ease-in-out infinite", boxShadow: "0 0 80px rgba(127,119,221,0.18), 0 20px 60px rgba(0,0,0,0.4)", fontFamily: "ui-monospace, monospace" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", gap: 5 }}>
            {["#FF5F57", "#FFBD2E", "#28CA41"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.8 }} />)}
          </div>
          <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>Agent Axyra</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28CA41" }} />
            <span style={{ fontSize: 10, color: "#28CA41" }}>En ligne</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, background: "rgba(127,119,221,0.08)", borderRadius: 8, padding: "9px 12px" }}>
          <span style={{ color: VIOLET, fontSize: 12, flexShrink: 0 }}>›</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>{typed}</span>
          {phase === 0 && <span style={{ animation: "blink 0.8s step-end infinite", color: VIOLET }}>▌</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {TASKS.map((task, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, opacity: phase > i ? 1 : 0.12, transition: "opacity 0.4s ease", fontSize: 12 }}>
              <div style={{ width: 17, height: 17, borderRadius: "50%", background: phase > i + 1 ? "rgba(40,202,65,0.15)" : `${VIOLET}22`, border: `1px solid ${phase > i + 1 ? "#28CA41" : VIOLET}66`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 9, transition: "all 0.3s" }}>
                {phase > i + 1 ? <span style={{ color: "#28CA41" }}>✓</span> : <span style={{ color: VIOLET }}>◎</span>}
              </div>
              <span style={{ color: phase > i + 1 ? "rgba(255,255,255,0.55)" : VIOLET_LIGHT, flex: 1 }}>{task}</span>
              {phase === i + 1 && <span style={{ fontSize: 9, color: VIOLET, opacity: 0.7 }}>en cours…</span>}
            </div>
          ))}
        </div>
        <div style={{ opacity: phase > TASKS.length ? 1 : 0, transform: phase > TASKS.length ? "translateY(0)" : "translateY(6px)", transition: "all 0.5s ease", background: "rgba(40,202,65,0.06)", border: "0.5px solid rgba(40,202,65,0.25)", borderRadius: 8, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "#28CA41", fontWeight: 500 }}>✓ Mission accomplie</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>2h30 économisées</span>
        </div>
      </div>
      {!isMobile && (
        <>
          <div style={{ position: "absolute", top: -18, right: -28, background: NIGHT, border: `1px solid ${VIOLET}44`, borderRadius: 12, padding: "10px 14px", animation: "float 4s ease-in-out infinite 1.2s", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", margin: 0 }}>–45 min</p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", margin: 0 }}>par jour et par équipe</p>
          </div>
          <div style={{ position: "absolute", bottom: -14, left: -24, background: NIGHT, border: `1px solid ${VIOLET}44`, borderRadius: 12, padding: "10px 14px", animation: "float 4s ease-in-out infinite 2.8s", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", margin: 0 }}>ROI {"<"} 3 mois</p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", margin: 0 }}>en moyenne</p>
          </div>
        </>
      )}
    </div>
  );
}

function LogoTicker() {
  const sectors = ["Construction Navale", "BTP & Génie Civil", "Logistique", "Industrie", "Distribution B2B", "Agroalimentaire", "Santé / MedTech", "Services B2B", "Négoce", "Maintenance industrielle", "Transport", "Énergie"];
  const items = [...sectors, ...sectors];
  return (
    <div style={{ padding: "20px 0", background: "#0E0D22", borderTop: "0.5px solid rgba(127,119,221,0.1)", borderBottom: "0.5px solid rgba(127,119,221,0.1)", overflow: "hidden" }}>
      <div style={{ display: "flex", animation: "marquee 32s linear infinite", width: "max-content" }}>
        {items.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, padding: "0 28px", flexShrink: 0 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontWeight: 400, whiteSpace: "nowrap" }}>{s}</span>
            <span style={{ color: VIOLET, fontSize: 7, opacity: 0.5 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PainPoints() {
  const w = useWindowWidth();
  const isMobile = w < 768;
  const pains = [
    { icon: "⏱", text: "Vos équipes passent des heures sur des tâches répétitives que l'IA ferait en secondes." },
    { icon: "📂", text: "Vous avez des données précieuses, mais aucun outil pour en extraire de la valeur concrète." },
    { icon: "🔌", text: "Vos outils ne communiquent pas — la consolidation se fait à la main, souvent dans Excel." },
    { icon: "🚀", text: "Vos concurrents commencent à automatiser. Vous ne savez pas encore par où commencer." },
  ];
  return (
    <section style={{ padding: isMobile ? "64px 5%" : "80px 6%", background: "#12112A" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <ScrollReveal>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: VIOLET, marginBottom: 12, fontWeight: 500 }}>Vous vous reconnaissez ?</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 600, letterSpacing: "-0.5px", marginBottom: 36, color: "#fff" }}>Ces situations vous parlent ?</h2>
        </ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 14 }}>
          {pains.map((p, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "rgba(127,119,221,0.05)", border: "0.5px solid rgba(127,119,221,0.12)", borderRadius: 14, padding: "20px 22px", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(127,119,221,0.35)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(127,119,221,0.12)")}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{p.icon}</span>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>{p.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={280}>
          <p style={{ marginTop: 28, textAlign: "center", fontSize: 14, color: "rgba(255,255,255,0.35)" }}>Si vous avez répondu oui à l'une de ces situations — on peut vous aider.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

type CasClient = {
  logo: string;
  name: string;
  logoUrl: string;
  secteur: string;
  taille: string;
  tagline: string;
  tags: string[];
  accroche: string;
  context: string;
  probleme: string;
  solution: { titre: string; desc: string }[];
  resultats: { valeur: string; label: string }[];
  citation: string;
  citationAuteur: string;
};

const CAS_CLIENTS: CasClient[] = [
  {
    logo: "SC",
    name: "Socarenam",
    logoUrl: "https://logo.clearbit.com/socarenam.com",
    secteur: "Construction navale",
    taille: "ETI — 300 collaborateurs",
    tagline: "Assistant IA sur les archives techniques et automatisation des réponses aux appels d'offres publics",
    tags: ["IA Générative", "Recherche documentaire", "Industrie"],
    accroche: "60 ans d'archives interrogeables en quelques secondes. –55% de temps sur les réponses AO.",
    context: "SOCARENAM est un chantier naval leader en France, basé à Calais. Depuis 1961, l'entreprise conçoit et réalise des navires sur mesure pour des clients exigeants : Marine Nationale, Douanes françaises, armateurs de pêche industrielle, opérateurs offshore. Chaque projet est unique et génère des milliers de documents techniques.",
    probleme: "Les ingénieurs passaient des jours entiers à fouiller les archives techniques pour trouver des spécifications issues de projets similaires. Pour les appels d'offres publics (Marine Nationale, Douanes), assembler une réponse complète mobilisait 2 à 3 semaines d'un ingénieur, souvent en parallèle des projets en cours. La mémoire de l'entreprise était enfouie dans 60 ans de documents non indexés.",
    solution: [
      {
        titre: "Moteur de recherche IA sur les archives techniques",
        desc: "Les 60 ans de documentation technique de Socarenam (plans, cahiers des charges, rapports de recette, fiches de non-conformité) ont été indexés et rendus interrogeables en langage naturel. Un ingénieur peut désormais demander \"quelles solutions avons-nous utilisées pour l'étanchéité des compartiments sur les patrouilleurs de moins de 25m ?\" et obtenir une synthèse en quelques secondes.",
      },
      {
        titre: "Agent de réponse aux appels d'offres",
        desc: "Lors d'un appel d'offres public, l'agent IA analyse le cahier des charges, identifie les exigences clés, recherche dans les archives les éléments de réponse pertinents (références similaires, certifications, délais), et génère une première structure de réponse que les équipes techniques enrichissent et valident.",
      },
    ],
    resultats: [
      { valeur: "–55%", label: "de temps sur les réponses AO" },
      { valeur: "< 10 sec", label: "pour interroger 60 ans d'archives" },
      { valeur: "3 semaines", label: "économisées par appel d'offres" },
      { valeur: "+40%", label: "de capacité à répondre aux AO" },
    ],
    citation: "Avant, retrouver une spécification technique dans nos archives prenait une journée. Maintenant on interroge 60 ans de projets en quelques secondes. C'est un changement radical pour nos ingénieurs.",
    citationAuteur: "Directeur technique, Socarenam",
  },
  {
    logo: "OC",
    name: "Opale Construction",
    logoUrl: "https://logo.clearbit.com/opaleconstruction.com",
    secteur: "BTP & Génie Civil",
    taille: "ETI — 50 collaborateurs",
    tagline: "Automatisation des rapports de chantier et traitement des factures fournisseurs",
    tags: ["Automatisation", "Traitement documentaire", "BTP"],
    accroche: "3h/semaine économisées par chef de chantier. ROI atteint en 2,5 mois.",
    context: "Opale Construction accompagne depuis 13 ans les collectivités et industriels des Hauts-de-France dans leurs projets de bâtiment et génie civil. En croissance régulière, l'entreprise faisait face à une charge administrative croissante qui mobilisait ses équipes terrain sur des tâches à faible valeur ajoutée.",
    probleme: "Chaque chef de chantier passait entre 3 et 4 heures par semaine à rédiger des comptes-rendus de chantier, remplir les fiches de suivi et préparer les reporting clients. En parallèle, le service comptabilité traitait plus de 150 factures fournisseurs par mois en saisie manuelle — source d'erreurs et de retards de paiement.",
    solution: [
      {
        titre: "Agent IA de rapports de chantier",
        desc: "Les chefs de chantier dictent leurs observations en voice note depuis leur téléphone en fin de journée. L'agent IA transcrit, structure et génère automatiquement le compte-rendu dans le format standard d'Opale Construction, avec les points clés, les actions à suivre et les photos associées.",
      },
      {
        titre: "Extraction automatique des factures fournisseurs",
        desc: "Les factures reçues par email ou scan sont traitées automatiquement : extraction des données clés (montant, TVA, références, fournisseur), vérification de cohérence avec les bons de commande, et pré-saisie dans l'ERP. L'équipe comptable ne valide plus que les exceptions.",
      },
    ],
    resultats: [
      { valeur: "–45 min", label: "par jour et par chef de chantier" },
      { valeur: "–65%", label: "de temps de saisie factures" },
      { valeur: "2,5 mois", label: "pour atteindre le ROI" },
      { valeur: "0 erreur", label: "de saisie depuis le déploiement" },
    ],
    citation: "On avait l'impression que l'administratif nous bouffait de plus en plus de temps sur le terrain. Depuis le déploiement, mes chefs de chantier ont récupéré du temps pour ce qui compte vraiment.",
    citationAuteur: "Dirigeant, Opale Construction",
  },
];

function CasClientModal({ cas, onClose }: { cas: CasClient; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => { clearTimeout(t); document.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  const steps = ["Problème", "Solution", "Résultats"];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? 0 : "24px" }}>
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(8,7,20,0.9)", backdropFilter: "blur(8px)", opacity: visible ? 1 : 0, transition: "opacity 0.3s" }} onClick={onClose} />

      {/* Modal */}
      <div style={{ position: "relative", width: "min(900px, 100%)", height: isMobile ? "100vh" : "calc(100vh - 48px)", background: "#0D0C1E", borderRadius: isMobile ? 0 : 24, overflow: "hidden", display: "flex", flexDirection: "column", opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)", transition: "opacity 0.35s ease, transform 0.35s ease", boxShadow: "0 40px 120px rgba(0,0,0,0.7)" }}
        onClick={e => e.stopPropagation()}>

        {/* Sticky top bar */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", background: "rgba(13,12,30,0.95)", backdropFilter: "blur(8px)", zIndex: 10 }}>
          <LogoAvatar logo={cas.logo} size={36} radius={8} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cas.name}</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>{cas.secteur} · {cas.taille}</p>
          </div>
          {!isMobile && (
            <div style={{ display: "flex", gap: 6 }}>
              {cas.tags.map(t => <span key={t} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: "rgba(127,119,221,0.12)", color: VIOLET_LIGHT }}>{t}</span>)}
            </div>
          )}
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto" }}>

          {/* HERO */}
          <div style={{ padding: isMobile ? "40px 24px 36px" : "56px 56px 48px", background: "linear-gradient(160deg, #1A1730 0%, #0D0C1E 60%)", borderBottom: "0.5px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${VIOLET}20 0%, transparent 70%)`, pointerEvents: "none" }} />
            <p style={{ fontSize: 11, color: VIOLET, textTransform: "uppercase" as const, letterSpacing: "0.12em", fontWeight: 600, marginBottom: 20 }}>Étude de cas</p>
            <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.35, color: "#fff", marginBottom: 32, maxWidth: 600 }}>{cas.tagline}</h1>

            {/* Métriques avec animation d'apparition */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 12 }}>
              {cas.resultats.map((r, i) => (
                <div key={r.label} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(127,119,221,0.2)", borderRadius: 14, padding: "20px 16px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.5s ease ${200 + i * 100}ms, transform 0.5s ease ${200 + i * 100}ms` }}>
                  <p style={{ fontSize: isMobile ? 24 : 28, fontWeight: 800, color: "#fff", letterSpacing: "-1px", margin: "0 0 6px" }}>{r.valeur}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.4, margin: 0 }}>{r.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BODY */}
          <div style={{ padding: isMobile ? "36px 24px 60px" : "48px 56px 80px", display: "flex", flexDirection: "column", gap: 40 }}>

            {/* Citation */}
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ fontSize: 48, color: VIOLET, lineHeight: 1, flexShrink: 0, marginTop: -8, fontFamily: "Georgia, serif" }}>"</div>
              <div>
                <p style={{ fontSize: isMobile ? 16 : 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 12px" }}>{cas.citation}</p>
                <p style={{ fontSize: 13, color: VIOLET_LIGHT, fontWeight: 600, margin: 0 }}>— {cas.citationAuteur}</p>
              </div>
            </div>

            {/* Séparateur avec journey indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {steps.map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: VIOLET, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{s}</span>
                  </div>
                  {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${VIOLET}60, ${VIOLET}20)`, margin: "0 8px", marginBottom: 20 }} />}
                </div>
              ))}
            </div>

            {/* Contexte + Problème */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: VIOLET, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>1</div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>Le problème</h2>
              </div>
              <div style={{ marginLeft: 14, paddingLeft: 24, borderLeft: `1px solid rgba(127,119,221,0.2)` }}>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 16 }}>{cas.context}</p>
                <div style={{ background: "rgba(255,80,80,0.06)", border: "0.5px solid rgba(255,80,80,0.15)", borderRadius: 12, padding: "16px 20px" }}>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, margin: 0 }}>{cas.probleme}</p>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: VIOLET, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>2</div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>Notre intervention</h2>
              </div>
              <div style={{ marginLeft: 14, paddingLeft: 24, borderLeft: `1px solid rgba(127,119,221,0.2)`, display: "flex", flexDirection: "column", gap: 16 }}>
                {cas.solution.map((s, i) => (
                  <div key={i} style={{ background: "rgba(127,119,221,0.06)", border: "0.5px solid rgba(127,119,221,0.15)", borderRadius: 14, padding: "20px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: VIOLET, background: `${VIOLET}18`, borderRadius: 20, padding: "3px 10px" }}>Agent {i + 1}</span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>{s.titre}</p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Résultats */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#28CA41", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>3</div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>Les résultats</h2>
              </div>
              <div style={{ marginLeft: 14, paddingLeft: 24, borderLeft: "1px solid rgba(40,202,65,0.2)" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 10 }}>
                  {cas.resultats.map(r => (
                    <div key={r.label} style={{ background: "rgba(40,202,65,0.06)", border: "0.5px solid rgba(40,202,65,0.2)", borderRadius: 12, padding: "16px 14px" }}>
                      <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", margin: "0 0 4px" }}>{r.valeur}</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.4, margin: 0 }}>{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA final */}
            <div style={{ background: "linear-gradient(135deg, rgba(127,119,221,0.1), rgba(127,119,221,0.04))", border: "0.5px solid rgba(127,119,221,0.2)", borderRadius: 18, padding: isMobile ? "28px 24px" : "36px 40px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: 20 }}>
              <div>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Ce cas vous parle ?</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: 0 }}>Discutons de votre situation en 30 minutes — gratuit, sans engagement.</p>
              </div>
              <button onClick={() => { onClose(); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300); }} style={{ background: VIOLET, color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" as const }}>
                Prendre contact →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CasClientsSection() {
  const [selectedCas, setSelectedCas] = useState<CasClient | null>(null);
  const w = useWindowWidth();
  const isMobile = w < 768;

  return (
    <section id="cas-clients" style={{ padding: isMobile ? "72px 5%" : "100px 6%", background: MIST }}>
      {selectedCas && <CasClientModal cas={selectedCas} onClose={() => setSelectedCas(null)} />}
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: VIOLET_DARK, marginBottom: 16, fontWeight: 500 }}>Cas clients</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, letterSpacing: "-1px", color: NIGHT }}>
            Des résultats concrets,<br />dans des entreprises comme la vôtre.
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {CAS_CLIENTS.map((cas, idx) => (
            <ScrollReveal key={cas.logo} delay={idx * 80}>
              <div onClick={() => setSelectedCas(cas)}
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 24, overflow: "hidden", cursor: "pointer", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", transition: "box-shadow 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 20px 56px rgba(0,0,0,0.1)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>

                {/* Gauche : contexte + citation */}
                <div style={{ padding: isMobile ? "28px 24px" : "44px 40px", borderBottom: isMobile ? "1px solid rgba(0,0,0,0.06)" : "none", borderRight: isMobile ? "none" : "1px solid rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                    <LogoAvatar logo={cas.logo} size={52} radius={14} />
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: NIGHT, margin: "0 0 3px" }}>{cas.name}</p>
                      <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>{cas.secteur} · {cas.taille}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
                    {cas.tags.map(t => <span key={t} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: `${VIOLET}12`, color: VIOLET_DARK, fontWeight: 500 }}>{t}</span>)}
                  </div>

                  {/* Citation */}
                  <div style={{ flex: 1, borderLeft: `3px solid ${VIOLET}`, paddingLeft: 18, marginBottom: 28 }}>
                    <p style={{ fontSize: 14, color: "#444", lineHeight: 1.75, fontStyle: "italic", margin: "0 0 10px" }}>"{cas.citation}"</p>
                    <p style={{ fontSize: 12, color: "#bbb", fontWeight: 500, margin: 0 }}>— {cas.citationAuteur}</p>
                  </div>

                  <button onClick={e => { e.stopPropagation(); setSelectedCas(cas); }}
                    style={{ alignSelf: "flex-start", background: VIOLET, color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    Voir l'étude complète →
                  </button>
                </div>

                {/* Droite : métriques */}
                <div style={{ padding: isMobile ? "28px 24px" : "44px 40px", background: "#fafafa", display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: 11, color: "#bbb", textTransform: "uppercase" as const, letterSpacing: "0.1em", fontWeight: 600, marginBottom: 20 }}>Résultats obtenus</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                    {cas.resultats.map(r => (
                      <div key={r.label} style={{ background: "#fff", borderRadius: 14, padding: "18px 16px", border: "1px solid rgba(0,0,0,0.06)" }}>
                        <p style={{ fontSize: 26, fontWeight: 800, color: VIOLET_DARK, letterSpacing: "-1px", margin: "0 0 4px" }}>{r.valeur}</p>
                        <p style={{ fontSize: 12, color: "#999", lineHeight: 1.4, margin: 0 }}>{r.label}</p>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, margin: 0 }}>{cas.accroche}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Placeholder */}
          <ScrollReveal delay={200}>
            <div style={{ border: `1.5px dashed rgba(127,119,221,0.25)`, borderRadius: 24, padding: isMobile ? "40px 24px" : "48px 40px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: 24, background: "rgba(127,119,221,0.02)" }}>
              <div>
                <p style={{ fontSize: 18, fontWeight: 700, color: VIOLET_DARK, margin: "0 0 8px" }}>Votre entreprise ici ?</p>
                <p style={{ fontSize: 14, color: "#aaa", margin: 0, maxWidth: 420, lineHeight: 1.6 }}>On construit votre cas d'usage en 4 semaines. Rejoignez les PME et ETI qui ont déjà franchi le pas.</p>
              </div>
              <button style={{ background: VIOLET, color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" as const }}>
                Audit gratuit — 30 min →
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ExpertiseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [processing, setProcessing] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 768;

  const switchTab = (i: number) => {
    if (i === activeTab) return;
    setProcessing(true);
    setTimeout(() => { setActiveTab(i); setActiveSub(0); setProcessing(false); }, 420);
  };

  const tab = EXPERTISE[activeTab];
  const sub = tab.subs[activeSub];

  return (
    <section id="expertise" style={{ padding: isMobile ? "72px 5%" : "100px 6%", background: MIST }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: VIOLET_DARK, marginBottom: 16, fontWeight: 500 }}>Nos expertises IA</p>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 600, letterSpacing: "-1px", marginBottom: 16, color: NIGHT }}>
          Tout ce que l'IA peut faire<br />pour votre entreprise.
        </h2>
        <p style={{ fontSize: 15, color: "#666", maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
          Quatre domaines d'expertise, des dizaines de cas d'usage concrets. Nous sélectionnons avec vous ceux qui ont le meilleur ROI.
        </p>

        {/* Main tabs — scrollable on mobile */}
        <div style={{ display: "flex", gap: 4, overflowX: "auto", marginBottom: 32, borderBottom: `1px solid rgba(127,119,221,0.15)`, paddingBottom: 0, WebkitOverflowScrolling: "touch" as any }}>
          {EXPERTISE.map((t, i) => (
            <button key={t.id} onClick={() => switchTab(i)}
              style={{
                background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap" as const,
                padding: isMobile ? "10px 14px" : "12px 20px", fontSize: isMobile ? 13 : 14,
                fontWeight: activeTab === i ? 600 : 400,
                color: activeTab === i ? NIGHT : "rgba(0,0,0,0.4)",
                borderBottom: activeTab === i ? `2px solid ${VIOLET}` : "2px solid transparent",
                marginBottom: -1, transition: "all 0.2s", flexShrink: 0,
                display: "flex", alignItems: "center", gap: 6,
              }}>
              <span style={{ color: VIOLET, fontSize: 14 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr", gap: isMobile ? 16 : 28, alignItems: "start" }}>
          {/* Sub-tabs — horizontal scroll on mobile */}
          <div style={isMobile
            ? { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch" as any }
            : { display: "flex", flexDirection: "column", gap: 4 }}>
            {!isMobile && <p style={{ fontSize: 11, color: "rgba(0,0,0,0.35)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>{tab.label}</p>}
            {tab.subs.map((s, i) => (
              <button key={s.name} onClick={() => setActiveSub(i)}
                style={{
                  background: activeSub === i ? `rgba(127,119,221,0.1)` : "rgba(0,0,0,0.03)",
                  border: activeSub === i ? `0.5px solid rgba(127,119,221,0.35)` : "0.5px solid rgba(0,0,0,0.08)",
                  borderRadius: 10, padding: isMobile ? "8px 14px" : "11px 14px",
                  cursor: "pointer", textAlign: "left" as const, whiteSpace: isMobile ? "nowrap" as const : "normal" as const, flexShrink: 0,
                  color: activeSub === i ? VIOLET_DARK : "#888",
                  fontSize: 13, fontWeight: activeSub === i ? 600 : 400, transition: "all 0.15s",
                }}>
                {s.name}
              </button>
            ))}
          </div>

          {/* Sub content */}
          <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: isMobile ? "24px 20px" : "36px 32px", position: "relative", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            {processing && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 16 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {[0, 0.15, 0.3].map(d => <div key={d} style={{ width: 8, height: 8, borderRadius: "50%", background: VIOLET, animation: `blink 0.9s ease ${d}s infinite` }} />)}
                </div>
                <span style={{ fontSize: 12, color: VIOLET_DARK, letterSpacing: "0.05em" }}>Analyse en cours…</span>
              </div>
            )}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: `${VIOLET}0d`, border: `0.5px solid ${VIOLET}33`, borderRadius: 10, padding: "12px 16px", marginBottom: 24 }}>
              <span style={{ color: VIOLET, fontSize: 15, flexShrink: 0 }}>⚡</span>
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, fontStyle: "italic" }}>{sub.pain}</p>
            </div>
            <h3 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 600, letterSpacing: "-0.5px", marginBottom: 6, color: NIGHT }}>{sub.name}</h3>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 24, lineHeight: 1.7 }}>{tab.tagline}</p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
              {sub.usecases.map((uc) => (
                <div key={uc} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#f8f8fc", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(127,119,221,0.1)" }}>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", background: `${VIOLET}18`, border: `1px solid ${VIOLET}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: VIOLET }} />
                  </span>
                  <span style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{uc}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: 13, color: "#aaa" }}>Vous vous reconnaissez ?</span>
              <button style={{ background: VIOLET, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                Parlons-en →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogOverlay({ articles, initialIdx, onClose }: { articles: Article[]; initialIdx: number | null; onClose: () => void }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(initialIdx);
  const [visible, setVisible] = useState(false);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  useEffect(() => { const t = setTimeout(() => setVisible(true), 30); return () => clearTimeout(t); }, []);
  const article = (selectedIdx !== null && selectedIdx >= 0 && selectedIdx < articles.length) ? articles[selectedIdx] : null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "#F5F4FF", overflowY: "auto", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 10, background: `${NIGHT}EE`, backdropFilter: "blur(12px)", borderBottom: `0.5px solid rgba(127,119,221,0.15)`, padding: "0 6%" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
    <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.5px", cursor: "pointer" }} onClick={onClose}>
      Ax<span style={{ color: VIOLET }}>yr</span>a
    </div>
    {windowWidth >= 900 ? (
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {[["Expertise"], ["Offres"], ["Pourquoi Axyra"], ["Équipe"], ["Contact"]].map(([label]) => (
          <button key={label} onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, cursor: "pointer", padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
            {label}
          </button>
        ))}
        <button style={{ background: "none", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", padding: 0, fontWeight: 600 }}>
          Blog
        </button>
        <button onClick={onClose} style={{ background: VIOLET, color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
          Prendre contact
        </button>
      </div>
    ) : (
      <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "7px 16px", color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer" }}>
        ← Retour au site
      </button>
    )}
  </div>
  </nav>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "40px 5% 80px" : "60px 6% 100px" }}>
        {article ? (
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <button onClick={() => setSelectedIdx(null)} style={{ background: "none", border: "none", color: VIOLET, fontSize: 14, fontWeight: 500, cursor: "pointer", marginBottom: 40, padding: 0 }}>← Tous les articles</button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: article.tagColor, background: `${article.tagColor}18`, padding: "4px 10px", borderRadius: 20 }}>{article.tag}</span>
              <span style={{ fontSize: 12, color: "#bbb" }}>{article.date} · {article.readTime} de lecture</span>
            </div>
            <h1 style={{ fontSize: isMobile ? 22 : 32, fontWeight: 700, color: NIGHT, lineHeight: 1.3, letterSpacing: "-0.5px", marginBottom: 20 }}>{article.title}</h1>
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.75, borderLeft: `3px solid ${VIOLET}`, paddingLeft: 20, marginBottom: 40, fontStyle: "italic" }}>{article.excerpt}</p>
            <div style={{ height: 1, background: "rgba(0,0,0,0.08)", marginBottom: 40 }} />
            <div style={{ fontSize: 16, color: "#333", lineHeight: 1.85 }}>
              {(article.content || []).map((block, i) => {
                if (!block) return null;
                if (block.type === "h2") return <h2 key={i} style={{ fontSize: 20, fontWeight: 700, color: NIGHT, marginTop: 40, marginBottom: 14 }}>{block.text}</h2>;
                if (block.type === "h3") return <h3 key={i} style={{ fontSize: 17, fontWeight: 600, color: NIGHT, marginTop: 28, marginBottom: 10 }}>{block.text}</h3>;
                if (block.type === "ul") return <ul key={i} style={{ marginBottom: 20, paddingLeft: 20 }}>{(block.items || []).map((item, j) => <li key={j} style={{ marginBottom: 8 }}>{item}</li>)}</ul>;
                return <p key={i} style={{ marginBottom: 20 }}>{block.text}</p>;
              })}
            </div>
            <div style={{ marginTop: 56, background: NIGHT, borderRadius: 20, padding: isMobile ? "28px 24px" : "36px 40px", display: "flex", flexDirection: (isMobile ? "column" : "row") as ("column" | "row"), alignItems: (isMobile ? "flex-start" : "center") as ("flex-start" | "center"), justifyContent: "space-between", gap: 20 }}>
              <div>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Ça vous parle ?</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: 0 }}>30 minutes pour identifier vos cas d'usage — gratuit, sans engagement.</p>
              </div>
              <button onClick={() => { onClose(); setTimeout(() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 300); }} style={{ background: VIOLET, color: "#fff", border: "none", borderRadius: 8, padding: "11px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" as const }}>
                Prendre contact →
              </button>
            </div>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: VIOLET, marginBottom: 12, fontWeight: 600 }}>Blog</p>
            <h1 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 700, color: NIGHT, letterSpacing: "-1px", marginBottom: 12 }}>L'IA appliquée aux PME et ETI.</h1>
            <p style={{ fontSize: 16, color: "#888", maxWidth: 520, lineHeight: 1.65, marginBottom: 48 }}>Cas concrets, méthodes et retours terrain — sans jargon.</p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
              {articles.map((a, i) => (
                <div key={a.title} onClick={() => setSelectedIdx(i)}
                  style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 20, overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.25s, transform 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ height: 4, background: a.tagColor }} />
                  <div style={{ padding: "28px 28px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: a.tagColor, background: `${a.tagColor}18`, padding: "4px 10px", borderRadius: 20 }}>{a.tag}</span>
                      <span style={{ fontSize: 12, color: "#bbb" }}>{a.date}</span>
                    </div>
                    <h2 style={{ fontSize: 17, fontWeight: 700, color: NIGHT, lineHeight: 1.4, marginBottom: 12 }}>{a.title}</h2>
                    <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>{a.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function BlogPage() {
  return <BlogOverlay articles={ARTICLES} initialIdx={null} onClose={() => window.location.href = "/"} />;
}

function ArticlePage() {
  const { slug } = useParams();
  const idx = ARTICLES.findIndex(a => a.slug === slug);
  if (idx === -1) { window.location.href = "/blog"; return null; }
  return <BlogOverlay articles={ARTICLES} initialIdx={idx} onClose={() => window.location.href = "/blog"} />;
}
export default function AxyraWebsite() {
  return (
    <Routes>
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<ArticlePage />} />
      <Route path="/*" element={<AxyraMain />} />
    </Routes>
  );
}

function AxyraMain() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [blogOpen, setBlogOpen] = useState<{open: boolean; idx: number | null}>({open: false, idx: null});
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: NIGHT, color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
      {blogOpen.open && <BlogOverlay articles={ARTICLES} initialIdx={blogOpen.idx} onClose={() => setBlogOpen({open: false, idx: null})} />}

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow-green { 0%,100%{box-shadow:0 0 4px #28CA41} 50%{box-shadow:0 0 10px #28CA41} }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: `${NIGHT}EE`, backdropFilter: "blur(12px)", borderBottom: `0.5px solid rgba(127,119,221,0.15)`, padding: "0 6%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.5px", cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            Ax<span style={{ color: VIOLET }}>yr</span>a
          </div>
          {/* Desktop nav */}
          {windowWidth >= 900 && (
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              {[["expertise", "Expertise"], ["offres", "Offres"], ["pourquoi", "Pourquoi Axyra"], ["equipe", "Équipe"], ["contact", "Contact"]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, cursor: "pointer", padding: 0, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                  {label}
                </button>
              ))}
              <button onClick={() => window.location.href = "/blog"} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, cursor: "pointer", padding: 0, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                Blog
              </button>
              <button onClick={() => scrollTo("contact")} style={{ background: VIOLET, color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                Prendre contact
              </button>
            </div>
          )}
          {/* Mobile hamburger */}
          {windowWidth < 900 && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => scrollTo("contact")} style={{ background: VIOLET, color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                Contact
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: "#fff", fontSize: 18, lineHeight: 1 }}>
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          )}
        </div>
        {/* Mobile menu dropdown */}
        {menuOpen && windowWidth < 900 && (
          <div style={{ borderTop: `0.5px solid rgba(127,119,221,0.15)`, padding: "16px 0 20px" }}>
            {[["expertise", "Expertise"], ["offres", "Offres"], ["pourquoi", "Pourquoi Axyra"], ["equipe", "Équipe"], ["contact", "Contact"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ display: "block", width: "100%", textAlign: "left" as const, background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 15, cursor: "pointer", padding: "10px 6%", transition: "color 0.2s" }}>
                {label}
              </button>
            ))}
            <button onClick={() => window.location.href = "/blog"} style={{ display: "block", width: "100%", textAlign: "left" as const, background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 15, cursor: "pointer", padding: "10px 6%" }}>
              Blog
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: isMobile ? "100px 5% 60px" : "120px 6% 80px", position: "relative", overflow: "hidden" }}>
        <NeuralCanvas />
        <div style={{ position: "absolute", top: "15%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${VIOLET}16 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "0%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, #4A90D933 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 64, alignItems: "center" }}>
          {/* Left: text */}
          <div style={{ animation: "fadeInUp 0.8s ease both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${VIOLET}22`, border: `0.5px solid ${VIOLET}55`, borderRadius: 20, padding: "5px 14px", marginBottom: 28, fontSize: 12, color: VIOLET_LIGHT }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#28CA41", display: "inline-block", animation: "glow-green 2s ease-in-out infinite" }} />
              Agence IA · PME &amp; ETI françaises
            </div>

            <h1 style={{ fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 700, letterSpacing: "-2px", lineHeight: 1.08, marginBottom: 22 }}>
              L'IA qui fait<br /><span style={{ color: VIOLET }}>vraiment</span><br />tourner votre business.
            </h1>

            <p style={{ fontSize: isMobile ? 15 : 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 36, maxWidth: 440 }}>
              De l'audit à la mise en production — nous intégrons l'intelligence artificielle dans vos processus opérationnels, avec un ROI mesurable dès les premières semaines.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <button onClick={() => scrollTo("contact")} style={{ background: VIOLET, color: "#fff", border: "none", borderRadius: 10, padding: "13px 26px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", boxShadow: `0 4px 24px ${VIOLET}55` }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}>
                Audit gratuit — 30 min →
              </button>
              <button onClick={() => scrollTo("cas-clients")} style={{ background: "transparent", color: "rgba(255,255,255,0.7)", border: "0.5px solid rgba(255,255,255,0.18)", borderRadius: 10, padding: "13px 26px", fontSize: 15, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = VIOLET; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}>
                Voir des cas concrets
              </button>
            </div>

            <div style={{ display: "flex", gap: 28, alignItems: "center", paddingTop: 24, borderTop: "0.5px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
              {[["4 sem.", "Premier livrable"], ["ROI < 3 mois", "En moyenne"], ["100%", "Propriété client"]].map(([val, label]) => (
                <div key={val}>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", margin: "0 0 2px" }}>{val}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: animated mockup */}
          <div style={{ display: "flex", justifyContent: "center", animation: "fadeInUp 0.8s ease 0.2s both" }}>
            <AnimatedMockup isMobile={isMobile} />
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.25 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Scroll</span>
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)" }} />
        </div>
      </section>

      {/* CTA HERO SECONDAIRE */}
      <div style={{ padding: isMobile ? "32px 5%" : "40px 6%", background: `${NIGHT}`, borderTop: `0.5px solid rgba(127,119,221,0.12)`, display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "center", gap: isMobile ? 12 : 24, textAlign: "center" as const }}>
        <span style={{ fontSize: 15, color: "rgba(255,255,255,0.5)" }}>Vous avez un projet en tête ?</span>
        <button onClick={() => scrollTo("contact")} style={{ background: "transparent", color: VIOLET_LIGHT, border: `1px solid ${VIOLET}`, borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = VIOLET; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = VIOLET_LIGHT; }}>
          Parlons-en en 30 min →
        </button>
      </div>

      {/* LOGO TICKER */}
      <LogoTicker />

      {/* PAIN POINTS */}
      <PainPoints />

      {/* EXPERTISE TABS */}
      <ExpertiseSection />

      {/* DEMO INTERACTIVE */}
      <AIDemoSection isMobile={isMobile} />

      {/* OFFRES */}
      <section id="offres" style={{ padding: isMobile ? "64px 5%" : "100px 6%", background: MIST }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: VIOLET_DARK, marginBottom: 16, fontWeight: 500 }}>Nos offres</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, letterSpacing: "-1px", color: NIGHT, marginBottom: 16 }}>
              Un accompagnement pensé<br />de bout en bout.
            </h2>
            <p style={{ fontSize: 16, color: "#555", maxWidth: 520, lineHeight: 1.7, marginBottom: isMobile ? 40 : 64 }}>
              Trois étapes conçues pour s'adapter à votre maturité IA et à vos objectifs business.
            </p>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {[
              {
                step: "01",
                name: "Audit IA",
                desc: "Cartographie complète de vos processus, identification des opportunités IA à fort ROI, feuille de route priorisée.",
                duration: "2–4 semaines",
                highlight: false,
                items: ["Entretiens métiers", "Analyse des flux existants", "Rapport de recommandations", "Roadmap actionnable"],
              },
              {
                step: "02",
                name: "Projet clé en main",
                desc: "Conception, développement et déploiement de votre solution IA personnalisée — intégrée dans vos outils.",
                duration: "6–16 semaines",
                highlight: true,
                items: ["Architecture sur mesure", "Intégration SI existant", "Tests & validation métier", "Formation des utilisateurs"],
              },
              {
                step: "03",
                name: "Maintenance & Évolution",
                desc: "Suivi en production, mises à jour des modèles, optimisation continue et support dédié.",
                duration: "Contrat mensuel",
                highlight: false,
                items: ["Monitoring des performances", "Mises à jour régulières", "Support réactif", "Évolutions fonctionnelles"],
              },
            ].map((offer) => (
              <div key={offer.step} style={{
                background: offer.highlight ? NIGHT : "#fff",
                border: offer.highlight ? `1.5px solid ${VIOLET}` : "0.5px solid rgba(0,0,0,0.08)",
                borderRadius: 16,
                padding: "36px 28px",
                position: "relative",
                boxShadow: offer.highlight ? `0 0 40px ${VIOLET}33` : "none",
                transition: "transform 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                {offer.highlight && (
                  <div style={{ position: "absolute", top: -1, right: 24, background: VIOLET, color: "#fff", fontSize: 10, fontWeight: 600, padding: "4px 12px", borderRadius: "0 0 8px 8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Recommandé
                  </div>
                )}
                <span style={{ fontSize: 12, color: offer.highlight ? VIOLET_LIGHT : VIOLET_DARK, fontWeight: 600, letterSpacing: "0.05em" }}>Étape {offer.step}</span>
                <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.5px", margin: "10px 0 14px", color: offer.highlight ? "#fff" : NIGHT }}>{offer.name}</h3>
                <p style={{ fontSize: 14, color: offer.highlight ? "rgba(255,255,255,0.6)" : "#666", lineHeight: 1.7, marginBottom: 24 }}>{offer.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {offer.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: offer.highlight ? "rgba(255,255,255,0.75)" : "#444" }}>
                      <span style={{ width: 14, height: 14, borderRadius: "50%", background: `${VIOLET}22`, border: `1px solid ${VIOLET}66`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: VIOLET }} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, color: offer.highlight ? "rgba(255,255,255,0.4)" : "#aaa", letterSpacing: "0.05em", textTransform: "uppercase" }}>Durée</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: offer.highlight ? VIOLET_LIGHT : VIOLET_DARK }}>{offer.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI AXYRA */}
      <section id="pourquoi" style={{ padding: isMobile ? "64px 5%" : "100px 6%", background: "#12112A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: VIOLET, marginBottom: 16, fontWeight: 500 }}>Pourquoi Axyra</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, letterSpacing: "-1px", marginBottom: isMobile ? 40 : 64 }}>
              Ce qui nous distingue.
            </h2>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", gap: isMobile ? 24 : 32 }}>
            {[
              { title: "Experts des réalités PME & ETI", desc: "Nous ne faisons pas du conseil de grande entreprise adapté en small. Nos missions sont calibrées pour des structures où les décisions vont vite et où chaque euro investi doit avoir un impact mesurable." },
              { title: "Résultats concrets, pas de promesses", desc: "Chaque mission commence par identifier les cas d'usage à fort ROI — pas par vendre une vision. Nous nous engageons sur des livrables précis, dans des délais réalistes." },
              { title: "IA souveraine & sécurisée", desc: "Vos données ne quittent pas votre périmètre. Nous privilégions les solutions on-premise et les architectures conformes aux exigences de vos clients." },
              { title: "Accompagnement complet", desc: "De l'audit à la maintenance, nous restons un interlocuteur unique — sans transfert à des sous-traitants, sans perte de contexte." },
            ].map((item) => (
              <div key={item.title} style={{ borderTop: `1px solid rgba(127,119,221,0.3)`, paddingTop: 28 }}>
                <div style={{ width: 32, height: 2, background: VIOLET, marginBottom: 20, borderRadius: 2 }} />
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.3px" }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPE */}
      <section id="equipe" style={{ padding: isMobile ? "64px 5%" : "100px 6%", background: MIST }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: VIOLET_DARK, marginBottom: 16, fontWeight: 500 }}>Notre équipe</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, letterSpacing: "-1px", color: NIGHT, marginBottom: 16 }}>
            Des experts métier<br />et technologie réunis.
          </h2>
          <p style={{ fontSize: 16, color: "#666", maxWidth: 520, lineHeight: 1.7, marginBottom: isMobile ? 40 : 64 }}>
            Chez Axyra, chaque consultant maîtrise à la fois les réalités opérationnelles des PME et ETI françaises, et les dernières avancées en intelligence artificielle.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              {
                initials: "AM",
                name: "Antoine M.",
                role: "Fondateur & Directeur",
                bg: VIOLET,
                tags: ["Stratégie IA", "Finance"],
                bio: "Diplômé de HEC Paris et de l'École Polytechnique, Antoine a passé 6 ans dans le développement IA avant de fonder Axyra pour mettre cette expertise au service des ETI Finance et Legal.",
                linkedin: "https://fr.linkedin.com/in/antoine-mulak-02419410b",
              },
              {
                initials: "SL",
                name: "Sophie L.",
                role: "Lead IA & Intégration",
                bg: "#3C3489",
                tags: ["LLM", "Architecture SI"],
                bio: "Ingénieure IA avec une expérience en déploiement de modèles en environnement réglementé.",
              },
              {
                initials: "TR",
                name: "Thomas R.",
                role: "Architecte IA",
                bg: "#1D3D6B",
                tags: ["MLOps", "LLM", "Architecture"],
                bio: "Diplômé de l'École Polytechnique (X2015), Thomas a conçu des systèmes IA critiques dans l'industrie avant de rejoindre Axyra. Il pilote nos projets techniques les plus complexes et nos déploiements on-premise.",
              },
              {
                initials: "CD",
                name: "Camille D.",
                role: "Data & Process Engineer",
                bg: "#1A4A3A",
                tags: ["NLP", "Automatisation", "Python"],
                bio: "Ingénieure X-Mines (X2018), Camille a optimisé des processus industriels pendant 4 ans avant de se spécialiser en IA appliquée. Elle est notre référente sur les projets de traitement documentaire et d'extraction de données.",
              },

            ].map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANDEAU */}
      <section style={{ padding: isMobile ? "48px 5%" : "64px 6%", background: VIOLET }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <p style={{ fontSize: isMobile ? 20 : 26, fontWeight: 700, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.5px" }}>Prêt à automatiser vos premiers processus ?</p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", margin: 0 }}>Audit gratuit de 30 min — on identifie ensemble vos quick wins IA.</p>
          </div>
          <button onClick={() => scrollTo("contact")} style={{ background: "#fff", color: VIOLET, border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" as const, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            Réserver mon audit gratuit →
          </button>
        </div>
      </section>

      {/* CTA APRÈS OFFRES */}
      <div style={{ padding: isMobile ? "40px 5%" : "56px 6%", background: MIST, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" as const }}>
        <p style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: NIGHT, margin: 0, letterSpacing: "-0.4px" }}>Pas sûr de quelle offre choisir ?</p>
        <p style={{ fontSize: 15, color: "#777", margin: 0 }}>On démarre toujours par un audit — il coûte rien et oriente tout.</p>
        <button onClick={() => scrollTo("contact")} style={{ background: NIGHT, color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4, transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          Démarrer par l'audit →
        </button>
      </div>

      {/* CHIFFRES */}
      <AnimatedStats isMobile={isMobile} />

      {/* CAS CLIENTS */}
      <CasClientsSection />

      {/* NOS OUTILS */}
      <section id="outils" style={{ padding: isMobile ? "64px 5%" : "100px 6%", background: MIST }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: VIOLET_DARK, marginBottom: 16, fontWeight: 500 }}>Stack technologique</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, letterSpacing: "-1px", color: NIGHT, marginBottom: 12 }}>
              Les meilleurs outils,<br />au bon endroit.
            </h2>
            <p style={{ fontSize: 15, color: "#777", maxWidth: 480, lineHeight: 1.7, marginBottom: isMobile ? 40 : 60 }}>
              Nous sélectionnons et assemblons les technologies les plus robustes du marché — des LLMs aux outils d'automatisation.
            </p>
          </ScrollReveal>

          {[
            {
              cat: "Modèles de langage",
              tools: [
                { name: "OpenAI", sub: "GPT-4o", bg: "#000", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><path d="M37.5 20.7a9.7 9.7 0 01-6.5 9.2 9.7 9.7 0 01-11.5 2.2l-4.8 2.8a1 1 0 01-1.5-.9V30a9.7 9.7 0 01-1-13.4 9.7 9.7 0 0111.5-2.2l4.8-2.8a1 1 0 011.5.9v4a9.7 9.7 0 017.5 4.2z" fill="white" opacity="0.9"/><path d="M20 13a7 7 0 100 14A7 7 0 0020 13z" fill="#000"/><path d="M20 16a4 4 0 100 8 4 4 0 000-8z" fill="white" opacity="0.9"/></svg> },
                { name: "Anthropic", sub: "Claude 3", bg: "#CC785C", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><path d="M20 6L32 30H8L20 6z" fill="white" opacity="0.85"/><path d="M20 14L26 26H14L20 14z" fill="#CC785C"/></svg> },
                { name: "Gemini", sub: "Google", bg: "#fff", color: "#333", border: "1px solid #eee", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><path d="M20 4C20 4 12 12 12 20C12 28 20 36 20 36C20 36 28 28 28 20C28 12 20 4 20 4Z" fill="url(#gGrad)"/><path d="M4 20C4 20 12 12 20 12C28 12 36 20 36 20C36 20 28 28 20 28C12 28 4 20 4 20Z" fill="url(#gGrad2)" opacity="0.7"/><defs><linearGradient id="gGrad" x1="20" y1="4" x2="20" y2="36" gradientUnits="userSpaceOnUse"><stop stopColor="#4285F4"/><stop offset="1" stopColor="#34A853"/></linearGradient><linearGradient id="gGrad2" x1="4" y1="20" x2="36" y2="20" gradientUnits="userSpaceOnUse"><stop stopColor="#EA4335"/><stop offset="1" stopColor="#FBBC05"/></linearGradient></defs></svg> },
                { name: "Mistral AI", sub: "Mixtral", bg: "#FF7000", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><rect x="6" y="8" width="8" height="8" rx="1" fill="white"/><rect x="16" y="8" width="8" height="8" rx="1" fill="white" opacity="0.7"/><rect x="26" y="8" width="8" height="8" rx="1" fill="white" opacity="0.4"/><rect x="6" y="18" width="8" height="8" rx="1" fill="white" opacity="0.7"/><rect x="16" y="18" width="8" height="8" rx="1" fill="white"/><rect x="26" y="18" width="8" height="8" rx="1" fill="white" opacity="0.7"/><rect x="6" y="28" width="8" height="4" rx="1" fill="white" opacity="0.4"/><rect x="16" y="28" width="8" height="4" rx="1" fill="white" opacity="0.7"/><rect x="26" y="28" width="8" height="4" rx="1" fill="white"/></svg> },
                { name: "Meta AI", sub: "LLaMA 3", bg: "#0866FF", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><ellipse cx="13" cy="20" rx="5" ry="10" stroke="white" strokeWidth="2.5" fill="none"/><ellipse cx="27" cy="20" rx="5" ry="10" stroke="white" strokeWidth="2.5" fill="none"/><path d="M18 20 Q20 16 22 20" stroke="white" strokeWidth="2" fill="none"/></svg> },
              ]
            },
            {
              cat: "Automatisation & Intégration",
              tools: [
                { name: "Make", sub: "Scénarios", bg: "#6D00CC", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><circle cx="20" cy="20" r="14" stroke="white" strokeWidth="2" fill="none"/><circle cx="20" cy="8" r="3" fill="white"/><circle cx="30" cy="26" r="3" fill="white"/><circle cx="10" cy="26" r="3" fill="white"/><line x1="20" y1="11" x2="28" y2="23" stroke="white" strokeWidth="1.5"/><line x1="20" y1="11" x2="12" y2="23" stroke="white" strokeWidth="1.5"/><line x1="12" y1="26" x2="28" y2="26" stroke="white" strokeWidth="1.5"/></svg> },
                { name: "Zapier", sub: "Workflows", bg: "#FF4A00", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><path d="M8 12H28L12 20H32" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 20L20 26" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/></svg> },
                { name: "n8n", sub: "Open source", bg: "#EA4B71", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><circle cx="10" cy="20" r="5" fill="white"/><circle cx="30" cy="20" r="5" fill="white"/><line x1="15" y1="20" x2="25" y2="20" stroke="white" strokeWidth="2"/><circle cx="20" cy="12" r="3" fill="white" opacity="0.6"/><line x1="20" y1="15" x2="20" y2="17" stroke="white" strokeWidth="1.5"/></svg> },
                { name: "LangChain", sub: "Orchestration", bg: "#1C1C1C", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><path d="M8 16 L16 16 L16 20 L24 20 L24 16 L32 16" stroke="#1DB954" strokeWidth="2.5" strokeLinecap="round"/><path d="M8 24 L16 24 L16 20 L24 20 L24 24 L32 24" stroke="#1DB954" strokeWidth="2.5" strokeLinecap="round"/><circle cx="16" cy="20" r="2" fill="#1DB954"/><circle cx="24" cy="20" r="2" fill="#1DB954"/></svg> },
              ]
            },
            {
              cat: "Infrastructure & Data",
              tools: [
                { name: "Pinecone", sub: "Vector DB", bg: "#0F1117", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><path d="M20 4 L26 16 L20 14 L14 16 Z" fill="#00CC88"/><path d="M14 16 L20 14 L26 16 L24 24 L16 24 Z" fill="#00CC88" opacity="0.7"/><path d="M16 24 L24 24 L22 32 L18 32 Z" fill="#00CC88" opacity="0.5"/></svg> },
                { name: "Supabase", sub: "BDD & Auth", bg: "#1C1C1C", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><path d="M10 8 L22 8 L22 22 L32 22 L18 36 L18 22 L8 22 Z" fill="#3ECF8E"/></svg> },
                { name: "AWS", sub: "Cloud", bg: "#232F3E", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><path d="M8 22 Q12 28 20 28 Q28 28 32 22" stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M13 16 L20 12 L27 16 L27 22 L20 26 L13 22 Z" stroke="#FF9900" strokeWidth="2" fill="none"/></svg> },
                { name: "Webflow", sub: "Web & CMS", bg: "#146EF5", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><path d="M6 14 L14 28 L19 18 L24 28 L32 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> },
                { name: "Notion", sub: "CMS & Docs", bg: "#191919", color: "#fff", svg: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}><rect x="9" y="6" width="22" height="28" rx="3" stroke="white" strokeWidth="2" fill="none"/><line x1="14" y1="14" x2="26" y2="14" stroke="white" strokeWidth="1.5"/><line x1="14" y1="19" x2="26" y2="19" stroke="white" strokeWidth="1.5"/><line x1="14" y1="24" x2="22" y2="24" stroke="white" strokeWidth="1.5"/></svg> },
              ]
            },
          ].map((group) => (
            <div key={group.cat} style={{ marginBottom: isMobile ? 36 : 48 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 16 }}>{group.cat}</p>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12 }}>
                {group.tools.map((tool) => (
                  <div key={tool.name} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "0.5px solid rgba(0,0,0,0.07)", borderRadius: 14, padding: "12px 18px", transition: "box-shadow 0.2s, transform 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: tool.bg, border: (tool as any).border || "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {tool.svg}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: NIGHT, margin: 0, lineHeight: 1.2 }}>{tool.name}</p>
                      <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>{tool.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSIGHTS */}
      <section id="insights" style={{ padding: isMobile ? "64px 5%" : "100px 6%", background: "#12112A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal><p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: VIOLET, marginBottom: 16, fontWeight: 500 }}>Blog</p></ScrollReveal>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: isMobile ? 40 : 64 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, letterSpacing: "-1px" }}>
              Ce que nous observons<br />sur le terrain.
            </h2>
            <button onClick={() => setBlogOpen({open: true, idx: null})} style={{ background: "none", border: "none", fontSize: 14, color: VIOLET_LIGHT, fontWeight: 500, cursor: "pointer", padding: 0 }}>Voir tous les articles →</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {ARTICLES.map((article, idx) => (
              <div key={article.title} onClick={() => setBlogOpen({open: true, idx})} style={{ background: `rgba(127,119,221,0.05)`, border: `0.5px solid rgba(127,119,221,0.15)`, borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(127,119,221,0.4)`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `rgba(127,119,221,0.15)`; e.currentTarget.style.transform = "translateY(0)"; }}>
                {/* Color bar */}
                <div style={{ height: 3, background: article.tagColor, width: "100%" }} />
                <div style={{ padding: "28px 28px 32px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: `${article.tagColor}22`, color: article.tagColor, letterSpacing: "0.04em" }}>
                      {article.tag}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{article.readTime} de lecture</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.45, letterSpacing: "-0.3px", marginBottom: 14, color: "#fff" }}>{article.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 24 }}>{article.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{article.date}</span>
                    <span style={{ fontSize: 13, color: VIOLET_LIGHT, fontWeight: 500 }}>Lire →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: isMobile ? "64px 5%" : "100px 6%", background: NIGHT }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: VIOLET, marginBottom: 16, fontWeight: 500 }}>Contact</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, letterSpacing: "-1px", marginBottom: 16 }}>
            Parlons de votre projet.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: isMobile ? 32 : 48 }}>
            Audit gratuit de 30 minutes pour identifier vos premiers cas d'usage IA. Sans engagement.
          </p>

          <div style={{ background: `rgba(127,119,221,0.08)`, border: `0.5px solid rgba(127,119,221,0.25)`, borderRadius: 16, overflow: "hidden" }}>
            <iframe
              src="https://tally.so/embed/vG00E8?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              width="100%"
              height="520"
              frameBorder={0}
              title="Formulaire de contact Axyra"
              style={{ display: "block", border: "none" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 40 }}>
            {[["✉", "contact@axyra.ai"], ["🌐", "axyra.ai"]].map(([icon, text]) => (
              <span key={text} style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 8 }}>
                <span>{icon}</span>{text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FLOATING AGENT */}
      <AgentWidget />

      {/* FOOTER */}
      <footer style={{ padding: isMobile ? "28px 5%" : "32px 6%", background: "#0E0D20", borderTop: "0.5px solid rgba(127,119,221,0.1)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.5px" }}>
            Ax<span style={{ color: VIOLET }}>yr</span>a
          </span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            © 2025 Axyra · Intelligence artificielle · PME &amp; ETI françaises
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Mentions légales", "Politique de confidentialité"].map((link) => (
              <span key={link} style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>{link}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
