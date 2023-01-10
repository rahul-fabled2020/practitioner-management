import mongoose from "mongoose";
import { Document, Schema, Model } from "mongoose";
import database from "../database/mongodb";
import { GENDER } from "../constants/constant";

export type Gender =
  | typeof GENDER.MALE
  | typeof GENDER.FEMALE
  | typeof GENDER.OTHER;

export interface PractitionerSchemaType extends Document {
  fullName: string;
  email: string;
  contact: string;
  dob: Date;
  photographUrl?: string;
  workingDays: string[];
  startTime: Date;
  endTime: Date;
  address?: string;
  gender: Gender;
  notes?: string;
  isICUSpecialist?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const practitionerSchema: Schema<PractitionerSchemaType> = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    photographUrl: {
      type: String,
    },
    workingDays: {
      type: [String],
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (this: PractitionerSchemaType, value: Date) {
          return value < this.endTime;
        },
        message: "Start time must be before end time",
      },
    },
    endTime: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: [GENDER.MALE, GENDER.FEMALE, GENDER.OTHER],
    },
    notes: {
      type: String,
    },
    isICUSpecialist: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { collection: "practitioners" }
);

practitionerSchema.pre("save", function (next) {
  this.updatedAt = Date.now() as unknown as Date;
  next();
});

const Practitioner: Model<PractitionerSchemaType> = database
  .getConnection()
  .model("Practitioner", practitionerSchema);

export { Practitioner };
