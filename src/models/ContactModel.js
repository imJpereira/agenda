const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false, default: '' },
    email: { type: String, required: false },
    tel: { type: String, required: false },
    date: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contact', ContactSchema);
 
class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async create() {
        this.validate()
        if (this.errors.length > 0) return;

        this.contact = await ContactModel.create(this.body);
    }

    async edit(id) {
        if (typeof id !== 'string') return;
        this.validate();
        if(this.errors.length > 0) return;

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    validate() {
        this.cleanUp();
        
        if (!this.body.name) this.errors.push('O contato precisa ter um nome');
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido'); 
        if (!this.body.email && !this.body.tel) this.errors.push('O contato precisa ter um Email ou um número');
        
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }

            this.body = {
                name: this.body.name,
                surname: this.body.surname,
                email: this.body.email,
                tel: this.body.tel
            }
        }
    }

    //MÉTODOS ESTÁTICOS
    
    static async searchID(id) {
        if (typeof id !== 'string') return;
        return await ContactModel.findById(id);
    }

    static async searchContacts() {
        const contact = await ContactModel.find()
        .sort({ date: -1 });
        return contact
    }

    static async delete(id) {
        if (typeof id !== 'string') return;
        const contact = ContactModel.findByIdAndDelete({ _id: id });
        return contact;
    }

}

module.exports = Contact;