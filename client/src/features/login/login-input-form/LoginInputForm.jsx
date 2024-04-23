import { Button } from '@/common/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { Lock, LogIn, Search, User } from 'lucide-react';

export default function LoginInputForm({ form, onSubmit }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className='relative'>
                  <User className='absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='username'
                    className='placeholder:italic'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Lock className='absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='password'
                    type='password'
                    className='placeholder:italic'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='!mt-10'>
          <Button type='submit' className='w-full flex items-center gap-2 py-5'>
            <LogIn />
            <p className='text-lg uppercase font-bold'>Login</p>
          </Button>
        </div>
      </form>
    </Form>
  );
}
