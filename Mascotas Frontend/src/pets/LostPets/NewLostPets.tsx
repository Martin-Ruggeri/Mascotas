import React, { useEffect, useState } from "react"

import { useErrorHandler } from "../../common/utils/ErrorHandler"
import DangerLabel from "../../common/components/DangerLabel"
import ErrorLabel from "../../common/components/ErrorLabel"

import FormInput from "../../common/components/FormInput"
import FormButtonBar from "../../common/components/FormButtonBar"
import FormAcceptButton from "../../common/components/FormAcceptButton"
import FormButton from "../../common/components/FormButton"
import FormTitle from "../../common/components/FormTitle"
import Form from "../../common/components/Form"
import GlobalContent from "../../common/components/GlobalContent"
import ImageUpload from "../../common/components/ImageUpload"

import { RouteComponentProps } from "react-router-dom"

import { loadLostPet, saveLostPet, newLostPet , updateLostPetPicture, getLostPetPictureUrl} from "./lostPetsService"

import { Pet, savePet, loadPet } from "../petsService"

import { getCurrentProfile} from "../../profile/profileService"


export default function NewLostPet(props: RouteComponentProps<{ idPet: string, idLostPet: string }>) {

    const [idLostPet, setIdLostPet] = useState(String)
    const [idPet, setIdPet] = useState(String)
    const [name, setName] = useState(String)
    const [description, setDescription] = useState(String)
    const [direction, setDirection] = useState(String)
    const [reward, setReward] = useState(Number)
    const [telephone, setTelephone] = useState(String)
    const [picture, setPicture] = useState(String)

    const [pet, setPet] = useState({ id: "" } as Pet)

    const errorHandler = useErrorHandler()


    const loadPetById = async (id: string) => {
        if (id) {
            try {
                const result = await loadPet(id)
                setPet(result)
                setName(result.name)
                setDescription(result.description)

                const profile = await getCurrentProfile()
                setTelephone(profile.phone);
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }

    const loadLostPetById = async (id: string) => {
        if (id) {
            try {
                const result = await loadLostPet(id)
                setIdLostPet(result.id)
                setIdPet(result.pet)
                setName(result.name)
                result.picture ? setPicture(result.picture) : setPicture("");
                setDescription(result.description)
                result.direction ? setDirection(result.direction) : setDirection("");
                result.reward ? setReward(result.reward) : setReward(0);
                setTelephone(result.phone)

            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }

    const saveClick = async () => {
        errorHandler.cleanRestValidations()
        if (!telephone) {
            errorHandler.addError("telephone", "No puede estar vacío")
        }
        if (!description) {
            errorHandler.addError("description", "No puede estar vacío")
        }
        if (!name) {
            errorHandler.addError("name", "Mascota no cargada")
        }
        if (errorHandler.hasErrors()) {
            return
        }

        try {

            if (idLostPet) {
                await saveLostPet({ id: idLostPet, pet: idPet, name, picture, description, direction, reward, phone: telephone })
            } else {
                if (pet.id !== "") {
                    const resultLostPet = await newLostPet({ id: idLostPet, pet: pet.id, name, picture, description, direction, reward, phone: telephone })
                    setIdLostPet(resultLostPet.id);
                    await savePet({ id: pet.id, name: pet.name, birthDate: pet.birthDate, description: pet.description, lostPetId: resultLostPet.id })
                }
            }

            props.history.push("/pets/lost_pets")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }


    const uploadPicture = async (image: string) => {
        try {

            if (!image || image.length == 0) return;
            const result = await updateLostPetPicture({
                image,
            })
            setPicture(result.id)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }


    useEffect(() => {
        const id = props.match.params.idLostPet
        const idPet = props.match.params.idPet

        if (id) {
            void loadLostPetById(id)
        } else {
            void loadPetById(idPet)
        }

    }, [])

    return (
        <GlobalContent>
            <FormTitle>Mascota Perdida</FormTitle>

            <Form>
                <FormInput
                    label="Nombre"
                    name="name"
                    value={name}
                    errorHandler={errorHandler}
                    isDisabled />

                <div className="form-group">
                    <label>Profile Picture</label>
                    <ImageUpload src={getLostPetPictureUrl(picture)}
                        onChange={uploadPicture} />
                    <ErrorLabel message={errorHandler.getErrorText("name")} />
                </div>

                <FormInput
                    label="Descripción"
                    name="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Ultima vez visto (Dirección)"
                    name="direction"
                    value={direction}
                    onChange={event => setDirection(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Recompensa"
                    type="number"
                    name="reward"
                    value={String(reward)}
                    onChange={event => setReward(parseInt(event.target.value))}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Celular"
                    name="telephone"
                    value={telephone}
                    onChange={event => setTelephone(event.target.value)}
                    placeholder="(Código de área) Número"
                    errorHandler={errorHandler} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Guardar" onClick={saveClick} />

                    <FormButton label="Cancelar" onClick={() => props.history.goBack()} />

                </FormButtonBar>
            </Form >
        </GlobalContent>
    )
}
