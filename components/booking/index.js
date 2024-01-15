'use client'
import { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import dayjs, { Dayjs } from 'dayjs'
import dateFormat from 'dateformat'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import PageLoader from '../pageLoader'
import { getDatabase, ref, set } from 'firebase/database'
import { db } from '@/app/firebase'
import { v4 } from 'uuid'
import 'yup-phone'

export default function Booking(props) {
  const BookingSteps = {
    SelectType: 'SelectType',
    SelectDateTime: 'SelectDateTime',
    InputInfor: 'InputInfor',
    Confirm: 'Confirm',
    Done: 'Done',
  }
  const PhotoshootType = {
    PortraitIndoor: 'PortraitIndoor',
    PortraitOutdoor: 'PortraitOutdoor',
    UniqueConceptIndoor: 'UniqueConceptIndoor',
    UniqueConceptOutdoor: 'UniqueConceptOutdoor',
    FamilyOutdoor: 'FamilyOutdoor',
    Prewedding: 'Pre-wedding',
  }

  const PhotoshootPrice = {
    PortraitIndoor: 299,
    PortraitOutdoor: 449,
    UniqueConceptIndoor: 399,
    UniqueConceptOutdoor: 599,
    FamilyOutdoor: 699,
    Prewedding: 1999,
  }

  const [bookingStep, setBookingStep] = useState(BookingSteps.SelectType)
  const [bookingDetail, setBookingDetail] = useState({
    type: null,
    date: null,
    name: null,
    email: null,
    phone: null,
    description: null,
    price: 0,
  })
  const today = new Date()
  const minDate = today.setDate(today.getDate() + 5)

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)

  let initialValues = {
    name: bookingDetail.name,
    email: bookingDetail.email,
    phone: bookingDetail.phone,
    description: bookingDetail.description,
  }
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required('This is requred field').max(100),
      email: Yup.string().email().required('This is requred field').max(150),
      phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('This is requred field'),
      description: Yup.string().required('This is requred field').max(500),
    })
  }

  const handleOnSubmitInputInfor = (values, actions) => {
    setBookingDetail((prevState) => ({
      ...prevState,
      name: values.name,
      email: values.email,
      phone: values.phone,
      description: values.description,
    }))
    setBookingStep(BookingSteps.Confirm)
  }

  const handleOnSubmitBooking = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const id = v4()
    set(ref(db, 'PhotoshootBooking/' + id), {
      id: id,
      photoshootType: bookingDetail.type,
      shootingDate: bookingDetail.date,
      name: bookingDetail.name,
      email: bookingDetail.email,
      phone: bookingDetail.phone,
      description: bookingDetail.description,
      price: bookingDetail.price,
      submittedDate: dateFormat(today, 'mm/dd/yyyy'),
      status: 'Submitted',
    })
      .then(() => {
        setIsSubmitting(false)
        setBookingStep(BookingSteps.Done)
      })
      .catch(() => {
        setIsSubmitting(false)
        alert('Error! Please try again. Thank you')
      })
  }

  const basicPackageplan = () => {
    return (
      <>
        <li>Half Day Event</li>
        <li>Printable High-res Images 20</li>
        <li>Makeup + Hair (+ $150)</li>
        <li>Up to 100 High-res Images</li>
        <li>Online Gallery</li>
      </>
    )
  }

  return (
    <>
      {isSubmitting && <PageLoader />}
      <div className='container'>
        {bookingStep == BookingSteps.SelectType && (
          <>
            <div className='row'>
              <h2>Select photoshoot type:</h2>
            </div>
            <div className='row'>
              <div className='col-md-12 '>
                <div id='bt-content' className='bt-content'>
                  <div className='bt-packagesplans'>
                    <div className='row'>
                      <div className='col-md-4 '>
                        <div className='bt-packageplan'>
                          <h2>Portrait Indoor</h2>
                          <ul>{basicPackageplan()}</ul>
                          <div className='bt-packageplanfoot'>
                            <a
                              className='bt-btn bt-btnblack '
                              role='button'
                              onClick={() => {
                                setBookingStep(BookingSteps.SelectDateTime)
                                setBookingDetail((prevState) => ({
                                  ...prevState,
                                  type: PhotoshootType.PortraitIndoor,
                                  price: PhotoshootPrice.PortraitIndoor,
                                }))
                              }}
                            >
                              <span>Select</span>
                            </a>
                            <h3>
                              <sup>$</sup>
                              {PhotoshootPrice.PortraitIndoor}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-4 '>
                        <div className='bt-packageplan'>
                          <h2>Unique Concept Indoor</h2>
                          <ul>
                            {basicPackageplan()}
                            <li> Outfit Changes 2</li>
                            <li>
                              <b>
                                Based on your expectation, we will setup a
                                concept for you (The price depends on your
                                concept)
                              </b>
                            </li>
                          </ul>
                          <div className='bt-packageplanfoot'>
                            <a
                              className='bt-btn bt-btnblack '
                              role='button'
                              onClick={() => {
                                setBookingStep(BookingSteps.SelectDateTime)
                                setBookingDetail((prevState) => ({
                                  ...prevState,
                                  type: PhotoshootType.UniqueConceptIndoor,
                                  price: PhotoshootPrice.UniqueConceptIndoor,
                                }))
                              }}
                            >
                              <span>Select</span>
                            </a>
                            <h3>
                              <sup>$</sup>
                              {PhotoshootPrice.UniqueConceptIndoor}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className='col-md-4 '>
                        <div className='bt-packageplan'>
                          <h2>Portrait Outdoor</h2>
                          <ul>{basicPackageplan()}</ul>
                          <div className='bt-packageplanfoot'>
                            <a
                              className='bt-btn bt-btnblack '
                              role='button'
                              onClick={() => {
                                setBookingStep(BookingSteps.SelectDateTime)
                                setBookingDetail((prevState) => ({
                                  ...prevState,
                                  type: PhotoshootType.PortraitOutdoor,
                                  price: PhotoshootPrice.PortraitOutdoor,
                                }))
                              }}
                            >
                              <span>Select</span>
                            </a>
                            <h3>
                              <sup>$</sup>
                              {PhotoshootPrice.PortraitOutdoor}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-4 '>
                        <div className='bt-packageplan'>
                          <h2>Unique Concept Outdoor</h2>
                          <ul>
                            {basicPackageplan()}
                            <li> Outfit Changes 2</li>
                            <li>
                              Reference:
                              <a target='_blank' href='/albums/spring-girl'>
                                Spring Girl
                              </a>
                              ,&nbsp;
                              <a
                                target='_blank'
                                href='/albums/most-wanted-it-girl-look'
                              >
                                Most Wanted It Girl Look
                              </a>
                            </li>
                            <li>
                              <b>
                                Based on your expectation, we will setup a
                                concept for you (The price depends on your
                                concept)
                              </b>
                            </li>
                          </ul>
                          <div className='bt-packageplanfoot'>
                            <a
                              className='bt-btn bt-btnblack '
                              role='button'
                              onClick={() => {
                                setBookingStep(BookingSteps.SelectDateTime)
                                setBookingDetail((prevState) => ({
                                  ...prevState,
                                  type: PhotoshootType.UniqueConceptOutdoor,
                                  price: PhotoshootPrice.UniqueConceptOutdoor,
                                }))
                              }}
                            >
                              <span>Select</span>
                            </a>
                            <h3>
                              <sup>$</sup>
                              {PhotoshootPrice.UniqueConceptOutdoor}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-4 '>
                        <div className='bt-packageplan'>
                          <h2>Family Outdoor, Party, Celebrate</h2>
                          <ul>
                            {basicPackageplan()}
                            <li>
                              Reference:
                              <a
                                target='_blank'
                                href='/albums/celebrate-graduation-photography'
                              >
                                Celebrate Graduation
                              </a>
                            </li>
                          </ul>
                          <div className='bt-packageplanfoot'>
                            <a
                              className='bt-btn bt-btnblack '
                              role='button'
                              onClick={() => {
                                setBookingStep(BookingSteps.SelectDateTime)
                                setBookingDetail((prevState) => ({
                                  ...prevState,
                                  type: PhotoshootType.FamilyOutdoor,
                                  price: PhotoshootPrice.FamilyOutdoor,
                                }))
                              }}
                            >
                              <span>Select</span>
                            </a>
                            <h3>
                              <sup>$</sup>
                              {PhotoshootPrice.FamilyOutdoor}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-4 '>
                        <div className='bt-packageplan'>
                          <h2>Pre-Wedding</h2>
                          <ul>
                            {basicPackageplan()}
                            <li> Outfit Changes 2</li>
                          </ul>
                          <div className='bt-packageplanfoot'>
                            <a
                              className='bt-btn bt-btnblack '
                              role='button'
                              onClick={() => {
                                setBookingStep(BookingSteps.SelectDateTime)
                                setBookingDetail((prevState) => ({
                                  ...prevState,
                                  type: PhotoshootType.Prewedding,
                                  price: PhotoshootPrice.Prewedding,
                                }))
                              }}
                            >
                              <span>Select</span>
                            </a>
                            <h3>
                              <sup>$</sup>
                              {PhotoshootPrice.Prewedding}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {bookingStep == BookingSteps.SelectDateTime && (
          <>
            <div className='row'>
              <h2>Select date:</h2>
            </div>
            <div className='row'>
              <div className='col-md-12 '>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    disablePast
                    onChange={(value) => {
                      setBookingDetail((prevState) => ({
                        ...prevState,
                        date: dateFormat(dayjs(value), 'mm/dd/yyyy'),
                      }))
                    }}
                  />
                </LocalizationProvider>
                <div className='text-center'>
                  <a
                    className='bt-btn bt-btnblack '
                    role='button'
                    onClick={() => {
                      setBookingStep(BookingSteps.SelectType)
                    }}
                  >
                    <span>Back</span>
                  </a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a
                    className='bt-btn bt-btnblack '
                    role='button'
                    onClick={() => {
                      if (bookingDetail.date != null) {
                        setBookingStep(BookingSteps.InputInfor)
                      } else {
                        alert('Please select date')
                      }

                      console.log(bookingDetail)
                    }}
                  >
                    <span>Next</span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
        {bookingStep == BookingSteps.InputInfor && (
          <>
            <div className='row'>
              <div className='col-md-6 offset-md-3'>
                <h2>Please input your information:</h2>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleOnSubmitInputInfor}
                  validationSchema={validationSchema}
                  validateOnChange={false}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form autoComplete='off'>
                      <div className='form-row pl-8 pr-8'>
                        <div className='form-group col-md-12'>
                          <Field
                            type='text'
                            className='form-control'
                            name='name'
                            max={150}
                            placeholder='Name'
                          />
                          <ErrorMessage
                            name='name'
                            component='div'
                            className='alert alert-field alert-danger'
                          />
                        </div>

                        <div className='form-group col-md-12'>
                          <Field
                            type='text'
                            className='form-control'
                            name='email'
                            max={150}
                            placeholder='email'
                          />
                          <ErrorMessage
                            name='email'
                            component='div'
                            className='alert alert-field alert-danger'
                          />
                        </div>
                        <div className='form-group col-md-12'>
                          <Field
                            type='text'
                            className='form-control'
                            name='phone'
                            placeholder='phone'
                          />
                          <ErrorMessage
                            name='phone'
                            component='div'
                            className='alert alert-field alert-danger'
                          />
                        </div>
                        <div className='form-group col-md-12'>
                          <Field
                            type='textarea'
                            as='textarea'
                            style={{ height: 150 }}
                            className='form-control'
                            name='description'
                            placeholder='Description'
                            max={500}
                          />
                          <ErrorMessage
                            name='description'
                            component='div'
                            className='alert alert-field alert-danger'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12 '>
                          <div className='text-center'>
                            <a
                              className='bt-btn bt-btnblack '
                              role='button'
                              onClick={() => {
                                setBookingStep(BookingSteps.SelectDateTime)
                              }}
                            >
                              <span>Back</span>
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                              type='submit'
                              className='bt-btn bt-btnblack '
                            >
                              <span>Next</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </>
        )}
        {bookingStep == BookingSteps.Confirm && (
          <>
            <div className='row'>
              <h2>Confirm:</h2>
            </div>
            <div className='row'>
              <div className='col-md-12 '>
                {bookingDetail.type == PhotoshootType.PortraitIndoor && (
                  <>
                    <div className='bt-packageplan'>
                      <h2>Portrait Indoor</h2>
                      <div className='row'>
                        <div className='col-md-6 '>
                          <ul>
                            {basicPackageplan()}
                            <li>
                              Date shoot: <strong>{bookingDetail.date}</strong>
                            </li>
                          </ul>
                        </div>
                        <div className='col-md-6 '>
                          <ul>
                            <li>Name: {bookingDetail.name}</li>
                            <li>Email: {bookingDetail.email}</li>
                            <li>Phone: {bookingDetail.phone}</li>
                            <li>Description: {bookingDetail.description}</li>
                          </ul>
                        </div>
                      </div>

                      <div className='bt-packageplanfoot'>
                        <a
                          className='bt-btn bt-btnblack '
                          role='button'
                          onClick={() => {
                            setBookingStep(BookingSteps.SelectDateTime)
                          }}
                        >
                          <span>Change date</span>
                        </a>
                        <h3>
                          <sup>$</sup>
                          {PhotoshootPrice.PortraitIndoor}
                        </h3>
                      </div>
                    </div>
                  </>
                )}
                {bookingDetail.type == PhotoshootType.UniqueConceptIndoor && (
                  <>
                    <div className='bt-packageplan'>
                      <h2>Unique Concept Indoor</h2>
                      <div className='row'>
                        <div className='col-md-6 '>
                          <ul>
                            {basicPackageplan()}
                            <li> Outfit Changes 2</li>
                            <li>
                              <b>
                                Based on your expectation, we will setup a
                                concept for you (The price depends on your
                                concept)
                              </b>
                            </li>
                            <li>
                              Date shoot: <strong>{bookingDetail.date}</strong>
                            </li>
                          </ul>
                        </div>
                        <div className='col-md-6 '>
                          <ul>
                            <li>Name: {bookingDetail.name}</li>
                            <li>Email: {bookingDetail.email}</li>
                            <li>Phone: {bookingDetail.phone}</li>
                            <li>Description: {bookingDetail.description}</li>
                          </ul>
                        </div>
                      </div>
                      <div className='bt-packageplanfoot'>
                        <a
                          className='bt-btn bt-btnblack '
                          role='button'
                          onClick={() => {
                            setBookingStep(BookingSteps.SelectDateTime)
                          }}
                        >
                          <span>Change date</span>
                        </a>
                        <h3>
                          <sup>$</sup>
                          {PhotoshootPrice.UniqueConceptIndoor}
                        </h3>
                      </div>
                    </div>
                  </>
                )}

                {bookingDetail.type == PhotoshootType.PortraitOutdoor && (
                  <>
                    <div className='bt-packageplan'>
                      <h2>Portrait Outdoor</h2>
                      <div className='row'>
                        <div className='col-md-6 '>
                          <ul>
                            {basicPackageplan()}
                            <li>
                              Date shoot: <strong>{bookingDetail.date}</strong>
                            </li>
                          </ul>
                        </div>
                        <div className='col-md-6 '>
                          <ul>
                            <li>Name: {bookingDetail.name}</li>
                            <li>Email: {bookingDetail.email}</li>
                            <li>Description: {bookingDetail.description}</li>
                          </ul>
                        </div>
                      </div>
                      <div className='bt-packageplanfoot'>
                        <a
                          className='bt-btn bt-btnblack '
                          role='button'
                          onClick={() => {
                            setBookingStep(BookingSteps.SelectDateTime)
                          }}
                        >
                          <span>Change date</span>
                        </a>
                        <h3>
                          <sup>$</sup>
                          {PhotoshootPrice.PortraitOutdoor}
                        </h3>
                      </div>
                    </div>
                  </>
                )}

                {bookingDetail.type == PhotoshootType.UniqueConceptOutdoor && (
                  <>
                    <div className='bt-packageplan'>
                      <h2>Unique Concept Outdoor</h2>
                      <div className='row'>
                        <div className='col-md-6 '>
                          <ul>
                            {basicPackageplan()}
                            <li> Outfit Changes 2</li>
                            <li>
                              Reference:
                              <a target='_blank' href='/albums/spring-girl'>
                                Spring Girl
                              </a>
                              ,&nbsp;
                              <a
                                target='_blank'
                                href='/albums/most-wanted-it-girl-look'
                              >
                                Most Wanted It Girl Look
                              </a>
                            </li>
                            <li>
                              <b>
                                Based on your expectation, we will setup a
                                concept for you (The price depends on your
                                concept)
                              </b>
                            </li>
                            <li>
                              Date shoot: <strong>{bookingDetail.date}</strong>
                            </li>
                          </ul>
                        </div>
                        <div className='col-md-6 '>
                          <ul>
                            <li>Name: {bookingDetail.name}</li>
                            <li>Email: {bookingDetail.email}</li>
                            <li>Phone: {bookingDetail.phone}</li>
                            <li>Description: {bookingDetail.description}</li>
                          </ul>
                        </div>
                      </div>
                      <div className='bt-packageplanfoot'>
                        <a
                          className='bt-btn bt-btnblack '
                          role='button'
                          onClick={() => {
                            setBookingStep(BookingSteps.SelectDateTime)
                          }}
                        >
                          <span>Change date</span>
                        </a>
                        <h3>
                          <sup>$</sup>
                          {PhotoshootPrice.PortraitOutdoor}
                        </h3>
                      </div>
                    </div>
                  </>
                )}

                {bookingDetail.type == PhotoshootType.FamilyOutdoor && (
                  <>
                    <div className='bt-packageplan'>
                      <h2>Family Outdoor, Party, Celebrate</h2>
                      <div className='row'>
                        <div className='col-md-6 '>
                          <ul>
                            {basicPackageplan()}
                            <li>
                              Reference:
                              <a
                                target='_blank'
                                href='/albums/celebrate-graduation-photography'
                              >
                                Celebrate Graduation
                              </a>
                            </li>
                            <li>
                              Date shoot: <strong>{bookingDetail.date}</strong>
                            </li>
                          </ul>
                        </div>
                        <div className='col-md-6 '>
                          <ul>
                            <li>Name: {bookingDetail.name}</li>
                            <li>Email: {bookingDetail.email}</li>
                            <li>Phone: {bookingDetail.phone}</li>
                            <li>Description: {bookingDetail.description}</li>
                          </ul>
                        </div>
                      </div>

                      <div className='bt-packageplanfoot'>
                        <a
                          className='bt-btn bt-btnblack '
                          role='button'
                          onClick={() => {
                            setBookingStep(BookingSteps.SelectDateTime)
                          }}
                        >
                          <span>Change date</span>
                        </a>
                        <h3>
                          <sup>$</sup>
                          {PhotoshootPrice.FamilyOutdoor}
                        </h3>
                      </div>
                    </div>
                  </>
                )}

                {bookingDetail.type == PhotoshootType.Prewedding && (
                  <>
                    <div className='bt-packageplan'>
                      <h2>Pre-Wedding</h2>
                      <div className='row'>
                        <div className='col-md-6 '>
                          <ul>
                            {basicPackageplan()}
                            <li> Outfit Changes 2</li>
                            <li>
                              Date shoot: <strong>{bookingDetail.date}</strong>
                            </li>
                          </ul>
                        </div>
                        <div className='col-md-6 '>
                          <ul>
                            <li>Name: {bookingDetail.name}</li>
                            <li>Email: {bookingDetail.email}</li>
                            <li>Phone: {bookingDetail.phone}</li>
                            <li>Description: {bookingDetail.description}</li>
                          </ul>
                        </div>
                      </div>
                      <div className='bt-packageplanfoot'>
                        <a
                          className='bt-btn bt-btnblack '
                          role='button'
                          onClick={() => {
                            setBookingStep(BookingSteps.SelectDateTime)
                          }}
                        >
                          <span>Change date</span>
                        </a>
                        <h3>
                          <sup>$</sup>
                          {PhotoshootPrice.Prewedding}
                        </h3>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className='text-center mt-5'>
                <a
                  className='bt-btn bt-btnblack '
                  role='button'
                  onClick={() => {
                    setBookingStep(BookingSteps.InputInfor)
                  }}
                >
                  <span>Back</span>
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  className='bt-btn bt-btnblack '
                  role='button'
                  onClick={handleOnSubmitBooking}
                >
                  <span>Book now</span>
                </a>
              </div>
            </div>
          </>
        )}

        {bookingStep == BookingSteps.Done && (
          <>
            <div className='row text-center'>
              <div className='col-md-12 '>
                <h2 className='booking-thank-you'>
                  Thank you for booking a photo shoot, we will contact you as
                  soon as possible.
                </h2>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 '>
                <div className='text-center mt-5'>
                  <a className='bt-btn bt-btnblack ' role='button' href='/'>
                    <span>Back To Home</span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
