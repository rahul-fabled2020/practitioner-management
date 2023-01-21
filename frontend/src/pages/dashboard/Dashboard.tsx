import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePractitioner, getPractitioners } from '../../redux/slices/practitionerSlice';
import { AppDispatch, typedUseSelector } from '../../redux/store';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { convertTo12HourTime, convertToYYYYMMDD } from '../../utils/date';
import { DAYS_COLOR, Mode } from '../../constants/constant';
import defaultProfilePic from '../../images/profile.png';
import { DialogOptions, Practitioner } from '../../interfaces/interfaces';
import ConfirmationDialog from '../../components/common/confirmation-dialog';
import { showSuccessMessage } from '../../utils/toast';
import { PRACTITIONER_MESSAGES } from '../../constants/messages';
import PractitionerDialog from '../../components/practitioner-dialog';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const practitioners = typedUseSelector(state => state.practitioner.practitioners);
  const isLoading = typedUseSelector(state => state.practitioner.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const [confirmationOptions, setConfirmationOptions] = useState<DialogOptions>({
    data: {},
    isOpened: false,
  });
  const [practitionerDialogOptions, setPractitionerDialogOptions] = useState<DialogOptions>({
    data: {},
    isOpened: false,
    mode: Mode.CREATE,
  });

  const sortedPractitioners = useMemo(() => {
    const icuSpealists = (practitioners || []).filter((practitioner: Practitioner) => practitioner.isICUSpecialist);
    const nonIcuSpecialist = (practitioners || []).filter(
      (practitioner: Practitioner) => !practitioner.isICUSpecialist
    );
    const sortPractitioner = (a: Practitioner, b: Practitioner) => a.fullName.localeCompare(b.fullName);

    return [...icuSpealists.sort(sortPractitioner), ...nonIcuSpecialist.sort(sortPractitioner)];
  }, [practitioners]);

  useEffect(() => {
    dispatch(getPractitioners());
  }, [dispatch]);

  const handleEdit = (id: string) => {
    const practitioner = practitioners?.find((practitioner: Practitioner) => practitioner._id === id);

    setPractitionerDialogOptions({
      isOpened: true,
      data: practitioner,
      mode: Mode.EDIT,
    });
  };
  const handleDelete = (id: string) => {
    const practitioner = practitioners?.find((practitioner: Practitioner) => practitioner._id === id);

    setConfirmationOptions({
      isOpened: true,
      data: practitioner,
    });
  };
  const onConfirmDelete = async () => {
    try {
      await dispatch(deletePractitioner(confirmationOptions.data._id)).unwrap();
      showSuccessMessage(PRACTITIONER_MESSAGES.DELETED);
      setConfirmationOptions({
        data: {},
        isOpened: false,
      });
      dispatch(getPractitioners());
    } catch (error: any) {}
  };

  const columns: GridColDef[] = [
    {
      field: '_id',
      headerName: 'Actions',
      align: 'center',
      renderCell(params) {
        return (
          <div style={{ display: 'flex', gap: 8 }}>
            <span onClick={() => handleEdit(params.row._id)}>
              <ModeEditIcon color="primary" titleAccess="Edit" />
            </span>
            <span onClick={() => handleDelete(params.row._id)}>
              <DeleteIcon color="error" titleAccess="Delete" />
            </span>
          </div>
        );
      },
    },
    {
      field: 'photographUrl',
      headerName: 'Profile Pic',
      width: 150,
      align: 'center',
      renderCell(params) {
        return (
          <img
            src={params.row.photographUrl || defaultProfilePic}
            alt={params.row.fullName}
            style={{ maxHeight: '100%', width: 50, borderRadius: '50%' }}
          />
        );
      },
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 150,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: false,
    },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 150,
      editable: false,
    },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      width: 150,
      editable: false,
      renderCell(params) {
        return convertToYYYYMMDD(params.row.dob);
      },
    },
    {
      field: 'workingDays',
      headerName: 'Working Days',
      editable: false,
      width: 200,
      renderCell(params) {
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 8 }}>
            {params.row.workingDays?.map((day: string, index: number) => (
              <Chip label={day} key={index} style={{ backgroundColor: DAYS_COLOR[day] }} />
            ))}
          </div>
        );
      },
    },
    {
      field: 'startTime',
      headerName: 'Start Time',
      width: 150,
      editable: false,
      renderCell(params) {
        return convertTo12HourTime(params.row.startTime);
      },
    },
    {
      field: 'endTime',
      headerName: 'End TIme',
      width: 150,
      editable: false,
      renderCell(params) {
        return convertTo12HourTime(params.row.endTime);
      },
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 150,
      editable: false,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 150,
      editable: false,
    },
    {
      field: 'isICUSpecialist',
      headerName: 'ICU Specialist',
      width: 150,
      editable: false,
      renderCell(params) {
        return <Switch checked={params.row.isICUSpecialist} />;
      },
    },
    {
      field: 'notes',
      headerName: 'Notes',
      width: 150,
      editable: false,
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <ConfirmationDialog
        onClose={() => setConfirmationOptions(previousValues => ({ ...previousValues, isOpened: false }))}
        onAccept={onConfirmDelete}
        heading="Confirm Deletion"
        isOpened={confirmationOptions.isOpened}
        acceptButtontext="Delete"
        cancelButtonText="Cancel"
        message={`Are you sure to delete ${confirmationOptions?.data?.fullName || 'practitioner'}?`}
      />
      {practitionerDialogOptions.isOpened ? (
        <PractitionerDialog
          isOpened={true}
          mode={practitionerDialogOptions.mode}
          onClose={() => setPractitionerDialogOptions(previousValues => ({ ...previousValues, isOpened: false }))}
          data={practitionerDialogOptions.data}
        />
      ) : null}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={sortedPractitioners}
          getRowId={row => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowHeight={() => 'auto'}
        />
      </Box>
      <div
        className="fab-container"
        style={{ position: 'fixed', bottom: 48, right: 48 }}
        onClick={() =>
          setPractitionerDialogOptions(previousValues => ({ ...previousValues, isOpened: true, mode: Mode.CREATE }))
        }
      >
        <Fab color="error" aria-label="add" style={{ height: 100, width: 100 }}>
          <AddIcon fontSize="large" />
        </Fab>
      </div>
    </div>
  );
};

export default Dashboard;
