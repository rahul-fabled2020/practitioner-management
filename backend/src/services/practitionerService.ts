import Boom from "@hapi/boom";
import { Practitioner, PractitionerSchemaType } from "../models/Practitioner";
import { PRACTITIONER_MESSAGES } from "../constants/messages";

export const fetchAll = () => {
  return Practitioner.find({});
};

export const fetchById = async (id: String) => {
  const practitioner = await Practitioner.findById(id);

  if (!practitioner) {
    throw Boom.notFound(PRACTITIONER_MESSAGES.NOT_FOUND);
  }

  return practitioner;
};

export const create = (practitioner: PractitionerSchemaType) => {
  return Practitioner.create(practitioner);
};

export const update = async (
  id: String,
  practitioner: PractitionerSchemaType
) => {
  const practitionerToUpdate = await Practitioner.findById(id);

  if (!practitionerToUpdate) {
    throw Boom.notFound(PRACTITIONER_MESSAGES.NOT_FOUND);
  }

  practitionerToUpdate.set(practitioner);
  const updatedPractitioner = await practitionerToUpdate.save();

  return updatedPractitioner;
};

export const destroy = async (id: String) => {
  const practitioner = await Practitioner.findByIdAndDelete(id);

  if (!practitioner) {
    throw Boom.notFound(PRACTITIONER_MESSAGES.NOT_FOUND);
  }

  return practitioner;
};
