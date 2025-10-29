# RANKING_SYSTEM_BACKEND
![alt text](diagrama.png)

erDiagram

    USUARIOS {
        ObjectId _id
        String nombre
        String email
        String contrasena_hash
        String rol
        Date fecha_registro
    }

    RESTAURANTES {
        ObjectId _id
        String nombre
        String descripcion
        ObjectId categoria_id
        String ubicacion
        String imagen_url
        Boolean aprobado
        Date fecha_creacion
    }

    PLATOS {
        ObjectId _id
        String nombre
        String descripcion
        ObjectId restaurante_id
        ObjectId categoria_id
        String imagen_url
        String tipo
        Date fecha_creacion
    }

    BEBIDAS {
        ObjectId _id
        ObjectId plato_id
        Number volumen_ml
        Boolean alcoholica
        String temperatura_servicio
    }

    CATEGORIAS {
        ObjectId _id
        String nombre
        String tipo
    }

    RESENAS {
        ObjectId _id
        ObjectId usuario_id
        ObjectId restaurante_id
        String comentario
        Number calificacion
        Date fecha
    }

    INTERACCIONES {
        ObjectId _id
        ObjectId resena_id
        ObjectId usuario_id
        String tipo
        Date fecha
    }

    RANKINGS {
        ObjectId _id
        ObjectId restaurante_id
        Number promedio_calificacion
        Number total_likes
        Number total_dislikes
        Date fecha_actualizacion
    }

    %% RELACIONES ENTRE COLECCIONES
    PLATOS }o--|| RESTAURANTES : "pertenece a"
    PLATOS }o--|| CATEGORIAS : "clasificado en"
    BEBIDAS ||--|| PLATOS : "referencia (tipo=bebida)"
    RESENAS }o--|| USUARIOS : "escrita por"
    RESENAS }o--|| RESTAURANTES : "sobre"
    INTERACCIONES }o--|| RESENAS : "afecta"
    INTERACCIONES }o--|| USUARIOS : "realizada por"
    RANKINGS }o--|| RESTAURANTES : "califica"
