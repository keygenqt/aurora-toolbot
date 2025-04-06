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
import { useSelector } from 'react-redux';
import { setData as setStateBool } from '../../store/impl/stateBool';

/**
 * Listen change
 */
export function useEffectStateBool(key) {
    const stateBool = useSelector((state) => state.stateBool.data);
    return stateBool.hasOwnProperty(key) ? stateBool[key] : false;
}

/**
 * Set bool state
 */
export async function setEffectStateBool(dispatch, key, state) {
    dispatch(setStateBool({ key: key, value: state }));
}
