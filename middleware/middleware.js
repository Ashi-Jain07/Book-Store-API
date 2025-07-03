import jwt from 'jsonwebtoken';

//Log all incoming requests with method and path
export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};


//Authenticate JWT tokens and attach user info to the request.
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

//Handle 404 error
export const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};

//Handle general errors 
export const errorHandler = (err, req, res, next) => {
  res.status(500).json({ message: err.message });
};