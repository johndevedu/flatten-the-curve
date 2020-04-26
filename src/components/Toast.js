import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export default function Toast(props) {
  const {
    autoHideDuration = 4500,
    anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
    onClose = () => {},
    open = false,
    severity = 'success', // Possible severity types: error, warning, info, & success
    text = 'Success!',
  } = props

  function Alert(alertProps) {
    return <MuiAlert elevation={6} variant="filled" {...alertProps} />
  }

  return (
    <Snackbar
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      onClose={onClose}
      open={open}
    >
      <Alert severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  )
}
