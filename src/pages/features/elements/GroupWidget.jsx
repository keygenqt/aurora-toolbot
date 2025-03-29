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
    Typography,
    ListItem,
    CardContent,
} from '@mui/material';

export function GroupWidget(props) {
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

GroupWidget.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
