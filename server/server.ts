const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

import { Application, Request, Response } from 'express';

import { AuthController } from './auth.controller';

const auth = require('./auth.middleware');
const checkAuth = require('./check-auth.middleware');
const decodeUser = require('./decode-user.middleware');

const port = 3000;
const globalAuthentication = false;

const data = 'Here are data without authorization';
const authorizedData = 'Here are authorized data';

const authController = new AuthController();

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());

setRoutes();

const httpServer = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
  console.log('');
});

function setRoutes() {
  if (globalAuthentication) {
    app.use(auth);
    app.use(checkAuth);

    app.route('/api/get-user').get(
      decodeUser,
      authController.getUser
    );

    app.route('/api/data').get(getAuthorizedData);
    app.route('/api/authorized-data').get(getAuthorizedData);
  } else {
    app.route('/api/get-user').get(
      auth,
      checkAuth,
      decodeUser,
      authController.getUser
    );

    app.route('/api/data').get(getData);

    app.route('/api/authorized-data').get(
      auth,
      checkAuth,
      getAuthorizedData
    );
  }
}

function getData(request: Request, response: Response) {
  console.log(data);
  response.status(200).json({data});
}

function getAuthorizedData(request: Request, response: Response) {
  console.log(authorizedData);
  response.status(200).json({data: authorizedData});
}
