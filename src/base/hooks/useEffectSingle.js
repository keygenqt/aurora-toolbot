import * as React from 'react';

export function useEffectSingle(effect) {
    const wasCalled = React.useRef(false);
    React.useEffect(() => {
        if(wasCalled.current) return;
        wasCalled.current = true;
        effect();
    }, [effect]);
}
