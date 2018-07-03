import React, { Component } from 'react';
import Page from '../Page';
import LandingContainer from '../../containers/app/Landing';

class Landing extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Landing | Portfolio';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'PortfolioFam!' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <LandingContainer {...this.props} />
      </Page>
    );
  }
}

export default Landing;
