# Contrato de API — Práctico Final

> **Base URL:** `http://localhost:3000`  
> **Formato:** JSON en todos los cuerpos (`Content-Type: application/json`)  
> **Auth JWT:** header `Authorization: Bearer <token>`  
> **Auth Admin:** JWT + rol `admin`

---

## Convenciones

| Código | Significado |
|--------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |

---

## 1. Auth

### `POST /auth/register`

**Auth:** No  

**Request body:**

| Campo | Tipo | Reglas |
|-------|------|--------|
| email | string | email válido, requerido |
| password | string | mín. 8 caracteres, requerido |

```json
{
  "email": "user@mail.com",
  "password": "12345678"
}
```

**Response 201:**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@mail.com",
    "role": "user",
    "createdAt": "2026-06-07T21:00:00.000Z"
  },
  "access_token": "eyJhbGci..."
}
```

> ⚠️ El `verificationToken` generado internamente **no** se incluye en la respuesta.  
> El primer usuario registrado obtiene rol `admin`, los siguientes `user`.

---

### `POST /auth/login`

**Auth:** No  

**Request body:**

| Campo | Tipo | Reglas |
|-------|------|--------|
| email | string | requerido |
| password | string | requerido |

```json
{
  "email": "user@mail.com",
  "password": "12345678"
}
```

**Response 201:**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@mail.com",
    "role": "user",
    "createdAt": "2026-06-07T21:00:00.000Z"
  },
  "access_token": "eyJhbGci..."
}
```

**Response 401:**
```json
{ "message": "Credenciales inválidas" }
```

---

### `GET /auth/me`

**Auth:** JWT  

**Response 200:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@mail.com",
  "role": "user",
  "isVerified": false,
  "createdAt": "2026-06-07T21:00:00.000Z"
}
```

> El campo `isVerified` fue agregado según la sección 1.1 del práctico ("Modificar GET /auth/me — incluir isVerified en la response").

---

### `POST /auth/verify-email`

**Auth:** No  

**Request body:**

| Campo | Tipo | Reglas |
|-------|------|--------|
| token | string | requerido |

```json
{ "token": "uuid-token" }
```

**Response 200:**
```json
{ "message": "Email verificado" }
```
> El email enviado debe tener un link que apunte a `http://localhost:4200/verify-email?token=<token>`

**Response 400:**
```json
{ "message": "Token inválido o expirado" }
```

---

### `POST /auth/resend-verification`

**Auth:** JWT  

**Request body:** ninguno  

**Response 200:**
```json
{ "message": "Email reenviado" }
```

> El práctico solo dice generar nuevo token, guardarlo y reenviar el email, no especifica el body de respuesta.

---

### `POST /auth/forgot-password`

**Auth:** No  

**Request body:**

| Campo | Tipo | Reglas |
|-------|------|--------|
| email | string | email válido, requerido |

```json
{ "email": "user@mail.com" }
```

**Response 200:** *(siempre el mismo mensaje por seguridad)*
```json
{ "message": "Si el email existe, recibirás un link" }
```
El email enviado debe tener un link que apunte a `http://localhost:4200/reset-password?token=<token>`

---

### `POST /auth/reset-password`

**Auth:** No  

**Request body:**

| Campo | Tipo | Reglas |
|-------|------|--------|
| token | string | requerido |
| password | string | mín. 8 caracteres, requerido |

```json
{
  "token": "uuid-token",
  "password": "nuevaPass99"
}
```

**Response 200:**
```json
{ "message": "Contraseña actualizada" }
```

**Response 400:**
```json
{ "message": "Token inválido o expirado" }
```

---

## 2. Products

### `GET /products`

**Auth:** JWT  

**Query params (todos opcionales):**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| name | string | Filtro por nombre (búsqueda parcial) |
| sortBy | string | Campo de orden: `id` \| `name` \| `price` \| `stock` |
| order | string | Dirección: `ASC` \| `DESC` |
| page | number | Número de página (≥ 1) |
| limit | number | Elementos por página (1–100) |

**Response 200:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Producto Ejemplo",
      "price": 150.50,
      "stock": 10,
      "categoryId": 1,
      "category": { "id": 1, "name": "Electrónica" }
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

---

### `GET /products/:id`

**Auth:** JWT  

**Response 200:**
```json
{
  "id": 1,
  "name": "Producto Ejemplo",
  "price": 150.50,
  "stock": 10,
  "categoryId": 1,
  "category": { "id": 1, "name": "Electrónica" }
}
```

**Response 404:**
```json
{ "message": "Product not found" }
```

---

### `POST /products`

**Auth:** JWT + Admin  

**Request body:**

| Campo | Tipo | Reglas |
|-------|------|--------|
| name | string | máx. 256 caracteres, requerido |
| price | number | > 0, máx. 4 decimales, requerido |
| stock | number | entero ≥ 0, default `0`, opcional |
| categoryId | number \| null | opcional |

