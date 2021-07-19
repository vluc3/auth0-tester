const JSONdb = require('simple-json-db');
const axios = require('axios').default;

import { Response } from 'express';

import { User } from 'shared/user.model';

export class AuthController {

  private database = new JSONdb('./database.json');

  getUser = ((request: any, response: Response, next: any) => {
    const user: User = this.parseUser(this.database.get(request.user.id));

    if (JSON.stringify(request.user) !== JSON.stringify(user)) {
      this.database.set(request.user.id, JSON.stringify(request.user));
    }

    response.status(200).json(request.user);
  });

  private parseUser(user: string): User {
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  private getUserMetaData(userId: string, token: string) {
    const options = {
      method: 'GET',
      url: `http://hoopiz-demo.eu.auth0.com/api/v2/users/${userId}`,
      headers: {
        Accept: 'application/json',
        Authorization: token
      }
    };

    axios.request(options).then((response: any) => {
      console.log(response.data);
    }).catch((error: any) => {
      console.error(error);
    });
  }
}
