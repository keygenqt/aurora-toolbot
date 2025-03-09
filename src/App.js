import * as React from 'react';
import { invoke } from "@tauri-apps/api/core";
import './App.css';
import { Box, Stack, Button, Typography } from '@mui/material';

import icon from './assets/icon.png';

import { debug, error } from '@tauri-apps/plugin-log';

function App() {
  const [apiVersion, setApiVersion] = React.useState('no data')
  const [emulatorName, setEmulatorName] = React.useState('no data')

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

      <Stack
        spacing={2}
      >
        <Button
          variant="contained"
          onClick={() => {
            if (window.isTauri) {
              invoke("app_info", {})
                .then((json) => {
                  debug(json)
                  let data = JSON.parse(json);
                  if (data['key'] === 'AppInfo') {
                    setApiVersion('D-Bus: v' + data['jsonData']['api_version'])
                  }
                })
                .catch((e) => error(e));
            } else {
              setApiVersion("Tauri knows dbus, web & mini-app will come later.")
            }
          }}
        >
          Get API info
        </Button>

        <Typography
          variant={'caption'}
          sx={{ textAlign: "center" }}
        >
          {apiVersion}
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            if (window.isTauri) {
              invoke("emulator_info", {})
                .then((json) => {
                  let data = JSON.parse(json);
                  debug(json)
                  if (data['key'] === 'EmulatorInfo') {
                    setEmulatorName('Emulator: ' + data['jsonData']['model']['name'])
                  }
                })
                .catch((e) => error(e));
            } else {
              setEmulatorName("Tauri knows dbus, web & mini-app will come later.")
            }
          }}
        >
          Get emulator info
        </Button>

        <Typography
          variant={'caption'}
          sx={{ textAlign: "center" }}
        >
          {emulatorName}
        </Typography>

      </Stack>
    </Stack>
  );
}

export default App;
