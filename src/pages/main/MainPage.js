import * as React from 'react';
import {useTranslation} from "react-i18next";

import {Box, Stack, Button, Typography, CircularProgress} from '@mui/material';

import {DataImages} from '../../base';
import {Methods} from '../../modules';
import {BaseLayout} from '../../layouts';

export function MainPage(props) {
    const { t } = useTranslation();
    const [apiVersion, setApiVersion] = React.useState('no data')
    const [emulatorName, setEmulatorName] = React.useState('no data')
    return (
      <BaseLayout>
        <Stack
          direction="column"
          spacing={2}
          height={1}
          sx={{
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
                setApiVersion(undefined)
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
            {apiVersion ? (
              <Typography
                variant={'caption'}
                sx={{ textAlign: "center" }}
              >
                D-Bus: {apiVersion}
              </Typography>
            ) : (
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress size="15.9px" />
              </Box>
            )}
            <Button
              variant="contained"
              onClick={() => {
                setEmulatorName(undefined)
                Methods.emulatorInfo().then((model) => {
                  console.log(model)
                  setEmulatorName(model.name)
                }).catch((e) => {
                  Methods.log(e)
                  setEmulatorName(e.message)
                });
              }}
            >
              Get emulator info
            </Button>
            {emulatorName ? (
              <Typography
                variant={'caption'}
                sx={{ textAlign: "center" }}
              >
                Emulator: {emulatorName}
              </Typography>
            ) : (
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress size="15.9px" />
              </Box>
            )}
          </Stack>
        </Stack>
      </BaseLayout>
    );
}

MainPage.propTypes = {};
