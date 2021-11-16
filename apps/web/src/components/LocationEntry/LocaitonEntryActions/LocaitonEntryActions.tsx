import React from 'react';
import { Button } from '../../Button/Button';
import { LocaitonEntryActionsElement } from './LocaitonEntryActions.styles';

export const LocaitonEntryActions = () => (
    <LocaitonEntryActionsElement>
        <Button label="Edit" onClick={() => console.log('Edit item')} />
        <Button label="Delete" onClick={() => console.log('Delete item')} />
    </LocaitonEntryActionsElement>
)