'use client'
import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import PageLoader from '@/components/pageLoader'
import Image from 'next/image'
import BtnBooking from '@/components/btnBooking'
import PhotoList from '@/components/photoList'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

let appSetting = require('/appSetting.json')
let appData = require('/data/concepts.json')

const ConceptDetail = (props) => {
  const [index, setIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [registerType, setRegisterType] = useState('')
  const handleClose = () => setOpenModal(false)
  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleRegister = (e) => {}

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
                  {(props.data.openForRegister.photographer ||
                    props.data.openForRegister.model ||
                    props.data.openForRegister.makeup) && (
                    <>
                      <div className='row bt-portfolioinfo1 justify-content-center'>
                        {props.data.openForRegister.photographer && (
                          <>
                            <div className='col-md-4 text-center mt-2'>
                              <p>If you want to take photos</p>
                              <a
                                className='bt-btn bt-btnblack'
                                href='#'
                                onClick={() => {
                                  setRegisterType('Photographer')
                                  setOpenModal(true)
                                }}
                              >
                                <span>Register as a photographer</span>
                              </a>
                            </div>
                          </>
                        )}
                        {props.data.openForRegister.model && (
                          <>
                            <div className='col-md-4 text-center mt-2'>
                              <p>If you want to have more beautiful pictures</p>
                              <a
                                className='bt-btn bt-btnblack'
                                href='#'
                                onClick={() => {
                                  setRegisterType('Model')
                                  setOpenModal(true)
                                }}
                              >
                                <span>Register as a model</span>
                              </a>
                            </div>
                          </>
                        )}
                        {props.data.openForRegister.makeup && (
                          <>
                            <div className='col-md-4 text-center mt-2'>
                              <p> If you want to practice makeup</p>
                              <a
                                className='bt-btn bt-btnblack'
                                href='#'
                                onClick={() => {
                                  setRegisterType('Makeup')
                                  setOpenModal(true)
                                }}
                              >
                                <span>Register as a makeup</span>
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}
                  <div className='row bt-portfolioinfo'>
                    <div className='col-md-3'>
                      <span>Shooting Date</span>
                      <br />
                      <strong>Dec-12-2023</strong>
                    </div>
                    <div className='col-md-3'>
                      <span>Shoot type</span>
                      <br />
                      <strong>TFP</strong>
                    </div>
                    <div className='col-md-3'>
                      <span>Location</span>
                      <br />
                      <strong>Chinatown</strong>
                    </div>
                    <div className='col-md-3'>
                      <span>Status</span>
                      <br />
                      <strong>Up comming</strong>
                    </div>
                  </div>
                  <div className='row bt-portfolioinfo'>
                    <div className='col-md-4'>
                      <span>Photographers</span>
                      <br />
                      <strong>lenggiauit</strong>
                    </div>
                    <div className='col-md-4'>
                      <span>Models</span>
                      <br />
                      <strong>Chi Van</strong>
                    </div>
                    <div className='col-md-4'>
                      <span>Stylist / Makeup</span>
                      <br />
                      <strong>...</strong>
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

      <div className={`modal fade ${openModal ? 'show' : 'hide'}`}>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                You are registering as a {registerType}
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
              <form>
                <div className='form-group'>
                  <label className='small'>Full name</label>
                  <input
                    type='text'
                    className='form-control'
                    aria-describedby='emailHelp'
                    placeholder='Enter your full name'
                  />
                </div>
                <div className='form-group'>
                  <label className='small'>Email address</label>
                  <input
                    type='email'
                    className='form-control'
                    aria-describedby='emailHelp'
                    placeholder='Enter email'
                  />
                </div>
                <div className='form-group'>
                  <label className='small'>Instagram | Facebook</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Instagram'
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
                    onClick={handleRegister}
                    type='submit'
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;Register&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConceptDetail
