import { Card, CardContent } from '@/common/ui/card';
import { FormControl, FormField, FormItem, FormLabel } from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/ui/select';

export default function AddUserInputs({ form }) {
  return (
    <Card className='w-full'>
      <CardContent className='space-y-3 mt-4'>
        <div className='flex gap-3'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='space-y-0 flex-1'>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='username...' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem className='space-y-0 flex-1'>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='fullname...' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='flex gap-3'>
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='space-y-0 flex-1'>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select options' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Admin'>Admin</SelectItem>
                    <SelectItem value='User'>User</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='space-y-0 flex-1'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email...' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
