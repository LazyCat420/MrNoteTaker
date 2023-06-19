import React from 'react';
import { createBoard } from '@wixc3/react-board';
import Index from '../../../pages';

export default createBoard({
    name: 'Index',
    Board: () => <Index />,
    environmentProps: {
        canvasBackgroundColor: '#ffffff',
        windowWidth: 466,
        windowHeight: 851
    }
});
