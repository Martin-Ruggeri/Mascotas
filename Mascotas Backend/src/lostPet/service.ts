"use strict";

import * as error from "../server/error";
import { ILostPet, LostPet } from "./schema";
const mongoose = require("mongoose");

export async function findAll(): Promise<Array<ILostPet>> {
  try {
    const result = await LostPet.find({
      enabled: true
    }).exec();
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function findById(lostPetId: string): Promise<ILostPet> {
  try {
    const result = await LostPet.findOne({
      _id: lostPetId,
      enabled: true
    }).exec();
    if (!result) {
      throw error.ERROR_NOT_FOUND;
    }
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function validateUpdate(body: ILostPet): Promise<ILostPet> {
  const result: error.ValidationErrorMessage = {
    messages: []
  };

  const MAX_NUMBER: number = 2 ** 31 - 2;

  if (body.name && body.name.length > 256) {
    result.messages.push({ path: "name", message: "Hasta 256 caracteres solamente." });
  }

  if (body.description && body.description.length > 1024) {
    result.messages.push({ path: "description", message: "Hasta 1024 caracteres solamente." });
  }

  if (body.direction && body.direction.length > 1024) {
    result.messages.push({ path: "direction", message: "Hasta 1024 caracteres solamente." });
  }

  if (body.reward && body.reward > MAX_NUMBER) {
    result.messages.push({ path: "reward", message: "Hasta " + MAX_NUMBER + " soportado solamente." });
  }

  if (body.phone && body.phone.length > 13) {
    result.messages.push({ path: "phone", message: "Hasta 13 caracteres solamente." });
  }

  if (result.messages.length > 0) {
    return Promise.reject(result);
  }

  return Promise.resolve(body);
}

export async function update(lostPetId: string, petId: string, body: ILostPet): Promise<ILostPet> {
  try {
    let current: ILostPet;
    if (lostPetId) {
      current = await LostPet.findById(lostPetId);
      if (!current) {
        throw error.ERROR_NOT_FOUND;
      }
    } else {
      current = new LostPet();
      current.pet = mongoose.Types.ObjectId.createFromHexString(petId);
    }

    const validBody = await validateUpdate(body);
    if (validBody.name) {
      current.name = validBody.name;
    }

    if (validBody.picture) {
      current.picture = validBody.picture;
    } else {
      current.picture = "";
    }

    if (validBody.description) {
      current.description = validBody.description;
    }

    if (validBody.direction) {
      current.direction = validBody.direction;
    } else {
      current.direction = "";
    }

    if (validBody.reward) {
      current.reward = validBody.reward;
    } else {
      current.reward = 0;
    }

    if (validBody.phone) {
      current.phone = validBody.phone;
    }

    await current.save();
    return Promise.resolve(current);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function remove(lostPetId: string): Promise<void> {
  try {
    const result = await LostPet.findOne({
      _id: lostPetId,
      enabled: true
    }).exec();
    if (!result) {
      throw error.ERROR_NOT_FOUND;
    }
    result.enabled = false;
    await result.save();
  } catch (err) {
    return Promise.reject(err);
  }
}