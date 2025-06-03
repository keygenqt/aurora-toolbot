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

import {
    List,
    ListItemButton,
    ListItemText,
} from '@mui/material';

import { MainDialog } from './MainDialog';

export function SelectItemDialog(props) {
    const { t } = useTranslation();
    const [selectedIndex, setSelectedIndex] = React.useState(undefined);
    const {
        icon,
        title,
        color,
        open,
        data,
        onClickBtn,
    } = props
    return (
        <MainDialog
            icon={icon}
            open={open}
            color={color}
            title={title}
            state={'select'}
            body={data && data.length !== 0 ? undefined : t('common.t_dialog_empty_data.body')}
            btnDisable={selectedIndex === undefined}
            onClickBtnCancel={() => {
                // Clear
                setSelectedIndex(undefined);
                // Send data
                onClickBtn(undefined);
            }}
            onClickBtn={() => {
                // Save data
                const value = data[selectedIndex];
                // Clear
                setSelectedIndex(undefined);
                // Send data
                onClickBtn(value);
            }}
        >
            <List
                component={'nav'}
                sx={{
                    padding: 0,
                    '& .MuiTypography-root': {
                        fontSize: '12px'
                    },
                    '& .MuiButtonBase-root.Mui-selected': {
                        backgroundColor: `rgba(39, 76, 64, 0.13)`
                    }
                }}
            >
                {data && data.map((e, index) => (
                    <ListItemButton
                        key={`index-${index}`}
                        selected={selectedIndex === index}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <ListItemText primary={`${index + 1}. ${e.value}`} />
                    </ListItemButton>
                ))}
            </List>
        </MainDialog>
    );
}

SelectItemDialog.propTypes = {
    icon: PropTypes.object,
    title: PropTypes.string,
    color: PropTypes.string,
    open: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    onClickBtn: PropTypes.func.isRequired,
};
