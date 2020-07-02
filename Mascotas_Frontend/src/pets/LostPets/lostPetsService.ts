import axios from "axios"
import { environment } from "../../app/environment/environment"

export interface LostPet {
    id: string;
    pet: string;
    name: string;
    picture?: string;
    description: string;
    direction?: string;
    reward?: number;
    phone: string;
}

export async function loadLostPets(): Promise<LostPet[]> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/lostpet/")).data as LostPet[]
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function loadLostPet(id: string): Promise<LostPet> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/lostpet/" + id)).data as LostPet

        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function newLostPet(payload: LostPet): Promise<LostPet> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/lostpet/", payload)).data as LostPet

        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function saveLostPet(payload: LostPet): Promise<LostPet> {
    try {
        const res = (await axios.put(environment.backendUrl + "/v1/lostpet/" + payload.id, payload)).data as LostPet

        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function deleteLostPet(id: string): Promise<void> {
    try {
        await axios.delete(environment.backendUrl + "/v1/lostpet/" + id)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}


interface updateLostPetImage {
    image: string;
}
interface updateLostPetImageId {
    id: string;
}

export async function updateLostPetPicture(payload: updateLostPetImage): Promise<updateLostPetImageId> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/image", payload)).data as updateLostPetImageId
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export function getLostPetPictureUrl(id: string) {
    if (id && id.length > 0) {
        return environment.backendUrl + "/v1/image/" + id
    } else {
        return "/assets/profile.png"
    }
}