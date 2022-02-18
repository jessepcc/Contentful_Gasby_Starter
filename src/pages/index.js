import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

function RootIndex({ data, location }) {
  const { t } = useTranslation()
  const posts = get(data, 'allContentfulBlogPost.nodes')
  const [author] = get(data, 'allContentfulPerson.nodes')

  return (
    <Layout location={location}>
      <div>{t('hello')}</div>
      <Hero
        image={author.heroImage.gatsbyImageData}
        title={author.name}
        content={author.shortBio.shortBio}
      />
      <ArticlePreview posts={posts} />
    </Layout>
  )
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery($language: String!, $locale: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allContentfulBlogPost(
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [publishDate], order: DESC }
    ) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      nodes {
        name
        shortBio {
          shortBio
        }
        title
        heroImage: image {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 1180
          )
        }
      }
    }
  }
`
