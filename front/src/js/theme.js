import { createMuiTheme } from '@material-ui/core/styles'

import colors from './colors'

const theme = createMuiTheme({
  typography: {
   "fontFamily": '"Poppins", sans-serif',
  },
  overrides: {
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: colors.darkgray,
        },
      },
    },
  },
})

export default theme
