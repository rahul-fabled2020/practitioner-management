import {
  Dialog,
  Button,
  Backdrop,
  DialogTitle,
  DialogProps,
  DialogActions,
  DialogContent,
  CircularProgress,
} from '@mui/material';

export type EventFunction = (event?: {}) => void;
export type DialogCloseFunction = (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void;

/**
 * Represents the properties of the DialogWrapper component.
 *
 * @interface DialogWrapperProps
 * @extends {DialogProps}
 */
interface DialogWrapperProps extends DialogProps {
  /**
   * Indicates whether the dialog is open.
   *
   * @type {boolean}
   */
  open: boolean;

  /**
   * The heading of the dialog.
   *
   * @type {string}
   */
  heading: string;

  /**
   * The onClose handler for the dialog.
   *
   * @type {EventFunction | DialogCloseFunction}
   */
  onClose?: EventFunction | DialogCloseFunction;

  /**
   * The onAccept handler for the dialog.
   *
   * @type {(() => void | undefined)}
   */
  onAccept?: () => void;

  /**
   * The text for the accept button of the dialog.
   *
   * @type {(string | undefined)}
   */
  acceptButtonText?: string;

  /**
   * The boolean whether the accept button is disabled.
   *
   * @type {boolea}
   */
  isAccceptButtonDisabled?: boolean;

  /**
   * The text for the cancel button of the dialog.
   *
   * @type {(string | undefined)}
   */
  cancelButtonText?: string;

  /**
   * The children of the DialogWrapper component.
   *
   * @type {React.ReactNode}
   */
  children: React.ReactNode;

  /**
   * The loading tstae of dialog.
   *
   * @type {boolean}
   */
  isLoading?: boolean;

  /**
   * Whether dialog should be closed on backdrop click.
   *
   * @type {boolean}
   */
  shouldCloseOnBackdropClick?: boolean;
}

function DialogWrapper({
  heading,
  onClose,
  onAccept,
  children,
  open = false,
  isLoading = false,
  cancelButtonText = 'Cancel',
  acceptButtonText = 'Accept',
  isAccceptButtonDisabled = false,
  shouldCloseOnBackdropClick = true,
  ...rest
}: DialogWrapperProps) {
  function handleClose(event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') {
    if (reason === 'backdropClick') {
      return;
    }

    if (shouldCloseOnBackdropClick) {
      return onClose?.(event);
    }

    onClose?.(event, reason);
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose} data-testid="dialog" {...rest}>
      <DialogTitle>{heading}</DialogTitle>
      <DialogContent>
        {isLoading && (
          <Backdrop open data-testid="loading-spinner" sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        {children}
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={onAccept} disabled={isAccceptButtonDisabled}>
          {acceptButtonText}
        </Button>
        <Button color="secondary" onClick={handleClose}>
          {cancelButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogWrapper;
