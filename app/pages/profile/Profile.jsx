import React, { Component } from 'react';
import Page from '../Page';
import ProfileContainer from '../../containers/profile/Profile';

class Profile extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Profile | Portfolio';
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
        <ProfileContainer {...this.props} />
      </Page>
    );
  }
}

export default Profile;
