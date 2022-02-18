import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

function BlogIndex({ data, location }) {
  const posts = get(data, 'allContentfulBlogPost.nodes')

  return (
    <Layout location={location}>
      <Seo title="Blog" />
      <Hero title="Blog" />
      <ArticlePreview posts={posts} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery($language: String!, $locale: String!) {
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
  }
`
