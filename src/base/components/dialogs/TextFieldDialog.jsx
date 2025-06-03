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

import {
    useTheme,
    Box,
    TextField,
} from '@mui/material';

import { MainDialog } from './MainDialog';

export function TextFieldDialog(props) {
    const theme = useTheme();
    const [textValue, setTextValue] = React.useState(undefined);
    const {
        icon,
        title,
        placeholder,
        color,
        open,
        onClickBtn,
    } = props
    return (
        <MainDialog
            icon={icon}
            open={open}
            color={color}
            title={title}
            state={'text'}
            btnDisable={!Boolean(textValue)}
            onClickBtnCancel={() => {
                // Clear
                setTextValue(undefined);
                // Send data
                onClickBtn(undefined);
            }}
            onClickBtn={() => {
                // Save value
                const value = textValue;
                // Clear
                setTextValue(undefined);
                // Send data
                onClickBtn(value);
            }}
        >
            <Box sx={{ p: 1 }} >
                <TextField
                    sx={{
                        '& fieldset': {
                            borderColor: theme.palette[color].main + '7a !important',
                            borderWidth: '1px !important',
                        }
                    }}
                    placeholder={placeholder}
                    variant={'outlined'}
                    fullWidth
                    inputRef={(input) => input && input.focus()}
                    onChange={(event) => setTextValue(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && event.target.value.length !== 0) {
                            // Clear
                            setTextValue(undefined);
                            // Send data
                            onClickBtn(event.target.value);
                        }
                    }}
                />

            </Box>
        </MainDialog>
    );
}

TextFieldDialog.propTypes = {
    icon: PropTypes.object,
    title: PropTypes.string,
    color: PropTypes.string,
    placeholder: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClickBtn: PropTypes.func.isRequired,
};
