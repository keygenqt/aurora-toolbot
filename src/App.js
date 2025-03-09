import { invoke } from "@tauri-apps/api/core";
import './App.css';
import { Box, Stack, Button, Typography } from '@mui/material';

import icon from './assets/icon.png';

import { debug, error } from '@tauri-apps/plugin-log';

function App() {
  return (
    <Stack
      direction="column"
      spacing={2}
      height={1}
      boxSizing={'border-box'}
      sx={{
        p: 4,
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
      <Box/>
      <Box
        sx={{
          textAlign: 'center'
        }}
      >
        <img
          style={{width: '100%', maxWidth: '200px', maxHeight: '200px'}}
          src={icon}
          alt='Icon' />
      </Box>
      <Typography
        variant={'h5'}
        sx={{
          fontWeight: 'bold',
          color: '#274a3f',
          textAlign: "center"
        }}
      >
        Добро пожаловать в приложение Aurora Toolbot!
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          if (window.isTauri) {
            invoke("greet", { name: 'TEST' })
              .then((m) => debug(m))
              .catch((e) => error(e));
          } else {
            console.log("I'm web!")
          }
        }}
      >Let's Go</Button>
    </Stack>
  );
}

export default App;
