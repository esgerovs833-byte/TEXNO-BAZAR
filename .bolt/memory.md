# Project memory

## Product intent & audience

- Azerbaijani-language consumer electronics e-commerce catalog
- 13 categories, 120 products each (1560 total): smartphones, notebooks, accessories, household appliances, telelevizorlar (TVs), kondisionerlər (ACs), aspiratorlar (range hoods), soyuducular (refrigerators), peçlər/plitələr (stoves & cooktops), ət çəkənlər (meat grinders), ütülər (irons)
- Target audience: Azerbaijani consumers shopping for electronics & appliances

## Brand personality & voice

- Azerbaijani (Latin script) throughout UI labels: navbar, filters, footer
- Consumer-friendly tone

## Visual design & UX direction

- Vite + React + JSX + Tailwind CSS + Lucide React icons
- `@/` path alias → `src/` (avoid deep relative paths)
- Navigation: navbar category buttons, filter pills, footer category links
- "Daha çox göstər" (load more) pagination — 24 products initial, +24 per click; resets to 0 when category or search changes
- Search filtering across catalog

## Decisions, constraints & rationale

- Vite-React template; no extra UI/icon packages — Tailwind + Lucide React only
- Load-more pagination chosen over numbered pagination to keep DOM light with 1560 products
- Product data generated via script (not real API); images fetched per category
- Brand sets per category:
  - TVs: Samsung, LG, Sony, Philips, TCL, Hisense
  - ACs: Daikin, Mitsubishi, LG, Samsung, Gree, Midea
  - Hoods: Bosch, Siemens, Electrolux, Beko, Gorenje, Teka
  - Refrigerators: Samsung, LG, Bosch, Beko, Indesit, Arçelik
  - Stoves/cooktops: Bosch, Beko, Arçelik, Gorenje, Samsung, Vestel
  - Meat grinders: Bosch, Philips, Moulinex, Tefal, Scarlett, Kitfort
  - Irons: Philips, Tefal, Braun, Bosch, Rowenta, Scarlett
- `npm run build` used to verify changes

## Open questions & assumptions

- Product detail pages: not yet implemented (catalog browsing only assumed)
- Cart / checkout: not mentioned yet
- Currency for prices: unconfirmed (assume AZN unless stated)
- Image source strategy: ad-hoc fetch; no caching/CDN confirmed
- Search scope: unclear if search spans all categories or current category only