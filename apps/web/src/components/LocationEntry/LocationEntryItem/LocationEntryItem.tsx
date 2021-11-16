import { ILocationProduct } from '@fridgespy/types';
import React from 'react';
import { ImageTooltip } from '../../ImageTooltip/ImageTooltip';
import { LocaitonEntryActions } from '../LocaitonEntryActions/LocaitonEntryActions';
import { LocationEntryStatus } from '../LocationEntryStatus/LocationEntryStatus';
import { LocationEntryItemElement, LocationEntryItemProductDisplay } from './LocationEntryItem.styles';

export const LocationEntryItem = ({ id, product, productType, amount, maximumAmount, minimumAmount }: ILocationProduct) => (
    <LocationEntryItemElement>
        <ImageTooltip imageUrl="https://m.media-amazon.com/images/M/MV5BNzg0MWEyZjItOTZlMi00YmRjLWEyYzctODIwMDU0OThiMzNkXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg" />
        <LocationEntryItemProductDisplay>
            <>
            {product && product.name}
            {productType && productType.name}
            </>
        </LocationEntryItemProductDisplay>
        <LocationEntryStatus amount={amount} maximumAmount={maximumAmount} minimumAmount={minimumAmount} />
        <LocaitonEntryActions />
    </LocationEntryItemElement>
)