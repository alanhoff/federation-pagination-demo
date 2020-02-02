# Apollo Federation with Pagination

More instructions on how to install and start the cluster [here](https://github.com/apollographql/federation-demo).

### Query

```graphql
query (
  $usersWhere: UsersWhereInput,
  $reviewsWhere: ReviewsWhereInput,
  $skipUsers: Int,
  $takeUsers: Int,
  $skipReviews: Int,
  $takeReviews: Int) {
  users(where: $usersWhere, take: $takeUsers, skip: $skipUsers) {
    id
    status
    reviews(where: $reviewsWhere, take: $takeReviews, skip: $skipReviews) {
      id
      public
      author {
        id
        status
      }
    }
  }
}
```

### Variables

```json
{
  "usersWhere": {
    "status": "offline"
  },
  "reviewsWhere": {
    "public": true
  },
  "takeUsers": 1,
  "skipUsers": 0,
  "takeReviews": 1,
  "skipReviews": 0
}
```

### Result

```json
{
  "data": {
    "users": [
      {
        "id": "2",
        "status": "offline",
        "reviews": [
          {
            "id": "3",
            "public": true,
            "author": {
              "id": "2",
              "status": "offline"
            }
          }
        ]
      }
    ]
  }
}
```
