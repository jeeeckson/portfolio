import React, { Component } from 'react';
import Page from '../Page';
import ToSContainer from '../../containers/app/ToS';

class ToS extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Terms of Agreement | Portfolio';
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
        <ToSContainer {...this.props} />
      </Page>
    );
  }
}

export default ToS;
