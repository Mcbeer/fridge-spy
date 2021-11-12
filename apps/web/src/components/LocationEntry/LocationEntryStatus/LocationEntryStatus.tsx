import { ILocationProduct } from '@fridgespy/types';
import { clamp } from 'lodash';
import React, { useMemo } from 'react';
import './LocationEntryStatus.scss'

export const LocationEntryStatus = ({ amount, maximumAmount, minimumAmount }: Pick<ILocationProduct, 'amount' | 'maximumAmount' | 'minimumAmount'>) => {
    const getStatusProgress = () => {
        return clamp((100 / maximumAmount) * amount, 0, 100);
    }
    
    const getStatusColor = () => {
        if(statusProgress > 75) {
            return 'green'
        }

        if(statusProgress > 25) {
            return 'yellow'
        }

        return 'red'
    }

    const statusProgress = useMemo(() => getStatusProgress(), [amount, maximumAmount]);
    const statusColor = useMemo(() => getStatusColor(), [amount, maximumAmount, minimumAmount]);

    console.log(statusProgress, statusColor)


    return (
        <div className="LocationEntryStatus">
            <div className="LocationEntryStatus__bar" style={{ width: `${statusProgress}%`, backgroundColor: statusColor }} />
        </div>
    )
}