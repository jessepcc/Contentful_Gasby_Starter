const path = require('path')

/** pass the
 */

const LANG_DICT = {
  en: 'en-US',
  zh: 'zh-Hant-HK',
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions
  // delete the auto created page without customer context

  // create page with 2 languages

  console.log(
    `Path ${page?.path} Language ${page?.context?.language} Locale ${page?.context?.locale} i18n ${page?.context?.i18n?.language}`
  )
  return createPage({
    ...page,
    context: {
      ...page.context,
      locale: LANG_DICT[page?.context?.language] || 'en-US',
    },
  })
}

/**
 * Create Blog Post Pages
 *
 *
 */

exports.createPages = async ({ page, graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.js')

  const result = await graphql(
    `
      {
        allContentfulBlogPost {
          nodes {
            title
            slug
            node_locale
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulBlogPost.nodes

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug
      const locale =
        post.node_locale === 'en-US'
          ? '/en'
          : `/${post.node_locale.substring(0, 2)}`

      createPage({
        path: `${locale}/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
          language: locale,
          locale: LANG_DICT[post.node_locale] || 'en-US',
        },
      })
    })
  }
}
