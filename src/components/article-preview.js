import React from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import { GatsbyImage } from 'gatsby-plugin-image'

import Container from './container'
import Tags from './tags'
import * as styles from './article-preview.module.css'

const ArticlePreview = ({ posts }) => {
  const { language } = useI18next()
  if (!posts) return null
  if (!Array.isArray(posts)) return null

  const RandomKey = (length) => {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  return (
    <Container>
      <ul className={styles.articleList}>
        {posts.map((post) => {
          return (
            <li key={`${RandomKey(5)}_${post.slug}`}>
              <Link
                to={`/blog/${post.slug}`}
                language={language}
                className={styles.link}
              >
                <GatsbyImage alt="" image={post.heroImage.gatsbyImageData} />
                <h2 className={styles.title}>{post.title}</h2>
              </Link>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.description.childMarkdownRemark.html,
                }}
              />
              <div className={styles.meta}>
                <small className="meta">{post.publishDate}</small>
                <Tags tags={post.tags} />
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default ArticlePreview
