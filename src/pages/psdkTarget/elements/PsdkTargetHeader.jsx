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
    Link,
} from '@mui/material';

import {
    FolderOpen,
    Terminal,
} from '@mui/icons-material';

import { AppUtils, DataImages, CardGradient } from '../../../base';
import { Methods } from '../../../modules';

export function PsdkTargetHeader(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    // data
    let {
        model,
        target,
        isUpdate,
        onUpdate,
        onAnimate,
        onRefresh,
    } = props;
    const color = theme.palette.primaryPsdkTarget.main;
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
                        src={DataImages.iconTarget}
                        alt='Icon' />

                    <Typography variant="h6" >
                        Platform SDK Target
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
                                        <FontAwesomeIcon icon="fa-solid fa-signature" />
                                    </Box>
                                    <Box>{target.name}</Box>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    spacing={1}
                                    alignItems={'center'}
                                >
                                    <Box width={16} textAlign={'center'}>
                                        <FontAwesomeIcon icon="fa-solid fa-microchip" />
                                    </Box>
                                    <Box>{target.arch}</Box>
                                </Stack>
                            </Stack>
                        </Typography>
                    </Stack>

                    <ButtonGroup
                        variant={'outlined'}
                        color={'primaryPsdkTarget'}
                        disabled={isUpdate}
                    >
                        <Tooltip title={t('common.t_btn_open_dir')} placement="top">
                            <Button
                                onClick={async () => {
                                    onAnimate(true);
                                    try {
                                        await Methods.app_open_dir(target.dir);
                                    } catch (e) {
                                        await onRefresh();
                                    }
                                    onAnimate(false);
                                }}
                            >
                                <FolderOpen color={'default'} />
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                </Stack>
            </CardContent>
        </CardGradient>
    );
}

PsdkTargetHeader.propTypes = {
    model: PropTypes.object.isRequired,
    target: PropTypes.object.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onAnimate: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
};