```json
{
  "name": "Teclado Mecánico",
  "price": 85.99,
  "stock": 25,
  "categoryId": 1
}
```

**Response 200:**
```json
{
  "id": 1,
  "name": "Producto Ejemplo",
  "price": 150.50,
  "stock": 10,
  "categoryId": 1,
  "category": { "id": 1, "name": "Electrónica" }
}
```

---

### `PUT /products/:id`

**Auth:** JWT + Admin  

**Request body:**

| Campo | Tipo | Reglas |
|-------|------|--------|
| name | string | máx. 256 caracteres, opcional |
| price | number | > 0, máx. 4 decimales, opcional |
| stock | number | entero ≥ 0, default `0`, opcional |
| categoryId | number \| null | opcional |

```json
{
  "price": 79.99,
  "stock": 30
}
```

**Response 200:**
```json
{
  "id": 1,
  "name": "Producto Ejemplo",
  "price": 150.50,
  "stock": 10,
  "categoryId": 1,
  "category": { "id": 1, "name": "Electrónica" }
}
```

**Response 404:**
```json
{ "message": "Product not found" }
```

---

### `DELETE /products/:id`

**Auth:** JWT + Admin  

**Response 200:**
```json
{
  "id": 1,
  "name": "Producto Ejemplo",
  "price": 150.50,
  "stock": 10,
  "categoryId": 1,
  "category": { "id": 1, "name": "Electrónica" }
}
```

**Response 404:**
```json
{ "message": "Product not found" }
```

---

## 3. Categories

### `GET /categories`

**Auth:** JWT  

**Response 200:**
```json
[
  { "id": 1, "name": "Electrónica" },
  { "id": 3, "name": "Hogar" },
  { "id": 2, "name": "Ropa" }
]
```

> Ordenadas alfabéticamente por nombre.

---

### `GET /categories/:id`

**Auth:** JWT  

**Response 200:**
```json
{ "id": 1, "name": "Electrónica" }
```

**Response 404:**
```json
{ "message": "Category not found" }
```

---

### `POST /categories`

**Auth:** JWT + Admin  

**Request body:**

| Campo | Tipo | Reglas |
|-------|------|--------|
| name | string | 1–128 caracteres, requerido |

```json
{ "name": "Deportes" }
```

**Response 201:**
```json
{ "id": 4, "name": "Deportes" }
```

**Response 409:**
```json
{ "message": "Category name already exists" }
```

---

### `PUT /categories/:id`

**Auth:** JWT + Admin  

**Request body:**
```json
{ "name": "Electrónica y Tecnología" }
```

**Response 200:**
```json
{ "id": 1, "name": "Electrónica y Tecnología" }
```

**Response 409:**
```json
{ "message": "Category name already exists" }
```

---

### `DELETE /categories/:id`

**Auth:** JWT + Admin  

**Response 200:** la categoría eliminada
```json
{ "id": 1, "name": "Electrónica y Tecnología" }
```

**Response 404:**
```json
{ "message": "Category not found" }
```

---

## 4. Users

### `GET /users`

**Auth:** JWT + Admin  

**Response 200:**
```json
[
  { "id": "uuid-1", "email": "admin@mail.com", "role": "admin", "createdAt": "..." },
  { "id": "uuid-2", "email": "user@mail.com",  "role": "user",  "createdAt": "..." }
]
```

---

### `PATCH /users/:id/role`

**Auth:** JWT + Admin  

**Restricciones:** no se puede cambiar el propio rol ni degradar al único admin restante.

**Request body:**

| Campo | Tipo | Valores |
|-------|------|---------|
| role | string | `"user"` \| `"admin"` |

```json
{ "role": "admin" }
```

**Response 200:** el usuario actualizado (mismo shape que `GET /users`)

**Response 403:**
```json
{ "message": "Cannot change your own role" }
```
```json
{ "message": "Cannot demote the only admin" }
```

---

### `PATCH /users/me/password`

**Auth:** JWT  

**Request body:**

| Campo | Tipo | Reglas |
|-------|------|--------|
| currentPassword | string | requerido |
| newPassword | string | mín. 8 caracteres, requerido |

```json
{
  "currentPassword": "12345678",
  "newPassword": "nuevaPass99"
}
```

**Response 200:**
```json
{ "message": "Password updated" }
```

**Response 400:**
```json
{ "message": "Contraseña actual incorrecta" }
```

> El práctico no especifica el texto de error.

---

### `PATCH /users/me/email`

**Auth:** JWT  

**Request body:**

| Campo | Tipo | Reglas |
|-------|------|--------|
| newEmail | string | email válido, requerido |
| password | string | requerido |

```json
{
  "newEmail": "nuevo@mail.com",
  "password": "12345678"
}
```

**Response 200:**
```json
{ "message": "Email updated" }
```

**Response 400:**
```json
{ "message": "Contraseña incorrecta" }
```

> El práctico no especifica el texto de error.

**Response 409:**
```json
{ "message": "Email ya registrado" }
```

> El práctico no especifica el texto de error.