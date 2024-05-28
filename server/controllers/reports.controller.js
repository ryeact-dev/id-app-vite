const { prisma } = require('../lib/utils/prismaClient');

// Get Paginated List of Printed ID for Reports base on selected Date Ranges
async function getPagindatedPrintedIDsReport(req, res, next) {
  const { page, limit, to: dateEnd, from: dateStart } = req.body;

  try {
    const [students, totalStudents] = await prisma.$transaction([
      prisma.printing.findMany({
        where: {
          AND: [{ releasedDate: { lte: dateEnd, gte: dateStart } }],
        },
        skip: Number(page) * Number(limit),
        take: Number(limit),
        // Include the program name, user name, and updated user name
        include: {
          student: {
            include: {
              // Connect to student program
              program: {
                include: {
                  // Connect the program department
                  department: {
                    select: {
                      departmentName: true,
                    },
                  },
                },
              },
            },
          },
          printedBy: {
            select: {
              fullName: true,
            },
          },
          releasedBy: {
            select: {
              fullName: true,
            },
          },
        },
        orderBy: {
          studentIdNumber: 'asc',
        },
      }),
      prisma.printing.count({
        where: {
          AND: [{ releasedDate: { lte: dateEnd, gte: dateStart } }],
        },
      }),
    ]);

    const studentsCount = Number(page + 1) * students.length;
    const hasMore = studentsCount < totalStudents && students.length > 0;

    res.json({
      paginatedStudents: students,
      studentsCount,
      totalStudents,
      hasMore,
    });
  } catch (err) {
    err.title = 'GET Paginated of Printed Ids for Reporting';
    next(err);
  }
}

// Get Paginated List of Printed ID for Reports base on selected Date Ranges
async function getPagindatedValidatedIDsReport(req, res, next) {
  const { page, limit, to: dateEnd, from: dateStart } = req.body;

  try {
    const [validations, totalValidations] = await prisma.$transaction([
      prisma.validation.findMany({
        where: {
          AND: [{ dateValidated: { lte: dateEnd, gte: dateStart } }],
        },
        skip: Number(page) * Number(limit),
        take: Number(limit),
        // Include the program name, user name, and updated user name
        include: {
          student: {
            include: {
              // Connect to student program
              program: {
                include: {
                  // Connect the program department
                  department: {
                    select: {
                      departmentName: true,
                    },
                  },
                },
              },
            },
          },
          user: {
            select: {
              fullName: true,
            },
          },
        },
        orderBy: {
          dateValidated: 'desc',
        },
      }),
      prisma.validation.count({
        where: {
          AND: [{ dateValidated: { lte: dateEnd, gte: dateStart } }],
        },
      }),
    ]);

    const validationsCount = Number(page + 1) * validations.length;
    const hasMore =
      validationsCount < totalValidations && validations.length > 0;

    res.json({
      paginatedValidations: validations,
      validationsCount,
      totalValidations,
      hasMore,
    });
  } catch (err) {
    err.title = 'GET Paginated of Validated Ids for Reporting';
    next(err);
  }
}

exports.getPagindatedPrintedIDsReport = getPagindatedPrintedIDsReport;
exports.getPagindatedValidatedIDsReport = getPagindatedValidatedIDsReport;
