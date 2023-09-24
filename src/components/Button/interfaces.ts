import {ButtonHTMLAttributes, ReactNode} from "react";

export type TypeIcon = 'pause' |  'rewindBack' | 'rewindForward'

export enum ButtonSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l'
}

export interface Icons {
    pause: ReactNode;
    rewindBack: ReactNode;
    rewindForward: ReactNode;
}


export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    typeIcon: TypeIcon;
    className?: string;
    disabled?: boolean
    size?: ButtonSize;
    text?: string;
}
