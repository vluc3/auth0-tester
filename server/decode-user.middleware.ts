const jsonWebToken = require('jsonwebtoken');

import { Response } from 'express';

import { User } from '../shared/user.model';

module.exports = ((request: any, response: Response, next: any) => {
  try {
    const token: string = request.headers.authorization.split(' ')[1];
    const decodedToken: any = jsonWebToken.decode(token, {complete: true});

    const companyIds: string[] = getUserMetadata(decodedToken)?.companyIds;

    const user: User = {
      id: decodedToken.payload.sub,
      email: decodedToken.payload.email,
      name: decodedToken.payload.name,
      companyIds: companyIds || []
    };

    request.token = request.headers.authorization;
    request.user = user;
    next();
  } catch (error) {
    response.status(401).send({message: 'Error while decoding user'});
  }
});

function getUserMetadata(decodedToken: any) {
  try {
    return decodedToken.payload['https://user_metadata/user_authorization'];
  } catch (error) {
    return null;
  }
}
