To run the project insert your batabse credenctials in the env file and clone hin to just .env e config
insert a Servidor on the database and login 



## Script Description

1. **install**: This script is used to install dependencies required by the project. It typically runs npm install to ensure all necessary packages are installed.
```javascript
npm install
```

2. **test**: This script is used to run tests.

```javascript
npm run test
```

3. **test-w**: This script runs tests in watch mode, meaning it will continuously monitor your files and re-run the tests automatically. The NODE_ENV is set to test to ensure the testing environment is used.
```javascript
npm run test-w
```

4. **start**: his script starts the application using Electron, with the NODE_ENV set to prod, indicating a production environment.
```javascript
npm start
```

5. **dev**: This script starts the application in development mode using Electron, with the NODE_ENV set to dev, indicating a development environment.
```javascript
npm run dev
```

6. **dev:nodemon**: This script uses nodemon to watch for changes in the main.js file and automatically restart the application. This is useful for development, as it saves you from manually restarting the app after each change.
```javascript
npm run dev:nodemon
```
