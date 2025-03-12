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
import Lottie from "lottie-react";

import { Box } from '@mui/material';

import { DataLottie } from '../../base';

export function LottieLoading() {
    return (
        <Box sx={{
            width: 90,
            height: 24,
        }}>
            <Lottie
                style={{position: 'relative', top: -33}}
                loop={true}
                animationData={DataLottie.loading}
            />
        </Box>
    );
}

LottieLoading.propTypes = {};
