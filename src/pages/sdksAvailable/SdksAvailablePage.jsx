/**
 * Copyright 2025 Vitaliy Zarubin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from 'react';
import { useTranslation } from "react-i18next";

import { useSelector } from 'react-redux';

import {
    useTheme,
    Typography,
    ListItem,
    List,
    Box,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    CardActions,
    Tooltip,
    Chip,
    Avatar,
} from '@mui/material';

import { CloudOff, CloudQueue, InsertLink, OpenInNew, Download, Done } from '@mui/icons-material';

import { AppUtils, AlertDialog, StateEmpty } from '../../base';

export function SdksAvailablePage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    // redux
    const sdkInstalled = useSelector((state) => state.sdkInstalled.value);
    const sdkAvailable = useSelector((state) => state.sdkAvailable.value);
    // states
    if (!sdkAvailable) {
        return (<StateEmpty />);
    }
    // data
    const [isOpenDownloadDialogAlert, setIsOpenDownloadDialogAlert] = React.useState(false);
    // fn - check is install
    const fnIsInstall = React.useCallback(
        (model) => {
            if (!Array.isArray(sdkInstalled)) {
                return false;
            }
            for (const i of sdkInstalled) {
                if (model.versionFull == i.versionFull && model.buildType == i.buildType) {
                    return true;
                }
            }
            return false;
        }, [sdkInstalled]);
    // page
    return (
        <>
            <AlertDialog
                title={t('sdks.t_dialog_download_title')}
                body={t('sdks.t_dialog_download_body')}
                agreeText={t('common.t_btn_start')}
                disagreeText={t('common.t_btn_cancel')}
                open={isOpenDownloadDialogAlert}
                onClose={() => setIsOpenDownloadDialogAlert(false)}
                agree={() => {
                    console.log('agree')
                }}
            />
            <List>
                {sdkAvailable.map((e, index) => {
                    let isInstall = fnIsInstall(e);
                    let color = isInstall ? theme.palette.primary.main : theme.palette.primarySdk.main;
                    return (
                        <ListItem key={`key-${index}`}>
                            <Card
                                sx={{
                                    border: `1px solid ${color}5e`,
                                    background: `linear-gradient(to right, transparent 0%, ${color}1c 100%)`
                                }}
                            >
                                <CardHeader
                                    avatar={isInstall && (
                                        <Avatar sx={{ bgcolor: color }} aria-label="recipe">
                                            <Done color={'white'} />
                                        </Avatar>
                                    )}
                                    title={`Аврора SDK (${e.buildType})`}
                                    subheader={`v${e.versionFull}`}
                                    sx={{
                                        paddingBottom: 0,
                                        '& .MuiCardHeader-title': {
                                            paddingBottom: 0.5,
                                        }
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {e.buildType === 'MB2' ? t('sdks.t_item_mb2') : t('sdks.t_item_bt')}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{
                                    p: 2,
                                    paddingTop: 0
                                }}>
                                    <Chip icon={e.installType === 'Online' ? (<CloudQueue color='info' />) : (<CloudOff color='primary' />)} label={`${e.installType} installer`} />
                                    <Box sx={{ flexGrow: 1 }} />

                                    <Tooltip title={t('common.t_download')} placement="left-start">
                                        <IconButton
                                            onClick={() => {
                                                setIsOpenDownloadDialogAlert(true)
                                            }}
                                        >
                                            <Download />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title={t('common.t_link_to_file')} placement="left-start">
                                        <IconButton
                                            onClick={async () => {
                                                await AppUtils.openUrl(e.url);
                                            }}
                                        >
                                            <InsertLink />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title={t('common.t_open_repo')} placement="left-start">
                                        <IconButton
                                            onClick={async () => {
                                                await AppUtils.openUrl(e.url.split('/').slice(0, -1).join('/'));
                                            }}
                                        >
                                            <OpenInNew />
                                        </IconButton>
                                    </Tooltip>

                                </CardActions>
                            </Card>
                        </ListItem>
                    )
                })}
            </List>
        </>
    );
}

SdksAvailablePage.propTypes = {};
