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

    static async searchID(id) {
        if (typeof id !== 'string') return;
        return await ContactModel.findById(id);
    }

    async register() {
        this.validate()
        if (this.errors.length > 0) return;

        this.contact = await ContactModel.create(this.body);
    }

    validate() {
        this.cleanUp();
        
        if (!this.body.name) this.errors.push('O contato precisa ter um nome');
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido'); 
        if (!this.body.email && !this.body.tel) this.errors.push('O contato precisa ter um email ou um número');
        
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
}

module.exports = Contact;