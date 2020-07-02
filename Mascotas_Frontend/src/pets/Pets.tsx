import React, { useState, useEffect } from "react"
import { Pet, loadPets, savePet } from "./petsService"
import "../styles.css"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import DangerLabel from "../common/components/DangerLabel"
import { RouteComponentProps } from "react-router-dom"
import { deleteLostPet } from "./LostPets/lostPetsService"


export default function Pets(props: RouteComponentProps) {
    const [pets, setPets] = useState<Pet[]>([])

    const errorHandler = useErrorHandler()


    const loadCurrentPets = async () => {
        try {
            const result = await loadPets()
            setPets(result)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const editPetClick = (petId: string) => {
        props.history.push("/editPet/" + petId)
    }

    const newPetClick = () => {
        props.history.push("/editPet")
    }

    const lostPet = (petId: string) => {
        props.history.push("pet/" + petId + "/editLost_pet/")
    }

    const foundPet = async (pet: Pet) => {
        try {
            if(!pet.lostPetId) return;
            await deleteLostPet(pet.lostPetId)
            await savePet({ id: pet.id, name: pet.name, description: pet.description, birthDate: pet.birthDate, lostPetId: "" })
            void loadCurrentPets()
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {
        void loadCurrentPets()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <FormTitle>Mascotas</FormTitle>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th> Nombre </th>
                        <th> Descripción </th>
                        <th> </th>
                        <th> </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, i) => {
                        return (
                            <tr key={i}>
                                <td>{pet.name}</td>
                                <td>{pet.description}</td>
                                <td className="text">
                                    <img
                                        src="/assets/edit.png"
                                        alt=""
                                        onClick={() => editPetClick(pet.id)} />
                                </td>
                                <td>
                                    <FormButton label="Perdida" disabled={pet.lostPetId === "" ? false : true} onClick={() => lostPet(pet.id)} />
                                </td>
                                <td>
                                    <FormButton label="Encontrada" disabled={pet.lostPetId === "" ? true : false} onClick={() => foundPet(pet)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


            <DangerLabel message={errorHandler.errorMessage} />

            <FormButtonBar>
                <FormAcceptButton label="Nueva Mascota" onClick={newPetClick} />
                <FormButton label="Cancelar" onClick={() => goHome(props)} />
            </FormButtonBar>
        </div>
    )
}
