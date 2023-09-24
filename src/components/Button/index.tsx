import PauseSVG from '../../../src/assets/svg/pause-stream.svg?react'
import RewindBackSVG from '../../../src/assets/svg/rewind-back.svg?react'
import RewindForward from '../../../src/assets/svg/rewind-forward.svg?react'
import {ButtonSize, IButtonProps, Icons} from "./interfaces";
import './button.css'
import  {memo} from "react";
import {classNames} from "../../helpers/classNames";


const icons: Icons  = {
    'pause': <PauseSVG/>,
    'rewindBack': <RewindBackSVG/>,
    'rewindForward': <RewindForward/>,
}

const Button =  memo( ({typeIcon, className, disabled, size = ButtonSize.S, text, ...rest}: IButtonProps) => {
    const mods = {
        'disabled': disabled,
    };
    return (
        <button className={classNames('btn', mods, [size, className])} {...rest}>
            {icons[typeIcon]}
            {text}
        </button>
    );
})

export default Button;
