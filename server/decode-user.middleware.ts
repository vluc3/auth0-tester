const jsonWebToken = require('jsonwebtoken');

import { Response } from 'express';

import { User } from '../shared/user.model';

module.exports = ((request: any, response: Response, next: any) => {
  try {
    const token: any = request.headers.authorization.split(' ')[1];
    const decodedToken = jsonWebToken.decode(token, {complete: true});

    const user: User = {
      id: decodedToken.payload.sub,
      email: decodedToken.payload.email,
      name: decodedToken.payload.name,
      companyIds: []
    };

    request.user = user;
    next();
  } catch (error) {
    response.status(401).send({message: 'Error while decoding user'});
  }
});
