# Category


## How ro run the server

1. Install the mongodb from (here) [https://docs.mongodb.com/manual/installation/] 
2. Change the mongodb url and port in `config.js`.
3. Run the commands
```
npm i
npm run start
```

## APIs for categories and products

### Add a category
**URL**: ***http://{IP}:{PORT}/api/v1/category/add***
**TYPE**: ***POST***
**Request body**
```
{
    "name": "Fashion",
    "description": "Category for fashion"
}
```
**Resonse body**: 
```
{
    "status": "OK",
    "data": {
        "child_categories": [],
        "products": [],
        "_id": "5f324472cea7fb318c13b80b",
        "name": "Fashion",
        "description": "Category for fashion",
        "__v": 0
    }
}
```

### Get all categories with child categories

**URL**: ***http://{IP}:{PORT}/api/v1/category/get-all***
**TYPE**: ***GET***
**Response body**: 
```
{
    "status": "OK",
    "data": [
        {
            "child_categories": [],
            "_id": "5f324464cea7fb318c13b80a",
            "name": "Electronics",
            "description": "Category for electronics",
            "__v": 0
        },
        {
            "child_categories": [],
            "_id": "5f324472cea7fb318c13b80b",
            "name": "Fashion",
            "description": "Category for fashion",
            "__v": 0
        }
    ]
}
```

### Add products for categories

**URL**: ***http://{IP}:{PORT}/api/v1/product/add-to-categories***
**TYPE**: ***PUT***
**Request body**: 
```
{
    "name": "Apollo",
    "price": 200,
    "categories": ["5f324472cea7fb318c13b80b"]
}
```
***Response body**:
```
{
    "product": {
        "child_categories": [],
        "_id": "5f3247b35f6083185c30e527",
        "name": "Apollo",
        "price": 200,
        "__v": 0
    },
    "addedCategories": [
        {
            "child_categories": [],
            "products": [
                {
                    "child_categories": [],
                    "_id": "5f3247b35f6083185c30e527",
                    "name": "Apollo",
                    "price": 200,
                    "__v": 0
                }
            ],
            "_id": "5f324472cea7fb318c13b80b",
            "name": "Fashion",
            "__v": 1
        }
    ]
}
```

### Get all products for category

**URL**: ***http://{IP}:{PORT}/api/v1/product/get-by-category/:categoryId***
**TYPE**: ***GET***
**Request URL**: ***http://localhost:3000/api/v1/product/get-by-category/5f324464cea7fb318c13b80a***
**Response body**: 
```
{
    "status": "OK",
    "data": {
        "products": [
            {
                "child_categories": [],
                "_id": "5f32483c5f6083185c30e52a",
                "name": "Samsung",
                "price": 370,
                "__v": 0
            },
            {
                "child_categories": [],
                "_id": "5f32484f5f6083185c30e52c",
                "name": "OnePlus",
                "price": 550,
                "__v": 0
            }
        ]
    }
}
```

### Update a product

**URL**: ***http://{IP}:{PORT}/api/v1/product/update***
**TYPE**: ***PATCH***
**Request body**: 
```
{
    "id": "5f32483c5f6083185c30e52a",
    "name": "i-phone 7",
    "price": 700,
    "brand": "Apple"
}
```
***Response body**:
```
{
    "status": "OK",
    "data": {
        "child_categories": [],
        "_id": "5f32483c5f6083185c30e52a",
        "name": "i-phone 7",
        "price": 700,
        "__v": 0,
        "brand": "Apple"
    }
}
```

### Error response for all the requests

```
{
    "status": "ERROR",
    "data": {Error message}
}
```