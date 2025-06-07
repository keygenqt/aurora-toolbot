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

import {
    useTheme,
    Card,
    Box,
} from '@mui/material';

export function CardGradient(props) {
    const theme = useTheme();
    const color = props.color ? props.color : theme.palette.inherit.main;
    return (
        <Box sx={{
            width: 1,
            borderRadius: 2,
            backgroundColor: 'background.default',
        }}>
            <Card
                sx={{
                    border: `1px solid ${color}5e`,
                    background: `linear-gradient(to right, transparent 0%, ${color}1c 100%)`
                }}
            >
                {props.children}
            </Card>
        </Box>

    );
}

CardGradient.propTypes = {
    color: PropTypes.color,
    children: PropTypes.element.isRequired,
};
