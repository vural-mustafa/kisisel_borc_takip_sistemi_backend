const jwt = require("jsonwebtoken");


const checkToAuth = (req, res, next) => {
   if (req.headers["authentication"]) {
      //  console.log(req.headers["authentication"], process.env.JWT_SECRET);
       const decoded = jwt.verify(req.headers["authentication"], process.env.JWT_SECRET);
      if (decoded) {
         req.user = decoded.user;
         next();
      } else {
         res.status(403).json({
				message: "Bu işlemi yapabilmek için giriş yapmanız gerekiyor.",
			});
      }
   } else {
      res.status(403).json({
         message: "Bu işlemi yapabilmek için giriş yapmanız gerekiyor.",
      });
   }
};

module.exports= checkToAuth;