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

### Étape 4 : Requêtes AJAX avec JQuery

* Vous avez un repo GitHub avec tout ce qui est nécessaire pour construire les différentes images.

https://github.com/laurer6/Teaching-HEIGVD-RES-2021-Labo-HTTPInfra/edit/fb-ajax-jquery

il faut construire les 3 images suivantes dans l'ordre, leur Dockerfile a été modifié pour possédé l'app VIM et ainsi pouvoir facilement modifier les fichiers des containers.

```bash
docker build -t res/apache_php .
docker build -t res/express_students .
docker build -t res/apache_prp .
```

```bash
docker run -d --name apache_static res/apache_php
docker run -d --name express_static res/express_students
docker run -d -p 8080:80 --name apache_rp res/apache_rp
```

* Pour la démo: 

Toutes les 2 secondes, le text change avec un type, un genre et un animal différent.

![image](https://user-images.githubusercontent.com/58049740/119982809-98507300-bfbf-11eb-9b69-abf4c248f42c.png)


* Contenu des réponses:

![image](https://user-images.githubusercontent.com/58049740/119982625-5de6d600-bfbf-11eb-8290-e2492ad3cb00.png)

## Step 5: Dynamic reverse proxy configuration

### Critères d'acceptation

* Repo GitHub:

https://github.com/laurer6/Teaching-HEIGVD-RES-2021-Labo-HTTPInfra/edit/fb-dynamic-configuration


* Trouver un moyen de remplacer la configuration statique du reverse proxy (adresses IP codées en dur) par une configuration dynamique.

Il a fallut modifier le Dockerfile!

[dockerfile](https://user-images.githubusercontent.com/58049740/120084265-06379000-c0cf-11eb-82ff-d39fdd73730a.PNG)

Ainsi qu'ajouter le foreground de manière différente que dans le webcast étant donné qu'on est sur apache 7.2

![foregrouns](https://user-images.githubusercontent.com/58049740/120084274-1a7b8d00-c0cf-11eb-8680-0d50b61acf97.PNG)

* Utiliser l'approche présentée dans le webcast (variables d'environnement et script PHP exécuté au démarrage du conteneur de reverse proxy) ou une autre approche. L'exigence est que vous n'ayez pas à reconstruire l'image Docker du proxy inverse lorsque les adresses IP des serveurs changent.

Le config template, qui permete de donner l'ip au moment de run le container

![configtemplate](https://user-images.githubusercontent.com/58049740/120084281-2b2c0300-c0cf-11eb-8fc5-1946d44d798c.PNG)

* Etre en mesure de faire une démonstration de bout en bout avec un scénario bien préparé. Assurez-vous que vous pouvez démontrer que tout fonctionne correctement lorsque les adresses IP changent !

Il faut lancer plusieurs container aléatoirement pour être sûr que le fait d'entrer les adresse ip en dur ne puisse pas marche, par contre il faudra quand même les données au moment du run

* Vous êtes en mesure d'expliquer comment vous avez mis en œuvre la solution et de nous guider à travers la configuration et le code.

Par exemple, de cette manière:

```bash
docker run -d -e STATIC_APP=172.17.0.5:80 -e DYNAMIC_APP=172.17.0.8:3000 --name apache_rp2 -p 8080:80 res/apache_rp
```




