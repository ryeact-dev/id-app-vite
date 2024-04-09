import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/common/ui/tabs';
import PrintingHeaderButton from '@/features/printing/printing-header/PrintingHeaderButton';
import PrintManyTable from '@/features/printing/printing-page-tables/print-many-table/PrintManyTable';
import SinglePrintTable from '@/features/printing/printing-page-tables/single-print-table/SinglePrintTable';
import ValidationTable from '@/features/printing/printing-page-tables/validation-table/ValidationTable';

export default function PrintingPage() {
  const [tabValue, setTabValue] = useState('single-print');

  const handleTabValueChange = (tabValue) => {
    setTabValue(tabValue);
  };

  return (
    <div className='max-w-7xl mx-auto space-y-4'>
      <Tabs defaultValue={tabValue}>
        <div className='flex items-center justify-between'>
          <TabsList className='grid grid-cols-2 w-[30%]'>
            <TabsTrigger
              value='single-print'
              onClick={() => handleTabValueChange('single-print')}
            >
              Print
            </TabsTrigger>
            {/* <TabsTrigger
              value='print-many'
              onClick={() => handleTabValueChange('print-many')}
            >
              Print Many
            </TabsTrigger> */}

            <TabsTrigger
              value='validate'
              onClick={() => handleTabValueChange('validate')}
            >
              Validate
            </TabsTrigger>
          </TabsList>
          <PrintingHeaderButton tabValue={tabValue} />
        </div>

        <TabsContent value='single-print' className='space-y-4'>
          <SinglePrintTable />
        </TabsContent>

        {/* <TabsContent value='print-many'>
          <PrintManyTable />
        </TabsContent> */}

        <TabsContent value='validate'>
          <ValidationTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
