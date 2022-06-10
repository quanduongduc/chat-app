# Express Server API

---

## **Register New User**

Create new user if not existed and return access token.

- **URL**

  /auth/register

- **Method:**

  `POST`

- **URL Params**
  None
- **Data Params**

  **Required:**

  `nickName=[String]`  
  `userName=[String]`  
  `password=[String]`  
  `confirmPassword=[String]`

  **Optional:**

  `avatar=[File/image]`

- **Success Response:**

  - **Code:** 200  
  - **Content:**  

    ```JSON
    {
    "success": true,
    "message": "Register Successfully",
    "accessToken": accessToken
    }
    ```

- **Error Response:**
  - **Code:** 401 UNAUTHORIZED
  - **Content:**  

    ```JSON
    {
    "success": false,
    "message": "User Name is already taken"
    }
    ```

## **User Login**

Check User's authentication information then return access token.

- **URL**

  /auth/login

- **Method:**

  `POST`

- **URL Params**
  None
- **Data Params**

  **Required:**

  `userName=[String]`  
  `password=[String]`  

  **Optional:**
  None

- **Success Response:**

  - **Code:** 200  
  - **Content:**  

    ```JSON
    {
    "success": true,
    "message": "Login Successfully",
    "accessToken": "AcCesSToKeN"
    }
    ```

- **Error Response:**
  - **Code:** 401 UNAUTHORIZED
  - **Content:**  

    ```JSON
    { 
      "success": false,
      "message": "userName not Found"
    }
    ```

    OR
  - **Code:** 401 UNAUTHORIZED  
  - **Content:**  

  ```JSON
  {
    "success": false,
    "message": "userName or password is incorrect"
  }
  ```

## **User Authenticate**

Access tokens authentication.

- **URL**

  /auth

- **Method:**

  `GET`

- **URL Params**
  None
- **Data Params**
  None
- **Bearer token**  
  **Required:**  
  `Authorization Bearer=[String](Bearer accessToken)`
- **Success Response:**

  - **Code:** 200     **Content:**

    ```JSON
    {
      "success": true,
      "message": "Authenticate Successfully",
      "user": user
    }
    ```

- **Error Response:**
  - **Code:** 401 UNAUTHORIZED
  - **Content:**  

    ```JSON
    { 
      "success": false,
      "message": "AccessToken Not Found" 
    }
    ```

    OR
- **Code:** 401 UNAUTHORIZED
  **Content:**

  ```JSON
  {
  "success": false,
  "message": "User Not Found",
  }
  ```

## **Message Upload**

Receive message from client and handle it (upload attachment to cloud, ...) and return processed message to client.

- **URL**

  /message

- **Method:**

  `POST`

- **Requirement:**
  Authenticated !!!.
- **URL Params:**
  None
- **Data Params:**  
  **Required:**  
  `senderId=[String]`  
  `threadId=[String]`  
  `text=[String]` `attactments=[File]` (Require at least one)
- **Success Response:**

  - **Code:** 200     **Content:**

    ```JSON
    {
      "success": true,
        "message": "Upload message Successfully",
        "attachments" : attachments
    }
    ```

- **Error Response:**
  - **Code:** 422 UNPROCESSABLE ENTIT
  - **Content:**  

    ```JSON
    {
      "success": false,
      "message": "Message not found"
    }
    ```

## **Get Messages**

Return all messages in  a thread.

- **URL**

  /message/:threadId

- **Method:**

  `GET`

- **Requirement:**
  Authenticated !!!.
- **URL Params:**  
  **Required:**  
  `threadId=[String]`
- **Data Params:** None
  
- **Success Response:**

  - **Code:** 200     **Content:**

    ```JSON
    {
      "success": true,
      "message": "Messages ready",
      "messages" : messages
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized
  - **Content:**  

    ```JSON
    {
        "success": false,
        "message": "Access Denied",
    }
    ```

  - **Note:**
    non-members's request

## **Get Threads**

Return all threads of an user.

- **URL**

  /thread

- **Method:**

  `GET`

- **Requirement:**
  Authenticated !!!.
- **URL Params:** None
- **Data Params:** None
  
- **Success Response:**

  - **Code:** 200     **Content:**

    ```JSON
    {
      "success": true,
      "message": "Get Threads successfully",
      "threads": threads
    }
    ```

## **Get thread by UserID**

Get a thread by userId(Create if not existed).

- **URL**

  /thread

- **Method:**

  `POST`

- **Requirement:**
  Authenticated !!!.
- **URL Params:**
  **Required:**  
  `userId=[String]`
- **Data Params:** None
  
- **Success Response:**

  - **Code:** 200     **Content:**

    ```JSON
    {
      "success": true,
      "message": "Get Thread successfully",
      "thread": thread
    }
    ```

    **Note:** If thread is existed  

    OR

    - **Code:** 200  
    - **Content:**  

    ```JSON
    {
      "success": true,
      "message": "New Thread was created",
      "thread":thread
    }
    ```

## **Get random Users**

Get random users.

- **URL**

  /user/random/:number

- **Method:**

  `GET`

- **Requirement:** None
- **URL Params:**   

  `number=[String]`
- **Data Params:** None
  
- **Success Response:**

  - **Code:** 200  
  - **Content:**

    ```JSON
    {
      "success": true,
      "message": "get random user succesfull",
      "users" : users
    }
    ```

- **Error Response:**
  - **Code:** 422 UNPROCESSABLE ENTIT
  - **Content:**  

    ```JSON
    {
      "success": false,
      "message": "Invalid params format"
    }
    ```

