import React, { Component } from 'react';
import Page from '../Page';
import UserStatisticsContainer from '../../containers/profile/UserStatistics';

class UserStatistics extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'UserStatistics | Portfolio';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Portfolio UserStatistics' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <UserStatisticsContainer {...this.props} />
      </Page>
    );
  }
}

export default UserStatistics;
