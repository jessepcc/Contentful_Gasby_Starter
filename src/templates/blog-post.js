import React from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import * as styles from './blog-post.module.css'

function BlogPostTemplate({ data, location }) {
  const { language } = useI18next()
  const post = get(data, 'contentfulBlogPost')
  const previous = get(data, 'previous')
  const next = get(data, 'next')

  return (
    <Layout location={location}>
      <Seo
        title={post.title}
        description={post.description.childMarkdownRemark.excerpt}
        image={`http:${post.heroImage.resize.src}`}
      />
      <Hero
        image={post.heroImage?.gatsbyImageData}
        title={post.title}
        content={post.description?.childMarkdownRemark?.excerpt}
      />
      <div className={styles.container}>
        <span className={styles.meta}>
          {post.author?.name} &middot;{' '}
          <time dateTime={post.rawDate}>{post.publishDate}</time> –{' '}
          {post.body?.childMarkdownRemark?.timeToRead} minute read
        </span>
        <div className={styles.article}>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{
              __html: post.body?.childMarkdownRemark?.html,
            }}
          />
          <Tags tags={post.tags} />
          {(previous || next) && (
            <nav>
              <ul className={styles.articleNavigation}>
                {previous && (
                  <li>
                    <Link
                      to={`/blog/${previous.slug}`}
                      language={language}
                      rel="prev"
                    >
                      ← {previous.title}
                    </Link>
                  </li>
                )}
                {next && (
                  <li>
                    <Link
                      to={`/blog/${next.slug}`}
                      language={language}
                      rel="next"
                    >
                      {next.title} →
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $language: String!
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
    $locale: String!
  ) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    contentfulBlogPost(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      node_locale
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        childMarkdownRemark {
          html
          timeToRead
        }
      }
      tags
      description {
        childMarkdownRemark {
          excerpt
        }
      }
    }
    previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
