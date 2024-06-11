import { useMemo } from 'react';
import './App.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import { useMantineReactTable, MantineReactTable } from 'mantine-react-table';
import { ActionIcon, Box, Button, Group } from '@mantine/core';
import { IconEdit, IconCopy, IconTrash, IconDownload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import Data from "./data.json";
import Header from './Header';
import Nav from './Nav';

console.log(Data);

function App() {
  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Mã hồ sơ",
    },
    {
      accessorKey: "tenCV",
      header: "Tên công việc",
    },
    {
      accessorKey: "tenQT",
      header: "Tên quy trình",
    },
    {
      accessorKey: "loaiKy",
      header: "Loại ký",
    },
    {
      accessorKey: "ngayTao",
      header: "Ngày tạo",
    },
    {
      accessorKey: "ngayHetHan",
      header: "Ngày hết hạn",
    },
    {
      accessorKey: "actions",
      header: "Thao tác",
      size: 100,
      Cell: ({ row }) => (
        <Box className='box'>
          <ActionIcon color='#DCE7EF'>
            <IconEdit color='#57A8E9' />
          </ActionIcon>
          <ActionIcon color='#DAEBEC'>
            <IconCopy color='#94CBD7' />
          </ActionIcon>
          <ActionIcon color='#F1E1E1'>
            <IconTrash color='#FF8178' />
          </ActionIcon>
        </Box>
      ),
    },
  ], []);

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(Data);
    download(csvConfig)(csv);
  };

  const tableData = useMantineReactTable({
    columns: columns,
    data: Data,
    enableRowSelection: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Group position="apart" style={{ width: '100%' }}>
        <Button onClick={handleExportData}
          leftIcon={<IconDownload />}
          variant="filled" color='#fff' style={{ color: "#e14bd2", display: "flex", alignItems: "center", gap: "10px", border: "1px solid #e14bd2" }}>
          <IconDownload />Export Excel
        </Button>
      </Group>
    )
  });

  return (
    <>
      <Header />
      <div className='body'>
        <div>
          <Nav />
        </div>
        <div className='table-data' >
          <MantineReactTable table={tableData} />
        </div>
      </div>
    </>
  );
}

export default App;
