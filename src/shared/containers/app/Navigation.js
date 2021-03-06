import React, {Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileMenu from '../../components/ProfileMenu';

const cx = classNames.bind(styles);
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.mobile = false;
  }

  determineAuthRender() {
    const {authenticated} = this.props.user;
    if (authenticated) {
      return (
        <div>
          <ProfileMenu />
        </div>);
    }
    return (<div>
      <Link to="/login">
        <Button color="contrast">Log In</Button>
      </Link>
      <span>
        |
      </span>
      <Link to="/register">
        <Button color="contrast">Sign up</Button>
      </Link>
    </div>);
  }

  determineNavigationRender() {
    const {authenticated} = this.props.user;
    if (authenticated) {
      return (<div>
        <Link to="/dashboard">
          <Button color="contrast">Dashboard</Button>
        </Link>
        <Link to="/lobbys">
          <Button color="contrast">Lobbys</Button>
        </Link>
        <Link to="/about">
          <Button color="contrast">About</Button>
        </Link>
      </div>);
    }
    return (<div>
      <Link to="/lobbys">
        <Button color="contrast">Lobbys</Button>
      </Link>
      <Link to="/about">
        <Button color="contrast">About</Button>
      </Link>
    </div>);
  }

  render() {
    const mobile = this.mobile;
    return (<div className={cx('appbar')}>
      <AppBar
        position="static" color="primary" className={cx('navigation')} classes={{
          root: cx('navigation-landing')
        }}>
        <Toolbar>
          {
            mobile && (<IconButton className={cx('menu-button')} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>)
          }
          <Typography type="title" color="inherit" className={cx('flex')}>
            <Link to="/" className={cx('navigation-title')}>
              Portfolio
            </Link>
          </Typography>
          <div className={cx('nav-center')}>
            {this.determineNavigationRender()}
          </div>
          {this.determineAuthRender()}
        </Toolbar>
      </AppBar>
    </div>);
  }
}

Navigation.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps({user}) {
  return {user};
}

export default connect(mapStateToProps)(Navigation);
