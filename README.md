# Teslo Shop web

<img src="./img.png">

### Empezando

El archivo .env.example renombrar a .env

```bash
NEXT_PUBLIC_URL_API= url del backend
URL_API= url del backend
```

* Backend: [teslo-shop-api](https://github.com/jonathanleivag/teslo-shop-api)

Primero, ejecute el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) con su navegador para ver el resultado.

### Rutas

```bash
# auth
Login -> http://localhost:3000/auth/login
Registrar -> http://localhost:3000/auth/register

#verificación
dirección -> http://localhost:3000/checkout/address
Resumen -> http://localhost:3000/checkout/summary

#ordenes
orden por id -> http://localhost:3000/orders/[id]
Historial de compra -> http://localhost:3000/orders/history

#productos
ver producto -> http://localhost:3000/product/slug

#raiz
404
home -> http://localhost:3000/
```

# License

copia de la pag de tesla, imagenes sacada de la pagína de tesla, no utilizar estas imagenes

Free Software, Hell Yeah!