### Étape 2 : Serveur HTTP dynamique avec express.js

### Webcasts

* [Labo HTTP (2a) : Application node "dockerisée"](https://www.youtube.com/watch?v=fSIrZ0Mmpis)
* [Labo HTTP (2b) : Application express "dockerisée"](https://www.youtube.com/watch?v=o4qHbf_vMu0)

### Critères d'acceptation

* Vous avez un repo GitHub avec tout ce qui est nécessaire pour construire l'image Docker.



* Vous pouvez faire une démo, où vous construisez l'image, exécutez un conteneur et accédez au contenu depuis un navigateur.

On va utiliser la version 14.17.0 de NodeJs

* Vous générez un contenu dynamique et aléatoire et renvoyez une charge utile JSON au client.

En lançant le docker dans express-image, ça renvoit un nom aléatoire.


* Vous ne pouvez pas renvoyer le même contenu que le webcast (vous ne pouvez pas renvoyer une liste de personnes).

On renvoie une liste d'animaux, avec leur modèle, leur age et leur prénom.

![animaux](https://user-images.githubusercontent.com/58049740/118405596-14ba8c00-b679-11eb-9ac1-db58ce77aa06.png)

* Vous n'êtes pas obligé d'utiliser express.js ; si vous le souhaitez, vous pouvez utiliser un autre framework web JavaScript ou un autre langage.

 pour trouver l'ip, on va plutôt faire un docker inspect NOM_DOCKER | grep -i IPAdd, docker-machine marche pas.
 
 Une fois le docker lancé avec la commande docker run -p 9090:3000, on peut y accéder avec localhost:9090

* Vous avez **documenté** votre configuration dans votre rapport.

Oui
