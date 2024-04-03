import 'core-js/stable';
import 'regenerator-runtime/runtime'

import Login from './modules/login';
import Contact from './modules/contato';

//LOGIN
const signin = new Login('.signin');
const signup = new Login('.signup');
signin.init();
signup.init();

//CONTACT
const contact = new Contact('.contact');
contact.init();

