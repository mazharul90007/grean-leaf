import { Gender, UserStatus } from "@prisma/client";
import { z } from "zod";

const createAdmin = z.object({
  password: z.string().nonempty("Password is required"),
  admin: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
    contactNumber: z.string().nonempty("Contact number is required"),
  }),
});

const createDoctor = z.object({
  password: z.string().nonempty("Password required"),
  doctor: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
    contactNumber: z.string().nonempty("Contact number is required"),
    address: z.string().optional(),
    registrationNumber: z.string().nonempty("Reg number is required"),
    experience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee: z.number("Appointment fee is required"),
    qualification: z.string().nonempty("Qualification is required"),
    currentWorkingPlace: z
      .string()
      .nonempty("Current Working Pace is required"),
    designaton: z.string().nonempty("Designation is required"),
  }),
});

const createPatient = z.object({
  password: z.string().nonempty("Password is required"),
  patient: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
    contactNumber: z.string().nonempty("Contact number is required"),
    address: z.string().optional(),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

export const userValidation = {
  createAdmin,
  createDoctor,
  createPatient,
  updateStatus,
};
