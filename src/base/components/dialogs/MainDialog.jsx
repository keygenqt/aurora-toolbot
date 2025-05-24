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
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

import {
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    LinearProgress,
    Stack,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';

export function MainDialog(props) {
    const { t } = useTranslation();
    const theme = useTheme();

    const {
        icon,
        title,
        body,
        open,
        color,
        state,
        progress,
        onClickBtn,
    } = props

    const Icon = icon;
    const stateData = state ? state : 'default'
    const colorName = color ? color : 'primary'
    const colorForce = (stateData == "error" || stateData == "success") ? stateData : colorName

    return (
        <Dialog
            open={open}
            dismiss={{ enabled: false }}
            aria-labelledby="progress-dialog-title"
            aria-describedby="progress-dialog-description"
            sx={{
                '& .MuiPaper-root': {
                    width: '100%',
                    maxWidth: '335px',
                },
                '& .MuiDialogContent-root': {
                    borderTop: '1px solid ' + theme.palette.inherit.light,
                },
                '& .MuiDialogActions-root': {
                    borderTop: '1px solid ' + theme.palette.inherit.light,
                }
            }}
        >
            <DialogTitle id="progress-dialog-title">
                <Stack spacing={1.5} >
                    <Stack
                        direction={'row'}
                        spacing={1.2}
                        sx={{ alignItems: "center" }}
                    >
                        {icon && (
                            <Icon color={colorForce} />
                        )}
                        <Typography variant={'subtitle1'} color={colorForce} >
                            {title}
                        </Typography>
                    </Stack>
                    {(progress !== null && progress !== undefined) && (
                        <LinearProgress
                            color={colorForce}
                            variant={'determinate'}
                            value={progress}
                        />
                    )}
                </Stack>
            </DialogTitle>
            {body && (
                <DialogContent>
                    <Stack sx={{ paddingTop: '18px' }} >
                        <DialogContentText id="progress-dialog-description" >
                            {body}
                        </DialogContentText>
                    </Stack>
                </DialogContent>
            )}
            {onClickBtn && (stateData == "default" && progress !== null && progress !== undefined && progress !== 0 && progress !== 100) && (
                <DialogActions>
                    <Button
                        color={colorName}
                        onClick={onClickBtn}>
                        {t('common.t_dialog_btn_default')}
                    </Button>
                </DialogActions>
            )}
            {onClickBtn && (stateData != "default") && (
                <DialogActions>
                    {stateData == "error" && (
                        <Button
                            color={colorName}
                            onClick={onClickBtn}>
                            {t('common.t_dialog_btn_error')}
                        </Button>
                    )}
                    {stateData == "success" && (
                        <Button
                            color={stateData}
                            onClick={onClickBtn}>
                            {t('common.t_dialog_btn_success')}
                        </Button>
                    )}
                </DialogActions>
            )}
        </Dialog>
    );
}

MainDialog.propTypes = {
    icon: PropTypes.object,
    title: PropTypes.string,
    body: PropTypes.string,
    open: PropTypes.bool.isRequired,
    color: PropTypes.string,
    state: PropTypes.oneOf(['default', 'success', 'error']).isRequired,
    progress: PropTypes.number,
    onClickBtn: PropTypes.func.isRequired,
};
