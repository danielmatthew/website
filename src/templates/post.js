import React from "react";

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <div className="mw5 center bg-light-gray">
      <h1 className="mt0">{post.frontmatter.title}</h1>
      <div
        className="1h-copy measure"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
