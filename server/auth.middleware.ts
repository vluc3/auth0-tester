const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = jwt({
  algorithms: ['RS256'],
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    cacheMaxEntries: 5,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: 'https://hoopiz-demo.eu.auth0.com/.well-known/jwks.json'
  })
});
