import React from 'react';
import { createBoard } from '@wixc3/react-board';
import Index from '../../../pages';

export default createBoard({
    name: 'Index',
    Board: () => <Index />,
    environmentProps: {
        canvasWidth: 251,
        canvasHeight: 164,
        windowWidth: 1024,
        windowHeight: 768
    }
});
