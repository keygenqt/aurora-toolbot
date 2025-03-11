import * as React from 'react';

import {ThemeProvider, Box} from '@mui/material';

import {ThemeLight} from './theme/ThemeLight';
import {ThemeDark} from './theme/ThemeDark';
import {MainPage, ForbiddenPage} from './pages';
import {useEffectTheme, useEffectFocus} from './base';
import {BaseLayout} from './layouts';

function App() {
  const darkMode = useEffectTheme();
  const isFocus = useEffectFocus();
  return (
    <ThemeProvider theme={darkMode === 'dark' ? ThemeDark : ThemeLight}>
      <Box
        className={'MainBox ' + ( isFocus ? 'WindowFocus' : 'WindowUnfocus')}
        height={1}
        sx={{
          backgroundColor: 'background.default',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <BaseLayout>
          {window.isTauri || window.isMiniApp ? (<MainPage/>) : (<ForbiddenPage/>)}
        </BaseLayout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
