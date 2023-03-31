This is a small project of a NestJS API.
The requirements for this project are the followings:

- npm
- mysql (or any other database service handled by NestJS)
- NestJS framework (npm i -g @nestjs/cli)

---

## **Routes**

Some routes require a valid JSON Web Token (JWT) in order to get accessible.
Routes marked as PUBLIC are accessible without this token unlike PRIVATE routes which requires it.
This token should be passed through 

**PUBLIC** - `[POST] /users` : Creates new user if login is not already taken
```
{
    "login": "yourvalidemail@gmail.com",
    "password: "your_4_char_password"
}
```


**PRIVATE** - `[PATCH] /users` : Allow user to update his password using valid token and login
```
{
    "username": "yourvalidemail@gmail.com",
    "password: "your_4_char_password"
}
```


**PUBLIC** - `[POST] /auth/generateToken` : Generates a 5 minutes valid token to access specific routes
```
{
    "username": "yourvalidemail@gmail.com",
    "password": "your_password"
}
```


**PRIVATE** - `[GET] /product` : Get product information based on barcode number using OpenFoodFact API
```
{
    "product": "7622210449283",
}
```

---

## **Project improvement**

- [ ] Turn off the **synchronize** option in `app.module.ts` and implement database migration.
- [ ] Implement relevant unit tests on services for further updates.
- [ ] Use external file **data-source** configuration to avoid modifying shared file for collaborators.
- [ ] Create route for user deletion using token (only turn to false **isActive** in user attribute).