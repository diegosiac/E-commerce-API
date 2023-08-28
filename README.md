# E-commerce-API

Esta API ha sido desarrollada para facilitar la implementación y gestión de operaciones relacionadas con comercio electrónico. Ya sea que estés construyendo una tienda en línea desde cero o buscando mejorar tu plataforma actual, la API ofrece las herramientas necesarias para agilizar tus procesos y brindar una experiencia de compra excepcional a tus clientes.

**Características Clave:**

-   **Integración de la pasarela de pago de PayPal** para una experiencia de compra segura y confiable.
- **Gestión de Productos:** Agrega, actualiza y elimina productos de manera sencilla a través de endpoints intuitivos. Cada producto puede incluir información detallada, como nombre, descripción, precio, disponibilidad, y más. 
- **Carrito de Compras:** Permite a los usuarios agregar productos a su carrito, visualizar el contenido y proceder al proceso de pago. Mantén un seguimiento de los artículos seleccionados y facilita la conversión. 
- **Procesamiento de Pedidos:** Administra el ciclo de vida de los pedidos, desde la creación hasta el envío. Proporciona información actualizada sobre el estado del pedido para mantener a tus clientes informados. 
- **Autenticación y Seguridad:** Protege los datos sensibles de tus clientes y de tu negocio mediante autenticación segura. Implementa prácticas recomendadas para garantizar la privacidad de la información.

## Demo

Ver la API integrada con un [E-commerce](https://geekmobile.netlify.app)

##	Instalación

Clonar e instalar el proyecto:
```sh 
$ git clone https://github.com/diegosiac/E-commerce-API.git
$ cd project
$ npm install
```
Si quieres utilizar un template para tu E-commerce, [aquí te dejamos una  recomendación ](https://github.com/diegosiac/E-commerce.git)

## Setup
Cree un archivo .env que incluya:
```sh 
PORT=3000

URL_BACK=
URL_FRONT=

DB_CNN_PRODUCTION=
DB_CNN_DEVEPLOMENT=
DB_CNN_TEST=

CLIENT_PAYPAL=
SECRET_PAYPAL=

SECRET_JWT_SEED=
SECRET_JWT_SEED_ADMIN=

SECRET_AUTH_ADMIN=

ALGOLIA_APP_ID=
ALGOLIA_API_KEY=
ALGOLIA_INDEX_NAME=
ALGOLIA_INDEX_NAME_PROD=
ALGOLIA_INDEX_NAME_DEV=

GOOGLE_KEY=
GOOGLE_URL=https://maps.googleapis.com/maps/api/geocode/json
```

## Iniciar desarrollo
```sh 
$ npm run dev
```
## Iniciar proyecto
```sh 
$ npm run start
```
## Ejecutar pruebas de integración
```sh 
$ npm run test
```

## Recursos necesarios para este proyecto

 - Api PayPal:
	 - [Dashboard](https://developer.paypal.com/home)
	 - [Docs](https://developer.paypal.com/api/rest/)

 - Maps Google Apis
	 - [Docs](https://developers.google.com/maps/documentation/geocoding)

 - Algolia
	 - [Dashboard](https://www.algolia.com)
	 - [Docs](https://www.algolia.com/doc)

 - MongoDB
	 - [Dashboard](https://www.mongodb.com)
	 - [Docs](https://www.mongodb.com/docs)
