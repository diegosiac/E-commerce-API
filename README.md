# E-commerce-API

Esta API ha sido desarrollada para facilitar la implementación y gestión de operaciones relacionadas con comercio electrónico. Ya sea que estés construyendo una tienda en línea desde cero o buscando mejorar tu plataforma actual, la API ofrece las herramientas necesarias para agilizar tus procesos y brindar una experiencia de compra excepcional a tus clientes.

**Características Clave:**

-   **Integración de la pasarela de pago de PayPal** para una experiencia de compra segura y confiable.
- **Gestión de Productos:** Agrega, actualiza y elimina productos de manera sencilla a través de endpoints intuitivos. Cada producto puede incluir información detallada, como nombre, descripción, precio, disponibilidad, y más. 
- **Carrito de Compras:** Permite a los usuarios agregar productos a su carrito, visualizar el contenido y proceder al proceso de pago. Mantén un seguimiento de los artículos seleccionados y facilita la conversión. 
- **Procesamiento de Pedidos:** Administra el ciclo de vida de los pedidos, desde la creación hasta el envío. Proporciona información actualizada sobre el estado del pedido para mantener a tus clientes informados. 
- **Autenticación y Seguridad:** Protege los datos sensibles de tus clientes y de tu negocio mediante autenticación segura. Implementa prácticas recomendadas con JWT(JSON WEB TOKEN) para garantizar la privacidad de la información.

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


# Documentación de Endpoints 


## ÍNDICE

