import JWT from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    console.log("token",token)
  
    if (!token){
        return res.status(401).send("Unauthorized")
        }
        
  
    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).send("Forbidden")
      
  
      req.user = user;
      next();
    });
  };