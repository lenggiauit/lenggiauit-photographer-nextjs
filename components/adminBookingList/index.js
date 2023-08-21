'use client'
import { useEffect, useState } from 'react'
import PageLoader from '../pageLoader'
import { getDatabase, ref, set, get, onValue, update } from 'firebase/database'
import { db } from '@/app/firebase'
import { v4 } from 'uuid'
import DataTable, { SortOrder, TableColumn } from 'react-data-table-component'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function AdminBookingList(props) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [BookingList, setBookingList] = useState([])
  const [selectedBookingItem, setSelectedBookingItem] = useState()
  const [selectedBookingItemStatus, setSelectedBookingItemStatus] = useState('')
  // Data grid columns
  const columns = [
    // {
    //   id: 'id',
    //   name: 'id',
    //   selector: (row) => row.id,
    //   sortable: true,
    // },
    {
      id: 'photoshootType',
      name: 'Photoshoot Type',
      selector: (row) => row.photoshootType,
      sortable: true,
    },
    {
      id: 'name',
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      id: 'email',
      name: 'Email',
      selector: (row) => row.email,
      sortable: false,
    },
    {
      id: 'phone',
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: false,
    },
    {
      id: 'submittedDate',
      name: 'Submitted Date',
      selector: (row) => row.submittedDate,
      sortable: false,
    },
    {
      id: 'date',
      name: 'Shooting Date',
      selector: (row) => row.shootingDate,
      sortable: false,
    },
    {
      id: 'status',
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Edit',
      button: true,
      cell: (row) => (
        <button
          className='btn btn-primary btn-sm'
          onClick={() => {
            setSelectedBookingItem(row)
            setSelectedBookingItemStatus(row.status)
            setOpenModal(true)
          }}
        >
          Edit
        </button>
      ),
    },
  ]

  useEffect(() => {
    const query = ref(db, 'PhotoshootBooking')
    onValue(query, (snapshot) => {
      const data = snapshot.val()
      if (snapshot.exists()) {
        setBookingList(Object.values(data))
      }
    })
  }, [])

  const handleChangeStatus = (e) => {
    setSelectedBookingItemStatus(e.target.value)
  }

  const handleUpdateStatus = () => {
    const updates = {}
    updates['/PhotoshootBooking/' + selectedBookingItem.id] = {
      id: selectedBookingItem.id,
      photoshootType: selectedBookingItem.photoshootType,
      shootingDate: selectedBookingItem.shootingDate,
      name: selectedBookingItem.name,
      email: selectedBookingItem.email,
      description: selectedBookingItem.description,
      price: selectedBookingItem.price,
      submittedDate: selectedBookingItem.submittedDate,
      status: selectedBookingItemStatus,
    }
    setIsSubmitting(true)
    update(ref(db), updates)
      .catch(() => {
        setIsSubmitting(false)
        setOpenModal(false)
        alert('Error')
      })
      .then(() => {
        setIsSubmitting(false)
        setOpenModal(false)
      })
  }

  return (
    <>
      {isSubmitting && <PageLoader />}
      <div className='container'>
        <div className='row'>
          <h2>Admin page</h2>
        </div>
        <div className='row'>
          <div className='col-md-12 '>
            <DataTable
              title='Booking List'
              columns={columns}
              data={BookingList}
              pagination
            />
          </div>
        </div>
      </div>

      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Update Status</DialogTitle>
        <DialogContent sx={{ width: 500, textAlign: 'center' }}>
          <Select
            sx={{ width: 350 }}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Status'
            value={selectedBookingItemStatus}
            onChange={handleChangeStatus}
          >
            <MenuItem value={'Submitted'}>Submitted</MenuItem>
            <MenuItem value={'Cancel'}>Cancel</MenuItem>
            <MenuItem value={'Pending'}>Pending</MenuItem>
            <MenuItem value={'Sent Email'}>Sent Email</MenuItem>
            <MenuItem value={'Paid'}>Paid</MenuItem>
            <MenuItem value={'Done'}>Done</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleUpdateStatus} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
