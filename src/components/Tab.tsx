import React, { useState, useCallback, useEffect } from 'react';
import { CUSTOM_DARK_BLUE, CUSTOM_WHITE } from '../colors';

export interface TabProps {
    tabKey: number;
    label: string;
    selected: number;
    onClick;
}

const baseStyleObject = {
    marginTop: 0,
    marginBottom: 0,
}
const buttonStyleObject = (backgroundColor: string): React.CSSProperties => {
    return {
        ...baseStyleObject,
        backgroundColor: backgroundColor,
    }
}
const buttonTextStyleObject = (color: string): React.CSSProperties => {
    return {
        ...baseStyleObject,
        marginLeft: '0.5em',
        marginRight: '0.5em',
        color: color
    }
}

export default function Tab(props: TabProps) {

    const [buttonColor, setButtonColor] = useState<string>('black');
    const [buttonTextColor, setButtonTextColor] = useState<string>('white');

    const focusButtonColorScheme = useCallback(() => {
        setButtonColor(CUSTOM_WHITE);
        setButtonTextColor(CUSTOM_DARK_BLUE);
    }, []);

    const blurButtonColorScheme = useCallback(() => {
        setButtonColor(CUSTOM_DARK_BLUE);
        setButtonTextColor(CUSTOM_WHITE);
    }, []);

    useEffect(() => {
        if (props.selected === props.tabKey) {
            focusButtonColorScheme();
        } else {
            blurButtonColorScheme();
        }
    }, [props.selected, props.tabKey, focusButtonColorScheme, blurButtonColorScheme]);

    const handleMouseOver = useCallback(() => {
        focusButtonColorScheme();
    }, [focusButtonColorScheme]);

    const handleMouseLeave = useCallback(() => {
        if (props.selected !== props.tabKey) {
            blurButtonColorScheme();
        }
    }, [props.selected, props.tabKey, blurButtonColorScheme]);

    return (
        <div
            style={buttonStyleObject(buttonColor)}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={props.onClick}
        >
            <p style={buttonTextStyleObject(buttonTextColor)}>{props.label}</p>
        </div>
    )
}