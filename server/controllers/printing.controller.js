const { prisma } = require('../lib/utils/prismaClient');

// Get All Users
async function getPaginatedPrintedIds(req, res, next) {
  const { searchQuery, page, limit, schoolYearId, semesterId } = req.query;

  try {
    const [students, totalStudents] = await prisma.$transaction([
      prisma.printing.findMany({
        where: {
          AND: [
            { studentIdNumber: { contains: searchQuery } },
            { schoolYearId },
            { semesterId },
          ],
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
          releasedDate: {
            sort: 'desc',
            nulls: 'first',
          },
        },
      }),
      prisma.student.count(),
    ]);

    const hasMore = students.length === Number(limit);

    const studentsCount = !hasMore
      ? students.length
      : Number(page) + Number(limit);

    res.json({
      paginatedStudents: students,
      studentsCount,
      totalStudents,
      hasMore,
    });
  } catch (err) {
    err.title = 'GET Paginated of Printed Ids';
    next(err);
  }
}

// Add Print Transaction
async function addPrintId(req, res, next) {
  const { id } = req.user;

  try {
    const currentDate = new Date();
    await prisma.printing.create({
      data: {
        ...req.body,
        printedDate: currentDate,
        printedByUserId: id,
      },
    });
    res.status(200).send('User successfully added');
  } catch (err) {
    err.title = 'POST Print ID';
    next(err);
  }
}

// Update Print Transaction
async function updatePrintId(req, res, next) {
  const { id } = req.user;

  try {
    const currentDate = new Date();

    await prisma.printing.update({
      where: {
        id: req.body.id,
      },
      data: {
        printedDate: currentDate,
        printedBy: {
          connect: {
            id,
          },
        },
      },
    });

    res.json();
  } catch (err) {
    err.title = 'PATCH/PUT Print ID';
    next(err);
  }
}

// Release Student ID
async function releaseId(req, res, next) {
  const { id } = req.user;

  try {
    const currentDate = new Date();

    await prisma.printing.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        releasedDate: currentDate,
        releasedBy: {
          connect: {
            id,
          },
        },
      },
    });
    res.json();
  } catch (err) {
    err.title = 'PATCH/PUT Released ID';
    next(err);
  }
}

// Delete User
async function deleteTransaction(req, res, next) {
  const { fullName } = req.user;

  try {
    const deletedRecord = await prisma.printing.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    console.log(
      `${deletedRecord.studentIdNumber}'s transaction on ${new Date(
        deletedRecord.printedDate
      ).toDateString()} successfully deleted by ${fullName} :: ${new Date().toDateString()}`
    );

    res.json();
  } catch (err) {
    err.title = 'DELETE User';
    next(err);
  }
}

exports.getPaginatedPrintedIds = getPaginatedPrintedIds;
exports.addPrintId = addPrintId;
exports.updatePrintId = updatePrintId;
exports.releaseId = releaseId;
exports.deleteTransaction = deleteTransaction;
