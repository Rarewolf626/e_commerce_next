const projects = [
  {
    "id": "1",
    "name": "iPhone 14 Pro",
    "category": "mobile",
    "description": "Apple iPhone 14 Pro with A16 Bionic chip and 128GB storage",
    "price": 125000,
    "stock": 25,
    "imageUrl": "/images/iphone14pro.jpg"
  },
  {
    "id": "2",
    "name": "Samsung Galaxy S23",
    "category": "mobile",
    "description": "Samsung Galaxy S23 with Snapdragon 8 Gen 2 and 256GB storage",
    "price": 95000,
    "stock": 30,
    "imageUrl": "/images/galaxyS23.jpg"
  },
  {
    "id": "3",
    "name": "LG Smart Fridge",
    "category": "fridge",
    "description": "LG 500L smart fridge with touch screen display",
    "price": 85000,
    "stock": 10,
    "imageUrl": "/images/lgFridge.jpg"
  },
  {
    "id": "4",
    "name": "Sony Bravia 55-inch 4K TV",
    "category": "tv",
    "description": "Sony Bravia 55-inch 4K UHD Smart LED TV",
    "price": 120000,
    "stock": 8,
    "imageUrl": "/images/sonyBravia.jpg"
  },
  {
    "id": "5",
    "name": "Dell XPS 13",
    "category": "laptop",
    "description": "Dell XPS 13 with Intel i7 11th Gen and 16GB RAM",
    "price": 140000,
    "stock": 15,
    "imageUrl": "/images/dellXPS13.jpg"
  }
]

const users = [
  {
    "id": "1",
    "username": "admin",
    "email": "admin@marketplace.com",
    "password": "adminpassword",
    "role": "admin"
  },
  {
    "id": "2",
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  },
  {
    "id": "3",
    "username": "jane_smith",
    "email": "jane@example.com",
    "password": "password123",
    "role": "user"
  }
]

const orders = [
  {
    "id": "1",
    "userId": "2",
    "status": "pending",
    "totalPrice": 125015,
    "products": [
      {
        "productId": "1",
        "quantity": 1
      }
    ]
  },
  {
    "id": "2",
    "userId": "3",
    "status": "delivered",
    "totalPrice": 140015,
    "products": [
      {
        "productId": "5",
        "quantity": 1
      }
    ]
  }
]
const carts = {
  "userId": "2",
  "cartItems": [
    {
      "productId": "1",
      "quantity": 1
    },
    {
      "productId": "2",
      "quantity": 2
    }
  ]
}

const reviwe = [
  {
    "id": "1",
    "productId": "1",
    "userId": "2",
    "rating": 5,
    "comment": "Amazing phone with great performance!"
  },
  {
    "id": "2",
    "productId": "5",
    "userId": "3",
    "rating": 4,
    "comment": "Very powerful laptop but a bit expensive."
  }
]
