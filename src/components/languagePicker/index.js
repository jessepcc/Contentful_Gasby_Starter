import React from 'react'

import { Link, useI18next } from 'gatsby-plugin-react-i18next'

export const LanguagePicker = () => {
  const { languages, originalPath } = useI18next()

  return (
    <ul>
      {languages.map((language) => (
        <li key={language}>
          <Link to={originalPath} language={language}>
            {language}
          </Link>
        </li>
      ))}
    </ul>
  )
}
