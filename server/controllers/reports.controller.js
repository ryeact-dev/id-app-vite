const { prisma } = require('../lib/utils/prismaClient');

// Get All Users
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

exports.getPagindatedPrintedIDsReport = getPagindatedPrintedIDsReport;
