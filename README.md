# Audioguía Museo
Este proyecto es una aplicación web para ofrecer una experiencia de audioguía digital en un museo. La aplicación proporciona información detallada sobre las obras de arte disponibles en el museo, permitiendo a los usuarios navegar a través de una interfaz fácil de usar, consultar detalles sobre las piezas y acceder a contenido multimedia relacionado.

## Características
- Interfaz interactiva para explorar obras de arte del museo.
- Información detallada y multimedia asociada a cada obra de arte.
- Capacidad de integrar descripciones en formato de audio.
- Navegación intuitiva a través de una interfaz web moderna.
## Tecnologías Utilizadas
- React: Librería principal para la creación de la interfaz de usuario.
- Tailwind CSS: Utilizado para la estilización de la interfaz de manera eficiente.
- JavaScript: Para la lógica del frontend.
- Node.js y npm: Para la gestión del proyecto y sus dependencias.
- Vercel: Despliegue de la aplicación.
## Estructura del Proyecto
- `public/:` Contiene archivos estáticos como imágenes y otros recursos públicos.
- `src/:` Contiene todo el código fuente de la aplicación, incluidos los componentes React y lógica de la aplicación.
- `fetchArtworks.js`: Script que maneja la obtención de los datos de las obras de arte desde un backend o API.
- `tailwind.config.js`: Archivo de configuración para Tailwind CSS.
- `postcss.config.js`: Configuración para PostCSS utilizado en conjunto con Tailwind CSS.
## Requisitos
Para ejecutar este proyecto en tu entorno local, necesitarás tener instalados:

- Node.js (versión 14 o superior)
- npm (gestor de paquetes para Node.js)
## Instalación y Configuración
Sigue los siguientes pasos para ejecutar el proyecto en tu entorno local:

- Clona el repositorio:
```bash
Copiar código
git clone https://github.com/logaran/audioguia-museo.git
```
- Navega al directorio del proyecto:
```bash
Copiar código
cd audioguia-museo
```
- Instala las dependencias del proyecto:
```bash
Copiar código
npm install
```
## Scripts Disponibles
En el directorio del proyecto, puedes ejecutar los siguientes comandos:

- `npm start`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Crea una versión optimizada de la aplicación para producción.
- `npm test`: Ejecuta las pruebas de la aplicación.
## Despliegue
La aplicación está desplegada en Vercel. Para desplegar tu propia versión, sigue los pasos detallados en la documentación de Vercel. Después de crear el build de la aplicación con `npm run build`, simplemente sube la carpeta `build/` a tu servidor de elección.

## Contribución
Si deseas contribuir a este proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b nueva-funcionalidad`).
3. Realiza tus cambios y realiza un commit (`git commit -m 'Añadir nueva funcionalidad`').
4. Sube tus cambios a tu repositorio (`git push origin nueva-funcionalidad`).
5. Abre una solicitud de pull request para revisión.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Atribuciones
Las imágenes y el contenido multimedia utilizados en esta aplicación son cortesía del Museo Carmen Thyssen Málaga. El contenido está disponible para uso público bajo los términos especificados por el museo. Para más detalles, consulta [[terminos de uso Museo Carmen Thyssen Málaga].](https://www.carmenthyssenmalaga.org/advertencias-legales)


## Enlaces
- Aplicación en vivo: [Audioguía Museo en Vercel](https://audioguia-museo.vercel.app/)
- Repositorio en GitHub: [Audioguía museo](https://github.com/logaran/audioguia-museo)
