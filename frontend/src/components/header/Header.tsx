import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';

import useAuth from '../../hooks/useAuth';

import { getUserFromToken } from '../../utils/token';

import { signOut } from '../../redux/slices/authSlice';
import { AppDispatch, typedUseSelector } from '../../redux/store';

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const accessToken = typedUseSelector(state => state.auth.accessToken);
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAuth();
  const user = getUserFromToken(accessToken);

  return (
    <div className="header">
      <div className="header__title">Practitioner Management System</div>
      <div className="user-wrapper">
        <span className="header__user">{user?.name || 'User'}</span>
        {auth.isLoggedIn() ? (
          <Button
            className="header__logout-btn"
            variant="contained"
            color="secondary"
            title="Log out"
            onClick={() => dispatch(signOut())}
          >
            Logout
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
