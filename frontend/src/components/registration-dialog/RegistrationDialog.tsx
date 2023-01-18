import { useFormik } from 'formik';
import { FunctionComponent, useCallback } from 'react';

import { FormControl, TextField } from '@mui/material';

import { userSignUpSchema } from '../../schema/authSchema';

import Dialog from '../common/dialog';
import { DialogCloseFunction, EventFunction } from '../common/dialog/Dialog';
import { SignUpPayload } from '../../interfaces/interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { signUp } from '../../redux/slices/authSlice';
import { showSuccessMessage } from '../../utils/toast';
import { AUTH_MESSAGES } from '../../constants/messages';

interface RegistrationDialogProps {
  isOpened: boolean;
  data?: SignUpPayload;
  onClose: EventFunction | DialogCloseFunction;
}

const RegistrationDialog: FunctionComponent<RegistrationDialogProps> = ({ isOpened, onClose, data }) => {
  const initialValues: SignUpPayload = data || {
    name: '',
    email: '',
    password: '',
    rePassword: '',
  };

  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues,
    validationSchema: userSignUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(signUp(values)).unwrap();

        onClose();
        formik.resetForm();
        showSuccessMessage(AUTH_MESSAGES.USER_CREATED);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const resetFormAndCloseDialog = useCallback(
    function (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') {
      formik.resetForm();
      onClose(event, reason);
    },
    [formik, onClose]
  );

  return (
    <div>
      <Dialog
        open={isOpened}
        isLoading={formik.isSubmitting}
        onAccept={formik.handleSubmit}
        onClose={resetFormAndCloseDialog}
        isAccceptButtonDisabled={formik.isSubmitting || !formik.isValid}
        heading="Register"
        scroll="paper"
        shouldCloseOnBackdropClick={false}
      >
        <FormControl variant="standard" className="form-control">
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            fullWidth
            name="name"
            error={!!(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl variant="standard" className="form-control">
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            fullWidth
            name="email"
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl variant="standard" className="form-control">
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            fullWidth
            name="password"
            error={!!(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl variant="standard" className="form-control">
          <TextField
            id="standard-basic"
            label="Confirm Password"
            variant="standard"
            type="password"
            fullWidth
            name="rePassword"
            error={!!(formik.touched.rePassword && formik.errors.rePassword)}
            helperText={formik.touched.rePassword && formik.errors.rePassword}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            onChange={formik.handleChange}
          />
        </FormControl>
      </Dialog>
    </div>
  );
};

export default RegistrationDialog;
