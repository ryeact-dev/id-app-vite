import { Badge } from '@/common/ui/badge';

export default function PrintingHeader() {
  return (
    <Badge
      className={
        'bg-accent/80 hover:bg-accent/80 border-2 border-accent px-4 py-1 text-sm font-semibold'
      }
    >
      1st Sem - SY: 2023-24
    </Badge>
  );
}
