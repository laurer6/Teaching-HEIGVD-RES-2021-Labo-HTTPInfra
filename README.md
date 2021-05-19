### Étape 3 : Reverse proxy avec apache (configuration statique)

### Webcasts

* [Labo HTTP (3a) : reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=WHFlWdcvZtk)
* [Labo HTTP (3b) : reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=fkPwHyQUiVs)
* [Labo HTTP (3c) : reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=UmiYS_ObJxY)


### Critères d'acceptation

* Vous avez un repo GitHub avec tout ce qui est nécessaire pour construire l'image Docker pour le conteneur.

 https://github.com/laurer6/Teaching-HEIGVD-RES-2021-Labo-HTTPInfra/edit/fb-apache-reverse-proxy
 
* Vous pouvez faire une démo, où vous démarrez à partir d'un environnement Docker "vide" (aucun conteneur en cours d'exécution) et où vous démarrez 3 conteneurs : serveur statique, serveur dynamique et reverse proxy ; dans la démo, vous prouvez que le routage est fait correctement par le reverse proxy.

Pour tout faire fonctionner, vu qu'on utilise des ip hardcodées, il faut lancer les conteneur docker dans le bon ordre et faire attention que les ip sont les mêmes que ce qui est marqué dans le .conf du docker reversProxy.

Soit:

docker build -t res/apache-static .
docker run res/apache-static

puis:

docker build -t res/express-dynamic . 
docker run res/express-dynamic

et enfin:

docker build -t res/apache_rp .
docker run -p 8080:80 res/apache_rp

Pour tester le reverse il faut modifier le /etc/hosts en agjoutant la ligne 192.169.99.100 res.demo.ch
demo.res.ch:8080               pour être redirigé sur le site statique
demo.res.ch:8080/api/students/  pour le site dynamique

 
* Vous êtes capable d'expliquer et de prouver que les serveurs statiques et dynamiques ne peuvent pas être atteints directement (le reverse proxy est un point d'entrée unique dans l'infra). 


 
* Vous êtes capable d'expliquer pourquoi la configuration statique est fragile et doit être améliorée.



* Vous avez **documenté** votre configuration dans votre rapport.
