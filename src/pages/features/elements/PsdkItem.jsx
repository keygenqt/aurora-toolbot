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
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';

import {
    useTheme,
    Typography,
    ListItem,
    Card,
    CardActionArea,
    CardContent,
    Stack,
} from '@mui/material';

import { DataImages, AppUtils } from '../../../base';


export function PsdkItem(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    // data
    const color = theme.palette.primaryPsdk.main;
    // item
    return (
        <ListItem>
            <Card
                sx={{
                    border: `1px solid ${color}5e`,
                    background: `linear-gradient(to right, transparent 0%, ${color}1c 100%)`
                }}
            >
                <CardActionArea
                    onClick={() => {
                        AppUtils.openPage(navigate, 'psdk')
                    }}
                >
                    <CardContent>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ paddingBottom: 1, alignItems: "center" }}
                        >
                            <img
                                style={{ width: '16px', height: '16px' }}
                                src={DataImages.iconPsdk}
                                alt='Icon' />
                            <Typography variant="subtitle2" color={color} >
                                {t('features.psdk.t_title')}
                            </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {t('features.psdk.t_text')}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ListItem>
    );
}

PsdkItem.propTypes = {
    psdkInstalled: PropTypes.array,
    psdkAvailable: PropTypes.array,
};
