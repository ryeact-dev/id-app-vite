import { Badge } from '@/common/ui/badge';

export default function PrintingHeader({ activeSem }) {
  return (
    <Badge
      className={
        'bg-accent/80 hover:bg-accent/80 border-2 border-accent px-4 py-1 text-sm font-semibold'
      }
    >
      {activeSem?.semesterName} - SY: {activeSem?.schoolYear.schoolYearFrom} -{' '}
      {activeSem?.schoolYear.schoolYearTo}
    </Badge>
  );
}
