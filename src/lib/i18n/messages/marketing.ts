/**
 * Marketing surface copy.
 *
 * English and French only so far — Portuguese, Arabic, and Swahili are
 * required by `context/ui-context.md` (F11) and are added as the remaining
 * locales land. `t()` falls back to English per-key, so a missing translation
 * degrades to readable copy rather than a raw key.
 */

export const marketing = {
  en: {
    "home.hero.badge": "Pan-African institutional real estate & hospitality platform",
    "home.hero.title": "Discover exceptional real estate & certified stays across Africa.",
    "home.hero.subtitle":
      "Secured escrow land transactions, turnkey flexible workspaces, and 5-star hotel residences across 12 financial hubs.",

    "home.search.destination": "Destination & City",
    "home.search.destinationPlaceholder": "Ex: Abidjan, Cocody Ambassades",
    "home.search.propertyType": "Property Type",
    "home.search.budget": "Budget / Period",
    "home.search.budgetPlaceholder": "500k - 2.5M FCFA / month",
    "home.search.submit": "Search",
    "home.search.trending": "Trending:",

    "home.search.tab.rent": "Rent",
    "home.search.tab.buy": "Buy",
    "home.search.tab.flex": "Flexible Rentals",
    "home.search.tab.hotels": "Hotels & Residences",

    "home.search.type.villa": "Contemporary villa",
    "home.search.type.penthouse": "Penthouse / Luxury Apartment",
    "home.search.type.office": "Private Office & Flex Space",
    "home.search.type.hotelSuite": "Premium Hotel Suite",

    "home.trust.verified.title": "100% Verified",
    "home.trust.verified.body": "Notarized title deeds & certified leases",
    "home.trust.secured.title": "4,850+ Secured",
    "home.trust.secured.body": "Bank-escrow guaranteed transactions",
    "home.trust.metropolises.title": "12 Metropolises",
    "home.trust.metropolises.body": "Financial hubs & regional capitals covered",
    "home.trust.support.title": "24/7 Support",
    "home.trust.support.body":
      "Dedicated bilingual concierge & property management",
  },
  fr: {
    "home.hero.badge":
      "Plateforme institutionnelle immobilière et hôtelière panafricaine",
    "home.hero.title":
      "Découvrez des propriétés d'exception et des séjours certifiés à travers l'Afrique.",
    "home.hero.subtitle":
      "Transactions foncières sécurisées par séquestre, espaces de travail flexibles clé en main et résidences hôtelières 5 étoiles dans 12 pôles financiers.",

    "home.search.destination": "Destination & Ville",
    "home.search.destinationPlaceholder": "Ex : Abidjan, Cocody Ambassades",
    "home.search.propertyType": "Type de propriété",
    "home.search.budget": "Budget / Période",
    "home.search.budgetPlaceholder": "500k - 2,5M FCFA / mois",
    "home.search.submit": "Rechercher",
    "home.search.trending": "Tendances :",

    "home.search.tab.rent": "Louer",
    "home.search.tab.buy": "Acheter",
    "home.search.tab.flex": "Locations flexibles",
    "home.search.tab.hotels": "Hôtels & Résidences",

    "home.search.type.villa": "Villa contemporaine",
    "home.search.type.penthouse": "Penthouse / Appartement de luxe",
    "home.search.type.office": "Bureau privé & Espace flexible",
    "home.search.type.hotelSuite": "Suite hôtelière premium",

    "home.trust.verified.title": "100% Vérifié",
    "home.trust.verified.body": "Titres notariés & baux certifiés",
    "home.trust.secured.title": "4 850+ Sécurisés",
    "home.trust.secured.body": "Transactions garanties par séquestre bancaire",
    "home.trust.metropolises.title": "12 Métropoles",
    "home.trust.metropolises.body": "Pôles financiers & capitales régionales couvertes",
    "home.trust.support.title": "Assistance 24/7",
    "home.trust.support.body":
      "Conciergerie bilingue dédiée & gestion locative",
  },
} as const;

/** Keys the marketing surface can ask for. */
export type MarketingKey = keyof (typeof marketing)["en"];
