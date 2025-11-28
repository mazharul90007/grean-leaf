import { UserRole } from "@prisma/client";
import prisma from "../src/shared/prisma";
import * as bcrypt from "bcrypt";

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (isExistSuperAdmin) {
      console.log("Super admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("superadmin", 10);

    const superAdminData = await prisma.user.create({
      data: {
        email: "superadmin@gmail.com",
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        admin: {
          create: {
            name: "Super Admin",
            contactNumber: "01939561167",
          },
        },
      },
    });

    console.log("Super Admin created Successfully", superAdminData);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin();
