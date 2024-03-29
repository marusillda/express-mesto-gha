[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
#  Учебный проект Mesto (бэкенд)

Проект представляет собой интерактивную страницу, на которой пользователь может делиться с другими пользователями  Интернета своими фотографиями. Пользователь может редактировать свой профиль, добавлять и удалять фотографии, ставить лайки. Другие пользователи, в свою очередь, тоже могут оценивать Ваши фотографии, поставив им лайк. В данный проект добавлены регистрация и авторизация пользователя.

Код проекта можно посмотреть по [ссылке](https://github.com/marusillda/express-mesto-gha)

**Выполнена реализация бэкенд части проекта, в которой предусмотрено:** 
* запуск сервера;
* установка соединения с NoSQL БД - MongoDB;
* описание схем и моделей документов в БД;
* централизованная обработка возможных ошибок;
* возможность регистрации и авторизации пользователя;
* создание основных маршрутов;
* защита части маршрутов от неавторизованных пользователей;
* обработка запросов по маршрутам;
* валидация данных запроса с помощью Joi;

**Использованы следующие методы и технологии:**
- Node.js
- Express
- MongoDB
- Mongoose
- ESLint
- Clebrate & Joi
  
##  Запуск проекта

`npm install` - для установки необходимых для функционирования проекта пакетов

`mongod` - выполнить данную команду перед запуском самого проекта для подключения к MongoDB

`npm run start` — запускает сервер

`npm run dev` — запускает сервер с hot-reload

