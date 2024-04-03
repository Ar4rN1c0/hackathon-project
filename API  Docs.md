# V1

if success = false in the response that means that the request hasn't been accomplished. Look at the specific parameter for more info

### Auth
- **Main subdirectory**: /api/v1/auth/

- /register - POST
	- Parameters needed:
		- fullName - String
		- email - String ( needs @ and .)
		- password - String ( needs at least 6 characters and 20 max )
		- Example:
		```json
		{
			"fullName":"Test",
			"email":"a@s.com",
			"password":"ThisIsPassword"
		}
		```
	- Server Answer:
		- 412 - Validation Failed
			- One or more inputs are not correct
			- Example
			```js
			{
				message: 'Validation failed',
				success: false
			}
			```
		- 201 - Created
			- The user has been registered
			- Example:
			```js
			{
				message: 'User successfully created!',
				success: true
			}
			```

- /login - POST
	- Parameters needed:
		- email - String ( needs @ and .)
		- password - String ( needs at least 6 characters and 20 max )
		- Example:
		```json
		{
			"email":"a@s.com",
			"password":"ThisIsPassword"
		}
		```
	- Server Answer:
		- 412 - Validation Failed
			- One or more inputs are not correct
			- Example
			```js
			{
				message: 'Validation failed',
				success: false
			}
			```
		- 200 - OK
			- The user has been logged in and a token has been created
				- !!! The token only last 1 hour, then you will have to login again
			- The access Token is needed for other requests, its used in the authentication header with the bearer style
			- Example:
			```json
			{
				"accessToken":"TOKEN",
				"userId": "UUID-V4"
			}
			```

- /profile/:id - GET -  Authentication Needed
	- Parameters needed:
		- id - in the URL - Its the id for the user you are looking the info for
		- Example:
		```json
		{
			"fullName":"Test",
			"email":"a@s.com",
			"password":"ThisIsPassword"
		}
		```
	- Server Answer:
		- 412 - Validation Failed
			- One or more inputs are not correct
			- Example
			```js
			{
				message: 'Validation failed',
				success: false
			}
			```
		- 401 - Authentication Failed
			- There is no authentication token, It has expired or its not valid.
			- Example
			```js
			{
				message: 'Authentification Failed'
			}
			```
		- 200 - OK
			- OK
			- !!! Other Information Will be returned soon
			- Example:
			```js
			{
				name: 'FULL NAME OF THE USER',
				success: true
			}
			```

- /users - GET - DEV ONLY
	- Parameters needed:
		- None
	- Server Answer:
		- 200 - OK
			- OK
			- Example:
			```js
			{
				users: [{
					"id": ID,
					"name": "FULL NAME",
					"email": "EMAIL",
					"password": "PASSWORD HASHED AND SALTED",
					"role": "user",
					"clubs": [
						"CLUB-ID_could be empty"
					],
					"userId": "USER UUIDV4",
					"status": "STATUS",
					"createdAt": "2024-03-20T11:14:42.578Z",
					"updatedAt": "2024-03-20T11:15:41.149Z"
				}],
				success: true
			}
			```


### Clubs

- **Main subdirectory**: /api/v1/club/

- /register - POST - Authentication Needed
	- User creating is automatically added as admin of the club 
	- Parameters needed:
		- name - String - Unique (because why not)
		- description - String
		- Example:
		```json
		{
			"name":"NAME OF THE CLUB",
			"description":"DESCRIPTION OF THE CLUB"
		}
		```
	- Server Answer:
		- 412 - Validation Failed
			- One or more inputs are not correct
			- Example
			```js
			{
				message: 'Validation failed',
				success: false
			}
			```
		- 401 - Authentication Failed
			- There is no authentication token, It has expired or its not valid.
			- Example
			```js
			{
				message: 'Authentification Failed'
			}
			```
		- 201 - Created
			- The club has been registered
			- Example:
			```js
			{
				message: 'Club successfully created!',
				success: true
			}
			```

- /activity/create - POST - Authentication Needed - Club Admin Verification
	- Parameters needed:
		- name - String - name of the activity
		- description - String - description of the activity
		- club - String - ID of the club to create activity
		- Example:
		```json
		{
			"name":"NAME",
			"description":"DESCRIPTION",
			"club":"bad1be62-62a5-4371-8bcb-545a8fa97c3f"
		}
		```
	- Server Answer:
		- 412 - Validation Failed
			- One or more inputs are not correct
			- Example
			```js
			{
				message: 'Validation failed',
				success: false
			}
			```
		- 401 - Authentication Failed
			- There is no authentication token, It has expired or its not valid.
			- Example
			```js
			{
				message: 'Authentification Failed'
			}
			```
		- 403 - Not Authorised
			- Not an admin of the club.
			- Example
			```js
			{
				message: 'Not authorised',
				success: false
			}
			```
		- 201 - CREATED
			- The activity has been created
			- id of the activity 
			- id of the club
			- Example:
			```json
			{
				"message": "Activity successfully created!",
				"id": "UUID-V4",
				"club": "UUID-V4",
				"success": true
			}
			```

- /activities/:id - GET 
	- Parameters needed:
		- id - in the URL - Its the id for the club you are looking the activities for
	- Server Answer:
		- 200 - OK
			- OK
			- Example:
			```json
			{
				"message": "Activities successfully retrieved!",
				"activities": [
					{
						"id": 1,
						"name": "ACTIVITY NAME",
						"description": "ACTIVITY DESCRIPTION",
						"club": "CLUB ID",
						"organizers": ["ORGANIZERS"],
						"users": ["USERS"],
						"activityId": "UUID-V4",
						"status": "STATUS",
						"createdAt": "2024-03-21T09:39:06.561Z",
						"updatedAt": "2024-03-21T09:39:06.561Z"
					}
				],
				"success": true
			}
			```

- /clubs - GET - DEV ONLY
	- Parameters needed:
		- None
	- Server Answer:
		- 200 - OK
			- OK
			- Example:
			```json
			{
				"message": "Clubs successfully retrieved!",
				"clubs": [
					{
						"id": 1,
						"name": "CLUB NAME",
						"description": "CLUB DESCRIPTION",
						"activities": ["ACTIVITY ID"],
						"ClubId": "UUID-V4",
						"status": "STATUS",
						"admins": [
							"ADMINS-ID"
						],
						"createdAt": "2024-03-20T11:45:03.885Z",
						"updatedAt": "2024-03-20T11:45:03.885Z"
					}
				],
				"success": true
			}
			```

- /clubs/activities - GET - DEV ONLY
	- Parameters needed:
		- None
	- Server Answer:
		- 200 - OK
			- OK
			- Example:
			```json
			{
				"message": "Activities successfully retrieved!",
				"activities": [
					{
						"id": 1,
						"name": "ACTIVITY NAME",
						"description": "ACTIVITY DESCRIPTION",
						"club": "CLUB-ID",
						"organizers": ["ORGANIZERS-ID"],
						"users": ["USERS-ID"],
						"activityId": "UUID-V4",
						"status": "STATUS",
						"createdAt": "2024-03-21T09:39:06.561Z",
						"updatedAt": "2024-03-21T09:39:06.561Z"
					}
				],
				"success": true
			}
			```
