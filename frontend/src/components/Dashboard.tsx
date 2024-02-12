import apiService from '@/service/api-service'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { AxiosResponse } from '~/axios'
import UserDto from "@/interfaces/UserDto";

const columns: GridColDef[] = [
  {
    field: 'Id',
    headerName: 'Employee ID',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Name',
    headerName: 'Employee Name',
    sortable: true,
    filterable: true,
    flex: 1,
  },
  {
    field: 'Email',
    headerName: 'Employee Email',
    sortable: true,
    filterable: true,
    flex: 1,
  }
  ];
export default function Dashboard() {
  const [data, setData] = useState([])

  useEffect(() => {
    apiService
      .getAxiosInstance()
      .get('/v1/users')
      .then((response: AxiosResponse) => {
        setData(
          response.data.map((user: UserDto) => [
            user.id,
            user.name,
            user.email,
          ]),
        )
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  const [selectedRow, setSelectedRow] = useState(null)

  const handleClose = () => {
    setSelectedRow(null)
  }
  return (
    <div
      style={{
        minHeight: '45em',
        maxHeight: '45em',
        width: '100%',
        marginLeft: '4em',
      }}
    >
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        experimentalFeatures={{ ariaV7: true }}
        checkboxSelection={false}
        rows={data}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        onRowClick={(params) => setSelectedRow(params.row)}
      />
      <Dialog open={!!selectedRow} onClose={handleClose}>
        <DialogTitle>Row Details</DialogTitle>
        <DialogContent>
          <Table>
            <TableBody>
              {selectedRow &&
                Object.entries(selectedRow).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
