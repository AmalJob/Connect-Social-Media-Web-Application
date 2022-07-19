const Jwt = require("jsonwebtoken");

function verifyToken(req,res, next) {
  console.log("hi");
  let authHeader = req.headers["auth-token"];
  console.log(req.headers);
  console.log(authHeader);
  if (authHeader == undefined) {
    res.status(401).send({ erorr: "no token provided" });
  }
  let token = authHeader;
  console.log(token,"hhhhh");
  Jwt.verify(token, process.env.JWT_SECRET, (err,res) => {
    if (err) {
    //  res.status(500).send("Authentication Failed")
    console.log("failed",err);
    } else {
      next();
    }
  });     
}
module.exports = { verifyToken };