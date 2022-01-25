import * as jwt from "jsonwebtoken";
import * as jwksClient from "jwks-rsa";

const { AUTH0_CLIENT, AUTH0_DOMAIN } = process.env;

const client = jwksClient({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header: jwt.JwtHeader, cb: jwt.SigningKeyCallback) {
  try {
    client.getSigningKey(header.kid, function (err, key: any) {
      if (err) {
        cb(null, undefined);
      }
      var signingKey = key?.publicKey || key?.rsaPublicKey;

      cb(null, signingKey);
    });
  } catch (error) {
    cb(null, undefined);
  }
}

const options: jwt.VerifyOptions = {
  audience: AUTH0_CLIENT,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
};

export default async function isTokenValid(
  token?: string
): Promise<jwt.JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, options, (error, decoded) => {
      if (error) {
        reject({ error });
      }
      if (decoded) {
        resolve(decoded);
      }
    });
  });
}
