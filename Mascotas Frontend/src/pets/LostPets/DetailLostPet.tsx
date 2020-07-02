import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"

import { useErrorHandler } from "../../common/utils/ErrorHandler"

import FormButton from "../../common/components/FormButton"
import FormButtonBar from "../../common/components/FormButtonBar"

import { loadLostPet, LostPet, getLostPetPictureUrl } from "./lostPetsService"



export default function DetailLostPet(props: RouteComponentProps<{ idLostPet: string }>) {

    // HOOKS
    const [lostPet, setLostPet] = useState({ name: "" } as LostPet)
    const errorHandler = useErrorHandler()


    useEffect(() => {

        const loadLostPetById = async (id: string) => {
            if (id) {
                try {
                    const result = await loadLostPet(id)
                    setLostPet(result)

                } catch (error) {
                    errorHandler.processRestValidations(error)
                }
            }
        }

        const id = props.match.params.idLostPet
        void loadLostPetById(id)
    }, [])

    return (
        <div>
            <div className="jumbotron text-center">
                <h1>Detalle Mascota Perdida</h1>
            </div>


            <div style={lostPet.picture === "" ? { display: "none" } : {}}>
                <img className="img-responsive" src={getLostPetPictureUrl(lostPet.picture ? lostPet.picture : "")} alt="IMAGE PETS" width="50%" height="50%" />
                <br />
            </div>


            <div className="card" style={{ marginTop: "20px" }}>
                <div className="card-body">
                    <h4 className="card-title">Nombre:</h4>
                    <h4 className="card-title">{lostPet.name}</h4>
                </div>
            </div>


            <div className="card" style={{ marginTop: "20px" }}>
                <div className="card-body">
                    <h4 className="card-title">Descrepcion:</h4>
                    <p className="card-text">{lostPet.description}</p>
                </div>
            </div>


            <div className="card" style={lostPet.direction === "" ? { display: "none" } : { marginTop: "20px" }}>
                <div className="card-body">
                    <h4 className="card-title">La ultima vez visto fue en:</h4>
                    <p className="card-text">{lostPet.direction}</p>
                </div>
            </div>


            <div className="card" style={lostPet.reward === 0 ? { display: "none" } : { marginTop: "20px"}}>
                <div className="card-body">
                    <h4 className="card-title">Recompensa:</h4>
                    <p className="card-text">{lostPet.reward}</p>
                </div>
            </div>


            <div className="card" style={{ marginTop: "20px" , marginBottom: "30px"}}>
                <div className="card-body">
                    <h4 className="card-title">Si lo has visto comunicate al:</h4>
                    <p className="card-text">{lostPet.phone}</p>
                </div>
            </div>


            <FormButtonBar>
                <FormButton label="Volver" onClick={() => props.history.goBack()} />
            </ FormButtonBar>
        </div >
    )
}