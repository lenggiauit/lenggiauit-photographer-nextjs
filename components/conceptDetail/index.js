'use client'
import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import PageLoader from '@/components/pageLoader'
import Image from 'next/image'
import BtnBooking from '@/components/btnBooking'
import PhotoList from '@/components/photoList'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import dateFormat from 'dateformat'

let appSetting = require('/appSetting.json')
let appData = require('/data/concepts.json')

import { onValue, ref } from 'firebase/database'
import { db } from '@/app/firebase'

const ConceptDetail = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [RegisterList, setRegisterList] = useState([])
  const handleClose = () => setOpenModal(false)
  useEffect(() => {
    getRegisterList(props.data.pageUrl)
    setIsLoading(false)
  }, [])

  const getRegisterList = async (url) => {
    setRegisterList([])
    const query = ref(db, 'joinConcepts')
    var list = []
    onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((groupSnapshot) => {
          if (groupSnapshot.child('conceptUrl').val() == url) {
            list.push(groupSnapshot.val())
          }
        })
        setRegisterList(list)
        console.log(list)
      }
    })
  }

  const handleJoin = (e) => {}

  const JoinAs = {
    Photographer: 'Photographer',
    Model: 'Model',
    Makeup: 'Makeup',
  }

  let initialValues = {
    joinAs: JoinAs.Photographer,
    concept: '',
    fullName: '',
    email: '',
    socailLink: '',
  }

  const [joinInfo, setJoinInfo] = useState({
    joinAs: JoinAs.Photographer,
    fullName: '',
    email: '',
    socailLink: '',
  })

  const socialRegExp = /^.*((facebook\.com)|(instagram\.com)).*$/gi

  const validationSchema = () => {
    return Yup.object().shape({
      fullName: Yup.string().required('This is requred field').max(100),
      email: Yup.string().email().required('This is requred field').max(150),
      socailLink: Yup.string()
        .matches(socialRegExp, 'Facebook or Instgram link is not valid')
        .required('This is requred field'),
    })
  }

  const handleOnSubmitInputInfor = (values, actions) => {
    setIsSubmitting(true)
    const today = new Date()
    var id = v4()
    set(ref(db, 'joinConcepts/' + id), {
      id: id,
      joinAs: joinInfo.joinAs,
      concept: props.data.pageheader.title,
      conceptUrl: props.data.pageUrl,
      fullName: values.fullName,
      email: values.email,
      socailLink: values.socailLink,
      submittedDate: dateFormat(today, 'mm/dd/yyyy'),
    })
      .then(() => {
        setIsSubmitting(false)
        setOpenModal(false)
        alert(
          `Register successfully!. Please come to location:${props.data.pageheader.location} at ${props.data.pageheader.shootingDateTime}. Thank you`
        )
      })
      .catch(() => {
        setIsSubmitting(false)
        alert('Error! Please try again. Thank you')
      })
  }

  return (
    <>
      {isLoading && <PageLoader />}
      {!isLoading && (
        <>
          <main id='bt-main' className='bt-main bt-haslayout'>
            <div className='container'>
              <div className='container'>
                <div className='row'>
                  <div className='bt-freephotosgallery'>
                    <h1 className='heading text-center'>
                      {props.data.pageheader.title}
                    </h1>
                    <BtnBooking />
                    <p className='text-center'>
                      {props.data.pageheader.description}
                    </p>
                  </div>
                  {(props.data.openForJoin.photographer ||
                    props.data.openForJoin.model ||
                    props.data.openForJoin.makeup) && (
                    <>
                      <div className='row bt-portfolioinfo1 justify-content-center'>
                        {props.data.openForJoin.photographer && (
                          <>
                            <div className='col-md-4 text-center mt-2'>
                              <p>If you want to take photos</p>
                              <a
                                className='bt-btn bt-btnblack'
                                href='#'
                                onClick={() => {
                                  setJoinInfo((prevState) => ({
                                    ...prevState,
                                    joinAs: JoinAs.Photographer,
                                  }))

                                  setOpenModal(true)
                                }}
                              >
                                <span>Join as a photographer</span>
                              </a>
                            </div>
                          </>
                        )}
                        {props.data.openForJoin.model && (
                          <>
                            <div className='col-md-4 text-center mt-2'>
                              <p>If you want to have more beautiful pictures</p>
                              <a
                                className='bt-btn bt-btnblack'
                                href='#'
                                onClick={() => {
                                  setJoinInfo((prevState) => ({
                                    ...prevState,
                                    joinAs: JoinAs.Model,
                                  }))
                                  setOpenModal(true)
                                }}
                              >
                                <span>Join as a model</span>
                              </a>
                            </div>
                          </>
                        )}
                        {props.data.openForJoin.makeup && (
                          <>
                            <div className='col-md-4 text-center mt-2'>
                              <p> If you want to practice makeup</p>
                              <a
                                className='bt-btn bt-btnblack'
                                href='#'
                                onClick={() => {
                                  setJoinInfo((prevState) => ({
                                    ...prevState,
                                    joinAs: JoinAs.Makeup,
                                  }))
                                  setOpenModal(true)
                                }}
                              >
                                <span>Join as a makeup</span>
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}
                  <div className='row bt-portfolioinfo'>
                    <h3>Concepts Information </h3>
                    <div className='col-md-2'>
                      <span>Shooting Date</span>
                      <br />
                      <strong>{props.data.pageheader.shootingDateTime}</strong>
                    </div>
                    <div className='col-md-2'>
                      <span>Shoot type</span>
                      <br />
                      <strong>{props.data.pageheader.shootingType}</strong>
                    </div>
                    <div className='col-md-5'>
                      <span>Location</span>
                      <br />
                      <strong>{props.data.pageheader.location}</strong>
                    </div>
                    <div className='col-md-3'>
                      <span>Status</span>
                      <br />
                      <strong>{props.data.pageheader.status}</strong>
                    </div>
                  </div>
                  <div className='row bt-portfolioinfo'>
                    <h3>Concepts joining list </h3>
                    <div className='col-md-4'>
                      <span>Photographers</span>
                      {RegisterList.filter(
                        (m) => m.joinAs == JoinAs.Photographer
                      ).map((m) => (
                        <>
                          <br />
                          <strong key={v4()}>{m.fullName}</strong>
                        </>
                      ))}
                    </div>
                    <div className='col-md-4'>
                      <span>Models</span>
                      {RegisterList.filter((m) => m.joinAs == JoinAs.Model).map(
                        (m) => (
                          <>
                            <br />
                            <strong key={v4()}>{m.fullName}</strong>
                          </>
                        )
                      )}
                    </div>
                    <div className='col-md-4'>
                      <span>Stylist / Makeup</span>
                      {RegisterList.filter(
                        (m) => m.joinAs == JoinAs.Makeup
                      ).map((m) => (
                        <>
                          <br />
                          <strong key={v4()}>{m.fullName}</strong>
                        </>
                      ))}
                    </div>
                  </div>
                  <div className='row bt-portfolioinfo '>
                    <h4>Example photos:</h4>
                    <PhotoList photos={props.data.photos} />
                  </div>

                  <div className='row bt-portfolioinfo'>
                    <ul className='bt-postnav'>
                      {props.data.prevPage == undefined && <li></li>}
                      {props.data.prevPage != undefined && (
                        <li>
                          <h3>
                            <a href={props.data.prevPage.link}>
                              {props.data.prevPage.title}
                            </a>
                          </h3>
                          <a href={props.data.prevPage.link}>
                            <i className='icon-arrow-left22'></i>
                            <span>Previous concept</span>
                          </a>
                        </li>
                      )}
                      {props.data.nextPage == undefined && <li></li>}
                      {props.data.nextPage != undefined && (
                        <li>
                          <h3>
                            <a href={props.data.nextPage.link}>
                              {props.data.nextPage.title}
                            </a>
                          </h3>
                          <a href={props.data.nextPage.link}>
                            <span>Next Concept</span>
                            <i className='icon-arrow-right22'></i>
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
      {isSubmitting && <PageLoader />}
      <div className={`modal fade ${openModal ? 'show' : 'hide'}`}>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                You are joining as a {joinInfo.joinAs}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={handleClose}
              ></button>
            </div>
            <div className='modal-body'>
              <Formik
                initialValues={initialValues}
                onSubmit={handleOnSubmitInputInfor}
                validationSchema={validationSchema}
                validateOnChange={false}
              >
                {({ values, errors, touched, setFieldValue }) => (
                  <Form autoComplete='off'>
                    <div className='form-group'>
                      <label className='small'>Full name</label>
                      <Field
                        type='text'
                        className='form-control'
                        name='fullName'
                        max={150}
                        placeholder='Enter your full name'
                      />
                      <ErrorMessage
                        name='fullName'
                        component='div'
                        className='alert alert-field alert-danger'
                      />
                    </div>
                    <div className='form-group'>
                      <label className='small'>Email address</label>

                      <Field
                        type='email'
                        className='form-control'
                        name='email'
                        max={250}
                        placeholder='Enter your email'
                      />
                      <ErrorMessage
                        name='email'
                        component='div'
                        className='alert alert-field alert-danger'
                      />
                    </div>
                    <div className='form-group'>
                      <label className='small'>Instagram | Facebook</label>

                      <Field
                        type='text'
                        className='form-control'
                        name='socailLink'
                        max={250}
                        placeholder='Enter your Instagram | Facebook link'
                      />
                      <ErrorMessage
                        name='socailLink'
                        component='div'
                        className='alert alert-field alert-danger'
                      />
                    </div>

                    <div className='form-group text-center'>
                      <button
                        className='bt-btn bt-btnblack'
                        style={{ cursor: 'pointer' }}
                        onClick={handleClose}
                      >
                        &nbsp; &nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        className='bt-btn bt-btnblack'
                        style={{ cursor: 'pointer' }}
                        onClick={handleJoin}
                        type='submit'
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;Join&nbsp;&nbsp;&nbsp;&nbsp;
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConceptDetail
