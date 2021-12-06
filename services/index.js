import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection (
        where: {featured: true}
        orderBy: createdAt_DESC
        last: 5
        ){
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.postsConnection.edges;
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts {
      posts(
        orderBy: createdAt_DESC
        first: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
  query GetCategories {
      categories {
      name
      slug
    }
  }
`;
  const result = await request(graphqlAPI, query);
  return result.categories;
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const GetCategoriesPosts = async (slug) => {
  const query = gql`
  query GetCategoriesPosts($slug: String!) {
    postsConnection(where: {categories_some: {slug: $slug}}) {
      edges {
        node {
          createdAt
          title
          excerpt
          slug
          featuredImage {
            url
          }
          author {
            bio
            name
            photo {
              url
            }
          }
          categories {
            slug
            name
          }
        }
      }
    }
  }
`;
  const result = await request(graphqlAPI, query, { slug });
  return result.postsConnection.edges;
}

export const getLinks = async () => {
  const query = gql`
  query getLinks {
    links(orderBy: title_ASC) {
      address
      description
      title
    }
  }
  `
  const result = await request(graphqlAPI, query)
  return result.links;
}
