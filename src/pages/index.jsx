import React from "react"
import { Link } from "gatsby"
import BlogPosts from "../components/blog_posts"

import Layout from "../components/layout"

export default function Home() {
  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <h1>
          <Link to="/">Rough Drafts</Link>
        </h1>
        <h2 style={{ fontSize: "16px" }}>By Nicholas Surmava</h2>
      </div>
      <BlogPosts />
    </Layout>
  )
}

// ? Only 1 query allowed. Either combine in one query or move to it's own component
// export const query2 = graphql`
//   query {
//     allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(projects)/" } }) {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             date(formatString: "DD MMMM, YYYY")
//           }
//           excerpt
//         }
//       }
//     }
//   }
// `
