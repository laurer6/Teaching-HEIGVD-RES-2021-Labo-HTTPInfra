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

### Étape 3 : Reverse proxy avec apache (configuration statique)


* Repo GitHub avec tout ce qui est nécessaire pour construire l'image Docker pour le conteneur:

 https://github.com/laurer6/Teaching-HEIGVD-RES-2021-Labo-HTTPInfra/edit/fb-apache-reverse-proxy
 
* Pour la démo:

Pour tout faire fonctionner, vu qu'on utilise des ip hardcodées, il faut lancer les conteneur docker dans le bon ordre et faire attention que les ip sont les mêmes que ce qui est marqué dans le .conf du docker reversProxy.

![ip express et apache](https://user-images.githubusercontent.com/58049740/118841233-6dcc2f00-b8c8-11eb-88e5-bf74b0b6b576.png)


Soit:
```bash
docker build -t res/apache-static .
docker run res/apache-static
```
puis:
```bash
docker build -t res/express-dynamic . 
docker run res/express-dynamic
```
et enfin:
```bash
docker build -t res/apache_rp .
docker run -p 8080:80 res/apache_rp
```
Pour tester le reverse il faut modifier le /etc/hosts en agjoutant la ligne 192.169.99.100 res.demo.ch
demo.res.ch:8080               pour être redirigé sur le site statique
demo.res.ch:8080/api/students/  pour le site dynamique

 
* Expliquer et de prouver que les serveurs statiques et dynamiques ne peuvent pas être atteints directement (le reverse proxy est un point d'entrée unique dans l'infra). 

On a un message d'erreur si on ne spécifie pas le chemin, on tombe sur la configuration du virtualhost qui ne va pa nous laisser accéder au contenu. Pour y accéder on peut lui spécidier un chemin via le telnet, avec le host. Dans une barre d'addresse du navigateur on ne peut pas directement. 

![connexion proxy](https://user-images.githubusercontent.com/58049740/118841336-889ea380-b8c8-11eb-8a42-6cf5df003e76.png)
 
* Expliquer pourquoi la configuration statique est fragile et doit être améliorée.

Parce que les ip qu'on a mit dans la configuration peuvent facilement changer. 




