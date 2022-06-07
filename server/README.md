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

WebSocket Server API
===================
