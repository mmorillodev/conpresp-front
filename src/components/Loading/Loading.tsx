import { CircularProgress, Modal } from '@mui/material'
import { Box } from '@mui/system'

const Loading = () => (
  <Modal open>
    <Box
      style={{
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '0',
        top: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  </Modal>
)

export default Loading
