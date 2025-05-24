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
import { FolderOpen } from '@mui/icons-material';
import { MainDialog } from './MainDialog';

export function SelectDialog(props) {
    const { t } = useTranslation();
    const {
        open,
        color,
    } = props
    return (
        <MainDialog
            icon={FolderOpen}
            open={open}
            color={color}
            title={t('common.t_dialog_select_file.title')}
            body={t('common.t_dialog_select_file.body')}
        />
    );
}

SelectDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    color: PropTypes.string,
};
