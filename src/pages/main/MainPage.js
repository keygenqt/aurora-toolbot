import * as React from 'react';
import { useTranslation } from "react-i18next";
import { DataImages } from '../../base';
import { Methods } from '../../modules';
import { Box, Stack, Button, Typography } from '@mui/material';

export function MainPage(props) {
    const { t } = useTranslation();
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
            src={DataImages.icon}
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
            {t('main.t_hello')}
        </Typography>
        <Stack
          spacing={2}
        >
          <Button
            variant="contained"
            onClick={() => {
              Methods.appInfo().then((model) => {
                console.log(model)
                setApiVersion(model.apiVersion)
              }).catch((e) => {
                Methods.log(e)
                setApiVersion(e.message)
              });
            }}
          >
            Get API info
          </Button>
          <Typography
            variant={'caption'}
            sx={{ textAlign: "center" }}
          >
            D-Bus: {apiVersion}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              Methods.emulatorInfo().then((model) => {
                console.log(model)
                setEmulatorName(model.name)
              }).catch((e) => {
                Methods.log(e)
                setApiVersion(e.message)
              });
            }}
          >
            Get emulator info
          </Button>
          <Typography
            variant={'caption'}
            sx={{ textAlign: "center" }}
          >
            Emulator: {emulatorName}
          </Typography>
        </Stack>
      </Stack>
    );
}

MainPage.propTypes = {};
