import z from "zod";

const createAppointment = z.object({
  body: z.object({
    doctorId: z.string("Doctor Id is required"),
    scheduleId: z.string("Doctor schedule id is required"),
  }),
});

export const AppointmentValidation = {
  createAppointment,
};
