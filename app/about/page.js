import Navigation from '@/components/navigation'
import Chatbot from '@/components/chatbot'
import BtnBooking from '@/components/btnBooking'
let appSetting = require('/appSetting.json')
let appData = require('/data/pages.json')
const pageData = appData.find((x) => x.pageUrl == '/about')

export async function generateMetadata({ params, searchParams }, parent) {
  if (pageData) {
    return {
      title: pageData.metaData.title,
      description: pageData.metaData.description,
      icon: '/favicon.ico',
      openGraph: {
        images: '',
        title: pageData.metaData.title,
        description: pageData.metaData.description,
        url: appSetting.baseUrl + '/about',
      },
    }
  } else {
    return null
  }
}
export default function About() {
  return (
    <>
      <div id='bt-wrapper' className='bt-wrapper bt-haslayout'>
        <Navigation black />
        <BtnBooking />
        <main id='bt-main' className='bt-main bt-haslayout pt-4'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-4'>
                <div className='bt-innerbannercontent about '>
                  <div className='avatar-frame-container'>
                    <img
                      className='avatar-image'
                      src='/images/bg/giaule.jpg'
                      alt='lenggiauit photographer'
                    />
                    <img
                      src='/img/avatar-frame.png'
                      alt='avatar'
                      class='avatar-frame anim-spin'
                    ></img>
                  </div>
                </div>
              </div>
              <div className='col-md-8 about-info'>
                <div className='row'>
                  <div className='col-md-12 '>
                    <h3 className='about-name'>Giau Le</h3>
                    <h4>
                      I’m a Full-Stack Developer &amp; Professional photographer
                    </h4>
                    <p>
                      With a love for travel and exploration, I connect with
                      people and share stories. My passion for discovery, both
                      in new places and cuisines, brings me endless joy. Through
                      my lens, I create captivating images that transport
                      viewers to ethereal realms, capturing cherished moments
                      with a touch of enchantment.
                    </p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <ul className='bt-socialicons-about'>
                      <li>
                        <a
                          target='_blank'
                          href='https://www.facebook.com/lenggiauit'
                        >
                          <i
                            className='fa fa-facebook'
                            style={{ fontSize: 32 }}
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a
                          target='_blank'
                          href='https://www.instagram.com/lenggiauit/'
                        >
                          <i
                            className='fa fa-instagram'
                            style={{ fontSize: 32 }}
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='row about-skills'>
                  <div className='col-md-12'>
                    <h3>My Skills</h3>

                    <div className='bt-memberskill'>
                      <h5>Digital Photography</h5>
                      <div className='progress'>
                        <div
                          className='progress-bar bg-dark'
                          role='progressbar'
                          style={{ width: '90%' }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        ></div>
                      </div>
                    </div>
                    <div className='bt-memberskill'>
                      <h5>Wedding Photography</h5>
                      <div className='progress'>
                        <div
                          className='progress-bar bg-dark'
                          role='progressbar'
                          style={{ width: '70%' }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        ></div>
                      </div>
                    </div>
                    <div className='bt-memberskill'>
                      <h5>Portrait</h5>
                      <div className='progress'>
                        <div
                          className='progress-bar bg-dark'
                          role='progressbar'
                          style={{ width: '100%' }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        ></div>
                      </div>
                    </div>
                    <div className='bt-memberskill'>
                      <h5>Commercial</h5>
                      <div className='progress'>
                        <div
                          className='progress-bar bg-dark'
                          role='progressbar'
                          style={{ width: '80%' }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row about-contact'>
                  <div className='col-md-12'>
                    <h3>Contact</h3>
                    <ul className='w-100'>
                      <li>
                        <span>Email </span>
                        <a href='lenggiauit@gmail.com'>lenggiauit@gmail.com</a>
                      </li>
                      <li>
                        <span>Phone +1 437 410 3085</span>
                      </li>
                      <li>Toronto, Canada</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* <Chatbot /> */}
    </>
  )
}
