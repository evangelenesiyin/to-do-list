import jwt from "jsonwebtoken";
import debugLib from "debug";

const debug = debugLib("procuratio:config:checkToken");

const checkToken = (req, res, next) => {
  let token = req.get("Authorization") || req.query.token;
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        debug("Invalid token: %o", err);
        return res.status(401).json({ error: "Unauthorized" });
      }
      debug("decoded user request header: %o", decoded);
      req.user = decoded.user;
      req.exp = new Date(decoded.exp * 1000);
      return next();
    });
  } else {
    req.user = null;
    return next();
  }
};

export default checkToken;
