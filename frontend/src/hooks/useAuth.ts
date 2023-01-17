import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function useAuth() {
  const typedUseSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { user, accessToken } = typedUseSelector(state => state.auth);

  function isLoggedIn() {
    if (!user || !accessToken) {
      return false;
    }

    return true;
  }

  return { isLoggedIn };
}

export default useAuth;
