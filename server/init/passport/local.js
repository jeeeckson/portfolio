import {Strategy as LocalStrategy} from 'passport-local';

export default (passport) => {

    /*
    By default, LocalStrategy expects to find credentials in parameters named username and password.
    If your site prefers to name these fields differently,
    options are available to change the defaults.
    */
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, ''));
};
