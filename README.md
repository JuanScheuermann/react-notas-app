# react-notas-app
Una aplicacion que te permite crear, modificar, eliminar notas y agregarle imagenes a las mismas.
Tambien nos permite crearnos un usuario y autenticarnos con Google.

Para este proyecto utilize:
React
Firebase como base de datos y para autenticacion de usuarios
Cloudinary para alojar las imagenes
Material UI para el layout

Pasos:
Primero se deben crear una cuenta y un proyecto en firebase, una vez echo ir a la carpeta src/firebase/config.js y 
agregar la configuracion de tu proyecto.

Crear una cuenta en cloudinary para poder alojar las imagenes, luego copiar el cloud name proporcionado por cloudinary,
ir a la carpeta src/helpers/fileUpload.js y en la variable 'cloudUrl' cambiar en el string 'tu_cloud_name' por el 
cloud name que copiaste.

luego instalar todas las depencias con el comando:
npm i

para iniciar el proyecto utiliza el comando: 
npm run dev

