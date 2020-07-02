"use strict";

import * as mongoose from "mongoose";

export interface ILostPet extends mongoose.Document {
  name: string;
  description: string;
  direction: string;
  reward: number;
  phone: string;
  pet: mongoose.Schema.Types.ObjectId;
  picture: string;

  updated: Number;
  created: Number;
  enabled: Boolean;
}

/**
 * Esquema de Mascotas Perdidas
 */
export let LostPetSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: "Nombre es requerido"
  },
  description: {
    type: String,
    default: "",
    trim: true,
    required: "descripción es requerido"
  },
  direction: {
    type: String,
    default: "",
    trim: true,
  },
  reward: {
    type: Number,
    default: 0,
    trim: true,
  },
  phone: {
    type: String,
    default: "",
    trim: true,
    required: "Telefono es requerido"
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: "Mascota es requerido"
  },
  picture: {
    type: String,
    ref: "Image"
  },

  updated: {
    type: Date,
    default: Date.now()
  },
  created: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "lostPet" });

/**
 * Antes de guardar
 */
LostPetSchema.pre("save", function (this: ILostPet, next) {
  this.updated = Date.now();

  next();
});

export let LostPet = mongoose.model<ILostPet>("LostPet", LostPetSchema);
