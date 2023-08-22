'use client'
import { useEffect, useState } from 'react'
import PageLoader from '../pageLoader'
import { ref, onValue, update } from 'firebase/database'
import { db } from '@/app/firebase'
import DataTable, { SortOrder, TableColumn } from 'react-data-table-component'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import dayjs, { Dayjs } from 'dayjs'
import dateFormat from 'dateformat'

export default function AdminBookingList(props) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)
  const [openModalChangeDate, setOpenModalChangeDate] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [BookingList, setBookingList] = useState([])
  const [selectedBookingItem, setSelectedBookingItem] = useState()
  const [selectedBookingItemStatus, setSelectedBookingItemStatus] = useState('')
  const [selectedBookingItemShootingDate, setSelectedBookingItemShootingDate] =
    useState('')
  // Data grid columns
  const columns = [
    {
      name: 'Change Status',
      button: true,
      width: '100px',
      cell: (row) => (
        <>
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
        </>
      ),
    },
    {
      name: 'Change shooting date',
      width: '100px',
      button: true,
      cell: (row) => (
        <>
          <button
            className='btn btn-primary btn-sm'
            onClick={() => {
              setSelectedBookingItem(row)
              setSelectedBookingItemShootingDate(row.shootingDate)
              setOpenModalChangeDate(true)
            }}
          >
            Change date
          </button>
        </>
      ),
    },
    {
      id: 'photoshootType',
      name: 'Photoshoot Type',
      width: '150px',
      selector: (row) => row.photoshootType,
      sortable: true,
    },
    {
      id: 'name',
      name: 'Name',
      width: '165px',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      id: 'email',
      name: 'Email',
      width: '175px',
      selector: (row) => <a href={`mailto:${row.email}`}> {row.email} </a>,
      sortable: false,
    },
    {
      id: 'phone',
      name: 'Phone',
      width: '150px',
      selector: (row) => <a href={`tel:${row.phone}`}> {row.phone} </a>,
      sortable: false,
    },
    {
      id: 'submittedDate',
      name: 'Submitted Date',
      width: '100px',
      selector: (row) => row.submittedDate,
      sortable: false,
    },
    {
      id: 'date',
      name: 'Shooting Date',
      width: '100px',
      selector: (row) => row.shootingDate,
      sortable: false,
    },
    {
      id: 'status',
      name: 'Status',
      width: '100px',
      selector: (row) => row.status,
      sortable: true,
    },

    {
      id: 'description',
      name: 'Description',

      selector: (row) => <p title={row.description}>{row.description}</p>,

      sortable: true,
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

  const handleChangeShootingDate = () => {
    const updates = {}
    updates['/PhotoshootBooking/' + selectedBookingItem.id] = {
      id: selectedBookingItem.id,
      photoshootType: selectedBookingItem.photoshootType,
      shootingDate: selectedBookingItemShootingDate,
      name: selectedBookingItem.name,
      email: selectedBookingItem.email,
      phone: selectedBookingItem.phone,
      description: selectedBookingItem.description,
      price: selectedBookingItem.price,
      submittedDate: selectedBookingItem.submittedDate,
      status: selectedBookingItem.status,
    }
    setIsSubmitting(true)
    update(ref(db), updates)
      .catch(() => {
        setIsSubmitting(false)
        setOpenModalChangeDate(false)
        alert('Error')
      })
      .then(() => {
        setIsSubmitting(false)
        setOpenModalChangeDate(false)
      })
  }

  const handleUpdateStatus = () => {
    const updates = {}
    updates['/PhotoshootBooking/' + selectedBookingItem.id] = {
      id: selectedBookingItem.id,
      photoshootType: selectedBookingItem.photoshootType,
      shootingDate: selectedBookingItem.shootingDate,
      name: selectedBookingItem.name,
      email: selectedBookingItem.email,
      phone: selectedBookingItem.phone,
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
      <div className='container1 mx-5'>
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

      <Dialog
        open={openModalChangeDate}
        onClose={() => {
          setOpenModalChangeDate(false)
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Change shooting date</DialogTitle>
        <DialogContent sx={{ width: 500, textAlign: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              disablePast
              onChange={(value) => {
                setSelectedBookingItemShootingDate(
                  dateFormat(dayjs(value), 'mm/dd/yyyy')
                )
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModalChangeDate(false)
            }}
          >
            Close
          </Button>
          <Button onClick={handleChangeShootingDate} autoFocus>
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
