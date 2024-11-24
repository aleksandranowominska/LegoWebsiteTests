export const PRODUCT_RECOMMENDATIONS_QUERY = `
  query {
    productRecommendations {
      recommendedProducts {
        name
        price {
          centAmount
        }
      }
    }
  }
`;
