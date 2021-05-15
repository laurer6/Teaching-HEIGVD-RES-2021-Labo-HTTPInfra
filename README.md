# Teaching-HEIGVD-RES-2021-Labo-HTTPInfra

## Step 1: Static HTTP server with apache httpd

### Webcasts

* [Labo HTTP (1): Serveur apache httpd "dockerisé" servant du contenu statique](https://www.youtube.com/watch?v=XFO4OmcfI3U)

### Acceptance criteria

* You have a GitHub repo with everything needed to build the Docker image

https://github.com/laurer6/Teaching-HEIGVD-RES-2021-Labo-HTTPInfra/blob/fb-apache-static/

* You can do a demo, where you build the image, run a container and access content from a browser.

il suffit de lancer ces deux commandes dans le répertoire où se trouve le Dockerfile : 

```bash
$ docker docker build -t res/apache_php .
```

```bash
$ docker run -p 9090:80 res/apache_php  
```
Ici, 9090 est le port souhaité


Ensuite il faut taper notre addresse local avec le port souhaité dans notre navigateur web, ici : `localhost:9090`

* You have used a nice looking web template, different from the one shown in the webcast.

On a utilisé ce bootstrap : https://onepagelove.com/bolt et on l'a modifié un peu.

* You are able to explain what you do in the Dockerfile.

On va télécharger ou récuperer le docker souhaité avec le FROM, ici un serveur apache qui peut lire du php: 
`FROM php:7.2-apache`

Puis on copie à l'interieur de notre propre docker, le contenu souhaité avec COPY : 
`COPY content/ /var/www/html/`

* You are able to show where the apache config files are located (in a running container).

* You have **documented** your configuration in your report.


