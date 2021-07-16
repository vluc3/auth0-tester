const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = jwt({
  algorithms: ['RS256'],
  cache: true,
  cacheMaxEntries: 5,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  secret: jwksRsa.expressJwtSecret({
    jwksUri: 'https://hoopiz-demo.eu.auth0.com/.well-known/jwks.json'
  })
});
