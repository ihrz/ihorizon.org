# Ihorizon React

Application web React moderne utilisant Vite, TypeScript, et Tailwind CSS.

## Technologies utilisées

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Router
- i18next pour l'internationalisation

## Installation

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Construire pour la production
pnpm build
```

## Structure du projet

```
src/
├── assets/      # Ressources statiques
├── components/  # Composants réutilisables
├── contexts/    # Contextes React
├── data/        # Données statiques
├── hooks/       # Hooks personnalisés
├── lib/         # Utilitaires et configurations
├── pages/       # Pages de l'application
├── tools/       # Outils et utilitaires
└── translations/# Fichiers de traduction
```

## Scripts disponibles

- `pnpm dev` : Lance le serveur de développement
- `pnpm build` : Construit l'application pour la production
- `pnpm build:dev` : Construit l'application en mode développement
- `pnpm preview` : Prévisualise la version de production
- `pnpm lint` : Vérifie le code avec ESLint
