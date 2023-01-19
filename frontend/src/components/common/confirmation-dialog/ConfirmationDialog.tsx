import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

/**
 * Represents the properties of the ConfirmationDialog component.
 *
 * @interface ConfirmationDialogProps
 */
interface ConfirmationDialogProps {
  /**
   * Indicates whether the confirmation dialog is open.
   *
   * @type {boolean}
   */
  isOpened: boolean;

  /**
   * The message of the confirmation dialog.
   *
   * @type {string}
   */
  message: string;

  /**
   * The heading of the confirmation dialog.
   *
   * @type {string}
   */
  heading: string;

  /**
   * The text for the accept button of the confirmation dialog.
   *
   * @type {string}
   */
  acceptButtontext: string;

  /**
   * The text for the cancel button of the confirmation dialog.
   *
   * @type {string}
   */
  cancelButtonText: string;

  /**
   * The onClose handler for the confirmation dialog.
   *
   * @type {(() => void)}
   */
  onClose?: () => void;

  /**
   * The onAccept handler for the confirmation dialog.
   *
   * @type {(() => void)}
   */
  onAccept?: () => void;
}

export default function ConfirmationDialog({
  onClose,
  onAccept,
  heading = '',
  message = '',
  isOpened = false,
  acceptButtontext = 'Accept',
  cancelButtonText = 'Cancel',
}: ConfirmationDialogProps) {
  return (
    <Dialog open={isOpened} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {cancelButtonText && (
          <Button color="primary" onClick={onClose} variant="outlined">
            {cancelButtonText}
          </Button>
        )}
        {acceptButtontext && (
          <Button color="error" onClick={onAccept}>
            {acceptButtontext}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
