import * as React from 'react';
import {useTranslation} from "react-i18next";

import {Box, Stack, Typography, Button} from '@mui/material';

import {useEffectSingle, DataImages, AppUtils} from '../../base';
import {Methods} from '../../modules';
import {AppConf} from '../../conf/AppConf'

export function MainPage(props) {
    const { t } = useTranslation();
    const [version, setVersion] = React.useState(undefined);

    useEffectSingle(() => {
      Methods.appInfo().then((model) => {
        setVersion(AppUtils.checkVersion(model))
      }).catch((e) => {
        setVersion(false)
      });
    });

    return (
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
        <Box sx={{textAlign: 'center'}}>
          <img
            style={{width: '100%', maxWidth: '180px', maxHeight: '180px'}}
            src={DataImages.icon}
            alt='Icon' />
        </Box>
        <Typography
          variant={'h5'}
          sx={{
            maxWidth: 375,
            margin: '0 auto !important',
            fontWeight: 'bold',
            color: 'primary.light',
            textAlign: "center"
          }}
        >
            {t('main.t_hello')}
        </Typography>
        {version ? (
          <>
            <Typography
              color='success'
              sx={{textAlign: 'center'}}
            >
              {t('main.t_connect_success')}
            </Typography>

            <Box sx={{textAlign: 'center'}}>
              <Button
                variant="contained"
                onClick={async () => {
                  // @todo
                  console.log('Open page feature')
                }}
              >
                {t('main.t_connect_btn_start')}
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography
              color='error'
              sx={{textAlign: 'center'}}
            >
              {t('main.t_connect_error')}
            </Typography>
            <Stack
              spacing={3}
              sx={{textAlign: 'center'}}
            >
              {window.isTauri ? (
                <Typography
                  color={'text.primary'}
                  variant={'caption'}
                  sx={{
                    textAlign: 'center',
                    maxWidth: 300,
                    margin: '0 auto !important',
                  }}
                >
                  {t('main.t_connect_error_info_t')}
                </Typography>
              ) : (
                <Typography
                  color={'text.primary'}
                  variant={'caption'}
                  sx={{
                    textAlign: 'center',
                    maxWidth: 360,
                    margin: '0 auto !important',
                  }}
                >
                  {t('main.t_connect_error_info_w')}
                </Typography>
              )}
              <Box>
                <Button
                  variant="contained"
                  onClick={async () => {
                    await AppUtils.openUrl(AppConf.docUrl)
                  }}
                >
                  {t('main.t_connect_btn_doc')}
                </Button>
              </Box>
            </Stack>
          </>
        )}
        <Box/>
      </Stack>
    );
}

MainPage.propTypes = {};
