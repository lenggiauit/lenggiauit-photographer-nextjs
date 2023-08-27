'use client'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import PageLoader from '../pageLoader'
import { getDatabase, ref, set } from 'firebase/database'
import { db } from '@/app/firebase'
import { v4 } from 'uuid'
import dateFormat from 'dateformat'

export default function Chatbot(props) {
  const localStorageKey = 'chatboxUserInfo'
  var chatboxUserInfoStorage
  if (typeof window !== 'undefined') {
    chatboxUserInfoStorage = window.localStorage.getItem(localStorageKey)
  }

  const [chatboxUserInfo, setChatboxUserInfo] = useState(
    JSON.parse(chatboxUserInfoStorage) || null
  )
  const [isResponding, setIsResponding] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')

  let initialValues = {
    userId: '',
    name: '',
    email: '',
    message: '',
  }

  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required('This is requred field').max(100),
      email: Yup.string().email().required('This is requred field').max(150),
      message: Yup.string().required('This is requred field').max(250),
    })
  }

  const handleOnSubmitInputInfor = (values, actions) => {
    var userID = v4()
    setChatboxUserInfo({
      userId: userID,
      name: values.name,
      email: values.email,
      messages: [
        { userId: userID, message: values.message, datetime: new Date() },
      ],
    })
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          userId: userID,
          name: values.name,
          email: values.email,
          messages: [
            { userId: userID, message: values.message, datetime: new Date() },
          ],
        })
      )
    }
    savetoDb(userID, values.name, values.email, values.message)
    getResponeMessage(values.message)
  }

  useEffect(() => {
    var scrollDiv = document.getElementsByClassName(
      'chatbot-message-list-container'
    )[0]
    if (scrollDiv != undefined) scrollDiv.scrollTop = scrollDiv.scrollHeight
  }, [chatboxUserInfo, currentMessage])

  const handleUserSendMessage = (e) => {
    setCurrentMessage(e.target.value)
  }

  const onKeyDown = (e) => {
    if (e.keyCode == 13 && currentMessage.length > 0) {
      sendMessage()
    }
  }

  const savetoDb = (userId, userName, userEmail, firstMessage) => {
    set(ref(db, 'chatbot/' + userId), {
      userId: userId,
      userName: userName,
      email: userEmail,
      firstMessage: firstMessage,
      date: dateFormat(new Date(), 'mm/dd/yyyy hh:mm:ss'),
    }).catch(() => {
      console.log('Error!')
    })
  }

  const saveMessagetoDb = (userId, message) => {
    set(ref(db, 'messages/' + v4()), {
      userId: userId,
      message: message,
      datetime: dateFormat(new Date(), 'mm/dd/yyyy hh:mm:ss'),
    }).catch(() => {
      console.log('Error!')
    })
  }

  const AddMessage = (userId, message) => {
    var newChatboxUserInfo = chatboxUserInfo
    if (newChatboxUserInfo == null && typeof window !== 'undefined') {
      const localStorage = window.localStorage.getItem(localStorageKey)
      if (localStorage != null && localStorage != '') {
        // newChatboxUserInfo = JSON.parse(localStorage)
      }
    }

    newChatboxUserInfo.messages.push({
      userId: userId,
      message: message,
      datetime: new Date(),
    })

    if (newChatboxUserInfo.messages.length > 25) {
      newChatboxUserInfo.messages = newChatboxUserInfo.messages.slice(
        Math.max(newChatboxUserInfo.messages.length - 25, 0)
      )
    }

    setChatboxUserInfo(newChatboxUserInfo)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        localStorageKey,
        JSON.stringify(newChatboxUserInfo)
      )
    }
    if (userId != 'chatbot') saveMessagetoDb(userId, message)
  }

  const getResponeMessage = async (msg) => {
    setIsResponding(true)
    //console.log(msg)
    const res = await fetch(`/api/chatbot?message=${msg}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    //console.log(Object.values(data.body.traits)[0][0].value)
    if (
      Object.values(data.body.traits).length > 0 &&
      Object.values(data.body.traits)[0][0]?.value
    ) {
      AddMessage('chatbot', Object.values(data.body.traits)[0][0].value)
    } else {
      AddMessage(
        'chatbot',
        'I`m not sure what you mean, Could you break that down a bit more?'
      )
    }
    setIsResponding(false)
    setCurrentMessage('')
  }

  const sendMessage = () => {
    AddMessage(chatboxUserInfo.userId, currentMessage)
    getResponeMessage(currentMessage)
  }

  return (
    <>
      <div className='chatbot-container'>
        <input type='checkbox' id='chatbot-check' />
        <label className='chatbot-btn' htmlFor='chatbot-check'>
          <i className='bi bi-chat-dots comment'></i>
          <i className='bi bi-x-lg close'></i>
        </label>

        <div className='chatbot-wrapper'>
          <div className='chatbot-header'>
            <h6>Chat</h6>
          </div>
          {chatboxUserInfo == null && (
            <>
              <div className='text-center chatbot-header-description'>
                <span>Please fill out the form to start chat!</span>
              </div>
              <div className='chatbot-form'>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleOnSubmitInputInfor}
                  validationSchema={validationSchema}
                  validateOnChange={false}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form autoComplete='off' className='needs-validation'>
                      <Field
                        type='text'
                        className={
                          'form-control ' + (errors['name'] ? 'is-invalid' : '')
                        }
                        name='name'
                        max={150}
                        placeholder='Name'
                      />
                      <Field
                        type='text'
                        className={
                          'form-control ' +
                          (errors['email'] ? 'is-invalid' : '')
                        }
                        name='email'
                        max={150}
                        placeholder='email'
                      />
                      <Field
                        as='textarea'
                        className={
                          'form-control ' +
                          (errors['message'] ? 'is-invalid' : '')
                        }
                        name='message'
                        max={250}
                        placeholder='Your Text Message'
                      />
                      <button
                        type='submit'
                        className='btn btn-success chatbot-submit-btn'
                      >
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </>
          )}
          {chatboxUserInfo != null && (
            <>
              <div className='chatbot-message-container '>
                <div
                  className='chatbot-message-list-container '
                  data-mdb-perfect-scrollbar='true'
                >
                  {/*  */}
                  {Object.values(chatboxUserInfo.messages).map((m) => (
                    <div key={v4()}>
                      {chatboxUserInfo.userId == m.userId && (
                        <div className='d-flex flex-row justify-content-end'>
                          <div>
                            <p
                              className='small p-2 me-3 mb-1 text-white rounded-3 bg-primary'
                              style={{ backgroundColor: '#f5f6f7' }}
                            >
                              {m.message}
                            </p>
                          </div>
                          <div className='avatar-container'>
                            <i
                              title={chatboxUserInfo.name}
                              className='bi bi-person-circle'
                              style={{ fontSize: 32, color: '#3498DB' }}
                            ></i>
                          </div>
                        </div>
                      )}
                      {chatboxUserInfo.userId != m.userId && (
                        <div className='d-flex flex-row justify-content-start'>
                          <div className='avatar-container'>
                            <i
                              className='bi bi-robot'
                              style={{ fontSize: 32, color: '#d35400' }}
                            ></i>
                          </div>
                          <div>
                            <p
                              className='small p-2 ms-3 mb-1 rounded-3'
                              style={{ backgroundColor: '#f5f6f7' }}
                            >
                              {m.message}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {isResponding && (
                  <div className='chatbot-message-responding text-muted d-flex justify-content-start align-items-center'>
                    <i
                      className='bi bi-robot'
                      style={{ fontSize: 24, color: '#eee' }}
                    ></i>
                    <div className='dot-container'>
                      <div className='dot-loader'></div>
                    </div>
                  </div>
                )}
                {!isResponding && (
                  <div className='chatbot-message-controls text-muted d-flex justify-content-start align-items-center'>
                    <i
                      className='bi bi-person-circle'
                      style={{ fontSize: 24, color: '#eee' }}
                    ></i>
                    <input
                      type='text'
                      className='chat-control form-control form-control-lg'
                      id='exampleFormControlInput1'
                      placeholder={isResponding ? '...' : 'Type message'}
                      disabled={isResponding}
                      value={currentMessage}
                      onChange={handleUserSendMessage}
                      onKeyDown={onKeyDown}
                    />
                    <a
                      className={'ms-3 ' + isResponding ? 'disabled' : ''}
                      onClick={sendMessage}
                    >
                      <i className='bi bi-send'></i>
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
