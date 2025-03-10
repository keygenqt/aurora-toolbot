import * as React from 'react';
import {useTranslation} from "react-i18next";

import {Box, Stack, Typography, Button} from '@mui/material';

import {useEffectSingle, DataImages, AppUtils} from '../../base';
import {Methods} from '../../modules';
import {BaseLayout} from '../../layouts';
import {AppConf} from '../../conf/AppConf'

export function MainPage(props) {
    const { t } = useTranslation();
    const [version, setVersion] = React.useState(undefined)

    useEffectSingle(() => {
      Methods.appInfo().then((model) => {
        setVersion(AppUtils.checkVersion(model))
      }).catch((e) => {
        setVersion(false)
      });
    });

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
          <Box sx={{textAlign: 'center'}}>
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
                  onClick={() => {
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
                <Typography
                  variant={'caption'}
                  sx={{textAlign: 'center'}}
                >
                  {t('main.t_connect_error_info')}
                </Typography>

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
      </BaseLayout>
    );
}

MainPage.propTypes = {};
