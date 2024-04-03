import validator from "validator";

export default class Contact {
    constructor(classlist) {
        this.form = document.querySelector(classlist),
        this.nameIsValid = false,
        this.emailIsValid = false,
        this.telOrEmail = false,
        this.mobilePhone = false
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate();

            if (this.nameIsValid && this.emailIsValid && this.telOrEmail && this.mobilePhone) {
                this.form.submit();
            }
        });
        
    }

    validate() {
        const name = this.form.querySelector('input[name="name"]');
        const email = this.form.querySelector('input[name="email"]');
        const tel = this.form.querySelector('input[name="tel"]');

        if (!name.value) {
            this.showMessage('*O contato precisa ter um nome', '.name');
            this.nameIsValid = false;
        } else {
            this.showMessage('', '.name');
            this.nameIsValid = true;
        }
        
        if (!email.value && !tel.value) {
            this.showMessage('*O contato precisa ter um Email ou um número', '.email', '.tel');
            this.telOrEmail = false;
        } else {
            this.showMessage('', '.email', '.tel');
            this.telOrEmail = true;

            if (email.value && !validator.isEmail(email.value)){
                this.showMessage('*Email inválido', '.email');
                this.emailIsValid = false
            } else {
                this.showMessage('', '.email');
                this.emailIsValid = true;
            }
    
            if (tel.value && !validator.isMobilePhone(tel.value)){
                this.showMessage('*Telefone inválido', '.tel');
                this.mobilePhone = false
            } else {
                this.showMessage('', '.tel');
                this.mobilePhone = true;
            }
        }
        
    }

    showMessage(msg, classlist1, classlist2) {
        const element1 = this.form.querySelector(classlist1);
        element1.classList.add('text-danger');
        element1.textContent = msg;

        if (classlist2) {
            const element2 = this.form.querySelector(classlist2);
            element2.classList.add('text-danger');
            element2.textContent = msg;
        }
    }
}