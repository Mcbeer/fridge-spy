import { ILocationProduct } from '@fridgespy/types';
import React from 'react';
import { LocationEntryStatus } from '../LocationEntryStatus/LocationEntryStatus';
import { LocationEntryItemElement, LocationEntryItemProductDisplay } from './LocationEntryItem.styles';

export const LocationEntryItem = ({ id, product, productType, amount, maximumAmount, minimumAmount }: ILocationProduct) => (
    <LocationEntryItemElement>
        <div id="image"></div>
        <LocationEntryItemProductDisplay>
            <>
            {product && product.name}
            {productType && productType.name}
            </>
        </LocationEntryItemProductDisplay>
        <LocationEntryStatus amount={amount} maximumAmount={maximumAmount} minimumAmount={minimumAmount} />
        <div id="actions"></div>
    </LocationEntryItemElement>
)