# Le Cocon de Saint-Lary — V5 LocPilot

Version enrichie de la maquette choisie par Valentin, avec socle LocPilot FR / EN / ES et section activités locale optimisée SEO / GEO.

## Données intégrées
- 52 m² / 4 voyageurs
- 2 chambres + mezzanine
- 1 lit 160 cm, 2 lits 90 cm, canapé-lit
- Résidence Le Lami, appartement 70, 4e étage
- 10 rue du Chemin de Sailhan, 65170 Saint-Lary-Soulan
- arrivée 17h / départ 10h
- parking, Wi-Fi, linge et ménage de fin de séjour inclus
- animaux non admis / non-fumeur
- tarif à partir de 600 € / semaine selon saison
- FR + EN + ES


## V5 — Activités autour de Saint-Lary
- section éditoriale locale en français, anglais et espagnol
- ski à Saint-Lary et Pla d’Adet
- Réserve naturelle nationale du Néouvielle et lacs d’altitude
- randonnée en vallée d’Aure
- VTT, canyoning, rafting et parapente
- Sensoria Rio et Balnéa
- village, commerces et restaurants de Saint-Lary-Soulan
- liens vers les sources touristiques/institutionnelles officielles
- balisage JSON-LD `ItemList` et `llms.txt` enrichi

## À remplacer avant publication
1. Les photos recadrées depuis la maquette sont uniquement des **visuels temporaires de développement**. Remplacer par les vraies photos optimisées WebP.
2. Déposer les panoramas equirectangulaires dans `assets/img/360/` et raccorder Photo Sphere Viewer.
3. Connecter le widget/moteur Elloha au formulaire de réservation.
4. Remplacer le domaine `.example` dans `robots.txt`, `sitemap.xml`, JSON-LD/canonical si ajoutés.
5. Compléter les mentions légales / CGV avec les données contractuelles définitives.
6. Remplacer les témoignages d'exemple par de vrais avis.

## Test local
```bash
python -m http.server 8000
```
Puis ouvrir `http://localhost:8000/`.


## V6 — visite virtuelle 360° et avis
- Section 360° enrichie avec 4 miniatures visibles et responsive.
- Structure prête pour raccorder Photo Sphere Viewer sans modifier le HTML.
- Noms de fichiers attendus documentés dans `assets/img/360/README-360.txt`.
- Les miniatures actuelles sont temporaires et doivent être remplacées par les vraies vues 360°.
- Les avis voyageurs et leur entrée de navigation ont été retirés dans les 3 langues. Ils pourront être réintroduits lorsque des avis réels seront disponibles.
