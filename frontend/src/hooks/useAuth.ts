import { typedUseSelector } from '../redux/store';

function useAuth() {
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
