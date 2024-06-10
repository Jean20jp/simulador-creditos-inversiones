# Generador de Tablas de Amortización de Créditos e Inversiones

Este proyecto es una aplicación web desarrollada en HTML, CSS y JavaScript para el frontend, y PHP y MySQL para el backend. Permite a los usuarios generar tablas de amortización de créditos e inversiones. Incluye un sistema de inicio de sesión con roles diferenciados: administrador y usuario estándar.

## Características

- **Inicio de Sesión**: Sistema de autenticación para acceder a la aplicación.
- **Roles de Usuario**:
  - **Administrador**: Puede gestionar entidades financieras y los parámetros de cada tipo de crédito e inversión.
  - **Usuario Estándar**: Puede generar tablas de amortización utilizando los parámetros establecidos por el administrador.
- **Generación de Tablas de Amortización**: Calcula y muestra la tabla de amortización para créditos e inversiones basados en los parámetros proporcionados.

## Tecnologías Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP
- **Base de Datos**: MySQL

## Instalación

### Prerrequisitos

- Servidor web con soporte para PHP (Apache)
- MySQL
- Navegador web

### Pasos de Instalación

1. Clona el repositorio:
    ```sh
    https://github.com/jeanpgr/simulador-creditos-inversiones.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd simulador-creditos-inversione
    ```
3. Configura la base de datos:
    - Crea una base de datos en MySQL.
    - Importa el archivo `database.sql` en tu base de datos:
        ```sh
        mysql -u tu_usuario -p tu_base_de_datos < database.sql
        ```
4. Configura la conexión a la base de datos en el archivo `config/EnvironmentVariables.php`:
    ```php
    <?php
    private $DB_HOST = "localhost";
    private $DB_NAME = "simul_cred_invers_db";
    private $DB_USER = "root";
    private $DB_PASSWORD = "";
    ?>
    ```
5. Asegúrate de que el servidor web tenga permisos de escritura en el directorio donde se encuentra el proyecto.

6. Inicia tu servidor web y navega a la dirección donde está alojado el proyecto.

## Uso

1. **Inicio de Sesión**: Ingresa con tu nombre de usuario y contraseña.
2. **Administrador**:
   - Gestiona entidades financieras.
   - Establece parámetros para tipos de crédito e inversión.
3. **Usuario Estándar**:
   - Genera tablas de amortización utilizando los parámetros establecidos por el administrador.

## Contribuciones

Las contribuciones son bienvenidas. Puedes hacerlo de la siguiente manera:

1. Haz un fork del proyecto.
2. Crea una nueva rama:
    ```sh
    git checkout -b nueva-rama
    ```
3. Realiza tus cambios y haz commits:
    ```sh
    git commit -m "Descripción de los cambios"
    ```
4. Envía tus cambios al repositorio original:
    ```sh
    git push origin nueva-rama
    ```
5. Crea una Pull Request explicando tus cambios.

## Licencia

Este proyecto está bajo la Licencia MIT. Mira el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarnos a [jean_0720@hotmail.com](jeanpierre:jean_0720@hotmail.com).

---

¡Gracias por utilizar nuestra aplicación para generar tablas de amortización de créditos e inversiones!
