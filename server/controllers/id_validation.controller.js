const { prisma } = require('../lib/utils/prismaClient');

// Get All Users
async function getPaginatedValidations(req, res, next) {
  const { searchQuery, page, limit, schoolYearId, semesterId } = req.query;

  try {
    const [validations, totalValidations] = await prisma.$transaction([
      prisma.validation.findMany({
        where: {
          AND: [
            // { studentIdNumber: { contains: searchQuery } },
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
          user: {
            select: {
              fullName: true,
            },
          },
          // schoolYear: {
          //   select: {
          //     schoolYearFrom: true,
          //     schoolYearTo: true,
          //   },
          // },
          // semester: {
          //   select: {
          //     semesterName: true,
          //   },
          // },
        },
        orderBy: {
          dateValidated: 'desc',
        },
      }),
      prisma.validation.count({
        where: {
          AND: [{ schoolYearId }, { semesterId }],
        },
      }),
    ]);

    const hasMore = validations.length === Number(limit);

    const validationsCount = !hasMore
      ? validations.length
      : Number(page) + Number(limit);

    res.json({
      paginatedValidations: validations,
      validationsCount,
      totalValidations,
      hasMore,
    });
  } catch (err) {
    err.title = 'GET Paginated of Validation Transaction';
    next(err);
  }
}

// Add Print Transaction
async function addValidatedID(req, res, next) {
  const { id } = req.user;
  const { studentIdNumber, schoolYearId, semesterId } = req.body;

  try {
    const validatedStudent = await prisma.$transaction(async (tx) => {
      const forValidationStudent = await prisma.student.findUnique({
        where: { studentIdNumber },
        // Include the program name, user name, and updated user name
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
      });

      if (!forValidationStudent) {
        return res
          .status(404)
          .send(`Student with ID No. ${studentIdNumber} not found`);
      }

      const forValidationData = {
        studentId: forValidationStudent.id,
        schoolYearId,
        semesterId,
        userId: id,
      };

      await prisma.validation.create({
        data: forValidationData,
      });

      return forValidationStudent;
    });

    res.json(validatedStudent);
  } catch (err) {
    err.title = 'POST Validate Student ID';
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

exports.getPaginatedValidations = getPaginatedValidations;
exports.addValidatedID = addValidatedID;
exports.updatePrintId = updatePrintId;
exports.releaseId = releaseId;
exports.deleteTransaction = deleteTransaction;
