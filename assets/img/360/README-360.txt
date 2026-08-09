LOCPILOT — Préparation visite virtuelle 360°

Miniatures prêtes dans assets/img/360/thumbs/ :
- sejour-cuisine-thumb.webp
- chambre-1-thumb.webp
- chambre-2-thumb.webp
- mezzanine-thumb.webp

Panoramas attendus dans assets/img/360/ :
- sejour-cuisine-360.webp
- chambre-1-360.webp
- chambre-2-360.webp
- mezzanine-360.webp

Les miniatures actuelles sont des placeholders basés sur preview.webp.
Il suffit de les remplacer en conservant les mêmes noms.

Chaque bouton de miniature possède :
- data-tour-scene
- data-panorama
- data-thumb
- data-label

Le script assets/js/app.js émet aussi l'événement JavaScript
"locpilot:tourSceneChange" à chaque changement de scène.
Cela permettra de brancher Photo Sphere Viewer sans modifier le HTML des pages.
