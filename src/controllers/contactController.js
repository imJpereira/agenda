const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
    res.render('contato', {
        contact: {}
    });
}

exports.create = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.create();
        
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('/contato'));
            return;
        }
        
        req.flash('success', 'Contato criado com sucesso');
        req.session.save(() => res.redirect('/'));
    } catch (e) {
        console.log(e);
        res.render('404');
    }

};

exports.getIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contact = await Contact.searchID(req.params.id);
    if (!contact) return res.render('404');
    
    res.render('contato', { contact });
};

exports.editContact = async (req, res) => {
    if (!req.params.id) return res.render('404');
    
    try {
        const contact = new Contact(req.body);
        contact.edit(req.params.id); 

        if (contact.errors.length > 0) {
            req.flash('erros', contact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        } 

        req.flash('success', 'Contato editado com sucesso');
        req.session.save(() => res.redirect('/'))

    } catch (e) {
        res.render('404');
        console.log(e);
    }
}   

exports.delete = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        
        const contact = Contact.delete(req.params.id);
        if(!contact) return res.render('404');

        req.flash('success', 'Contato excluído');
        req.session.save(() => res.redirect('/'));
        return;

    } catch (e) {
        res.render('404');
        console.log(e);
    } 
};