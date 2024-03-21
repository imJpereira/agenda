//CSRF
//VERIFICA ERRO
exports.checkCsrfError = (err, req, res, next) => {
    if (err && err.code == 'EBADCSRFTOKEN') {
       return res.render('404');
    }
};

//GERA TOKEN
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}