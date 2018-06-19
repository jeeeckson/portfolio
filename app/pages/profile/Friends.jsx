import React, { Component } from 'react';
import Page from '../Page';
import FriendsContainer from '../../containers/profile/Friends';

class Friends extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Friends | Portfolio';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Portfolio Friends' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <FriendsContainer {...this.props} />
      </Page>
    );
  }
}

export default Friends;
