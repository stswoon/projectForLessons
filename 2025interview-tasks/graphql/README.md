https://graphqlzero.almansi.me/#example-top

```graphql
query {
  user(id: 2) {
    id
    username
    email
    
    address {
      geo {
        lat
        lng
      }
    }
    
    
    posts {
      data {
        id
        title
      }
    }
  }
}
```