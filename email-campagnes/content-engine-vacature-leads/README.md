# Content Engine Vacature-Leadcampagne

Vijf HTML-mails in de stijl van Slimmer dan Gisteren voor leads die via vacatures worden gevonden. De reeks gebruikt Grand Slam Offer-principes in de communicatie: gewenste uitkomst duidelijk maken, inspanning verlagen, het mechanisme concreet tonen, de keuze makkelijk maken en frictie uit de vervolgstap halen.

## Placeholders

- `{{voornaam}}`
- `{{bedrijf}}`
- `{{functie}}`
- `{{vacature_haakje}}`
- `{{persoonlijke_observatie}}`
- `{{unsubscribe_url}}`

## Sequence

1. Awareness / Reach: `01-vacature-trigger.html`  
   Onderwerp: `Vraag over jullie vacature voor {{functie}}`

2. Interest / Engage: `02-marketing-wordt-tweede-baan.html`  
   Onderwerp: `Wat content vaak duurder maakt dan verwacht`

3. Desire / Activate: `03-een-gesprek-meerdere-kanalen.html`  
   Onderwerp: `Zo haal je meer uit één goed gesprek`

4. Action / Convert: `04-content-engine-pakketten.html`  
   Onderwerp: `Welke Content Engine past bij {{bedrijf}}?`

5. Re-engage / Close: `05-laatste-check.html`  
   Onderwerp: `Relevant voor nu, of zal ik stoppen?`

## Campaign runner

Open `campaign-runner.html` om leads te plakken, een startdatum te kiezen, de vijf mails over 14 dagen te plannen, gepersonaliseerde previews te bekijken en een CSV-planning te exporteren.

Aanbevolen verzenddagen:

- Dag 0: Mail 1, awareness vanuit het vacaturesignaal
- Dag 3: Mail 2, interest door verborgen kosten van content te benoemen
- Dag 6: Mail 3, desire door het mechanisme en de output tastbaar te maken
- Dag 10: Mail 4, action door de pakketten als makkelijke keuze te presenteren
- Dag 14: Mail 5, close met een lage ja/nee-drempel

## Afmelden en geen interesse

Elke mail bevat onderaan:

`Geen interesse? Reageer met "geen interesse" of meld je hier af.`

De campaign runner haalt leads automatisch uit de planning wanneer:

- de leadkolom `status` gelijk is aan `afgemeld`
- de leadkolom `status` gelijk is aan `geen_interesse`
- het e-mailadres in de suppression list staat

Aanbevolen leadkolommen:

`email,voornaam,bedrijf,functie,vacature_haakje,persoonlijke_observatie,status,unsubscribe_url`

Gebruik `status=actief` voor mensen die in de campagne mogen blijven.

## CTA-links

De templates gebruiken:

- Logo: `https://slimmerdangisteren.nl/assets/logo.png`
- Portret Jimmy: `https://slimmerdangisteren.nl/assets/jimmy-buitenhuis.png`
- Website: `https://slimmerdangisteren.nl/`
- Contentpagina: `https://slimmerdangisteren.nl/content-creatie/`
- Calendly: `https://calendly.com/buitenhuisj004/bmc-sessie`
- Mail: `mailto:jimmy@slimmerdangisteren.nl`
