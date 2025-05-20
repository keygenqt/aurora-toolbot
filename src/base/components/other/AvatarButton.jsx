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
    Button,
    Stack,
    Avatar,
    Typography,
} from '@mui/material'

export function AvatarButton(props) {

    const {
        title,
        text,
        onClick,
        disabled,
    } = props;

    const Icon = props.icon;

    return (
        <Button
            sx={{
                borderRadius: 2,
                padding: 0,
                overflow: 'hidden'
            }}
            onClick={onClick}
            disabled={disabled}
        >
            <Stack
                direction={'column'}
                spacing={2}
                sx={{
                    width: 1,
                    padding: 1.5,
                    backgroundColor: 'background.default',
                }}
            >
                <Stack
                    direction={'row'}
                    spacing={1.5}
                    sx={{
                        '& .MuiSvgIcon-root': {
                            height: '65%'
                        }
                    }}
                >
                    {Icon && (
                        <Avatar sx={{
                            width: 47,
                            height: 47,
                        }}>
                            <Icon color={'default'} />
                        </Avatar>
                    )}
                    <Stack
                        direction={'column'}
                        spacing={0.5}
                        sx={{
                            width: 1,
                            textAlign: 'left',
                            justifyContent: 'center',
                        }}
                    >
                        {title && (
                            <Typography variant="subtitle2" >
                                {title}
                            </Typography>
                        )}
                        <Typography variant="body2">
                            {text}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Button>
    );
}

AvatarButton.propTypes = {
    color: PropTypes.string,
    disabled: PropTypes.bool,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
};
