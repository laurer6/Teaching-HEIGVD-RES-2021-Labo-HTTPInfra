# Teaching-HEIGVD-RES-2021-Labo-HTTPInfra

## Step 1: Static HTTP server with apache httpd

On doit faire serveur HTTP statique. Le but est de dockériser une image apache, ici en version 7.2 rouvée sur le site dockerhub. Cette version ne devrait pas posé de problème par rapport à la version du webcast de 2016.

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

![siteweb](https://user-images.githubusercontent.com/58049740/120925105-41415100-c6d7-11eb-9bd9-136d073e3db6.PNG)

* Ce qu'il faut faire dans le Dockerfile: 

On va télécharger ou récuperer le docker souhaité avec le FROM, ici un serveur apache qui peut lire du php: 
`FROM php:7.2-apache`

Puis on copie à l'interieur de notre propre docker, le contenu souhaité avec COPY : 
`COPY content/ /var/www/html/`

* où se trouvent les fichiers de configuration d'Apache.

Il suffit d'utiliser la commande `exec -it`et de demander d'acc au `bash` pour pourvoir se trouver dans le noyaux linux du conteneur et ainsi nivaguer comme on veut: `docker exec -it NOM_DU_DOCKER /bin/bash`

Ensuite il faut se trouver dans `etc/apache2/` avec la commande `cd etc/apache2/`puis faire un `ls` pour voir tout les fichier de config. On peut les lire avec la commande `more`.

### Étape 2 : Serveur HTTP dynamique avec express.js

On a du crée et dockerisé un serveur http dynamique avec le framweork express. La tâche était de renvoyer une liste d'objet aléatoire au format JSON.

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

![Json](https://user-images.githubusercontent.com/58049740/120925114-4ef6d680-c6d7-11eb-9146-5e3f5bd5f221.PNG)

pour trouver l'ip, on va plutôt faire un docker inspect NOM_DOCKER | grep -i IPAdd, docker-machine marche pas.
 
Une fois le docker lancé avec la commande docker run -p 9090:3000, on peut y accéder avec localhost:9090

### Étape 3 : Reverse proxy avec apache (configuration statique)

Ici, le but est d'avoir accès au serveur statique de l'étape et du serveur dynamique de l'étape 2 via un reverse proxy. On pourra donc accéder aux deux sans faire de port mapping

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

On a ajouté un script pour que le site web afficher une phrase différente toute les 5 secondes dans l'exemple de page statique de l'étape 1, phrase générée à l'aide de notre serveur express de l'étape 2.

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

Ici nous devions résoudre le problème d'ip hardcodé que nous avions utilisé pour l'étape 3. Pour ce faie utiliser un des variables d'environnement qui contiendront l'ip du serveur dynamique et statique, que l'on va pouvoir initialiser au moment de lancer le container qui contienr le reverse proxy.

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

### Management UI (0.5 pt)

Ici, pas besoin de créer un autre repo pour cette partie, car il suffit d'utiliser des commandes docker pour avoir une app graphique qui permet de contrôler notre environnement docker.

On a trouver sur le web, sur https://www.portainer.io/ , un container qui permete de faire tout ça, 
Il suffit de lancer les deux commande suivante:

pour pull l'image portaineer

```bash
docker pull portainer/portainer-ce
```

et encuite lancer le container selon le tutoriel du site (ici sous linux)

```bash
docker run -d -p 8000:8000 -p 9000:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```

Ensuite il suffit d'y accéder, ici, sur localhost:9000, de créer un utilisateur et un mot de passe

![login](https://user-images.githubusercontent.com/58049740/120924936-739e7e80-c6d6-11eb-8e64-66f64797a3e9.PNG)

Puis de se connecter

![portainer](https://user-images.githubusercontent.com/58049740/120924969-a5174a00-c6d6-11eb-9092-63c5a15d9e0e.PNG)

### Load balancing: multiple server nodes (0.5pt)

Nous avon sutiliser NGINX pour le load balancing

il suffit de créer un container docker Nginx comme avec un dockerfile contenant ces info :

```bash
FROM nginx

EXPOSE 80

COPY nginx.conf /etc/nginx/
```

puis de le build avec la commande

```bash
$docker build -t res/load-balancing .
```

ensuite, pour l'exemple, il faut lancer deux container de chaque serveur, soit 2 serveur statique et 2 serveur dynamique.

Il faut faire attention à leur ip vu que l'on va informer le container NGINX de leur ip lorsqu'on les ajoutre dans le fichier conf de nginx.

![nginx conf](https://user-images.githubusercontent.com/58049740/120930196-9b004600-c6ec-11eb-99c7-ef082404401c.PNG)

Il n'y plus qu'à lancer le container :

```bash
docker run res/load-balancing
```
puis tester l'adresse demo.res.ch ou demo.res.ch/api/students


### Load balancing: round-robin vs sticky sessions (0.5 pt)

Nginx utilise la méthode round-robin par défault pour le load balancing.
pour forcer la méthode du "Sticky sessions" , il faut rajouter la ligne hash $remote_addr.

Le plus gros inconvénient de l'utilisation de l'algorithme round robin dans l'équilibrage de charge est que l'algorithme suppose que les serveurs sont suffisamment similaires pour gérer des charges équivalentes. Si certains serveurs ont plus de CPU, de RAM ou d'autres spécifications, l'algorithme n'a aucun moyen de distribuer plus de demandes à ces serveurs. Par conséquent, les serveurs ayant une capacité moindre peuvent être surchargés et tomber en panne plus rapidement tandis que la capacité des autres serveurs reste inactive.





