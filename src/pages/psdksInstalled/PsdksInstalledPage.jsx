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
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector, useDispatch } from 'react-redux';
import { setData as setPsdkInstalled } from '../../store/impl/psdkInstalled';
import { keysStateBool } from '../../store/impl/stateBool';

import {
    useTheme,
    Typography,
    ListItem,
    List,
    Card,
    CardContent,
    Stack,
    CardActions,
    IconButton,
    Box,
    Button,
    Link,
    CircularProgress,
} from '@mui/material';

import {
    FolderOpen,
    KeyboardArrowRight,
    Terminal
} from '@mui/icons-material';

import {
    useEffectStateBool,
    setEffectStateBool,
    IconButtonLoading,
    AppUtils,
    StateEmpty,
    DataImages,
    ActionBack,
    ActionRefreshState,
} from '../../base';

import { Methods } from '../../modules';
import { AppBarLayout } from '../../layouts';

export function PsdksInstalledPage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // data
    const color = theme.palette.primaryPsdk.main;
    const isUpdate = useEffectStateBool(keysStateBool.psdksUpdate);
    // redux
    const psdkInstalled = useSelector((state) => state.psdkInstalled.value);
    // fun
    const updateStates = async () => {
        setEffectStateBool(dispatch, keysStateBool.psdksUpdate, true);
        dispatch(setPsdkInstalled(await Methods.psdkInstalled()));
        await new Promise(r => setTimeout(r, 400)); // animation delay
        setEffectStateBool(dispatch, keysStateBool.psdksUpdate, false);
    };
    // states
    if (!psdkInstalled) {
        return (<StateEmpty />);
    }
    // page
    return (
        <AppBarLayout index actions={(
            <Stack direction={'row'} spacing={1}>
                <ActionBack />
                <ActionRefreshState
                    onClick={async () => {
                        await updateStates();
                    }}
                />
            </Stack>
        )} >
            <List>
                {psdkInstalled.map((e, index) => (
                    <ListItem key={`key-${index}`}>
                        <Card
                            sx={{
                                border: `1px solid ${color}5e`,
                                background: `linear-gradient(to right, transparent 0%, ${color}1c 100%)`
                            }}
                        >
                            <CardContent sx={{ paddingBottom: 1 }}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ paddingBottom: 1.7, alignItems: "center" }}
                                >
                                    <img
                                        style={{ width: '16px', height: '16px' }}
                                        src={DataImages.iconPsdk}
                                        alt='Icon' />
                                    <Typography variant="subtitle2" color={color} >
                                        Platform SDK v{e.versionId}
                                    </Typography>
                                </Stack>
                                <Box
                                    sx={{
                                        background: `${theme.palette.background.default}bd`,
                                        borderRadius: 2,
                                        padding: 1.5,
                                    }}
                                >
                                    <Typography component={'div'} variant="body2" sx={{ color: 'text.secondary' }}>
                                        <Stack spacing={1} >
                                            <Stack
                                                direction={'row'}
                                                spacing={1}
                                                alignItems={'center'}
                                            >
                                                <Box width={16} textAlign={'center'}>
                                                    <FontAwesomeIcon icon="fa-solid fa-signature" />
                                                </Box>
                                                <Box>{e.versionName}</Box>
                                            </Stack>
                                            <Stack
                                                direction={'row'}
                                                spacing={1}
                                                alignItems={'center'}
                                            >
                                                <Box width={16} textAlign={'center'}>
                                                    <FontAwesomeIcon icon="fa-solid fa-house" />
                                                </Box>
                                                <Link
                                                    href={'#'}
                                                    onClick={async () => {
                                                        await AppUtils.openUrl(e.homeUrl)
                                                    }}
                                                >
                                                    {e.homeUrl}
                                                </Link>
                                            </Stack>
                                        </Stack>
                                    </Typography>
                                </Box>
                            </CardContent>

                            <CardActions sx={{
                                p: 2,
                                paddingTop: 1
                            }}>
                                {isUpdate ? (
                                    <IconButtonLoading isLoading={true} />
                                ) : (
                                    <Stack
                                        direction={'row'}
                                        spacing={1}
                                    >
                                        <IconButton
                                            onClick={async () => {
                                                try {
                                                    await Methods.appOpenDir(e.dir);
                                                } catch (e) {
                                                    console.log(e)
                                                }
                                            }}
                                        >
                                            <FolderOpen />
                                        </IconButton>

                                        <IconButton
                                            onClick={async () => {
                                                try {
                                                    await Methods.psdkTerminalById(e.id);
                                                } catch (e) {
                                                    console.log(e)
                                                }
                                            }}
                                        >
                                            <Terminal />
                                        </IconButton>
                                    </Stack>
                                )}

                                <Box sx={{ flexGrow: 1 }} />

                                <Button
                                    disabled={isUpdate}
                                    size={'small'}
                                    color={'primaryPsdk'}
                                    endIcon={isUpdate ? (
                                        <CircularProgress color="default" />
                                    ) : (
                                        <KeyboardArrowRight color="default" />
                                    )}
                                    variant="contained"
                                    sx={{ opacity: 0.8 }}
                                    onClick={() => {
                                        AppUtils.openPage(navigate, 'psdk', { state: { model: e } });
                                    }}
                                >
                                    {t('common.t_open')}
                                </Button>
                            </CardActions>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </AppBarLayout>
    );
}

PsdksInstalledPage.propTypes = {};
