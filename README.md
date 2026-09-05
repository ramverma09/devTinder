npm init

use this command for node_modules with the dependencies use in project:
npm install

install expressjs
   npm i express

for run app :
   node src/app.js

install this for auto refresh server when do changes:
sudo npm i -g nodemon

for run app :
   nodemon src/app.js

   
   add this in package.json
"scripts": {
    "start": "node src/app.js",   --> npm run start
    "dev": "nodemon src/app.js".  ---> npm run dev
  }