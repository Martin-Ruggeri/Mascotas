import React from "react"
import { ErrorHandler } from "../utils/ErrorHandler"
import ErrorLabel from "./ErrorLabel"

interface FormInputProps {
    type?: "text" | "number" | "button" | "checkbox" | "date" | "email" | "file" | "password" | "radio",
    label: string,
    name: string,
    errorHandler: ErrorHandler,
    value?: string | undefined,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any,
    placeholder?: string,
    isDisabled?: boolean,
}

export default function FormInput(props: FormInputProps) {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input id={props.name}
                type={props.type ? props.type : "text"}
                value={props.value}
                onChange={props.onChange}
                className={props.errorHandler.getErrorClass(props.name, "form-control")}
                placeholder = {props.placeholder}
                disabled = {props.isDisabled}>
            </input>
            <ErrorLabel message={props.errorHandler.getErrorText(props.name)} />
        </div>
    )
}