const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  let projects_re = /(projects)/

  if (node.internal.type === `MarkdownRemark`) {
    if (projects_re.exec(node.fileAbsolutePath)) {
      //   console.log(`Project Markdown is: ${node.fileAbsolutePath}`)
      //   console.log(node)
      const slug = createFilePath({ node, getNode, basePath: `data/projects` })
      createNodeField({
        node,
        name: `slug`,
        value: `/projects${slug}`,
      })
    }
  }

  let blog_re = /(blog)/

  if (node.internal.type === `MarkdownRemark`) {
    if (blog_re.exec(node.fileAbsolutePath)) {
      let slug = createFilePath({ node, getNode, basePath: `data/blog` })
      let extension = node.fileAbsolutePath.indexOf(".md")
      let lastSlash = node.fileAbsolutePath.lastIndexOf("/")
      let convertedSlug = node.fileAbsolutePath.slice(lastSlash, extension)
      createNodeField({
        node,
        name: `slug`,
        value: `/blog${convertedSlug}`,
      })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.jsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}
