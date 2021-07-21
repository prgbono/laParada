## Run mongo locally:

Desde la carpeta frios/mongodb-macos-x86_64-X.X.X <br/>
<code>bin/mongod --dbpath ./data/db</code>
Mongo AWS shell:
mongo --authenticationDatabase "laparada" -u "lpUserDB" -p pass (macpass)

## CX AWS

<code>ssh -i KC_practica.pem ubuntu@54.221.34.150 desde la carpeta del proyecto</code>

## Deploy LaParada React app (FE) to AWS steps:

Usuario en AWS Server -> react, con $HOME /home/react

1. Desde frontend folder, hago el build <code>npm run build</code>
2. Desde frontend folder, subo el build al server AWS <code>scp -r -i ../KC_practica.pem build ubuntu@54.173.23.143:/home/ubuntu</code>
3. En AWS server, desde /home/ubuntu (todos los pasos siguientes desde esta ubicación) muevo el build a la carpeta del usuario react <code>sudo mv build/ /home/react/laparada</code>
4. Cambio la propiedad al usuario react <code>sudo chown -R react:react /home/react/laParadaBuild</code>
5. Creo archivo nginx para la app <code>sudo nano /etc/nginx/sites-available/laparada</code>
6. Creo enlace directo nginx para la app <code>sudo ln -s /etc/nginx/sites-available/laparada /etc/nginx/sites-enabled/laparada</code>
7. <code>cat /etc/nginx/sites-enabled/laparada</code> COMPROBAR QUE SE HA GENERADO EL ACCESO DIRECTOR
8. <code>sudo nginx -t</code>
9. <code>sudo systemctl reload nginx</code>

No funciona porque hay que añadir la ruta root /home/react/laparada; al archivo /etc/nginx/default!!!! Tras esto OK!

## Deploy LaParada React app (BE) to AWS steps:

Usuario en AWS Server -> node, con $HOME /home/node

1. Siendo usuario ubuntu, suplanto al usuario node <code>sudo -u node -i</code>
2. Me aseguro de la versión de nvm y node <code>nvm --version</code> (0.38.0 a 17/7/2021) y <code>node --version</code> (14.17.0 a 17/7/2021)
3. Descargo el código en la carpeta raíz del usuario node con <code>git clone https://github.com/prgbono/laParada.git</code>. pacoriosgalan@gmail.com / La password aquí es el token de GitHub (ver macpass)
4. <code>npm install</code>
5. <code>npm start</code> Tendremos el back corriendo en la dirección IP_AWS:5000
6. logout del usuario node
7. Con el usuario ubuntu crear el archivo de configuración de la app para supervisor <code>sudo nano /etc/supervisor/conf.d/laParadaBE.conf</code>
8. <code>sudo systemctl reload supervisor</code>
9. El archivo anterior levanta la app Node. No hay archivo supervisor para el FE, pero he comprobado que reiniciado el server AWS el FE, que está corriendo en el 3000, no deja de funcioanar. Entiendo que esto es porque en el archivo de nginx /etc/nginx/sites-available/laparadaBE tenemos la propiedad proxy_pass que pasa las peticiones al puerto 3000.

## Configuración BBDD en AWS_Server

    https://ianlondon.github.io/blog/mongodb-auth/
    Además de los pasos anteriores he tenido que modificar la propiedad bindId del archivo de configuración de mongo /etc/mongod.conf del valor 127.0.0.1 al valor 0.0.0.0  para permitir conexiones remotas y no sólo desde localhost
