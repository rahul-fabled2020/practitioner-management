import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { CONTENT_TYPE_JSON, MAX_RETRIES, RESPONSE_TYPES } from '../constants/constant';
import appConfig from '../config';
import { refreshAccessToken } from '../services/authService';
import { logOut, setCredentials } from '../redux/slices/authSlice';
import { showErrorMessage } from './toast';
import { getUserFromToken } from './token';

export const http = axios.create({
  headers: {
    'Content-Type': CONTENT_TYPE_JSON,
    Accept: CONTENT_TYPE_JSON,
  },
});

http.defaults.baseURL = appConfig.apiBaseUrl;

export const httpWithoutInterceptors = axios.create({
  headers: {
    'Content-Type': CONTENT_TYPE_JSON,
    Accept: CONTENT_TYPE_JSON,
  },
  withCredentials: true,
});

httpWithoutInterceptors.defaults.baseURL = appConfig.apiBaseUrl;

const { CancelToken } = axios;
const cancelTokenSource = CancelToken.source();

/**
 * Add access token in the authorization header of the given config.
 *
 * @param {Object} config Axios config object.
 * @param {string} accessToken
 * @returns {Object} Axios config object.
 */
const configWithAccessToken = (config: any | AxiosRequestConfig, accessToken: string) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const setupAxios = (store: any) => {
  /**
   * Axios request interceptor.
   */
  http.interceptors.request.use(
    async (requestConfig: any | AxiosRequestConfig) => {
      const { accessToken } = store.getState().auth;

      if (accessToken) {
        return configWithAccessToken(requestConfig, accessToken);
      }

      // Refresh Token

      try {
        const newAccessToken = await refreshAccessTokenHelper();
        const user = getUserFromToken(newAccessToken);

        store.dispatch(
          setCredentials({
            user,
            accessToken: newAccessToken,
          })
        );
        return configWithAccessToken(requestConfig, newAccessToken);
      } catch (error) {
        cancelTokenSource.cancel('Missing both accessToken and refreshToken');

        return requestConfig;
      }
    },
    requestError => {
      throw requestError;
    }
  );

  /**
   * Axios Response Interceptor that handles 403 and 401 request failures.
   */
  http.interceptors.response.use(
    response => response.data,

    async responseError => {
      if (axios.isCancel(responseError)) {
        // ie. missing both accessToken and refreshToken
        showErrorMessage(responseError.message || 'Refresh token has expired.');

        return store.dispatch(logOut({}));
      }

      const { config, response } = responseError;

      // eslint-disable-next-line no-underscore-dangle
      if (config?._isRetry && config?._retryCount >= MAX_RETRIES) {
        // Check `>= MAX_RETRIES` instead of `> MAX_RETRIES` because,
        // this is response interceptor, which means the request should have
        // already been made.
        throw new Error('Max retries reached.');
      }

      if (!gotUnauthorizedError(response)) {
        let errorMessage = responseError?.response?.data?.error?.message || responseError?.message;
        const statusCode = responseError?.response?.status;

        if (config.responseType === RESPONSE_TYPES.BLOB && statusCode === 400) {
          const responseString = await responseError?.response?.data?.text?.();
          const responseJson = JSON.parse(responseString);

          errorMessage = responseJson.message;
        }

        if (errorMessage && statusCode) {
          return showErrorMessage(errorMessage);
        }

        throw responseError;
      }

      try {
        const accessToken = await refreshAccessTokenHelper();
        const user = getUserFromToken(accessToken);

        store.dispatch(
          setCredentials({
            user,
            accessToken,
          })
        );

        const { cancelToken, ...configWithoutCancelToken } = config;

        // eslint-disable-next-line no-underscore-dangle
        const retryCount = configWithoutCancelToken._retryCount;

        return http({
          ...configWithoutCancelToken,
          _isRetry: true,
          _retryCount: retryCount ? retryCount + 1 : 1,
        });
      } catch (refreshError) {
        store.dispatch(logOut({}));

        return refreshError;
      }
    }
  );
};

/**
 * Returns true if the response status is set as 401.
 *
 * @param {Object} response Axios response object.
 * @returns {boolean}
 */
const gotUnauthorizedError = (response: any) => response?.status === 401;

async function refreshAccessTokenHelper() {
  const response = await refreshAccessToken();

  return response?.data?.data?.accessToken;
}
