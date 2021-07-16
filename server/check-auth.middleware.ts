import { Request, Response } from 'express';

module.exports = ((error: any, request: Request, response: Response, next: any) => {
  if (error && error.name === 'UnauthorizedError') {
    response.status(error.status).json({message: error.message});
    console.log(`${error.name}:`, error.message);
  } else {
    next();
  }
});
