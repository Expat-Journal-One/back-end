# Expat Journal Schema and Data Models

| METHOD | ENDPOINT | DESCRIPTION | PROTECTED ROUTE |
| ----------- | ----------- | ----------- | ----------- |
|  | https://expatjournal-one.herokuapp.com | api url |  |
| POST | /api/auth/register | **register endpoint:** creates a user using the information sent inside the request body. returns the new user and the authorization token. username and password are required fields, firstName and location are optional|  |
| POST | /api/auth/login | **login endpoint:** checks user credentials against the request body, and returns an authorization token. username and password are required. username held inside token. user_id auto generated by database |
| POST | /api/stories | **stories endpoint:** creates a new story using the information sent inside the request body. title and location are required. id and date are created by the database. location and story are optional.| PROTECTED |
| GET | /api/users/:id | **users endpoint:** returns a specific user by id |
| GET | /api/stories | **stories endpoint:** returns all stories |  |
| GET | /api/stories/:id | **stories endpoint:** returns the story object with the associated story id specified in the URL |
| DELETE | /api/users/:id | **users endpoint:** removes a specific user by id - database checks to make sure only the user is able to delete themself | PROTECTED |
| DELETE | /api/stories/:id | **stories endpoint:** deletes a story by id - only logged in user can delete their stories. only the user is able to able to delete their stories | PROTECTED |
| PUT | /api/stories/:id | **stories endpoint:** takes a request body object and updates the story with the specified id. only logged in user can edit their stories| PROTECTED |

 ## Story Data Model 
 
| id (ag) | ***title** | ***location**  | description | date (ag) | image | user_id (ag) | 
| ----------- | ----------- | ----------- | ----------- |----------- | ----------- | ----------- |

*data base only set up for image urls*  |  ***required**   | *auto generated (ag)* 


 ## User Data Model 
 
| id (ag) | ***usernanme**  | location  | ***password** | firstName | location | 
| ----------- | ----------- | ----------- | ----------- |----------- | ----------- | 

  ***required**   | *auto generated (ag)* 