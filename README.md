# Auth0 Tester

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.12.

## Git

```
git remote add origin https://github.com/vluc3/auth0-tester.git
git branch -M main
git push -u origin main
```

## Dependencies

### Back-end

```
npm i -s express
npm i -s -D @types/express

npm i -s express-jwt
npm i -s jwks-rsa

npm i -s cors
npm i -s -D @types/cors

npm i -s body-parser

npm i -s auth0-js
npm i -s -D @types/auth0-js
```

### Back-end (optional)

```
npm i -s https
npm i -s cookie-parser
npm i -s -D nodemon
```

_____________________________

### Front-end

```
npm i -s auth0
```

### Shared

```
npm i -s moment
npm i -s -D @types/moment
```

## Configuration

```
auth0/application/clientID
  9D0LHGTPFCODuIfHUIkNdlyvZn29sAto
auth0/application/domain
  hoopiz-demo.eu.auth0.com
auth0/application/advanced/OAuth/JSONWebKeySet
  https://hoopiz-demo.eu.auth0.com/.well-known/jwks.json
    x5c
      public key
```

## Run

### Shared

```
npm install
```

### Back-end

```
npm run start-server
```
Listening on http://localhost:3000

http://localhost:3000/api/data

http://localhost:3000/api/authorized-data

### Front-end

```
npm run start
```
Listening on http://localhost:4200

## Source code

### Front-end

```
./src/app/app.module.ts
./src/app/app.component.ts
./src/app/app.component.html
./src/app/app.component.scss
./src/app/auth/auth.service.ts
./src/app/auth/auth.interceptor.ts
```

### Back-end

```
./server/server.ts
./server/auth.middleware.ts
./server/check-auth.middleware.ts
```

## Info

### Auth0

https://manage.auth0.com/dashboard/eu/hoopiz-demo

### JSON Web Key Set (jwks)

https://github.com/auth0/node-jwks-rsa

### Front-end request example

```
http://localhost:4200/
#access_token=d6eEX8DEPI7AloC9H8_TbO-OLH6jGq6h
&scope=openid%20profile%20email
&expires_in=7200
&token_type=Bearer
&state=-rnu.FX.ril-MPT98ZTt278YUiQfCwbW
&id_token=
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCJ6Imwza29Ubm12NkYzRWhpX2ZLMjQwZyJ9.eyJuaWNrbmFtZSI6InZpbmNlbnQubHVjIiwibmFtZSI6InZpbmNlbnQubHVjQGhvb3Bpei5mciIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci84ZGE3MzQwOWZmZTBkYzA1YmY3NjZhMmY0MTI0YjczYz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnZpLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIxLTA3LTE1VDEzOjUxOjE5Ljg3MVoiLCJlbWFpbCI6InZpbmNlbnQubHVjQGhvb3Bpei5mciIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9ob29waXotZGVtby5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjBmMDM5NmEyMWMzODIwMDY5ZDRiN2Q4IiwiYXVkIjoiOUQwTEhHVFBGQ09EdUlmSFVJa05kbHl2Wm4yOXNBdG8iLCJpYXQiOjE2MjYzNTg1MTksImV4cCI6MTYyNjM5NDUxOSwiYXRfaGFzaCI6IjVLOFpDa0M2dU9BVV9YNFdld2J1X0EiLCJub25jZSI6InBaZ3B6Q1ZTYVp-b3U3MUpadVRma2dObjFrS0ZIaVpJI
```
