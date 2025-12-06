import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../shared/prisma.js";
import calculatePagination from "../../../helpers/paginationHelpers.js";
const convertDateTime = async (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + offset);
};
//====================Create Schedule==================
const createSchedule = async (payload) => {
    const { startDate, endDate, startTime, endTime } = payload;
    const intervalTime = 30;
    const schedules = [];
    const currentDate = new Date(startDate); //start date
    const lastDate = new Date(endDate); //end date
    while (currentDate <= lastDate) {
        const startDateTime = new Date(addMinutes(addHours(`${format(currentDate, "yyyy-MM-dd")}`, Number(startTime.split(":")[0])), Number(startTime.split(":")[1])));
        const endDateTime = new Date(addMinutes(addHours(`${format(currentDate, "yyyy-MM-dd")}`, Number(endTime.split(":")[0])), Number(endTime.split(":")[1])));
        while (startDateTime < endDateTime) {
            // const scheduleData = {
            //   startDateTime: startDateTime,
            //   endDateTime: addMinutes(startDateTime, intervalTime),
            // };
            //Time converting in UTC
            const s = await convertDateTime(startDateTime);
            const e = await convertDateTime(addMinutes(startDateTime, intervalTime));
            const scheduleData = {
                startDateTime: s,
                endDateTime: e,
            };
            const existingSchedule = await prisma.schedule.findFirst({
                where: {
                    startDateTime: scheduleData.startDateTime,
                    endDateTime: scheduleData.endDateTime,
                },
            });
            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData,
                });
                schedules.push(result);
            }
            startDateTime.setMinutes(startDateTime.getMinutes() + intervalTime);
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return schedules;
};
//====================Get All Schedule==================
const getAllSchedules = async (filters, options, user) => {
    const { limit, page, skip } = calculatePagination(options);
    const { startDate, endDate, ...filterData } = filters;
    const andConditions = [];
    if (startDate && endDate) {
        andConditions.push({
            AND: [
                {
                    startDateTime: {
                        gte: startDate,
                    },
                },
                {
                    endDateTime: {
                        lte: endDate,
                    },
                },
            ],
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                return {
                    [key]: {
                        equals: filterData[key],
                    },
                };
            }),
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    //find the doctor schedules
    const doctorSchedules = await prisma.doctorSchedule.findMany({
        where: {
            doctor: {
                email: user?.email,
            },
        },
    });
    //keep the doctor schedule Ids in a array
    const doctorScheduleIds = doctorSchedules.map((schedule) => schedule.scheduleId);
    const result = await prisma.schedule.findMany({
        where: {
            ...whereCondition,
            id: {
                notIn: doctorScheduleIds,
            },
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: "asc" },
    });
    const total = await prisma.schedule.count({
        where: {
            ...whereCondition,
            id: {
                notIn: doctorScheduleIds,
            },
        },
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};
//====================Get Schedule by Id==========================
const getScheduleById = async (id) => {
    const result = await prisma.schedule.findUniqueOrThrow({
        where: {
            id,
        },
    });
    console.log(result?.startDateTime.getHours() + ":" + result?.startDateTime.getMinutes());
    return result;
};
//====================Delete Schedule by Id==========================
const deleteScheduleById = async (id) => {
    const result = await prisma.schedule.delete({
        where: {
            id,
        },
    });
    return result;
};
export const ScheduleService = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    deleteScheduleById,
};
//# sourceMappingURL=schedule.service.js.map