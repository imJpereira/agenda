//CSRF
//VERIFICA ERRO
exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
       return res.render('404');
    }

    next();
};

//GERA TOKEN
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}