#Тестовое задание для Urban Smart
Приложение написано на Nest.js с использованием TypeScript

В качестве базы данных используется PostgreSQL и ORM Sequelize
## Регистрация

http://localhost:5000/auth/registration // POST

```javascript
JSON = {
    "email": "test@test.ru", // string
    "password": "sefsef234f" // string
}
```
Ответ
```javascript
JSON = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVxcXEyM2Zlc0BtYWkudHUiLCJpZCI6MiwiaWF0IjoxNjM2MDYxNzkyLCJleHAiOjE2Mzg2NTM3OTJ9.GliBIJWrlf-llaIfV0PdIKqWrHiKCB7lPvVj7DhAr2I" // string
}
```

## Вход

http://localhost:5000/auth/login // POST
```javascript
JSON = {
    "email": "test@test.ru", // string
    "password": "sefsef234f" // string
}
```
В ```cookie``` запишится ```token```


## Проверка токена
http://localhost:5000/user/check-token // POST
```bash
JSON = {
    "token": "awdawdawd32342.asdawdawddw23132dawawd.dawdaw" //string
}
```
Ответ
```javascript
HTTP Status 200 // OK
Or
HTTP Status 403 // FORBIDDEN
```

## Проверка токена после Входа
http://localhost:5000/auth/refresh // GET
Ответ
```javascript
JSON = {
    "email": "test@test.ru",
    "id": 1,
}
```

## .env - конфигурация
Нужно создать отдельный файл и указать поля
```.dotenv
PORT=
POSTGRES_HOST=
POSTGRESS_PORT=
POSTGRES_USER=
POSTGRES_DB=
POSTGRESS_PASSWORD=
PRIVAT_KEY=
PRIVAT_KEY_AUTH=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
API_URL=
ACTIVE_MAILER=false
```
ACTIVE_MAILER - если нужна проверка почты, то необходимо заполнить все поля SMTP и поставить 
флаг ``true``

