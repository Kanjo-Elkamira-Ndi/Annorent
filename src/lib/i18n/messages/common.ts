/**
 * Shared interface copy: navigation, shell, states and system messages.
 *
 * Every key must exist in both `en` and `fr`. The `satisfies` clause makes a
 * missing French key a type error, and `i18n.test.ts` checks parity at runtime.
 * Copy rules: sentence case, plain verbs, no claims the product can't back
 * (design-audit/design-system-proposal.md §8.5).
 */

const en = {
  "brand.name": "Annorent",
  "brand.home": "Annorent home",

  "nav.primary": "Main navigation",
  "nav.properties": "Properties",
  "nav.hotels": "Hotels",
  "nav.spaces": "Flexible spaces",
  "nav.map": "Map",
  "nav.search": "Search",
  "nav.saved": "Saved",
  "nav.account": "Account",
  "nav.signIn": "Sign in",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",
  "nav.menuTitle": "Menu",
  "nav.mobile": "Quick navigation",
  "nav.skipToContent": "Skip to main content",

  "language.label": "Language",
  "language.switchTo": "Passer en français",

  "theme.label": "Theme",
  "theme.system": "System",
  "theme.light": "Light",
  "theme.dark": "Dark",

  "footer.explore": "Explore",
  "footer.preferences": "Preferences",
  "footer.tagline": "Find homes, offices and stays across Cameroon.",
  "footer.copyright": "© {year} Annorent. All rights reserved.",

  "state.loading": "Loading",
  "state.retry": "Try again",
  "state.close": "Close",
  "state.dismiss": "Dismiss",

  "error.title": "This page couldn't load",
  "error.body": "Something went wrong on our side. Check your connection and try again.",
  "notFound.title": "We can't find that page",
  "notFound.body": "The link may be broken, or the page may have moved.",
  "notFound.home": "Go to the home page",

  "placeholder.listings.title": "Listings aren't available yet",
  "placeholder.listings.body":
    "Annorent's listing service isn't connected yet. Properties will appear here as soon as it is.",
  "placeholder.hotels.title": "Hotels aren't available yet",
  "placeholder.hotels.body":
    "Annorent's hotel service isn't connected yet. Hotels and guest houses will appear here as soon as it is.",
  "placeholder.spaces.title": "Flexible spaces aren't available yet",
  "placeholder.spaces.body":
    "Rooms, studios, desks and meeting rooms will appear here once the listing service is connected.",
  "placeholder.map.title": "The map isn't available yet",
  "placeholder.map.body":
    "Map search will open once listings are connected. Exact addresses are only ever shared after a confirmed booking.",
  "placeholder.saved.title": "Sign in to see saved places",
  "placeholder.saved.body": "Places you save will be kept here across your devices.",
  "placeholder.signIn.title": "Sign-in isn't available yet",
  "placeholder.signIn.body": "Accounts open once Annorent's sign-in service is connected.",
  "placeholder.browse": "Browse properties",

  "home.title": "Find your next place in Cameroon",
  "home.body": "Homes to rent or buy, flexible spaces and hotels, from Douala to Garoua.",
} as const;

type CommonKey = keyof typeof en;

const fr = {
  "brand.name": "Annorent",
  "brand.home": "Accueil Annorent",

  "nav.primary": "Navigation principale",
  "nav.properties": "Biens",
  "nav.hotels": "Hôtels",
  "nav.spaces": "Espaces flexibles",
  "nav.map": "Carte",
  "nav.search": "Rechercher",
  "nav.saved": "Favoris",
  "nav.account": "Compte",
  "nav.signIn": "Se connecter",
  "nav.openMenu": "Ouvrir le menu",
  "nav.closeMenu": "Fermer le menu",
  "nav.menuTitle": "Menu",
  "nav.mobile": "Navigation rapide",
  "nav.skipToContent": "Aller au contenu principal",

  "language.label": "Langue",
  "language.switchTo": "Switch to English",

  "theme.label": "Thème",
  "theme.system": "Système",
  "theme.light": "Clair",
  "theme.dark": "Sombre",

  "footer.explore": "Explorer",
  "footer.preferences": "Préférences",
  "footer.tagline": "Logements, bureaux et séjours partout au Cameroun.",
  "footer.copyright": "© {year} Annorent. Tous droits réservés.",

  "state.loading": "Chargement",
  "state.retry": "Réessayer",
  "state.close": "Fermer",
  "state.dismiss": "Masquer",

  "error.title": "Impossible de charger cette page",
  "error.body": "Un problème est survenu de notre côté. Vérifiez votre connexion et réessayez.",
  "notFound.title": "Page introuvable",
  "notFound.body": "Le lien est peut-être rompu, ou la page a été déplacée.",
  "notFound.home": "Aller à l'accueil",

  "placeholder.listings.title": "Les annonces ne sont pas encore disponibles",
  "placeholder.listings.body":
    "Le service d'annonces d'Annorent n'est pas encore connecté. Les biens apparaîtront ici dès qu'il le sera.",
  "placeholder.hotels.title": "Les hôtels ne sont pas encore disponibles",
  "placeholder.hotels.body":
    "Le service hôtelier d'Annorent n'est pas encore connecté. Hôtels et maisons d'hôtes apparaîtront ici dès qu'il le sera.",
  "placeholder.spaces.title": "Les espaces flexibles ne sont pas encore disponibles",
  "placeholder.spaces.body":
    "Chambres, studios, postes de travail et salles de réunion apparaîtront ici dès que les annonces seront connectées.",
  "placeholder.map.title": "La carte n'est pas encore disponible",
  "placeholder.map.body":
    "La recherche sur carte ouvrira avec les annonces. L'adresse exacte n'est communiquée qu'après une réservation confirmée.",
  "placeholder.saved.title": "Connectez-vous pour voir vos favoris",
  "placeholder.saved.body": "Les lieux que vous enregistrez seront conservés ici sur tous vos appareils.",
  "placeholder.signIn.title": "La connexion n'est pas encore disponible",
  "placeholder.signIn.body": "Les comptes ouvriront dès que le service de connexion d'Annorent sera connecté.",
  "placeholder.browse": "Parcourir les biens",

  "home.title": "Trouvez votre prochain lieu au Cameroun",
  "home.body": "Logements à louer ou à acheter, espaces flexibles et hôtels, de Douala à Garoua.",
} as const satisfies Record<CommonKey, string>;

export const common = { en, fr } as const;
export type { CommonKey };
