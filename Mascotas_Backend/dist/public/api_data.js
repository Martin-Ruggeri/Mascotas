define({ "api": [
  {
    "type": "post",
    "url": "/v1/image",
    "title": "Guardar Imagen",
    "name": "Guardar_Imagen",
    "group": "Imagen",
    "description": "<p>Guarda una imagen en la db</p>",
    "examples": [
      {
        "title": "Body",
        "content": "{\n  \"image\" : \"Base 64 Image Text\"\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n  \"id\": \"id de imagen\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/image/routes.ts",
    "groupTitle": "Imagen",
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/image/:id",
    "title": "Obtener Imagen",
    "name": "Obtener_Imagen",
    "group": "Imagen",
    "description": "<p>Obtiene una imagen</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "Base64",
            "description": "<p>image response</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/image/routes.ts",
    "groupTitle": "Imagen",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/lostPet/picture",
    "title": "Guardar Imagen de la Mascota perdida",
    "name": "Guardar_Imagen_de_la_Mascota",
    "group": "Mascota",
    "description": "<p>Guarda una imagen de perfil en la db y actualiza el perfil de la mascota perdida</p>",
    "examples": [
      {
        "title": "Body",
        "content": "{\n  \"image\" : \"Base 64 Image Text\"\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n  \"id\": \"id de imagen\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/lostPetImage/routes.ts",
    "groupTitle": "Mascota",
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/pet/:petId",
    "title": "Actualizar Mascota",
    "name": "Actualizar_Mascota",
    "group": "Mascotas",
    "description": "<p>Actualiza los datos de una mascota.</p>",
    "examples": [
      {
        "title": "Mascota",
        "content": "{\n  \"id\": \"Id de mascota\",\n  \"name\": \"Nombre de la mascota\",\n  \"description\": \"Description de la mascota\",\n  \"birthDate\": date (DD/MM/YYYY),\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "version": "0.0.0",
    "filename": "src/pet/routes.ts",
    "groupTitle": "Mascotas",
    "success": {
      "examples": [
        {
          "title": "Mascota",
          "content": "{\n  \"id\": \"Id de mascota\",\n  \"name\": \"Nombre de la mascota\",\n  \"description\": \"Descripción de la mascota\",\n  \"birthDate\": date (DD/MM/YYYY),\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/pet/:petId",
    "title": "Buscar Mascota",
    "name": "Buscar_Mascota",
    "group": "Mascotas",
    "description": "<p>Busca una mascota por id.</p>",
    "version": "0.0.0",
    "filename": "src/pet/routes.ts",
    "groupTitle": "Mascotas",
    "success": {
      "examples": [
        {
          "title": "Mascota",
          "content": "{\n  \"id\": \"Id de mascota\",\n  \"name\": \"Nombre de la mascota\",\n  \"description\": \"Descripción de la mascota\",\n  \"birthDate\": date (DD/MM/YYYY),\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/pet",
    "title": "Crear Mascota",
    "name": "Crear_Mascota",
    "group": "Mascotas",
    "description": "<p>Crea una mascota.</p>",
    "examples": [
      {
        "title": "Mascota",
        "content": "{\n  \"id\": \"Id mascota\"\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "version": "0.0.0",
    "filename": "src/pet/routes.ts",
    "groupTitle": "Mascotas",
    "success": {
      "examples": [
        {
          "title": "Mascota",
          "content": "{\n  \"id\": \"Id de mascota\",\n  \"name\": \"Nombre de la mascota\",\n  \"description\": \"Descripción de la mascota\",\n  \"birthDate\": date (DD/MM/YYYY),\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/v1/pet/:petId",
    "title": "Eliminar Mascota",
    "name": "Eliminar_Mascota",
    "group": "Mascotas",
    "description": "<p>Eliminar una mascota.</p>",
    "version": "0.0.0",
    "filename": "src/pet/routes.ts",
    "groupTitle": "Mascotas",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/pet",
    "title": "Listar Mascota",
    "name": "Listar_Mascota",
    "group": "Mascotas",
    "description": "<p>Obtiene un listado de las mascotas del usuario actual.</p>",
    "success": {
      "examples": [
        {
          "title": "Mascota",
          "content": "[\n  {\n    \"id\": \"Id de mascota\"\n    \"name\": \"Nombre de la mascota\",\n    \"description\": \"Descripción de la mascota\",\n    \"birthDate\": date (DD/MM/YYYY),\n  }, ...\n]",
          "type": "json"
        },
        {
          "title": "Response",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/pet/routes.ts",
    "groupTitle": "Mascotas",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/lostpet/:lostpetId",
    "title": "Actualizar Mascota Perdida",
    "name": "Actualizar_Mascota_Perdida",
    "group": "Mascotas_Perdida",
    "description": "<p>Actualiza los datos de una mascota perdida.</p>",
    "success": {
      "examples": [
        {
          "title": "Mascota Perdidas",
          "content": "{\n  name: \"Nombre de la mascota perdida\";\n  description: \"Descripcion de la mascota perdida\";\n  direction: \"Direccion donde se vio por ultima vez la mascota perdida\";\n  reward: \"Recompensa por la mascota perdida\";\n  phone: \"Celular para comunicarse en caso de encontrar la mascota perdida\";\n}",
          "type": "json"
        },
        {
          "title": "Mascota",
          "content": "{\n  \"id\": \"Id de mascota\",\n  \"name\": \"Nombre de la mascota\",\n  \"description\": \"Descripción de la mascota\",\n  \"birthDate\": date (DD/MM/YYYY),\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/lostPet/routes.ts",
    "groupTitle": "Mascotas_Perdida",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/lostpet/:lostPetId",
    "title": "Buscar Mascota Perdida",
    "name": "Buscar_Mascota_Perdida",
    "group": "Mascotas_Perdida",
    "description": "<p>Busca una mascota perdida por id.</p>",
    "version": "0.0.0",
    "filename": "src/lostPet/routes.ts",
    "groupTitle": "Mascotas_Perdida",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/v1/lostpet/:lostPetId\"",
    "title": "Eliminar Mascota Perdida",
    "name": "Eliminar_Mascota_Perdida",
    "group": "Mascotas_Perdida",
    "description": "<p>Eliminar una mascota perdida.</p>",
    "version": "0.0.0",
    "filename": "src/lostPet/routes.ts",
    "groupTitle": "Mascotas_Perdida",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/lostpet",
    "title": "Listar Mascota Perdidas",
    "name": "Listar_Mascota_Perdidas",
    "group": "Mascotas_Perdidas",
    "description": "<p>Obtiene un listado de las mascotas perdidas</p>",
    "success": {
      "examples": [
        {
          "title": "Mascota Perdidas",
          "content": "[\n  {\nname: \"Nombre de la mascota perdida\";\ndescription: \"Descripcion de la mascota perdida\";\ndirection: \"Direccion donde se vio por ultima vez la mascota perdida\";\nreward: \"Recompensa por la mascota perdida\";\nphone: \"Celular para comunicarse en caso de encontrar la mascota perdida\";\npet: \"Relacion entre la mascota y la mascota perdida\";\n}\n]",
          "type": "json"
        },
        {
          "title": "Response",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/lostPet/routes.ts",
    "groupTitle": "Mascotas_Perdidas",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/lostpet",
    "title": "Crear Mascota",
    "name": "Crear_Mascota_perdida",
    "group": "Mascotas_perdida",
    "description": "<p>Crea una mascota perdida.</p>",
    "examples": [
      {
        "title": "Mascota Perdida",
        "content": "{\n  \"id\": \"Id mascota\"\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "version": "0.0.0",
    "filename": "src/lostPet/routes.ts",
    "groupTitle": "Mascotas_perdida",
    "success": {
      "examples": [
        {
          "title": "Mascota",
          "content": "{\n  \"id\": \"Id de mascota\",\n  \"name\": \"Nombre de la mascota\",\n  \"description\": \"Descripción de la mascota\",\n  \"birthDate\": date (DD/MM/YYYY),\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/profile",
    "title": "Actualizar Perfil",
    "name": "Actualizar_Perfil",
    "group": "Perfil",
    "description": "<p>Actualiza los datos del perfil de usuario.</p>",
    "examples": [
      {
        "title": "Perfil",
        "content": "{\n  \"name\": \"Nombre y Apellido\",\n  \"phone\": \"Teléfono\",\n  \"email\": \"Email\",\n  \"address\": \"Dirección\",\n  \"province\": \"Id de provincia\",\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "version": "0.0.0",
    "filename": "src/profile/routes.ts",
    "groupTitle": "Perfil",
    "success": {
      "examples": [
        {
          "title": "Perfil",
          "content": "{\n  \"name\": \"Nombre y Apellido\",\n  \"phone\": \"Teléfono\",\n  \"email\": \"Email\",\n  \"address\": \"Dirección\",\n  \"picture\": \"Id de imagen\",\n  \"province\": \"Id de provincia\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/profile/picture",
    "title": "Guardar Imagen de Perfil",
    "name": "Guardar_Imagen_de_Perfil",
    "group": "Perfil",
    "description": "<p>Guarda una imagen de perfil en la db y actualiza el perfil</p>",
    "examples": [
      {
        "title": "Body",
        "content": "{\n  \"image\" : \"Base 64 Image Text\"\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n  \"id\": \"id de imagen\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/profileImage/routes.ts",
    "groupTitle": "Perfil",
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/profile",
    "title": "Obtener Perfil",
    "name": "Obtener_Perfil",
    "group": "Perfil",
    "version": "0.0.0",
    "filename": "src/profile/routes.ts",
    "groupTitle": "Perfil",
    "success": {
      "examples": [
        {
          "title": "Perfil",
          "content": "{\n  \"name\": \"Nombre y Apellido\",\n  \"phone\": \"Teléfono\",\n  \"email\": \"Email\",\n  \"address\": \"Dirección\",\n  \"picture\": \"Id de imagen\",\n  \"province\": \"Id de provincia\",\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/province/:provinceId",
    "title": "Buscar Provincia",
    "name": "Buscar_Provincia",
    "group": "Provincias",
    "description": "<p>Buscar una provincia.</p>",
    "success": {
      "examples": [
        {
          "title": "Provincia",
          "content": "{\n  \"name\": \"Nombre Provincia\",\n  \"id\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/provinces/routes.ts",
    "groupTitle": "Provincias",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/province",
    "title": "Crear Provincia",
    "name": "Crear_Provincia",
    "group": "Provincias",
    "description": "<p>Crea o actualiza una provincia.</p>",
    "examples": [
      {
        "title": "Provincia",
        "content": "{\n  \"name\": \"Nombre Provincia\",\n  \"enabled\": [true|false]\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Provincia",
          "content": "{\n  \"name\": \"Nombre Provincia\",\n  \"enabled\": [true|false]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/provinces/routes.ts",
    "groupTitle": "Provincias",
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/v1/province/:provinceId",
    "title": "Eliminar Provincia",
    "name": "Eliminar_Provincia",
    "group": "Provincias",
    "description": "<p>Elimina una provincia.</p>",
    "version": "0.0.0",
    "filename": "src/provinces/routes.ts",
    "groupTitle": "Provincias",
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/province",
    "title": "Listar Provincias",
    "name": "Listar_Provincias",
    "group": "Provincias",
    "description": "<p>Lista todas las provincias.</p>",
    "success": {
      "examples": [
        {
          "title": "Provincia",
          "content": "[ {\n   \"name\": \"Nombre Provincia\",\n   \"id\": \"\"\n  }, ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/provinces/routes.ts",
    "groupTitle": "Provincias",
    "error": {
      "examples": [
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/user/password",
    "title": "Cambiar Password",
    "name": "Cambiar_Password",
    "group": "Seguridad",
    "description": "<p>Cambia la contraseña del usuario actual.</p>",
    "examples": [
      {
        "title": "Body",
        "content": "{\n  \"currentPassword\" : \"{Contraseña actual}\",\n  \"newPassword\" : \"{Nueva Contraseña}\",\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/user/routes.ts",
    "groupTitle": "Seguridad",
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/users/:userId/disable",
    "title": "Deshabilitar Usuario",
    "name": "Deshabilitar_Usuario",
    "group": "Seguridad",
    "description": "<p>Deshabilita un usuario en el sistema.   El usuario logueado debe tener permisos &quot;admin&quot;.</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/user/routes.ts",
    "groupTitle": "Seguridad",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/users/:userId/enable",
    "title": "Habilitar Usuario",
    "name": "Habilitar_Usuario",
    "group": "Seguridad",
    "description": "<p>Habilita un usuario en el sistema. El usuario logueado debe tener permisos &quot;admin&quot;.</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/user/routes.ts",
    "groupTitle": "Seguridad",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/users",
    "title": "Lista de Usuarios",
    "name": "Lista_de_Usuarios",
    "group": "Seguridad",
    "description": "<p>Devuelve una lista de usuarios. El usuario logueado debe tener permisos &quot;admin&quot;.</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n[{\n   \"id\": \"{Id usuario}\",\n   \"name\": \"{Nombre del usuario}\",\n   \"login\": \"{Login de usuario}\",\n   \"permissions\": [\n       \"{Permission}\"\n   ],\n   \"enabled\": true|false\n  }, ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/user/routes.ts",
    "groupTitle": "Seguridad",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/users/signin",
    "title": "Login",
    "name": "Log_in",
    "group": "Seguridad",
    "description": "<p>Loguea un usuario en el sistema.</p>",
    "examples": [
      {
        "title": "Body",
        "content": "{\n  \"login\": \"{Login de usuario}\",\n  \"password\": \"{Contraseña}\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "src/user/routes.ts",
    "groupTitle": "Seguridad",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"{Token de autorización}\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/users/signout",
    "title": "Logout",
    "name": "Logout",
    "group": "Seguridad",
    "description": "<p>Desloguea un usuario en el sistema, invalida el token.</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/user/routes.ts",
    "groupTitle": "Seguridad",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/users/:userId/grant",
    "title": "Otorga Permisos",
    "name": "Otorga_Permisos",
    "group": "Seguridad",
    "description": "<p>Otorga permisos al usuario indicado, el usuario logueado tiene que tener permiso &quot;admin&quot;.</p>",
    "examples": [
      {
        "title": "Body",
        "content": "{\n  \"permissions\" : [\"{permiso}\", ...],\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/user/routes.ts",
    "groupTitle": "Seguridad",
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/users",
    "title": "Registrar Usuario",
    "name": "Registrar_Usuario",
    "group": "Seguridad",
    "description": "<p>Registra un nuevo usuario en el sistema.</p>",
    "examples": [
      {
        "title": "Body",
        "content": "{\n  \"name\": \"{Nombre de Usuario}\",\n  \"login\": \"{Login de usuario}\",\n  \"password\": \"{Contraseña}\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "src/user/routes.ts",
    "groupTitle": "Seguridad",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"{Token de autorización}\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/users/:userId/revoke",
    "title": "Revoca Permisos",
    "name": "Revoca_Permisos",
    "group": "Seguridad",
    "description": "<p>Quita permisos al usuario indicado, el usuario logueado tiene que tener permiso &quot;admin&quot;.</p>",
    "examples": [
      {
        "title": "Body",
        "content": "{\n  \"permissions\" : [\"{permiso}\", ...],\n}",
        "type": "json"
      },
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/user/routes.ts",
    "groupTitle": "Seguridad",
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"messages\" : [\n     {\n       \"path\" : \"{Nombre de la propiedad}\",\n       \"message\" : \"{Motivo del error}\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/users/current",
    "title": "Usuario Actual",
    "name": "Usuario_Actual",
    "group": "Seguridad",
    "description": "<p>Obtiene información del usuario actual.</p>",
    "success": {
      "examples": [
        {
          "title": "Respuesta",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": \"{Id usuario}\",\n   \"name\": \"{Nombre del usuario}\",\n   \"login\": \"{Login de usuario}\",\n   \"permissions\": [\n       \"{Permission}\"\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/user/routes.ts",
    "groupTitle": "Seguridad",
    "examples": [
      {
        "title": "Header Autorización",
        "content": "Authorization=bearer {token}",
        "type": "String"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "500 Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"error\" : \"Not Found\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
