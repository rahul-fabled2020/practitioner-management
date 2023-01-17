import { toast, ToastOptions } from 'react-toastify';

const commonToastOptions: ToastOptions = {
  autoClose: 1000,
  hideProgressBar: true,
  position: toast.POSITION.BOTTOM_RIGHT,
};

/**
 * Show a success message with the given message and options.
 *
 * @param {string} message - The message to display in the toast.
 * @param {ToastOptions} options - ToastOptions = {}
 */
export const showSuccessMessage = (message: string, options: ToastOptions = {}) => {
  toast.success(message, { ...commonToastOptions, ...options });
};

/**
 * Show an error message using the react-toastify library.
 *
 * @param {string} message - The message to display in the toast.
 * @param {ToastOptions} options - ToastOptions = {}
 */
export const showErrorMessage = (message: string, options: ToastOptions = {}) => {
  toast.error(message, { ...commonToastOptions, ...options });
};
