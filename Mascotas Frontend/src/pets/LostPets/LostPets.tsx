import React, { useState, useEffect } from "react"
import { useErrorHandler } from "../../common/utils/ErrorHandler"
import FormButtonBar from "../../common/components/FormButtonBar"
import FormButton from "../../common/components/FormButton"
import FormTitle from "../../common/components/FormTitle"
import { RouteComponentProps } from "react-router-dom"
import { LostPet, loadLostPets } from "./lostPetsService"

export default function LostPets(props: RouteComponentProps) {

  // HOOKS
  const [lostPets, setLostPets] = useState<LostPet[]>([]);
  const errorHandler = useErrorHandler();

  const loadCurrentPets = async () => {
    try {
      const result = await loadLostPets();
      setLostPets(result);
    } catch (error) {
      errorHandler.processRestValidations(error);
    }
  }

  const editPetClick = (lostPetId: string) => {
    props.history.push("/pet/editlost_pet/" + lostPetId);
  }

  const detailClicl = (lostPetId: string) => {
    props.history.push("/pet/lostPet/detail/" + lostPetId);
  }


  useEffect(() => {

    void loadCurrentPets();

  }, [])


  return (
    <div>
      <FormTitle>Mascotas Perdidas</FormTitle>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th> Nombre </th>
            <th> Descripción </th>
            <th> Ultima vez visto en</th>
            <th> Recompensa</th>
            <th> Celular</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lostPets.map((lostPet, i) => {
            return (
              <tr key={i}>
                <td>{lostPet.name}</td>
                <td>{lostPet.description}</td>
                <td>{lostPet.direction}</td>
                <td>$ {lostPet.reward}</td>
                <td>{lostPet.phone}</td>
                <td className="text">
                  <img
                    src="/assets/edit.png"
                    alt=""
                    onClick={() => editPetClick(lostPet.id)} />
                </td>
                <td>
                  <FormButton label="Detalle" onClick={() => detailClicl(lostPet.id)} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <FormButtonBar>
        <FormButton label="Volver" onClick={() => props.history.goBack()} />
      </FormButtonBar>
    </div>
  )

}
