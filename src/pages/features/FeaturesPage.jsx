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

import {
    useTheme,
    Typography,
    ListItem,
    List,
    Card,
    CardActionArea,
    CardContent,
    CardActions,
    IconButton,
    Tooltip,
    Stack,
    Box,
    Button,
} from '@mui/material';

import { InstallDesktop, KeyboardArrowRight, NewReleases } from '@mui/icons-material';

import { DataImages, AppUtils } from '../../base'

export function FeaturesPage(props) {
    // components
    const { t } = useTranslation();
    // page
    return (
        <List>
            <GroupWidget
                title={t('features.devices.t_title')}
                text={t('features.devices.t_text')}
            />
            <EmulatorItem />
            <GroupWidget
                title={t('features.tools.t_title')}
                text={t('features.tools.t_text')}
            />
            <SdkItem />
            <PsdkItem />
            <FlutterItem />
            <GroupWidget
                title={t('features.assistant.t_title')}
                text={t('features.assistant.t_text')}
            />
            <FAQItem />
        </List>
    );
}

function GroupWidget(props) {
    return (
        <ListItem>
            <CardContent sx={{ p: '0 !important' }}>
                <Typography
                    gutterBottom
                    variant="subtitle2"
                    color={'text.primary'}
                >
                    {props.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {props.text}
                </Typography>
            </CardContent>
        </ListItem>
    );
}

function EmulatorItem() {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    // data
    const color = theme.palette.secondary.main
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
                        AppUtils.openPageDelay(navigate, 'emulators')
                    }}
                >
                    <CardContent>
                        <Box sx={{ paddingBottom: 1 }}>
                            <Typography variant="subtitle2" color={color} >
                                {t('features.emulator.t_title')}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {t('features.emulator.t_text')}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ListItem>
    );
}

function SdkItem() {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    // data
    const color = theme.palette.primarySdk.main;
    // item
    return (
        <ListItem>
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
                        sx={{ paddingBottom: 1, alignItems: "center" }}
                    >
                        <img
                            style={{ width: '16px', height: '16px' }}
                            src={DataImages.iconSdk}
                            alt='Icon' />
                        <Typography variant="subtitle2" color={color} >
                            {t('features.sdk.t_title')}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {t('features.sdk.t_text')}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    p: 2,
                    paddingTop: 0
                }}>
                    <Stack
                        direction={'row'}
                        spacing={0.5}
                    >
                        <Tooltip title={t('common.t_new_version')} placement="left-start">
                            <Box sx={{
                                fontSize: 0,
                                '& .MuiSvgIcon-root': {
                                    fontSize: 20, paddingY: '3px'
                                }
                            }}>
                                <NewReleases color={'info'} />
                            </Box>
                        </Tooltip>

                    </Stack>

                    <Tooltip title={t('common.t_install')} placement="left-start">
                        <IconButton
                            onClick={() => {
                                AppUtils.openPage(navigate, 'sdk');
                            }}
                        >
                            <InstallDesktop />
                        </IconButton>
                    </Tooltip>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        size={'small'}
                        color={'primarySdk'}
                        endIcon={<KeyboardArrowRight color="default" />}
                        variant="contained"
                        sx={{ opacity: 0.8 }}
                        onClick={() => {
                            console.log('@todo')
                        }}
                    >
                        {t('common.t_open')}
                    </Button>
                </CardActions>
            </Card>
        </ListItem>
    );
}

function PsdkItem() {
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

function FlutterItem() {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    // data
    const color = theme.palette.primaryFlutter.main;
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
                        AppUtils.openPage(navigate, 'flutter')
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
                                src={DataImages.iconFlutter}
                                alt='Icon' />
                            <Typography variant="subtitle2" color={color} >
                                {t('features.emulator.t_title')}
                            </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {t('features.emulator.t_text')}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ListItem>
    );
}

function FAQItem() {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    // data
    const color = theme.palette.info.main;
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
                        AppUtils.openPageDelay(navigate, 'faq')
                    }}
                >
                    <CardContent>
                        <Box sx={{ paddingBottom: 1 }}>
                            <Typography variant="subtitle2" color={color} >
                                {t('features.faq.t_title')}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {t('features.faq.t_text')}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ListItem>
    );
}

FeaturesPage.propTypes = {};
