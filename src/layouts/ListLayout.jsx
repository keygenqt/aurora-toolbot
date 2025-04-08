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
    ListItem,
    List,
    Stack,
} from '@mui/material';

import {
    useEffectStateBool,
    StateEmpty,
    StateError,
    StateLoading,
    ActionBack,
    ActionRefreshState,
} from '../base';

import { AppBarLayout } from '../layouts';

export function ListLayout(props) {
    // data
    const {
        disable,
        models,
        updateStates,
        reduxKey,
        itemList,
    } = props

    const isUpdate = useEffectStateBool(reduxKey);
    // page
    return (
        <AppBarLayout index actions={(
            <Stack direction={'row'} spacing={1}>
                <ActionBack disabled={isUpdate || disable} />
                <ActionRefreshState
                    disable={disable}
                    animate={isUpdate}
                    onClick={async () => {
                        await updateStates();
                    }}
                />
            </Stack>
        )} >
            {isUpdate ? (
                <StateLoading />
            ) : models === null ? (
                <StateError />
            ) : models === undefined || Array.isArray(models) && models.length === 0 ? (
                <StateEmpty />
            ) : (
                <List>
                    {models.map((model, index) => (
                        <ListItem key={`index-${index}`}>
                            {itemList(model, `index-${index}`)}
                        </ListItem>
                    ))}
                </List>
            )}
        </AppBarLayout>
    )
}

ListLayout.propTypes = {
    disable: PropTypes.bool,
    models: PropTypes.array,
    updateStates: PropTypes.func.isRequired,
    reduxKey: PropTypes.string.isRequired,
    itemList: PropTypes.func.isRequired,
};
