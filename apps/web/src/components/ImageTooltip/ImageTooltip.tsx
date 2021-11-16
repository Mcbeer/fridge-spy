import React from 'react';
import { AiOutlineCamera } from 'react-icons/ai';

interface ImageTooltipProps {
    imageUrl: string;
}

export const ImageTooltip = ({ imageUrl }: ImageTooltipProps) => {
    return (
        <div data-tip={`<img style="height: 200px; width: 200px;" src="${imageUrl}"/>`} data-html={true} data-place="right" data-effect="solid" >
            <AiOutlineCamera size="1.3rem" />            
        </div>
    );
};
