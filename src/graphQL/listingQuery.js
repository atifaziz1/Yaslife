import gql from 'graphql-tag';

export default gql`
query ($page: Int!, $name: String!){
  characters(page: $page, filter: { name:$ name }) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      image
      gender,
      species
    }
  }
  character(id: 20) {
    id
  name
  image
  }
}
`;
