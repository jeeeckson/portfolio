import React, { Component } from 'react';
import Page from '../Page';
import ThemesContainer from '../../containers/profile/Themes';

class Themes extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Themes | Portfolio';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Portfolio Themes' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ThemesContainer {...this.props} />
      </Page>
    );
  }
}

export default Themes;
