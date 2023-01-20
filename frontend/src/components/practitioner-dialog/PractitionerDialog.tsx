import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { ChangeEventHandler, FunctionComponent, useCallback, useState } from 'react';

import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import LinearProgress from '@mui/material/LinearProgress';
import { FormControlLabel, FormLabel, RadioGroup, Radio, Box } from '@mui/material';

import FileUpload from '@mui/icons-material/FileUpload';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Days, Mode } from '../../constants/constant';
import { PRACTITIONER_MESSAGES } from '../../constants/messages';
import { Gender, Practitioner } from '../../interfaces/interfaces';

import { AppDispatch } from '../../redux/store';
import { getPractitioners, savePractitioner, updatePractitioner } from '../../redux/slices/practitionerSlice';

import { uploadFile } from '../../services/fileService';

import { showErrorMessage, showSuccessMessage } from '../../utils/toast';

import Dialog from '../common/dialog';
import { DialogCloseFunction, EventFunction } from '../common/dialog/Dialog';

import { practitionerSchema } from '../../schema/practitionerSchema';

interface PractitionerDialogProps {
  isOpened: boolean;
  mode?: Mode;
  data?: Practitioner;
  onClose: EventFunction | DialogCloseFunction;
}

const PractitionerDialog: FunctionComponent<PractitionerDialogProps> = ({ isOpened, mode, data, onClose }) => {
  const heading = mode === Mode.EDIT ? 'Edit Practitioner' : 'Create Practitioner';
  const acceptButtonText = mode === Mode.EDIT ? 'Edit' : 'Create';
  const initialValues: Practitioner = {
    fullName: '',
    email: '',
    contact: '',
    dob: new Date(),
    workingDays: [],
    startTime: new Date(),
    endTime: new Date(),
    gender: Gender.MALE,
  };

  const [isImageUploading, setImageUploading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik<Practitioner>({
    initialValues: mode === Mode.EDIT ? (data as Practitioner) : initialValues,
    validationSchema: practitionerSchema,
    onSubmit: async (values: Practitioner, { setSubmitting }) => {
      try {
        if (mode === Mode.EDIT) {
          await dispatch(updatePractitioner({ id: values._id as string, payload: values }));
          showSuccessMessage(PRACTITIONER_MESSAGES.EDITED);
        } else {
          await dispatch(savePractitioner(values)).unwrap();
          showSuccessMessage(PRACTITIONER_MESSAGES.CREATED);
        }

        onClose();
        formik.resetForm();
        dispatch(getPractitioners());
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
  const handleImageUpload: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = async event => {
    const fileElement = event.target as HTMLInputElement;
    const file = fileElement?.files?.[0] as File;
    setImageUploading(true);

    try {
      const fileResponse = (await uploadFile(file)) as unknown as { url: string };

      formik.setFieldValue('photographUrl', fileResponse.url);
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || error.message;

      showErrorMessage(message);
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <Dialog
      open={isOpened}
      scroll="paper"
      heading={heading}
      acceptButtonText={acceptButtonText}
      onAccept={formik.handleSubmit}
      onClose={resetFormAndCloseDialog}
      isAccceptButtonDisabled={formik.isSubmitting || !formik.isValid}
      shouldCloseOnBackdropClick={false}
    >
      <FormControl variant="standard" className="form-control">
        <TextField
          label="Full Name"
          variant="standard"
          fullWidth
          error={!!(formik.touched.fullName && formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
          {...formik.getFieldProps('fullName')}
        />
      </FormControl>
      <FormControl variant="standard" className="form-control">
        {formik.values.photographUrl ? (
          <div style={{ position: 'relative' }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<FileUpload />}
              onBlur={formik.handleBlur('photographUrl')}
              sx={{ marginRight: '1rem', position: 'absolute', right: 0 }}
            >
              Change Profile Picture
              <input type="file" accept=".png,.jpg,.jpeg" hidden onChange={handleImageUpload} />
            </Button>
            <img
              src={formik.values.photographUrl}
              alt="Profile Picture"
              style={{
                borderRadius: '50%',
                height: 200,
                objectFit: 'contain',
                alignSelf: 'flex-start',
                width: 200,
                background: 'gray',
              }}
            />
            {isImageUploading ? <LinearProgress /> : null}
          </div>
        ) : (
          <>
            <FormLabel id="avatar">Profile Picture</FormLabel>
            <Button
              component="label"
              variant="outlined"
              startIcon={<FileUpload />}
              onBlur={formik.handleBlur('photographUrl')}
            >
              Upload Profile Picture
              <input type="file" accept=".png,.jpg,.jpeg" hidden onChange={handleImageUpload} />
            </Button>
            {isImageUploading ? <LinearProgress /> : null}
          </>
        )}
      </FormControl>
      <FormControl variant="standard" className="form-control">
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          error={!!(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          {...formik.getFieldProps('email')}
          disabled={mode === Mode.EDIT}
        />
      </FormControl>
      <FormControl variant="standard" className="form-control">
        <TextField
          label="Contact"
          variant="standard"
          fullWidth
          error={!!(formik.touched.contact && formik.errors.contact)}
          helperText={formik.touched.contact && formik.errors.contact}
          {...formik.getFieldProps('contact')}
        />
      </FormControl>
      <FormControl variant="standard" className="form-control">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            value={formik.values.dob}
            onChange={value => formik.setFieldValue('dob', value)}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                onBlur={formik.handleBlur('dob')}
                fullWidth
                error={!!(formik.touched.dob && formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
              />
            )}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl variant="standard" className="form-control">
        <Autocomplete
          disablePortal
          options={Object.values(Days)}
          multiple={true}
          value={formik.values.workingDays}
          onChange={(event, newValue) => formik.setFieldValue('workingDays', newValue)}
          onBlur={formik.handleBlur('workingDays')}
          renderInput={params => (
            <TextField
              variant="standard"
              {...params}
              fullWidth
              label="Working Days"
              error={!!(formik.touched.workingDays && formik.errors.workingDays)}
              helperText={formik.touched.workingDays && formik.errors.workingDays}
            />
          )}
        />
      </FormControl>
      <FormControl variant="standard" className="form-control">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={formik.values.startTime}
            onChange={newValue => formik.setFieldValue('startTime', newValue)}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                fullWidth
                onBlur={formik.handleBlur('startTime')}
                error={!!(formik.touched.startTime && formik.errors.startTime)}
                helperText={formik.touched.startTime && formik.errors.startTime}
              />
            )}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl variant="standard" className="form-control">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="End Time"
            value={formik.values.endTime}
            onChange={newValue => formik.setFieldValue('endTime', newValue)}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                fullWidth
                onBlur={formik.handleBlur('endTime')}
                error={!!(formik.touched.endTime && formik.errors.endTime)}
                helperText={formik.touched.endTime && formik.errors.endTime}
              />
            )}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl variant="standard" className="form-control">
        <TextField
          label="Address"
          variant="standard"
          fullWidth
          error={!!(formik.touched.address && formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          {...formik.getFieldProps('address')}
        />
      </FormControl>
      <FormControl variant="standard" className="form-control">
        <FormLabel id="gender">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="gender"
          value={formik.values.gender}
          onBlur={formik.handleBlur('gender')}
          onChange={(event, newValue) => formik.setFieldValue('gender', newValue)}
          name="radio-buttons-group"
        >
          <FormControlLabel value={Gender.FEMALE} control={<Radio />} label="Female" />
          <FormControlLabel value={Gender.MALE} control={<Radio />} label="Male" />
          <FormControlLabel value={Gender.OTHER} control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <FormControl variant="standard" className="form-control">
        <TextField
          label="Notes"
          variant="standard"
          fullWidth
          error={!!(formik.touched.notes && formik.errors.notes)}
          helperText={formik.touched.notes && formik.errors.notes}
          {...formik.getFieldProps('notes')}
        />
      </FormControl>
      <FormControl variant="standard" className="form-control">
        <FormControlLabel
          control={
            <Switch
              aria-label="ICU Specialist"
              color="primary"
              defaultChecked={!!formik.values.isICUSpecialist}
              inputProps={{ 'aria-label': 'controlled' }}
              {...formik.getFieldProps('isICUSpecialist')}
              value={!!formik.values.isICUSpecialist}
            />
          }
          label="ICU Specialist"
        />
      </FormControl>
    </Dialog>
  );
};

export default PractitionerDialog;
