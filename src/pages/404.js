import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

function ErrorPage({ location }) {
  return (
    <Layout location={location}>
      <div>404 lol</div>
    </Layout>
  )
}

export default ErrorPage

export const pageQuery = graphql`
  query ErrorPageQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
