import React, { Component } from 'react';
import Page from '../Page';
import LoginContainer from '../../containers/app/Login';

class Login extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Login | Portfolio';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Portfolio Login' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <LoginContainer {...this.props} />
      </Page>
    );
  }
}

export default Login;
