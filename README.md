### Critères d'acceptation


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

* Vous pouvez faire une démonstration complète, de bout en bout : la page web est mise à jour dynamiquement toutes les quelques secondes (avec les données provenant du backend dynamique).

Toutes les 2 secondes, le text change avec un type, un genre et un animal différent.

![image](https://user-images.githubusercontent.com/58049740/119982809-98507300-bfbf-11eb-9b69-abf4c248f42c.png)


* Vous êtes capable de prouver que les requêtes AJAX sont envoyées par le navigateur et vous pouvez montrer le contenu des réponses.

![image](https://user-images.githubusercontent.com/58049740/119982625-5de6d600-bfbf-11eb-8290-e2492ad3cb00.png)

* Vous êtes capable d'expliquer pourquoi votre démo ne fonctionnerait pas sans un reverse proxy (à cause d'une restriction de sécurité).



* Vous avez **documenté** votre configuration dans votre rapport.

Oui
