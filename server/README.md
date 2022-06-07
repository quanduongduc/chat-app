Express Server API<a name="TOP"></a>
===================
- - - - 
**Register New User**
----
  Create new user if not existed and return access token.

* **URL**

  /auth/register

* **Method:**

  `POST`
  
*  **URL Params**
  None
* **Data Params**

   **Required:**
 
   `nickName=[String]`
   `userName=[String]`
   `password=[String]`
   `confirmPassword=[String]`

   **Optional:**
 
   `avatar=[File]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true,
        message: "Register Successfully",
        accessToken }`
 
* **Error Response:**
* 
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    success: false,
    message: "User Name is already taken"
    }`

**User Login**
----
  Check User's authentication information then return access token.

* **URL**

  /auth/login

* **Method:**

  `POST`
  
*  **URL Params**
  None
* **Data Params**

   **Required:**
 
   `userName=[String]`
   `password=[String]`

   **Optional:**
  None 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true,
        message: "Login Successfully",
        accessToken }`
 
* **Error Response:**
* 
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
     success: false,
     message: "userName not Found",
    }`
OR
 * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    success: false,
    message: "userName or password is incorrect"
    }`
    
**User Authenticate**
----
  Access tokens authentication.

* **URL**

  /auth

* **Method:**

  `GET`
  
*  **URL Params**
  None
* **Data Params**
  None
* **Bearer token**
  **Required:**
  `accessToken=[String]`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
     { 
      success: true,
      message: "Authenticate Successfully",
      user, 
      }
    ```
 
* **Error Response:**
* 
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
     success: false,
     message: "AccessToken Not Found"
    }`
OR
 * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    success: false,
    message: "User Not Found",
    }`

WebSocket Server API
===================
