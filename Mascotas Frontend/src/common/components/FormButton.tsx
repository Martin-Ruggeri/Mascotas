import React from "react"

interface FormButtonProps {
    label: string,
    onClick: () => any,
    disabled?: boolean
    className?: string;
}

export default function FormButton(props: FormButtonProps) {
    return (
        <button
            className={props.className ? props.className : "btn btn-light"}
            disabled={props.disabled ? props.disabled : false}
            onClick={props.onClick}>
                
                {props.label}
        </button>
    )
}
