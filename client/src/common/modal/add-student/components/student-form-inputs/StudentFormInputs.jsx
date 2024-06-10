import { Search } from "lucide-react";
import ProgramOffers from "./components/ProgramOffers";
import BirthdatePicker from "./components/BirthdatePicker";
import { Card, CardContent } from "@/common/ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "@/common/ui/form";
import { Button } from "@/common/ui/button";
import { Input } from "@/common/ui/input";
import { Label } from "@/common/ui/label";
import { Textarea } from "@/common/ui/textarea";
import { ToastNotification } from "@/common/toastNotification/ToastNotification";
import { getStudentInfo } from "@/api/student.api";
import { useGetAllPrograms } from "@/hooks/program.hook";

export default function StudentFormInputs({ form }) {
  const { setValue, formState } = form;

  const { data: listOfPrograms = [] } = useGetAllPrograms();

  const handleDateChange = (date) => {
    setValue("birthDate", new Date(date));
  };

  const handleProgramValueChange = (value) => {
    setValue("programId", value);
  };

  const onSearchStudent = async () => {
    const { studentIdNumber } = form.getValues();

    if (!studentIdNumber) {
      return ToastNotification("error", "Please enter a student ID number");
    }

    const { data } = await getStudentInfo({ studentId: studentIdNumber });

    if (data.message) {
      return ToastNotification("error", data.message);
    } else {
      console.log(data.studentInfo);

      setValue("lastName", data.studentInfo.LName);
      setValue("firstName", data.studentInfo.FName);

      // Middle Initial if not null else return
      data.studentInfo.MName &&
        setValue("middleInitial", data.studentInfo.MName.toString().charAt(0));

      // Birthdate if not null else return null
      data.studentInfo.BDate &&
        setValue("birthDate", new Date(data.studentInfo.BDate));

      setValue("guardian", data.studentInfo.ConName);
      setValue("guardianContact", data.studentInfo.ContactNo);
      setValue("address", data.studentInfo.Address);
    }
  };

  return (
    <Card className="relative flex-[2] space-y-2 rounded-md pt-2">
      <CardContent className="space-y-1 px-4 pb-0">
        {/* Student Name */}
        <FormField
          control={form.control}
          name="studentIdNumber"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <div className="lg:w-200px] relative sm:w-[300px] md:w-[200px]">
                  <Button
                    onClick={onSearchStudent}
                    type="button"
                    className="absolute right-0 top-0 rounded-sm rounded-bl-none rounded-tl-none"
                  >
                    <Search className="h-4 w-4 text-white" strokeWidth={3} />
                  </Button>
                  <Input
                    placeholder="Search Id Number..."
                    className="pr-8"
                    type="number"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-[3] space-y-0">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middleInitial"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-0">
                <FormLabel>Middle Initial</FormLabel>
                <FormControl>
                  <Input placeholder="MI" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Student Birthday and Program */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label
              className={`text-sm ${
                formState.errors?.birthDate ? "text-red-500" : ""
              }`}
              htmlFor="birthdate"
            >
              Birthdate
            </Label>
            <BirthdatePicker
              handleDateChange={handleDateChange}
              selectedDate={form.watch("birthDate")}
            />
          </div>
          <div className="flex-[2]">
            <Label
              className={`text-sm ${
                formState.errors?.program ? "text-red-500" : ""
              }`}
              htmlFor="course"
            >
              Program
            </Label>
            <ProgramOffers
              listOfPrograms={listOfPrograms}
              handleProgramValueChange={handleProgramValueChange}
              programValue={form.watch("programId")}
            />
          </div>
        </div>

        <div className="relative !mt-4 rounded-md border p-2 pt-3">
          <h2 className="absolute -top-2 bg-white px-2 text-sm font-bold text-primary">
            In Case of Emergency
          </h2>
          {/* Guardian Info */}
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="guardian"
              render={({ field }) => (
                <FormItem className="flex-[1.5] space-y-0">
                  <FormLabel>Guardian Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Guardian Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guardianContact"
              render={({ field }) => (
                <FormItem className="flex-1 space-y-0">
                  <FormLabel>Guardian No.</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Contact No." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Guardian Full Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="my-1 flex-1 space-y-0">
                <FormLabel>Full Address</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[60px] resize-none"
                    placeholder="Enter your full address"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
