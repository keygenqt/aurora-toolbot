import {ThemeProvider, Box} from '@mui/material';
import {ThemeLight} from './theme/ThemeLight';
import {ThemeDark} from './theme/ThemeDark';
import { MainPage } from './pages';

function App() {
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

export default App;
