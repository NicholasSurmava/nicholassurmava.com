import React from "react"
import { Link } from "gatsby"

const style = {
  container: {
    margin: `3rem auto`,
    maxWidth: 650,
    padding: `0 1rem`,
  },
  navLogo: {
    color: "lightsalmon",
  },
}

export default function Layout({ children }) {
  return (
    <div>
      <div style={style.container}>{children}</div>
    </div>
  )
}
