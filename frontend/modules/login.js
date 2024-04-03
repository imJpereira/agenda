import validator from 'validator'

export default class Login {
    constructor(classList) {
        this.form = document.querySelector(classList);
        this.email = false;
        this.password = false;
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate()

            if (this.email && this.password) {
                this.form.submit();
            }
        });
    }

    validate() {
        const emailInput = this.form.querySelector('input[name="email"]');
        const passwordInput = this.form.querySelector('input[name="password"]');
        const msgEmail = this.form.querySelector('.msg-email');
        const msgPassword = this.form.querySelector('.msg-password');

        if (!validator.isEmail(emailInput.value)) {
            this.emailMsg(msgEmail);
        } else {
            msgEmail.textContent = '';
            this.email = true;
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.passwordMsg(msgPassword);
        } else {
            msgPassword.textContent = '';
            this.password = true;
        }
    }
    
    emailMsg(msg) {
        msg.classList.add('text-danger')
        msg.textContent = '*Email inválido';
    }

    passwordMsg(msg) {
        msg.classList.add('text-danger')
        msg.textContent = '*A senha precisa ter entre 3 e 50 caracteres';
    }
}