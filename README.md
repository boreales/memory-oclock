
# Cartes Mémoires

"Le jeu où il faut se souvenir des cartes"

Vous imaginez si encore aujourd'hui on avait gardé des cartes mémoires pour tout ? Un genre de "rétro-futur des années 80 cyberpunk" ?

Recharger un iPhone en cartouches de mégaoctets en plus de sa batterie.

Et démarrer une Tesla avec une disquette.

Ah ça fait rêver non ? Non ? Ok ... 😅

Bon, passons aux choses sérieuses alors et voyons comment mettre en place ce petit jeu.

## Mettre en place notre structure de fichiers
- Ouvrez votre terminal (Touche Windows + Touche R puis tapez cmd sous Windows et appuyez sur Entrée)

- Placez-vous dans un dossier de votre ordinateur par exemple Documents et créez un dossier memory

```
 cd Documents
```

```
 mkdir memory
```

```
 cd memory
```

Pour une meilleure clarté dans notre organisation on va tout d'abord créer deux dossier séparés pour Docker et pour le jeu.

```
 mkdir docker
```

```
 mkdir game
```

## La partie serveur web + PHP + base de données via Docker

Docker c'est un outil formidable utilisé pour préparer, gérer et déployer des environnements de développement via des containers. Si vous voulez en savoir plus j'ai écrit une suite d'articles à ce sujet justement : 

https://developpeur-freelance.io/blog/developpement-web/mon-passage-a-docker/ 

Dans notre cas ici je crée un serveur web (Nginx) qui va nous permettre d'accéder à une url et de faire la navigation entre les pages. Pour les plus aguerris d'entre vous, c'est en fait notre serveur HTTP qui va interpréter toutes les requêtes (HTTP oui bravo !) et les envoyer au serveur PHP qui va les traiter.

```
    nginx:
      build: ./nginx/
      container_name: nginx-container
      ports:
          - 8080:80
      links:
          - php
      volumes:
          - ../game/:/var/www/html/
```

Ensuite je lui ajoute le serveur PHP en question qui va intérpréter notre code ... PHP ! C'est bien vous suivez, j'ai récupéré votre attention.

```
    php:
      build: ./php/
      container_name: php-container
      expose:
          - 9000
      volumes:
          - ../game/:/var/www/html/
```

Et enfin en dernier lieu on va aussi créer un container MySQL pour notre base de données servant à enregistrer les scores.

```
    mysql:    
        image: mysql:5.7  
        container_name: mysql-container  
        environment:  
          MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}  
          MYSQL_DATABASE: ${MYSQL_DB}  
          MYSQL_USER: ${MYSQL_USER}  
          MYSQL_PASSWORD: ${MYSQL_PASSWORD}
```

Il vous faut donc un fichier .env au même endroit que votre docker-compose.yml avec ces informations : 

    MYSQL_ROOT_PASSWORD=secret
    MYSQL_DB=mydb
    MYSQL_USER=myuser
    MYSQL_PASSWORD=password

Ok super notre base de données est créée, on y va maintenant ? 
Alors, oui c'est bien beau d'avoir une base de données mais à l'intérieur il nous faudrait peut être une table pour enregistrer les scores avec les champs nécessaires.

On va donc créer un fichier db.sql qui contient la requête SQL de création de la table.

```
    CREATE TABLE IF NOT EXISTS score (
        `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `timer` VARCHAR(255) NOT NULL
    );
```

Maintenant il faut exécuter ce code SQL dans notre dans notre container de base de données, via Docker comme ceci : 

```
    docker exec -i mysql-container mysql -umyuser -ppassword mydb < db.sql
```

## La partie PHP

Le PHP c'est un langage serveur, ... non pas les serveurs du bar à bières, les serveurs pour stocker des fichiers. Restez concentrés. :p 

Ce que l'on va faire ici c'est utiliser le gestionnaire de dépendances Composer afin d'installer les librairies externes utiles à notre code.

Pour cela dans notre terminal on lance

```
 cd game
```

Puis celle-ci : 

```
 composer install
```

Je n'en ai utilisé qu'une qui s'appelle phpdotenv et qui permet de récupérer les identifiants de la base de données via un fichier .env ("dot env" en anglais, et oui c'est fou...).
Cela permet plus de sécurité dans notre application et c'est un réflexe que j'ai pris.

D'ailleurs ce fichier .env on va le créer dans le dossier php et lui donner cette forme 

```
DB_NAME="mydb"
DB_USER="myuser"
DB_PASSWORD="password"
```

Toujours par souci de clarté on va aussi séparer nos langages avec un dossier php, un dossier css, un dossier js et un dossier img pour les photos de nos cartes.

On peut ensuite également créer à l'intérieur du dossier php un dossier controller et un dossier model pour séparer notre code sous forme de Modèle-Vue-Contrôleur. Même si ici nous n'aurons qu'une vue qui est le fichier principal index.php.

## Captures d'écran

![Page d'accueil du jeu](https://i.ibb.co/N9NmnG8/Capture-d-e-cran-2022-02-22-a-11-42-11.png "Page d'accueil du jeu")
Page d'accueil du jeu

![Lancement du jeu](https://i.ibb.co/zr9xCRC/Capture-d-e-cran-2022-02-22-a-11-42-20.png "Lancement du jeu")
Lancement du jeu

![Fin de partie gagnée](https://i.ibb.co/yVMhqVc/Capture-d-e-cran-2022-02-22-a-11-42-51.png "Fin de partie gagnée")
Fin de partie gagnée

![Fin de partie perdue](https://i.ibb.co/bR4GrJZ/Capture-d-e-cran-2022-02-22-a-12-07-02.png "Fin de partie perdue")
Fin de partie perdue

## Ressources

### Docker
Documentation officielle de Docker : https://docs.docker.com/

Docker Compose : https://docs.docker.com/compose/

### PHP
Documentation officielle de PHP : https://www.php.net/docs.php 

Documentation officielle de Composer : https://getcomposer.org/doc/ 

PHP dotenv : https://github.com/vlucas/phpdotenv

$_POST : https://www.php.net/manual/fr/reserved.variables.post.php

PDO : https://www.commentcamarche.net/faq/27489-pdo-une-autre-facon-d-acceder-a-vos-bases-de-donnees

Les classes et les objets PHP : https://www.php.net/manual/fr/language.oop5.php

### Jquery & Javascript

Documentation Jquery : https://api.jquery.com/

Ajax & PHP : https://www.w3schools.com/php/php_ajax_php.asp

addClass : https://api.jquery.com/addClass/

removeClass : https://api.jquery.com/removeClass/

attr : https://api.jquery.com/attr/

setInterval : https://developer.mozilla.org/en-US/docs/Web/API/setInterval

push : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/push

reduce : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

concat : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/concat

sort : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

Math.random : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random

append : https://api.jquery.com/append/

show : https://api.jquery.com/show/

hide : https://api.jquery.com/hide/

css : https://api.jquery.com/css

clearInterval : https://developer.mozilla.org/fr/docs/Web/API/clearInterval

ajax : https://api.jquery.com/jquery.ajax/

### Autres

JSON : https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON

CSS : https://developer.mozilla.org/fr/docs/Web/CSS/Reference
