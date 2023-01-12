import Boom from "@hapi/boom";

import { Practitioner, PractitionerSchemaType } from "../models/Practitioner";

import { PRACTITIONER_MESSAGES } from "../constants/messages";

/**
 * It returns all the practitioners in the database
 *
 * @param query - The query object is used to filter the results.
 * @returns {Promise} An array of all the practitioners in the database.
 */
export const fetchAll = (query = {}) => {
  return Practitioner.find(query);
};

/**
 * It fetches a practitioner by id
 *
 * @param {String} id - String - The id of the practitioner we want to fetch.
 * @returns {Promise} The practitioner is being returned.
 */
export const fetchById = async (id: String) => {
  const practitioner = await Practitioner.findById(id);

  if (!practitioner) {
    throw Boom.notFound(PRACTITIONER_MESSAGES.NOT_FOUND);
  }

  return practitioner;
};

/**
 * It creates a practitioner in the database
 *
 * @param {PractitionerSchemaType} practitioner - PractitionerSchemaType
 * @returns {Promise} A promise that resolves to the practitioner that was created.
 */
export const create = (practitioner: PractitionerSchemaType) => {
  return Practitioner.create(practitioner);
};

/**
 * It finds a practitioner by id, updates it with the new data, and returns the updated practitioner
 *
 * @param {String} id - The id of the practitioner to update
 * @param {PractitionerSchemaType} practitioner - PractitionerSchemaType
 * @returns {Promise} The updated practitioner
 */
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

/**
 * It finds a practitioner by id and deletes it
 *
 * @param {String} id - The id of the practitioner to be deleted.
 * @returns {Promise} The practitioner that was deleted.
 */
export const destroy = async (id: String) => {
  const practitioner = await Practitioner.findByIdAndDelete(id);

  if (!practitioner) {
    throw Boom.notFound(PRACTITIONER_MESSAGES.NOT_FOUND);
  }

  return practitioner;
};
