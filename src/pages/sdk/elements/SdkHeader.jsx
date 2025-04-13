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
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    useTheme,
    Box,
    Stack,
    Typography,
    CardContent,
    Tooltip,
    ButtonGroup,
    Button,
} from '@mui/material';

import {
    FolderOpen,
    Handyman,
} from '@mui/icons-material';

import { DataImages, CardGradient } from '../../../base';
import { Methods } from '../../../modules';

export function SdkHeader(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    // data
    let {
        model,
        isUpdate,
        onUpdate,
        onRefresh,
    } = props;
    const color = theme.palette.primarySdk.main;
    // page
    return (
        <CardGradient color={color}>
            <CardContent
                sx={{
                    position: 'relative',
                    '&:last-child': { padding: 2 }
                }}
            >
                <Stack
                    direction={'column'}
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        paddingTop: 2,
                        paddingLeft: 2,
                        paddingRight: 2,
                    }}
                >
                    <img
                        style={{ width: '50px', height: '50px' }}
                        src={DataImages.iconSdk}
                        alt='Icon' />

                    <Typography variant="h6" >
                        Аврора SDK v{model.versionFull}
                    </Typography>

                    <Stack
                        spacing={1}
                        sx={{
                            width: 1,
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
                                        <FontAwesomeIcon icon="fa-solid fa-square-binary" />
                                    </Box>
                                    <Box>Qt Creator v{model.qtCreatorVersion}</Box>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    spacing={1}
                                    alignItems={'center'}
                                >
                                    <Box width={16} textAlign={'center'}>
                                        <FontAwesomeIcon icon="fa-solid fa-square-binary" />
                                    </Box>
                                    <Box>Qt v{model.qtVersion}</Box>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    spacing={1}
                                    alignItems={'center'}
                                >
                                    <Box width={16} textAlign={'center'}>
                                        <FontAwesomeIcon icon="fa-solid fa-trowel-bricks" />
                                    </Box>
                                    <Box>{model.buildDate}</Box>
                                </Stack>
                            </Stack>
                        </Typography>
                    </Stack>

                    <ButtonGroup
                        variant={'outlined'}
                        color={'primarySdk'}
                        disabled={isUpdate}
                    >
                        <Tooltip title={t('common.t_btn_open_dir')} placement="top">
                            <Button
                                onClick={async () => {
                                    try {
                                        await Methods.appOpenDir(model.dir);
                                    } catch (e) {
                                        await onRefresh();
                                    }
                                }}
                            >
                                <FolderOpen color={'default'} />
                            </Button>
                        </Tooltip>
                        <Tooltip title={t('sdk.t_btn_tools')} placement="top">
                            <Button
                                onClick={async () => {
                                    try {
                                        await Methods.sdkToolsById(model.id);
                                    } catch (e) {
                                        await onRefresh();
                                    }
                                }}
                            >
                                <Handyman color={'default'} />
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                </Stack>
            </CardContent>
        </CardGradient>
    );
}

SdkHeader.propTypes = {
    model: PropTypes.object.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
};
