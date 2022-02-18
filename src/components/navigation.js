import React from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import { LanguagePicker } from './languagePicker'
import * as styles from './navigation.module.css'

const Navigation = () => {
  const { language } = useI18next()
  return (
    <nav role="navigation" className={styles.container} aria-label="Main">
      <Link to="/" className={styles.logoLink} language={language}>
        <span className={styles.logo} />
        <span className={styles.navigationItem}>Gatsby Starter Contentful</span>
      </Link>
      <LanguagePicker />
      <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
          <Link to="/" activeClassName="active" language={language}>
            Home
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/blog/" activeClassName="active" language={language}>
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
