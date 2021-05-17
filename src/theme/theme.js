import {createMuiTheme} from '@material-ui/core/styles';
import {blue, deepPurple} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      extraLight: deepPurple[100],
      light: deepPurple[300],
      main: deepPurple[600],
      dark: deepPurple[900],
    },
    secondary: {
      extraLight: blue[100],
      light: blue[300],
      main: blue[600],
    },
    white: {
      light: '#aaa',
      main: '#fff',
      contrastText: '#000',
    },
  },
});

export default theme;
