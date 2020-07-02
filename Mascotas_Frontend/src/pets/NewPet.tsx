import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import "../styles.css"
import { deletePet, loadPet, newPet, savePet } from "./petsService"
import DangerLabel from "../common/components/DangerLabel"
import FormInput from "../common/components/FormInput"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormWarnButton from "../common/components/FormWarnButton"
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"

export default function NewPet(props: RouteComponentProps<{ idPet: string }>) {
    const [petId, setPetId] = useState(String)
    const [name, setName] = useState(String)
    const [description, setDescription] = useState(String)
    const [birthDate, setBirthDate] = useState(String)
    const [lostPetId, setLostPetId] = useState(String)


    const errorHandler = useErrorHandler()

    const loadPetById = async (id: string) => {
        if (id) {
            try {
                const result = await loadPet(id)
                setBirthDate(result.birthDate)
                setPetId(result.id)
                setName(result.name)
                setDescription(result.description)
                result.lostPetId ? setLostPetId(result.lostPetId) : setLostPetId("");
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }
    const deleteClick = async () => {
        if (petId) {
            try {
                await deletePet(petId)
                props.history.push("/pets")
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }

    const saveClick = async () => {
        errorHandler.cleanRestValidations()
        if (!name) {
            errorHandler.addError("name", "No puede estar vacío")
        }

        if (errorHandler.hasErrors()) {
            return
        }

        try {
            if (petId) {
                await savePet({ id: petId, name, birthDate, description, lostPetId})
            } else {
                await newPet({ id: petId, name, birthDate, description, lostPetId})
            }
            props.history.push("/pets")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {
        const id  = props.match.params.idPet
        if (id) {
            void loadPetById(id)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Nueva Mascota</FormTitle>

            <Form>
                <FormInput
                    label="Nombre"
                    name="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Descripción"
                    name="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Fecha de Nacimiento"
                    name="birthDate"
                    value={birthDate}
                    onChange={event => setBirthDate(event.target.value)}
                    errorHandler={errorHandler} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Guardar" onClick={saveClick} />

                    <FormWarnButton hidden={!petId} label="Eliminar" onClick={deleteClick} />

                    <FormButton label="Cancelar" onClick={() => props.history.goBack()} />

                </FormButtonBar>
            </Form >
        </GlobalContent>
    )
}
