### Étape 3 : Reverse proxy avec apache (configuration statique)

### Webcasts

* [Labo HTTP (3a) : reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=WHFlWdcvZtk)
* [Labo HTTP (3b) : reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=fkPwHyQUiVs)
* [Labo HTTP (3c) : reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=UmiYS_ObJxY)


### Critères d'acceptation


 
* Vous pouvez faire une démo, où vous démarrez à partir d'un environnement Docker "vide" (aucun conteneur en cours d'exécution) et où vous démarrez 3 conteneurs : serveur statique, serveur dynamique et reverse proxy ; dans la démo, vous prouvez que le routage est fait correctement par le reverse proxy.

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

 
* Vous êtes capable d'expliquer et de prouver que les serveurs statiques et dynamiques ne peuvent pas être atteints directement (le reverse proxy est un point d'entrée unique dans l'infra). 

On a un message d'erreur si on ne spécifie pas le chemin, on tombe sur la configuration du virtualhost qui ne va pa nous laisser accéder au contenu. Pour y accéder on peut lui spécidier un chemin via le telnet, avec le host. Dans une barre d'addresse du navigateur on ne peut pas directement. 

![connexion proxy](https://user-images.githubusercontent.com/58049740/118841336-889ea380-b8c8-11eb-8a42-6cf5df003e76.png)
 
* Vous êtes capable d'expliquer pourquoi la configuration statique est fragile et doit être améliorée.

Parce que les ip qu'on a mit dans la configuration peuvent facilement changer. 

* Vous avez **documenté** votre configuration dans votre rapport.

Oui
