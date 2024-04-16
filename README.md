# Настройка проекта с полного нуля
Для работы с проектом понадобиться

1. docker - 24+
2. docker compose - произвольной версии
3. git - произвольной версии

## Разворачивание проекта

1. Клонирование репозитория

```sh
$ git clone https://github.com/AlexsRyzhkov/Cloud.dev.git
```

2. Переход на ветку develop
```sh
$ git checkout develop
```
3. Сборка изображений и контейнеров приложения
```sh
$ `docker compose up -d --build`
```

## Настройка контейнера node

1. Установка всех зависимостей

```sh
$ docker compose exec node npm init
```
**Note:** Web доступен по url [localhost:3030](http://localhost:3030/):

2. Запуск среды разработки

```sh
$ docker compose exec node npm run dev
```
## Настройка контейнера python

1. Установка всех зависимостей

```sh
$ docker compose exec python pip install requirements.txt
```

2. Запуск среды Django

```sh
$ docker compose exec python python manage.py runserver "0.0.0.0:3020"
```
2. После установки нового пакета выполнить команду

```sh
$ docker compose exec python pip freeze > requirements.txt
```

**Note:** Django доступен по url [localhost:3020](http://localhost:3020/):

## License

This repo available under the [MIT license](https://github.com/skarif2/gmail-signature/blob/master/LICENSE).

---
<h4 align="center">Made with&nbsp; 💖 &nbsp;by Alexs.</h4>