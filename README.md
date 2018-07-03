### Portfolio

This fires up the development server on port `3000`.

The react app's entry point is `src/shared/App.js` and the express
server is started from `src/index.js`.

## License
MIT

## Contributing
If there are any ideas or optimizations to improve this template,
feel free to submit a pull request including your documented changes.

# Server Side  Rendering + Node / React / Redux / Mysql / Typeorm

- Set up index.js [Entry point], webpack-2 files for production and development environment
- Set up webpack hot reloader
- Set up mock components and routes (/index and /about)
- Set up express
- Set up route matching between express
- Set up Server side rendering for material ui / css
- Set up React-Router / React-Router-Redux to show different routes in browser url

This is a merge of frameworks in a only app

Install MYSQL 5.7:
For Mac:
https://dev.mysql.com/downloads/file/?id=476953

SQL excecute:

update user set password=PASSWORD("") where User='root';
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
create database portfolio;

npm i
