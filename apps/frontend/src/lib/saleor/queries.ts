import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int = 10, $after: String) {
    products(first: $first, after: $after, channel: "default-channel") {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          slug
          description
          thumbnail {
            url
            alt
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          # Placeholder for custom data
          # rating
          # isHot
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    product(slug: $slug, channel: "default-channel") {
      id
      name
      slug
      description
      media {
        url
        alt
        type
      }
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
        }
      }
      variants {
        id
        name
        sku
        quantityAvailable
      }
      # Placeholder for custom data
      # deliveryEstimate
      # trustBadges
    }
  }
`;
