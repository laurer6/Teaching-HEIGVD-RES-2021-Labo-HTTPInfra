## Step 5: Dynamic reverse proxy configuration

### Webcasts

* [Labo HTTP (5a): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=iGl3Y27AewU)
* [Labo HTTP (5b): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=lVWLdB3y-4I)
* [Labo HTTP (5c): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=MQj-FzD-0mE)
* [Labo HTTP (5d): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=B_JpYtxoO_E)
* [Labo HTTP (5e): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=dz6GLoGou9k)

### Critères d'acceptation

* Vous avez un repo GitHub avec tout ce qui est nécessaire pour construire les différentes images.

https://github.com/laurer6/Teaching-HEIGVD-RES-2021-Labo-HTTPInfra/edit/fb-dynamic-configuration


* Vous avez trouvé un moyen de remplacer la configuration statique du reverse proxy (adresses IP codées en dur) par une configuration dynamique.

Il a fallut modifier le Dockerfile!

[dockerfile](https://user-images.githubusercontent.com/58049740/120084265-06379000-c0cf-11eb-82ff-d39fdd73730a.PNG)

Ainsi qu'ajouter le foreground de manière différente que dans le webcast étant donné qu'on est sur apache 7.2

![foregrouns](https://user-images.githubusercontent.com/58049740/120084274-1a7b8d00-c0cf-11eb-8680-0d50b61acf97.PNG)

* Vous pouvez utiliser l'approche présentée dans le webcast (variables d'environnement et script PHP exécuté au démarrage du conteneur de reverse proxy) ou une autre approche. L'exigence est que vous n'ayez pas à reconstruire l'image Docker du proxy inverse lorsque les adresses IP des serveurs changent.

Le config template, qui permete de donner l'ip au moment de run le container

![configtemplate](https://user-images.githubusercontent.com/58049740/120084281-2b2c0300-c0cf-11eb-8fc5-1946d44d798c.PNG)

* Vous êtes en mesure de faire une démonstration de bout en bout avec un scénario bien préparé. Assurez-vous que vous pouvez démontrer que tout fonctionne correctement lorsque les adresses IP changent !

Il faut lancer plusieurs container aléatoirement pour être sûr que le fait d'entrer les adresse ip en dur ne puisse pas marche, par contre il faudra quand même les données au moment du run

* Vous êtes en mesure d'expliquer comment vous avez mis en œuvre la solution et de nous guider à travers la configuration et le code.

Par exemple, de cette manière:

docker run -d -e STATIC_APP=172.17.0.5:80 -e DYNAMIC_APP=172.17.0.8:3000 --name apache_rp2 -p 8080:80 res/apache_rp

* Vous avez **documenté** votre configuration dans votre rapport.

