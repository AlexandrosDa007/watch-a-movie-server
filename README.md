## Watch a movie (Server)
![GitHub package.json version](https://img.shields.io/github/package-json/v/AlexandrosDa007/watch-a-movie-server?style=plastic)

An angular+electron application to use as a server for [watch-a-movie](https://github.com/AlexandrosDa007/watch-a-movie) (client)

Its created with the template of https://github.com/maximegris/angular-electron 👍 

It consist of an angular application for the front end
and an express server with electron to handle file system.

### How to use
```
git clone https://github.com/AlexandrosDa007/watch-a-movie-server.git
```
```
npm install
```
#### Run
```
npm start
```
#### Build
```
npm run electron:build
```

***

Bulding the application will create a release folder with a .msi installer. <br>
(You can change the target file in the electron-builder.json).<br>

The server creates a file 'watch-a-movie-server.json' in the appData of the user.<br>
This file keeps information for the movies (title, duration, videoPath, etc..).<br>

There is a UI for adding, deleting, editing movies. Any watch-a-movie [client](https://github.com/AlexandrosDa007/watch-a-movie)<br>
can request from this server and watch movies.<br>
If you want to see this client click the link above.<br>

***

_Disclaimer: This is intended as a LAN server and not for production._
