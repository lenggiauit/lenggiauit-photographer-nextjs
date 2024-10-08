import React from 'react'

function Footer() {
  return (
    <footer id='bt-footer' className='bt-footer bt-haslayout mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <div className='bt-instagramgallery'>
              <ul>
                <li>
                  <figure>
                    <img
                      src='/images/instagram/02.jpg'
                      alt='lenggiauit Photographer'
                    />
                  </figure>
                  <figure>
                    <img
                      src='/images/instagram/05.jpg'
                      alt='lenggiauit Photographer'
                    />
                  </figure>
                </li>
                <li>
                  <figure>
                    <img
                      src='/images/instagram/06.jpg'
                      alt='lenggiauit Photographer'
                    />
                  </figure>
                  <figure>
                    <img
                      src='/images/instagram/01.jpg'
                      alt='lenggiauit Photographer'
                    />
                  </figure>
                  <figure>
                    <img
                      src='/images/instagram/08.jpg'
                      alt='lenggiauit Photographer'
                    />
                  </figure>
                </li>
                <li>
                  <figure>
                    <img
                      src='/images/instagram/03.jpg'
                      alt='lenggiauit Photographer'
                    />
                  </figure>
                  <figure>
                    <img
                      src='/images/instagram/07.jpg'
                      alt='lenggiauit Photographer'
                    />
                  </figure>
                </li>
                <li>
                  <figure>
                    <img
                      src='/images/instagram/04.jpg'
                      alt='lenggiauit Photographer'
                    />
                  </figure>
                </li>
              </ul>
              <div className='bt-instagrambox'>
                <i>
                  <img
                    src='/images/icons/icon-02.png'
                    alt='lenggiauit Photographer'
                  />
                </i>
                <span>@lenggiauit</span>
                <a
                  target='_blank'
                  className='bt-btn bt-btnblack bt-btn-lg'
                  href='https://www.instagram.com/lenggiauit/'
                >
                  <span>follow now</span>
                </a>
              </div>
            </div>
            <div className='bt-footerbar'>
              <div className='bt-navandcopyright'>
                <nav className='bt-addnav'>
                  <ul>
                    <li>
                      <a href='/'>Home</a>
                    </li>
                    <li>
                      <a href='/albums'>Albums</a>
                    </li>
                    <li>
                      <a href='/concepts'>Concepts</a>
                    </li>
                    <li>
                      <a href='/bookaphotoshoot'>Book a photoshoot</a>
                    </li>
                    <li>
                      <a href='/about'>About</a>
                    </li>
                  </ul>
                </nav>
                <div className='bt-copyright mt-2'>
                  Copyrights 2023 Lenggiauit. All rights reserved
                </div>
              </div>
              <div className='bt-followus'>
                <span>follow me</span>
                <ul className='bt-socialicons'>
                  <li>
                    <a
                      target='_blank'
                      href='https://www.facebook.com/lenggiauit'
                    >
                      <i className='fa fa-facebook'></i>
                    </a>
                  </li>

                  <li>
                    <a
                      target='_blank'
                      href='https://www.instagram.com/lenggiauit/'
                    >
                      <i className='fa fa-instagram'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
