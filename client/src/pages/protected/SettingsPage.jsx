import Departments from '@/features/settings/departments/Departments';
import Programs from '@/features/settings/programs/Programs';
import SchoolYear from '@/features/settings/school-year/SchoolYear';
import Semester from '@/features/settings/semester/Semester';

export default function SettingsPage() {
  return (
    <div className='max-w-7xl mx-auto space-y-4'>
      <div className='flex items-start justify-center gap-4'>
        <div className='flex-1 space-y-4'>
          <SchoolYear />
          <Semester />
        </div>
        <div className='flex-1 space-y-4'>
          <Departments />
          <Programs />
        </div>
      </div>
    </div>
  );
}
