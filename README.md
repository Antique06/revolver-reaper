# Revolver Reaper

## Membres de l'équipe

- Corentin Chocraux
- Mathéo Lelong
- Martin Morenvillé

---

# Présentation du projet

Notre jeu s'appelle Revolver Reaper, c'est un jeu dans le style "shoot them up" avec un univers dans le style farwest.

C'est un jeu en 2 dimensions dans lesquelles on peut se déplacer avec les touches du claviers ou avec la souris.

Le jeu est multijoueur, vous pouvez rejoindre vos amies dans la même parties. Cependant faites attention au tir allié.

---

# Fonctionnalités du jeu

Notre jeu contient les fonctionnalités suivantes :

### Accueil
- choix du pseudo
- démarrage d’une partie

### Jeu
- déplacement clavier et souris
- apparition d’ennemis
- tirs ennemis
- système de bonus
- système de vies
- destruction des ennemis

### Écran de fin
- temps de survie
- nombre d’ennemis tués
- score total
- bouton pour rejouer
- bouton pour revenir au menu principal

### Tableau des scores
- affichage des **10 meilleurs scores**
- pseudo
- score
- date

### Crédits
- présentation des membres du groupe

---

# Commandes pour se déplacer

- Vous pouvez vous déplacer au clavier avec z q s d ou les flèches directionnelles.
- Le clic droit permet de se déplacer a la souris.
- Vous pouvez tiré avec clic gauche, les balles se dirige vers l'emplacement de votre souris.

---

# Ennemis

### Bandit
- Se déplace tout droit.
- Tire des projectiles vers l'avant toujours dans la même direction.

### BillyTheKid
- Se déplace par rapport au joueur, il essaye au plus de s'éloigner du joueur.
- Tire des projectiles visé .

### JohnHenry
- Se dirige vers le joueur le plus proche.
- Ne tire pas et fait des dégâts au corps à corps.
- Sa vitesse augmente en fonction du joueur avec le meilleur score.

---

# Bonus 

### Fer à cheval vert
- Soigne de 10 points de vie.

### Fer à cheval rouge
- 50% de chance de gagner 100 points de score.
- 50% de chance de se retrouver avec 1 point de vie.

### Fer à cheval doré
- Redonne 100 points de vie au joueur.
- Donne 200 points de score.

---

# Différents échanges entre clients et serveur.

### Client
- 'playerMovement' : Permet d'envoyer les coordonnées x et y du joueur au serveur ainsi que ça direction et une variable pour savoir si le joueur se déplace. Cela permet de changer les animations du joueurs.
- 'shoot' : Permet d'envoyer un nouveau tire au serveur avec les coordonnées x et y ainsi qu'un angle. Le déplacement du tire se fait côté serveur.
- 'replay' : Permet au joueur de relancer une partie et permet de remettre le joueur dans la liste de joueur.
- 'upgradeHp' : Permet de donné 10 points de vie au personnage et de lui donnée 10 points de vie max.
- 'upgradeDmg' : Permet d'augmenter les dégâts du personnage.
- 'upgradeSpeed' : Permet d'augmenter la vitesse du personnage.

### Serveur
- 'players' : Permet d'envoyer la liste des joueurs à tout les participants avec les nouveaux changements pour leur permettre de les afficher.
- 'death' : Permet d'indiqué au joueur qu'il est mort et permettre au client d'afficher le menu de fin de partie.
- 'bonnusList' : Permet d'envoyer la liste des bonus avec leur différentes coordonnées.
- 'bandits' : Permet d'envoyer la liste des bandits.
- 'billyTheKids' : Permet d'envoyer la liste des billyTheKids.
- 'johnHenrys' : Permet d'envoyer la liste des johnHenrys.
- 'bullets' : Permet d'envoyer la liste des balles.
- 'leaderboard' : Permet d'envoyer la listes des 10 meilleurs scores.

---

# Difficultés rencontrées

Lors de la réalisation de ce projet, nous avons rencontré plusieurs difficultés techniques.

La principale difficulté a été la mise en place du multijoueur avec socket.io, cela nous a pris un peu de temps car nous ne savions pas comment permettre à tout les joueurs de recevoir toute les informations. Pour surmonter cela nous avons centralisé toutes les informations dans le serveur et nous les envoyons régulièrement à tous les joueurs.

Nous avons quelque problème sur la gestion de la taille de la map quand on redimensionnée la fenêtre. Cela provoqué des bugs sur tirs du joueurs, pour surmontées cela avons décider de mettre une taille fixe à la map.

Enfin nous avons eu quelque problème d'équilibrage', les ennemies étais beaucoup trop fort. Nous avons retravaillé la vitesse, les dégâts et la vie des ennemies pour permettre que le jeu soit jouable.

---

# Points d'amélioration du projet

Si nous avions plus de temps, plusieurs améliorations pourraient être apportées au jeu.

Nous pourrions améliorer certains aspects techniques comme :

- une meilleure gestion des collisions
- une interface utilisateur plus poussée qui se redimensionne
- le choix de jouer en solo ou en multijoueur

Nous pourrions également ajouter :

- de nouveaux types d’ennemis avec des comportements différents notamment des BOSS
- davantage de bonus et d'améliorations pour le joueur
- plusieurs cartes différentes

---

# Ce dont nous sommes le plus fiers

Nous sommes particulièrement fiers d’avoir réussi à développer un jeu multijoueur fonctionnel en temps réel.

Également fier de la direction artistique prise et du projet sur un point de vue graphique.

La communication entre le client et le serveur via Socket.io fonctionne correctement et permet à plusieurs joueurs de jouer simultanément.

Nous sommes également satisfaits du système de difficulté dynamique qui adapte la vitesse et la fréquence d’apparition des ennemis en fonction du score du joueur.

---

# Lancer le projet

## Installation

```bash
npm i
```

## Lancement

```bash
npm run client:start
npm run server:watch
```
