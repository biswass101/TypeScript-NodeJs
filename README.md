# Hospital Management System REST API

This project is a RESTful API for managing a Hospital Management System, developed using Node.js and Express.js.

## Base URL

```
http://localhost:5000/api/v1
```

---

## Endpoints

### User

- **GET** `/users`  
  Get all users

- **GET** `/users/:id`  
  Get a single user by ID

- **POST** `/users/create-user`  
   **Description:**  
  Creates a new user with the given details. This can be a doctor, patient, staff, or admin based on the `role` and `roleModel` fields.

- **Request Body:**

```json
{
  "name": "Rakhi Ummun",
  "email": "mhsfdfgdfU6@gmail.com",
  "password": "1234",
  "image": "sample-image3.jpg",
  "role": "Doctor",
  "status": "in-progress",
  "roleModel": "Doctor"
}
```

 - **Response:**
1. Created 201: ✅

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "name": "Rakhi Ummun",
    "email": "mhsfdfgdfU6@gmail.com",
    "password": "$2b$10$XgKNTkBPAvnoUuiBvS4yj.Ne2pt0UHGNK.KB8D2i.gCtDHajmroZC",
    "image": "sample-image3.jpg",
    "role": "Doctor",
    "status": "in-progress",
    "isDeleted": false,
    "roleModel": "Doctor",
    "_id": "6808c1f8d02f10e37a9c7004",
    "__v": 0
  }
}
```

2. Conflict 409: 🔥
```json
{
  "status": "error",
  "message": "User Already Exists"
}
```

3. Bad Request or Empty field 400: ❌🚫
```json
{
  {
    "success": false,
    "message": "Bad Rquest",
    "data": [
        "Required"
    ]
  }
}
```

- **PATCH** `/users/update-user/:id`  
  Update an existing user

---

### Doctor

- **GET** `/doctors`  
  Get all doctors

- **GET** `/doctors/:id`  
  Get a single doctor by ID

- **POST** `/doctors/create-doctor`  
  Create a new doctor  
  **Body:**

  ```json
  {
    "name": "Dr. Goni Arabia",
    "email": "gniarfabia@gmail.com",
    "password": "1234",
    "image": "doctor6.img",
    "specialization": "Cardiac",
    "availability": true,
    "gender": "Female",
    "contactInfo": "23423423436"
  }
  ```

- **PUT** `/doctors/update-doctor/:id`  
  Update an existing doctor

---

### Patient

- **GET** `/patients`  
  Get all patients

- **GET** `/patients/:id`  
  Get a single patient by ID

- **POST** `/patients/create-patient`  
  Create a new patient  
  **Body:**

  ```json
  {
    "name": "Evana Akter Sadiya",
    "email": "evanagsadio@outlook.com",
    "password": "1234",
    "image": "evana-img2.jpg",
    "age": 27,
    "gender": "Female",
    "contactInfo": "123454554",
    "address": "12/8 Mymensingh"
  }
  ```

- **PUT** `/patients/update-patient/:id`  
  Update an existing patient

---

### Staff

- **GET** `/staffs`  
  Get all staff members

- **GET** `/staffs/:id`  
  Get a single staff member by ID

- **POST** `/staffs/create-staff`  
  Create a new staff member  
  **Body:**

  ```json
  {
    "name": "Radhika Biswass",
    "email": "rdbigs@gmail.com",
    "password": "1234",
    "image": "rd-img2.jpg",
    "contactInfo": "323423"
  }
  ```

- **PUT** `/staffs/update-staff/:id`  
  Update an existing staff member

---

### Admin

- **GET** `/admin`  
  Get all admins

- **GET** `/admin/:id`  
  Get a single admin by ID

- **POST** `/admin/create-admin`  
  Create a new admin  
  **Body:**

  ```json
  {
    "name": "Adiba Rumana",
    "email": "adrm@outlgook.com",
    "password": "1234",
    "image": "admin-img6.jpg",
    "contactInfo": "323423",
    "address": "12/8 Street, Dhaka-1009"
  }
  ```

- **PUT** `/admin/update-admin/:id`  
  Update an existing admin

- **DELETE** `/admin/delete-staff/:id`  
  Delete a staff member

- **DELETE** `/admin/delete-doctor/:id`  
  Delete a doctor

- **DELETE** `/admin/delete-patient/:id`  
  Delete a patient

---

## Notes

- Ensure MongoDB is running locally and the database is properly connected.
- Passwords are stored securely using hashing (not shown in sample responses).
- All endpoints return a `success`, `message`, and `data` field for consistency.

---

## Author

**Hospital Management System API** by Naeem Biswass Niloy
