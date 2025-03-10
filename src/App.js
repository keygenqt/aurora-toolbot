import {ThemeProvider, Box} from '@mui/material';
import {ThemeLight} from './theme/ThemeLight';
import {ThemeDark} from './theme/ThemeDark';
import {MainPage, ForbiddenPage} from './pages';

function App() {
  if (!window.isTauri && ! window.isMiniApp) {
    return (
      <Box height={1} >
          <ForbiddenPage/>
      </Box>
    )
  } else {
    let darkMode = false;
    return (
      <ThemeProvider theme={darkMode ? ThemeDark : ThemeLight}>
        <Box
          className={darkMode ? 'ThemeDark' : ' ThemeLight'}
          height={1}
          sx={{ backgroundColor: 'background.default' }}
        >
            <MainPage/>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
