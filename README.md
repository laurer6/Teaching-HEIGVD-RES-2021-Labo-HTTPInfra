# Teaching-HEIGVD-RES-2021-Labo-HTTPInfra

## Step 1: Static HTTP server with apache httpd

* Repo github pour cette partie:

https://github.com/laurer6/Teaching-HEIGVD-RES-2021-Labo-HTTPInfra/blob/fb-apache-static/

* Pour lancer la demo:

il suffit de lancer ces deux commandes dans le répertoire où se trouve le Dockerfile : 

```bash
$ docker build -t res/apache_php .
```

```bash
$ docker run -p 9090:80 res/apache_php  
```
Ici, 9090 est le port souhaité


Ensuite il faut taper notre addresse local avec le port souhaité dans notre navigateur web, ici : `localhost:9090`

* Template différent de celui du webcast :_
 
On a utilisé ce bootstrap : https://onepagelove.com/bolt et on l'a modifié un peu.

* Ce qu'il faut faire dans le Dockerfile: 

On va télécharger ou récuperer le docker souhaité avec le FROM, ici un serveur apache qui peut lire du php: 
`FROM php:7.2-apache`

Puis on copie à l'interieur de notre propre docker, le contenu souhaité avec COPY : 
`COPY content/ /var/www/html/`

* où se trouvent les fichiers de configuration d'Apache.

Il suffit d'utiliser la commande `exec -it`et de demander d'acc au `bash` pour pourvoir se trouver dans le noyaux linux du conteneur et ainsi nivaguer comme on veut: `docker exec -it NOM_DU_DOCKER /bin/bash`

Ensuite il faut se trouver dans `etc/apache2/` avec la commande `cd etc/apache2/`puis faire un `ls` pour voir tout les fichier de config. On peut les lire avec la commande `more`.

### Étape 2 : Serveur HTTP dynamique avec express.js


* Repo GitHub.

https://github.com/laurer6/Teaching-HEIGVD-RES-2021-Labo-HTTPInfra/tree/fb-express-dynamic

* Pour la démo:

il suffit de lancer ces deux commandes dans le répertoire où se trouve le Dockerfile : 

```bash
$ docker build -t res/express_students_php .
```

```bash
$ docker run -p 9090:80 res/express_students_php  
```

On va utiliser la version 14.17.0 de NodeJs

* Ggénérez un contenu dynamique et aléatoire et renvoyez une charge utile JSON au client.

En lançant le docker dans express-image, ça renvoit un nom aléatoire.

* Différent contenu que le webcast.

On renvoie une liste d'animaux, avec leur 'modèle', leur age et leur prénom.

pour trouver l'ip, on va plutôt faire un docker inspect NOM_DOCKER | grep -i IPAdd, docker-machine marche pas.
 
Une fois le docker lancé avec la commande docker run -p 9090:3000, on peut y accéder avec localhost:9090




