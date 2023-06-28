export  function isUser(req, res, next) {
    if (req.session?.user.email) {
      return next();
    }
    return res.status(401).render('error', { error: 'Authentication error, please try again' });
  }
  
export function isAdmin(req, res, next) {
    if (req.session.user.rol === "admin") {
      return next();
    }
    return res.status(403).render('error', { error: 'You have no access, authorization is required' });
  }


export function goToLogin(req, res, next){
  if (req.session?.user.email) {
    return next();
  }
  return res.status(401).render('login', { });
}