- [Obtener Productos](#obtener-productos)
- [Busqueda de Productos](#busqueda-de-productos)
- [Pagos](#pagos)
- [Autenticación del Usuario](#autenticación-del-usuario)
- [Consultas del Usuario](#consultas-del-usuario)
- [Administrar Productos](#administrar-productos)
- [Autenticación del Administrador](#autenticación-del-administrador)
- [Gestión del Administrador](#gestión-del-administrador)

## Obtener Productos

 ### Obtener todos los productos

**Endpoint:**  `GET /api/products` 

**Respuesta Exitosa:** 
```json
status 200
{
  "ok": true,
  "data": {
    "products": [
      {
        "name": "Pantalla Samsumg J6 Plus Original",
        "description": "La Pantalla Samsung J6+ 2018 J610 Original es un componente genuino fabricado específicamente para el modelo de teléfono Samsung J6+",
        "thumbnail": "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689751335/GeekMobile-display-samsumgJ6-J610.webp",
		"value": 234,
        "category": "COMPONENTS",
        "keywords": [
          "display", 
          "pantalla",
          "J610",
          "Samsumg",
          "J6",
          "Celular"
        ],
        "stock": 99998,
        "id": "093h494h98h49g98h09g4"
      },
      {
        "name": "Pantalla LCD para Samsung Galaxy A02s SM-A025G",
        "description": "La pantalla LCD de repuesto para Samsung Galaxy A02s SM-A025G SM-A025M en color negro es la solución perfecta para restaurar la funcionalidad y la apariencia visual de tu dispositivo.",
        "thumbnail": "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689800333/grid_landscape_ptqhse.webp",
        "value": 2342,
        "category": "COMPONENTS",
        "keywords": [
          "display",
          "pantalla",
          "A02s",
          "Samsumg",
          "LCD",
          "Celular",
          "SM-A025G"
        ],
        "stock": 99999,
        "id": "9h23f02397fgh02f7gh3209f"
      }
    ],
    "results": 2
  }
}
```

### Obtener un producto por su id

**Endpoint:**  `GET /api/products/unique`

**Query:** 
- `id` (str): El ID único del producto.

**Respuesta Exitosa:**
```json
status 200
{
  "ok": true,
  "data": {
    "product": {
      "name": "Pantalla LCD para Samsung Galaxy A02s SM-A025G",
      "description": "La pantalla LCD de repuesto para Samsung Galaxy A02s SM-A025G SM-A025M en color negro es la solución perfecta para restaurar la funcionalidad y la apariencia visual de tu dispositivo",
      "thumbnail": "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689800333/grid_landscape_ptqhse.webp",
      "value": 2342,
      "category": "COMPONENTS",
      "keywords": [
        "display",
        "pantalla",
        "A02s",
        "Samsumg",
        "LCD",
        "Celular",
        "SM-A025G"
      ],
      "stock": 99999,
      "id": "3940gh09348gh3409gg34"
    }
  }
}
```
 **Respuesta de Error:**
Si no encuentra un producto con el id
```json
status 404
{
  "ok":  false,
  "msg":  "The product does not exist with the provided identifier"
}
```


### Obtener productos por su categoría

**Endpoint:**  `GET /api/products/category/${category}`

**Params:** 
- `category`: Categoria de los productos.
```json
status 200
{
  "ok": true,
  "data": {
    "category": "COMPONENTS",
    "products": [
      {
        "name": "Pantalla Samsumg J6 Plus Original",
		"description": "La Pantalla Samsung J6+ 2018 J610 Original es un componente genuino",
		"thumbnail": "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689751335/GeekMobile-display-samsumgJ6-J610.webp",
		"value": 2343,
		"category": "COMPONENTS",
		"keywords": [
		  "display",
		  "pantalla",
		  "J610"
		],
		"stock": 99998,
		"id": "235f2g2393g2g9043"
	  },
	  {
		"name": "Pantalla LCD para Samsung Galaxy A02s SM-A025G",
		"description": "La pantalla LCD de repuesto para Samsung Galaxy A02s SM-A025G SM-A025M",
"thumbnail": "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689800333/grid_landscape_ptqhse.webp",
		"value": 352,
		"category": "COMPONENTS",
		"keywords": [
		  "display",
		  "pantalla",
		  "A02s",
		  "Samsumg"
		],
		"stock": 99999,
		"id": "0934hv09h09290fg2"
	  }
	]
  }
}
```
 **Respuesta de Error:**
Si la categoria no es valida
```json
status 404
{
  "ok":  false,
  "errors":  {
    "category":  {
	  "msg":  "The category param is mandatory and must be valid",
	  "location":  "params",
	  "value":  "category"
	}
}
```

## Busqueda de productos
 ### Obtener todos los productos

**Endpoint:**  `GET /api/search` 
**Query:** 
- `query` (str): Sentencia para buscar productos.

**Respuesta Exitosa:** 
```json
status 200
{
  "ok": true,
  "queries": [
	{
	  "id": "34h90t8ht039h3g934g",
	  "name": "Pantalla Samsumg J6 Plus Original",
	  "description": "La Pantalla Samsung J6+ 2018 J610 Original es un componente genuino fabricado específicamente para el modelo de teléfono Samsung J6+",
	  "thumbnail": "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689751335/GeekMobile-display-samsumgJ6-J610.webp",
	  "value": 3525,
	  "category": "COMPONENTS",
	  "stock": 9999
	},
	{
	  "id": "9h290gh0hg392g3h",
	  "name": "Smartphone Samsung Galaxy A14 6.6” ",
	  "description": "El Smartphone Samsung Galaxy A14 en color Plata es un dispositivo de alta gama",
	  "thumbnail": "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689820569/GeekMobile-devices-phone-Samsumg-Galaxy-A14.webp",
	  "value": 3634,
	  "category": "DEVICES",
	  "stock": 99999
	},
  ]
}
```

##  Pagos

 ### Crear una orden de compra
**Endpoint:**  `POST /api/payments` 
**Headers:** 
- `x-token` (str): JWT del usuario.

**Body:**
```json
{
  "address":  {
	"firstName":  "test",
	"lastName":  "demo",
	"address1":  "VICENTE dals",
	"phoneNumber":  "5623232323",
	"countryRegion":  "Mexico",
	"zip":  "43534",
	"state":  "Ciudad de Mexico",
	"locality":  "Iztapalapa",
	"sublocality":  "APATLACO"
  }
}
```
**Respuesta Exitosa:** 
```json
status 201
{
  "ok":  true,
  "order":  {
    "link":  {
      "href":  "https://www.sandbox.paypal.com/checkoutnow?token=F48HHF389HF807",
	  "rel":  "approve",
	  "method":  "GET"
    }
  }
}
```
 **Respuesta de Error:**
Si no contiene la query o esta vacía
```json
status 400
{
  "ok":  false,
  "errors":  {
	"query":  {
	  "msg":  "The \"query\" parameter must have at least 1 character",
	  "location":  "query",
	  "value":  "query"
    }
  }
}
```
 **Respuesta de Error:**
Si no se envia el `x-token` en los header
```json
status 400
{
  "ok":  false,
  "msg":  "x-token token is missing"
}
```
Si se envía el `x-token` y es invalido
```json
status 400
{
  "ok":  false,
  "msg":  "Invalid token"
}
```

Si en el body no contiene el `address`
```json
status 400
{
  "ok":  false,
  "errors":  {
    "address.firstName":  {
	  "msg":  "Name is required",
	  "location":  "body",
	  "value":  "address.firstName"
	},
"	address.lastName":  {
	  "msg":  "Name is required",
	  "location":  "body",
	  "value":  "address.lastName"
	},
	"address.address1":  {
	  "msg":  "The address1 field is required",
	  "location":  "body",
	  "value":  "address.address1"
	},
	"address.phoneNumber":  {
	  "msg":  "The phoneNumber is required",
	  "location":  "body",
	  "value":  "address.phoneNumber"
	},
	"address.countryRegion":  {
	  "msg":  "The countryRegion is required",
	  "location":  "body",
	  "value":  "address.countryRegion"
	},
	"address.zip":  {
	  "msg":  "Zip code is required",
	  "location":  "body",
	  "value":  "address.zip"
	},
	"address.state":  {
	  "msg":  "State is required",
	  "location":  "body",
	  "value":  "address.state"
	},
	  "address.locality":  {
	  "msg":  "Locality is required",
	  "location":  "body",
	  "value":  "address.locality"
	},
	"address.sublocality":  {
	  "msg":  "sublocality is required",
	  "location":  "body",
	  "value":  "address.sublocality"
	}
  }
}
```
 ### Validar una orden de compra
**Endpoint:**  `GET /api/payments/execute_payment`
**Query:** 
- `token` (str): Orden de compra. 
- `PayerID` (str): El ID de usuario de PAYPAL. 

 **Respuesta Exitosa:** 
```sh
Te redirige a la url {tuDominio}/checkout/execute_payment?id=${token}
```
 **Respuesta de Error:**
Si el query `token` es invalido
```json
status 400
{
  "ok": false,
  "msg": "The token is invalid"
}
```
 ### Cancelar una orden de compra
 
**Endpoint:**  `POST /api/payments/cancel_payment` 
**Query:** 
- `token` (str): Orden de compra. 

 **Respuesta Exitosa:** 
 ```sh
Te redirige a la url {tuDominio}/cart
```
 **Respuesta de Error:**
Si el query `token` no es enviada o esta vacía
```json
status 400
{
  "ok":  false,
  "errors":  {
	"token":  {
	  "msg":  "The token is required",
	  "location":  "query",
	  "value":  "token"
    }
  }
}
```

## Autenticación del Usuario
### Iniciar sesión
**Endpoint:**  `POST /api/auth` 
**Body:**
```json
{
  "email":  "userDemo@gmail.com",
  "password":  "43634g4g3"
}
```
**Respuesta Exitosa:** 
```json
status 200
{
  "ok":  true,
  "user":  {
	"token": "03h49gh403gh348ghq0h9qg40ghq48990q4g0489qhg0h49qgq4809gghq40qh98g4h0894qg0qh49ghgq0h90h9g4",
	"name":  "user Demo",
	"email":  "userDemo@gmail.com",
	"basket":  {
	  "products":  [
		{
		  "name":  "Pantalla Samsumg J6 Plus Original",
		  "thumbnail":  "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689751335/GeekMobile-display-samsumgJ6-J610.webp",
		  "value":  234,
		  "quantity":  1,
		  "stock":  99998,
		  "description":  "La Pantalla Samsung J6+ 2018 J610",
		  "category":  "COMPONENTS",
		  "id_product":  "2h38f278fh02fh20",
		  "id":  "2f93h0293fh02323f"
		}
	  ]
	},
	"pucharses":  []
  }
}
```
 **Respuesta de Error:**
Si el `email` no esta registrado
```json
status 400
{
  "ok": false,
  "msg": "The user does not exist with that email"
}
```
 **Respuesta de Error:**
Si la contraseña es invalida
```json
status 400
{
  "ok": false,
  "msg": "Wrong password"
}
```

 ### Crear una cuenta
 **Endpoint:**  `POST /api/auth/new` 
**Body:**
```json
{
  "name":  "user Demo",
  "email":  "userDemo@gmail.com",
  "password":  "43634g4g3"
}
```
**Respuesta Exitosa:** 
```json
status 201
{
  "ok":  true,
  "user":  {
	"token":  "30f9uh409fh349h943f9h34f34f934f9h34f908h3409f834h094hf3409fhf0349hfh049334f3f4",
	"name":  "user Demo",
	"email":  "userDemo@gmail.com",
	"basket":  {
	  "products":  []
	},
	"pucharses":  []
  }
}
```
 **Respuesta de Error:**
Si un usuario ya existe con ese correo
```json
status 400
{
  "ok":  false,
  "msg":  "Un usuario ya existe con ese usuario"
}
```
 ### Renovar y validar el JWT del usuario
**Endpoint:**  `GET /api/auth/renew` 
**Headers:** 
- `x-token` (str): JWT del usuario.

**Respuesta Exitosa:** 
```json
status 200
{
  "ok":  true,
  "user":  {
	"token": "03h49gh403gh348ghq0h9qg40ghq48990q4g0489qhg0h49qgq4809gghq40qh98g4h0894qg0qh49ghgq0h90h9g4",
	"name":  "user Demo",
	"email":  "userDemo@gmail.com",
	"basket":  {
	  "products":  [
		{
		  "name":  "Pantalla Samsumg J6 Plus Original",
		  "thumbnail":  "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689751335/GeekMobile-display-samsumgJ6-J610.webp",
		  "value":  234,
		  "quantity":  1,
		  "stock":  99998,
		  "description":  "La Pantalla Samsung J6+ 2018 J610",
		  "category":  "COMPONENTS",
		  "id_product":  "2h38f278fh02fh20",
		  "id":  "2f93h0293fh02323f"
		}
	  ]
	},
	"pucharses":  []
  }
}
```
 **Respuesta de Error:**
Si no se envia el `x-token` en los header
```json
status 400
{
  "ok":  false,
  "msg":  "x-token token is missing"
}
```
Si se envía el `x-token` y es invalido
```json
status 400
{
  "ok":  false,
  "msg":  "Invalid token"
}
```
## Consultas del Usuario

### Consideraciones

Para este conjunto de EndPoints se requieren los siguientes parámetros:
**Headers:** 
- `x-token` (str): JWT del usuario.

Si no se envían fallara la petición y regresara los siguientes errores:

 **Respuesta de Error:**
Si no se envia el `x-token` en los header
```json
status 400
{
  "ok":  false,
  "msg":  "x-token token is missing"
}
```
Si se envía el `x-token` y es invalido
```json
status 400
{
  "ok":  false,
  "msg":  "Invalid token"
}
```

 ### Actualizar el carrito del usuario

**Endpoint:**  `PUT /api/user/update/basket` 
**Body:**
```json
{
  "newBasket": [
    {  
      "name":  "Pantalla Samsumg J6 Plus Original", 
	  "thumbnail":  "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689751335/GeekMobile-display-samsumgJ6-J610.webp",  
	  "value":  234,  
	  "quantity":  1,  
	  "stock":  99998,  
	  "description":  "La Pantalla Samsung J6+ 2018 J610",  
	  "category":  "COMPONENTS",  
      "id_product":  "2h38f278fh02fh20",  
	  "id":  "2f93h0293fh02323f"  
	}
  ]
}
```
**Respuesta Exitosa:** 
```json
status 200
{
  "ok": true,
  "user": {
	"products": [
	  {  
		"name":  "Pantalla Samsumg J6 Plus Original", 
	    "thumbnail":  "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689751335/GeekMobile-display-samsumgJ6-J610.webp",  
		"value":  234,  
		"quantity":  2,  
		"stock":  99998,  
		"description":  "La Pantalla Samsung J6+ 2018 J610",  
		"category":  "COMPONENTS",  
		"id_product":  "2h38f278fh02fh20",  
		"id":  "2f93h0293fh02323f"  
	  }
	]
  }
}
```
 **Respuesta de Error:**
Si no se envia `newBasket` o si no es de tipo array
```json
status 400
{
  "ok":  false,
  "errors":  {
	"newBasket":  {
	  "msg":  "newBasket cannot be empty",
	  "location":  "body",
	  "value":  "newBasket"
    }
  }
}
```
 ### Añadir al carrito del usuario un producto

**Endpoint:**  `PUT /api/user/update/add` 
**Body:**
```json
{
  "id": "2h09gh209g3h209g2390"
}
```

**Respuesta Exitosa:** 
```json
status 200
{
  "ok":  true,
  "user":  {
	"products":  [
      {
        "name": "Pantalla Samsumg J6 Plus Original",
		"thumbnail": "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689751335/GeekMobile-display-samsumgJ6-J610.webp",
		"value": 234,
		"quantity": 1,
		"stock": 99998,
		"description": "La Pantalla Samsung J6+",
		"category": "COMPONENTS",
		"id_product": "2h09gh209g3h209g2390",
		"id": "390f3490f3049f3434"
	  },
	  {
	    "name":  "Pantalla LCD para Samsung Galaxy A02s SM-A025G",
		"thumbnail":  "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689800333/grid_landscape_ptqhse.webp",
		"value": 342,
		"quantity": 1,
		"stock":  99999,
		"description":  "La pantalla LCD de repuesto para Samsung Galaxy A02s SM-A025G SM-A025M",
		"category":  "COMPONENTS",
		"id_product":  "3f9340f439f34f3f3",
		"id":  "f3n4n349fn03499f4"
	  }
	]
  }
}
```
 **Respuesta de Error:**
Si no se encuentra un producto valído con el `id`
```json
status 404
{
  "ok":  false,
  "msg":  "There is no product with the provided id"
}
```
 **Respuesta de Error:**
Si el `id` es invalido
```json
status 400
{
  "ok":  false,
  "errors":  {
    "id":  {
      "msg":  "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer",
      "location":  "body",
      "value":  "id"
    }
  }
}
```
 ### Consultar una orden de compra

**Endpoint:**  `GET /api/user/consult/order` 
**Query:** 
- `orderId` (str): Id de la orden de compra.

**Respuesta Exitosa:** 
```json
status 200
{
  "address":{
	"firstName":"test",
	"lastName":"demo",
	"address1":"VICENTE asdf",	
	"phoneNumber":"5623232323",
	"countryRegion":"Mexico",
	"zip":"09420",
	"state":"Ciudad de Mexico",
	"locality":"Iztapalapa",
	"sublocality":"ofaesla"
  },
  "delivery":{
    "status":"PROGRESS",
    "date":"Thu Aug 31 2023 00:22:48 GMT-0500 (hora de verano central)"
  },
  "amount":923.46,
  "dateShop":"2023-07-19T07:42:09.582+00:00",
  "id":"2fj9398f2098fh2398fhf3h90",
  "products":[
    {
      "name":"Micrófonos Compatibles Con Galaxy S10 /s10 Edge /s10 Plus",
      "thumbnail":"https://res.cloudinary.com/dsnsomt1k/image/upload/v1689804793/GeekMobile-display-components-samsumg-microfono.webp",
	  "quantity":1,
	  "value":234,
	  "description":"Los micrófonos compatibles con Galaxy S10",
	  "category":"COMPONENTS",
	  "id_product":"34fh03f9hf039hf0"
	},
	{
	  "name":"Display Samsumg A04 | Pantalla Smg A04 Calidad Original",
	  "thumbnail":"https://res.cloudinary.com/dsnsomt1k/image/upload/v1689800732/GeekMoible-display-components-samsumg-A04.webp",
	  "quantity":2,
	  "value":324,
	  "description":"El Display Samsung A04 es una pantalla de calidad original diseñada",
	  "category":"COMPONENTS",
	  "id_product":"2f9h293fh0239f2f903h"
	}
  ]
}
```

**Respuesta de Error:**
Si no se encuentra una orden con el `orderId` proporcionado
```json
status 404
{
  "ok":  false,
  "msg":  "No order found"
}
```
 **Respuesta de Error:**
Si el usuario no esta autorizado para leer la orden de compra
```json
status 403
{
  "ok": false,
  "msg": "You are not authorized to read the transaction"
}
```
## Administrar Productos
### Consideraciones

Para este conjunto de EndPoints se requieren los siguientes parámetros:
**Headers:** 
- `Authorization` (str): JWT del Administrador.

Si no se envían fallara la petición y regresara los siguientes errores:

 **Respuestas de Error:**
Si no se envia `Authorization` en los header
```json
status 401
{
  "ok":  false,
  "msg":  "Authorization token is missing"
}
```
Si se envía el `Authorization` y es invalido
```json
status 401
{
  "ok":  false,
  "msg":  "Invalid token Authorization"
}
```

 ### Crear un nuevo producto

**Endpoint:**  `POST /api/admin/products` 
**Body:**
```json
{
  "name":  "Smartphone Samsung Galaxy A14 6.6” Dual SIM, 128GB, 4GB RAM, Plata",
  "description":  "El Smartphone Samsung Galaxy A14",
  "thumbnail":  "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689820569/GeekMobile-devices-phone-Samsumg-Galaxy-A14.webp",
  "value":  2342,
  "category":  "DEVICES",
  "keywords":  ["Telefono",  "Dispositivo",  "Samsung",  "Galaxy",  "A14",  "128GB",  "Azul Plata",  "4GB"],
  "stock":  2
}
```

**Respuesta Exitosa:** 
```json
status 201
{
  "ok": true,
  "data": {
    "msg": "The product was successfully saved",
    "name": "Smartphone Samsung Galaxy A14 6.6” Dual SIM, 128GB, 4GB RAM, Plata",
	"id": "4h3f3fh43uhfi4u3hfi43hif4h3ifh43"
  }
}
```
**Respuesta de Error:**
Si alguna propiedad no esta presente
```json
status 400
{
  "ok":  false,
  "errors":  {
	"name":  {
	  "msg":  "The name is required",
	  "location":  "body",
	  "value":  "name"
    },
    "description":  {
	  "msg":  "The description is required and must have a minimum of 6 characters",
	  "location":  "body",
	  "value":  "description"
    },
    "thumbnail":  {
	  "msg":  "the thumbnail must be a URL",
	  "location":  "body",
	  "value":  "thumbnail"
    },
	  "value":  {
	    "msg":  "The value is required and must be of type number",
	    "location":  "body",
	    "value":  "value"
    },
	"category":  {
	  "msg":  "The category does not exist",
	  "location":  "body",
	  "value":  "category"
    },
	"stock":  {
	  "msg":  "Stock is required and must be of type Number",
	  "location":  "body",
	  "value":  "stock"
	}
  }
}
```
 ### Eliminar un producto
**Endpoint:**  `DELETE /api/admin/products` 
**Query:** 
- `id` (str): id del producto.

**Respuesta Exitosa:** 
```json
status 200
{
  "ok": true,
  "msg": "The product was successfully removed"
}
```
 **Respuesta de Error:**
Si el `id` proporcionado no coincide con el de un producto
```json
status 404
{
  "ok": false,
  "msg": "There is no product with the provided id"
}
```

 ### Actualizar un producto

**Endpoint:**  `PATCH /api/admin/products` 
**Query:** - `query` (str): Sentencia para buscar productos.

**Respuesta Exitosa:** 
```json
{
  "ok":  true,
  "data":  {
    "product":  {
      "name":  "Cambio de pantalla Telefonos Motorola gama media",
      "description":  "Nuestro servicio de cambio de pantalla para teléfonos Motorola de gama media",
      "thumbnail":  "https://res.cloudinary.com/dsnsomt1k/image/upload/v1689808304/GeekMobile-repairs-2.webp",
	  "value":  720.02,
	  "category":  "REPAIRS",
	  "keywords":  [
	    "Telefono",
	    "Motorola",
		"Reparacio",
		"Pantalla",
		"Reemplazo",
		"Display"
	  ],
	  "stock":  100000,
	  "id":  "64b88c01bb236bd6fe39b20a"
    }
  }
}
```
**Respuesta de Error:**
Si el `id` proporcionado no coincide con el de un producto
```json
status 404
{
  "ok": false,
  "msg": "There is no product with the provided id"
}
```
## Autenticación del Administrador
### Consideraciones

Para este conjunto de EndPoints se requieren los siguientes parámetros:
**Headers:** 
- `Authorization` (str): Token estatico de Administradores.

Si no se envían fallara la petición y regresara los siguientes errores:

 **Respuesta de Error:**
Si no se envia `Authorization` en los header
```json
status 401
{
  "ok":  false,
  "msg":  "Authorization token is missing"
}
```
Si se envía el `Authorization` y es invalido
```json
status 401
{
  "ok":  false,
  "msg":  "Invalid token Authorization"
}
```
 ### Iniciar sesión

**Endpoint:**  `POST /api/admin/auth` 
**Body:**
```json
{
  "email":  "userAdmin@gmail.com",
  "password":  "28f3239f"
}
```
**Respuesta Exitosa:** 
```json
status 200
{
  "ok": true,
  "user": {
    "name": "user Admin",
    "token": "29nf293fn2092f393f2"
  }
}
```
 **Respuesta de Error:**
Si el `email` no esta registrado
```json
status 400
{
  "ok": false,
  "msg": "The user does not exist with that email"
}
```
 **Respuesta de Error:**
Si la contraseña es invalida
```json
status 400
{
  "ok": false,
  "msg": "Wrong password"
}
```
 ### Crear una cuenta

**Endpoint:**  `POST /api/admin/auth` 
**Body:**
```json
{
  "name":  "admin",
  "email":  "admin@gmail.com",
  "password":  "3490h8f3293fh"
}
```
**Respuesta Exitosa:** 
```json
status 200
{
  "ok": true,
  "user": {
    "uid": "2fh90f38h209ff9032h",
    "name": "admin",
    "token": "29nf293fn2092f393f234ng094gb0349g3499ung3490g349g349n0g34g3490g349g34909g298g"
  }
}
```
 **Respuesta de Error:**
Si un usuario ya existe con ese correo
```json
status 400
{
  "ok":  false,
  "msg":  "The user already exists with that email"
}
```

## Gestión del Administrador
### Consideraciones

Para este conjunto de EndPoints se requieren los siguientes parámetros:
**Headers:** 
- `Authorization` (str): JWT del Administrador.

Si no se envían fallara la petición y regresara los siguientes errores:

 **Respuesta de Error:**
Si no se envia `Authorization` en los header
```json
status 401
{
  "ok":  false,
  "msg":  "Authorization token is missing"
}
```
Si se envía el `Authorization` y es invalido
```json
status 401
{
  "ok":  false,
  "msg":  "Invalid token Authorization"
}
```
 ### Eliminar la cuenta de un usuario

**Endpoint:**  `DELTE /api/admin/delete/user` 
**Body:**
```json
{
  "email":  "userDemo@gmail.com"
}
```
**Respuesta Exitosa:** 
```json
status 200
{
  "ok": true,
  "msg": "The user was deleted successfully"
}
```
 **Respuesta de Error:**
Si no se envia `Authorization` en los header
```json
status 404
{
  "ok": false,
  "msg": "The user does not exist with that email"
}
```
 
