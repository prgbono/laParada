You can have a look in www.mariscoslaparada.es

## AWS instance connection command

<code>ssh [-p port] -i AWS_file.pem ubuntu@your_AWS_IP</code> from project folder

## Deploy React app (FE) to AWS, steps:

Steps from root folder of the user who will run the app in the server (root not recommended). We'll use /home/react for this guide:

1. From frontend folder <code>npm run build</code>
2. From frontend folder, upload the build just done to AWS server <code>scp -r -i AWS_file.pem build ubuntu@your_AWS_IP:/home/ubuntu</code>
3. From AWS server, all next steps from /home/ubuntu
   3.1 Remove previous build if exists <code>sudo rm -rf /home/react/build</code>.
   3.2 Move the build to react user home folder <code>sudo mv build/ /home/react/build</code>
4. Change the ownership of the build <code>sudo chown -R react:react /home/react/build</code>
5. Only 1st time - Create nginx configuration site <code>sudo nano /etc/nginx/sites-available/build</code>
6. Only 1st time - Createo direct nginx link <code>sudo ln -s /etc/nginx/sites-available/build /etc/nginx/sites-enabled/build</code>
7. Only 1st time - Check soft link has been created<code>cat /etc/nginx/sites-enabled/build</code>
8. Check nginx configuration <code>sudo nginx -t</code>
9. Reload nginx <code>sudo systemctl reload nginx</code>

Ensure path '_root /home/react/build_' is added to configuration nginx file _/etc/nginx/sites-available/default_

## Deploy Node app (BE) to AWS steps:

AWS user with node installed -> We'll use user '_node_' for this guide. **$HOME**: _/home/node_

1. Be _node_ user <code>sudo -u node -i</code>
2. Ensure _nvm_ and _node_ version are compatible with the App <code>nvm --version</code> and <code>node --version</code>
3. Clone (remove previous version if exists) repo <code>git clone https://your_repo_url.git</code>.
4. Move to the cloned folder and install dependencies <code>npm install</code>
5. Only 1st time - Create supervisor file <code>sudo nano /etc/supervisor/conf.d/laparadaBE.conf</code>
6. Añadir las variables de entorno necesarias en la propiedad environment. //TODO: Desarrollar este paso!!
7. Reload supervisor <code>sudo systemctl reload supervisor</code>
8. Check if any previous version is running on port 5000 <code>lsof -i:5000</code> and finish it <code>kill -9 PID</code>
9. Supervisor won't let this be sttopped. Stop supervisor. Being ubuntu user <code>exit</code> stop supervisor <code>sudo systemctl stop supervisor</code>
10. Being node user <code>sudo -u node -i</code> start the app <code>npm start</code> and exit node user <code>exit</code>
11. Start supervisor again <code>sudo systemctl start supervisor</code>, BE will be running on :5000
12. Supervisor will run Node app.
13. For a better security and performance is highly recommended increase MongoDB security by setting user and pass to the database. This credentials can be passes in supervisor config file or .env file
