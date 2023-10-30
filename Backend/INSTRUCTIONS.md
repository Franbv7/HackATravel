# Explicación de los endpoints 🟢🔵🟡🔴

Endpoint de búsqueda de recomendaciones:

Método: GET🟢
Ruta: /recomendaciones
Parámetros de consulta:
recomendaciones/lugar/:place (opcional): para buscar recomendaciones por lugar específico.
recomendaciones/categoria/:category (opcional): para buscar recomendaciones por categoría.
Respuesta: Devuelve una lista de recomendaciones que coinciden con los criterios de búsqueda.

Endpoint para ordenar recomendaciones por votos:

Método: GET🟢
Ruta: /recomendaciones/ordenar-por-votos
Respuesta: Devuelve una lista de recomendaciones ordenadas por la cantidad de votos.

Endpoint para ver detalle de una recomendación:

Método: GET🟢
Ruta: /recomendaciones/:idRec
Parámetros de ruta:
/:idRec - identificador único de la recomendación.
Respuesta: Devuelve la información detallada de la recomendación especificada por su ID.

Endpoint de autenticación (Login):

Método: POST🔵
Ruta: /usuarios/login
Cuerpo de la solicitud: JSON con los campos email y password.
Respuesta: Devuelve un token de autenticación para realizar acciones como usuario registrado.

Endpoint de registro de usuarios:

Método: POST🔵
Ruta: /usuarios
Cuerpo de la solicitud: JSON con los campos nombre, email, y password.
Respuesta: Devuelve un mensaje de confirmación de registro exitoso.

Endpoint para publicar recomendaciones:

Método: POST🔵
Ruta: /recomendaciones
Cuerpo de la solicitud: JSON con los campos titulo, categoría, lugar, entradilla, texto, y foto.
Encabezados de la solicitud: Debe incluir el token de autenticación del usuario registrado.
Respuesta: Devuelve una confirmación de que la recomendación ha sido publicada exitosamente.

Endpoint para votar recomendaciones:

Método: POST🔵
Ruta: /recomendaciones/:idRec/votar
Parámetros de ruta:
/:idRec/votar - identificador único de la recomendación a votar.
Encabezados de la solicitud: Debe incluir el token de autenticación del usuario registrado.
Respuesta: Devuelve una confirmación de que el voto ha sido registrado exitosamente.

Opcional - Endpoint para gestionar el perfil de usuario:

Método: PUT🟡
Ruta: /usuarios/:idUser
Cuerpo de la solicitud: JSON con los campos que el usuario desea actualizar (por ejemplo, nombre, email, password, foto de perfil).
Encabezados de la solicitud: Debe incluir el token de autenticación del usuario registrado.
Respuesta: Devuelve una confirmación de que la actualización del perfil se ha realizado con éxito.

Opcional - Endpoint para borrar recomendaciones propias.

Método: DELETE🔴
Ruta: /recomendaciones/:idRec
Parámetros de ruta:
/:idRec - identificador único de la recomendación a eliminar.
Encabezados de la solicitud: Debe incluir el token de autenticación del usuario registrado.
Respuesta: Devuelve una confirmación de que la recomendación ha sido eliminada correctamente.

Opcional - Endpoint para publicar comentarios en las recomendaciones:

Método: POST🔵
Ruta: /recomendaciones/:idRec/comentarios
Parámetros de ruta:
/:idRec/comentarios - identificador único de la recomendación a comentar.
Cuerpo de la solicitud: JSON con el campo texto para el contenido del comentario.
Encabezados de la solicitud: Debe incluir el token de autenticación del usuario registrado.
Respuesta: Devuelve una confirmación de que el comentario ha sido publicado correctamente.

Muchas gracias por pasar por aquí! 🤗
