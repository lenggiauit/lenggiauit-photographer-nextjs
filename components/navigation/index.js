'use client'
import { useEffect, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse'
import { usePathname } from 'next/navigation'
export default function Navigation(props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <>
      <header id='bt-header' className='bt-header bt-haslayout'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='bt-navigationarea'>
              <a
                className='bt-btntogglemenu'
                role='button'
                onClick={() => setOpen(!open)}
              >
                {props.black && (
                  <>
                    <img src='/images/icons/icon-04.png' alt='menu' />
                  </>
                )}
                {!props.black && (
                  <>
                    <img src='/images/icons/icon-01.png' alt='menu' />
                  </>
                )}
              </a>
            </div>
          </div>
        </div>
      </header>
      <Collapse in={open}>
        <nav id='btnav' className='bt-nav'>
          <a
            className='bt-btntogglemenu'
            role='button'
            onClick={() => setOpen(!open)}
          >
            X
          </a>
          <div id='bt-navigation' className='bt-navigation'>
            <strong className='bt-logo'>
              <a href='/'>
                <img src='/images/logo.png' alt='Logo' />
              </a>
            </strong>
            <ul className='bt-menu'>
              <li className={pathname == '/' ? 'bt-active' : ''}>
                <a href='/'>Home</a>
              </li>
              <li className={pathname == '/about' ? 'bt-active' : ''}>
                <a href='/about'>About</a>
              </li>
              <li className={pathname == '/albums' ? 'bt-active' : ''}>
                <a href='/albums'>Albums</a>
              </li>
              <li className={pathname == '/book' ? 'bt-active' : ''}>
                <a href='/bookaphotoshoot'>Book a photoshoot</a>
              </li>
            </ul>
            <ul className='bt-socialicons'>
              <li>
                <a target='_blank' href='https://www.facebook.com/lenggiauit'>
                  <i className='fa fa-facebook'></i>
                </a>
              </li>
              <li>
                <a target='_blank' href='https://www.instagram.com/lenggiauit/'>
                  <i className='fa fa-instagram'></i>
                </a>
              </li>
            </ul>
            <ul className='bt-navinfo'>
              <li>
                <span>Email </span>
                <a href='lenggiauit@gmail.com'>lenggiauit@gmail.com</a>
              </li>
              <li>
                <span>Phone +1 437 410 3085</span>
              </li>
              <li>
                <address>Toronto, Canada</address>
              </li>
            </ul>
          </div>
        </nav>
      </Collapse>
    </>
  )
}
