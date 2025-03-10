import * as React from 'react';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';

export function BaseLayout(props) {
    return (
        <Box
            height={1}
            boxSizing={'border-box'}
            sx={{p: 4}}
        >
            {props.children}
        </Box>
    )
}

BaseLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
