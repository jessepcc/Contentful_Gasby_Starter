import React from 'react'

import './variables.css'
import './global.css'
import Seo from './seo'
import Navigation from './navigation'
import Footer from './footer'

function Template({ children }) {
  return (
    <>
      <Seo />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Template
