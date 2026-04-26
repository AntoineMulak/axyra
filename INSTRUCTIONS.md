# Axyra Website — Instructions de déploiement

## Structure du projet à créer

```
axyra-website/
├── package.json          ← renommer package.json.txt → package.json
├── vite.config.ts        ← renommer vite.config.ts.txt → vite.config.ts
├── tsconfig.json         ← renommer tsconfig.json.txt → tsconfig.json
├── index.html            ← renommer index.html.txt → index.html
└── src/
    ├── main.tsx          ← renommer src_main.tsx.txt → main.tsx
    └── App.tsx           ← voir étape 2 ci-dessous
```

---

## Étape 1 — Télécharger les fichiers

Télécharger tous les fichiers fournis dans cette conversation :
- `package.json.txt` → renommer en `package.json`
- `vite.config.ts.txt` → renommer en `vite.config.ts`
- `tsconfig.json.txt` → renommer en `tsconfig.json`
- `index.html.txt` → renommer en `index.html`
- `src_main.tsx.txt` → renommer en `main.tsx` (à placer dans le dossier `src/`)
- `interactive_content_1777192744031_0.txt` → renommer en `App.tsx` (à placer dans `src/`)

---

## Étape 2 — Modifier App.tsx (2 lignes à supprimer)

Ouvrir `App.tsx` avec n'importe quel éditeur de texte (Notepad, TextEdit, VS Code).

**Supprimer la ligne 2 :**
```
import { useFile } from "@dust/react-hooks";
```

**Supprimer les lignes 5 à 17** (le bloc useFile dans TeamMemberCard) :
```
  const file = member.fileId ? useFile(member.fileId) : null;
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
```

**Et dans le return de TeamMemberCard, remplacer** :
```tsx
      {photoUrl ? (
        <img src={photoUrl} alt={member.name} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", marginBottom: 20, display: "block" }} />
      ) : (
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: member.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 18, fontWeight: 600, color: "#fff", letterSpacing: "-0.5px" }}>
          {member.initials}
        </div>
      )}
```
**par simplement** :
```tsx
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: member.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 18, fontWeight: 600, color: "#fff", letterSpacing: "-0.5px" }}>
        {member.initials}
      </div>
```

---

## Étape 3 — Mettre sur GitHub

1. Aller sur [github.com](https://github.com) → "New repository"
2. Nommer le repo `axyra-website` → Create
3. Cliquer "uploading an existing file"
4. Glisser-déposer TOUS les fichiers (respecter la structure : `src/` pour main.tsx et App.tsx)
5. Cliquer "Commit changes"

---

## Étape 4 — Déployer sur Vercel (2 min)

1. Aller sur [vercel.com](https://vercel.com) → "Add New Project"
2. "Import Git Repository" → sélectionner `axyra-website`
3. Framework Preset : **Vite** (détecté automatiquement)
4. Cliquer **Deploy** ✓

→ Votre site est en ligne sur `axyra-website.vercel.app`

---

## Étape 5 — Brancher votre domaine (axyra.fr)

Dans Vercel :
- Settings → Domains → "Add Domain"
- Saisir `axyra.fr`
- Vercel vous donne les DNS à configurer chez votre registrar (OVH, Gandi, etc.)
- Propagation : 5 à 30 minutes

---

## Questions ?

Retourner dans Dust et demander de l'aide — je peux guider chaque étape.
