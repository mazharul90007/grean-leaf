import z from "zod";

const createSpecialties = z.object({
  title: z.string().nonempty("Title is required"),
});

export const SpecialtiesValidation = {
  createSpecialties,
};
