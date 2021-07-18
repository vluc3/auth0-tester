const JSONdb = require('simple-json-db');

import { Response } from 'express';

import { User } from 'shared/user.model';

export class AuthController {

  private database = new JSONdb('./database.json');

  getUser = ((request: any, response: Response, next: any) => {
    const user: User = this.parseUser(this.database.get(request.user.id));

    if (! user || ! user.companyIds || user.companyIds.length === 0) {
      request.user.companyIds = ['DEFAULT-COMPANY'];
    } else {
      request.user.companyIds = user.companyIds;
    }

    this.database.set(request.user.id, JSON.stringify(request.user));
    response.status(200).json(request.user);
  });

  private parseUser(user: string): User {
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }
}
