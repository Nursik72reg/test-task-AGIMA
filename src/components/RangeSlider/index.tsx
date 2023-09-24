import {IRangeSliderProps} from "./interfaces";
import './rangeSlider.css'
import {memo} from "react";

export const RangeSlider = memo(({...rest}: IRangeSliderProps) => {

    return (
        <div className='range-slider-wrap'>
            <input
                {...rest}
                className='range'
                type="range"
                min="0"
                max="1"
                step="0.01"
            />
        </div>

    );
})
