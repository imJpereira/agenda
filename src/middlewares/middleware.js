//GLOBAL
exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

//CSRF
//VERIFICA ERRO
exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        console.log(err);
       return res.render('404');
    }

    next();
};

//GERA TOKEN
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}