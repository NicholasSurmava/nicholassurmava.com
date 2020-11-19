import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function BlogPosts() {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/(blog)/" } }
            sort: { fields: frontmatter___date, order: DESC }
          ) {
            totalCount
            edges {
              node {
                fields {
                  slug
                }
                id
                frontmatter {
                  title
                  date(formatString: "DD MMMM, YYYY")
                }
                excerpt
              }
            }
          }
        }
      `}
      render={data => (
        <div>
          <h4 style={{ textAlign: "center" }}>
            {data.allMarkdownRemark.totalCount} Posts
          </h4>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div
              style={{
                background: "lightgrey",
                padding: "20px",
                boxShadow: "5px 10px #888888",
              }}
              key={node.id}
            >
              <h3>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>{" "}
                <span>— {node.frontmatter.date}</span>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    />
  )
}
