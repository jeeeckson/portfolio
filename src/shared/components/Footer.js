import React, {Component} from 'react';

class Footer extends Component {

    determineShow = () => {
        let path = '';
        path = path.split('/')[1];
        switch (path) {
            case '':
                return 'footer-hide';
            case 'about':
                return 'About Page';
            case 'login':
                return 'Log in';
            case 'register':
                return 'Register';
            case 'dashboard':
                return 'Dashboard';
            default:
                return 'Landing';
        }
    };

    render() {
        const style = this.determineShow();
        return (
            <div>
                <p>{style}</p>
            </div>
        );
    }
}


export default Footer;
