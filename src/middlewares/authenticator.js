export function isUser(req, res, next) {
    if (req.session?.email) {
      return next();
    }
    return res.status(401).render('error', { error: 'Authentication error, please try again' });
  }
  
export function isAdmin(req, res, next) {
    if (req.session?.rol === "admin") {
      return next();
    }
    return res.status(403).render('error', { error: 'You have no acces, authorization is required' });
  }

export function userData(req, res, next){
  
}