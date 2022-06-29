# Coding Challenge for Backend Engineers

To run project locally:
1. Create .env file with the secrets provided via email in project root folder
2. Run command `npm install`
3. Start server with `node index.js`
4. Test on http://localhost:4000/users

App is also deployed on

http://mightyjaxx.samima.link/users

[POSTMAN Collection](https://github.com/scott88lee/mightyJAXX/blob/main/postman_collection.json) for testing

#### Note / Modifications: 
- Requirement 7 updates email, assuming username is refering to email
- Requirement 8 was done with POST route instead, semantically its more correct to send a body with a POST route instead of GET


## Requirements
- Node.JS 
- Express.JS 
- Passport.JS: https://www.passportjs.org/packages/
- MongoDB 

You have 7 days upon receiving this test to complete and submit it back to us.

## Instructions
The purpose of this coding challenge is to set up a Node.JS app that serves a simple CRUD API and can send welcome emails. Familiarity with Node.JS is assumed, however, no prior knowledge of `nodemailer` is required. Besides completing the task according to the set of instructions below, we are looking for well written code and a demonstration of understanding the best practices around Node.JS and Express.JS.

1. Clone this repository and create your own GitHub repository.
2. Push your git repository to GitHub.
3. Initialize a new Node.JS project.
4. Set up `passport` for email and password authentication. 
5. Follow the `nodemailer` SDK setup guide to Initialize it in your Node.JS app: https://nodemailer.com/about/
6. Add an endpoint to create a new user. Requirements: 
    - Method `POST` and path `/users`.
    - Request: email and password.
    - Make sure the password is valid.
    - Make sure the email is deliverable and valid and send a welcome email using nodemailer to that email address.
    - User data should be saved in a MongoDB document.
    - Response: the response should return a JWT.
7. Add an endpoint to update an existing user. Requirements: 
    - Method `PUT`, path `/users/{id}`.
    - Request: username and JWT.
    - Make sure the username is valid.
    - Use a JWT to ensure only the owner of the account is able to update the user data.
    - User data should be saved in a MongoDB document.
    - Response: the response should return a success or error status.
8. Add an endpoint to get an existing user. Requirements: 
    - Method `GET`, path `/users/{id}`.
    - Request: email and password. 
    - Make sure the email and password are valid.
    - Response: the response should return the user data.
9. Add an endpoint to delete an existing user. Requirements: 
    - Method `DELETE`, path `/users/{id}`.
    - Request: JWT. 
    - Make sure the email and password are valid.
    - Use a JWT to ensure only the owner of the account is able to delete the user data.
    - Response: the response should return a success or error status.
10. Deploy the Node.JS app. You can use Vercel, Heroku, AWS free tier or digital ocean (enter promo code DROPLET10 for free credits).
11. When you are done, send us the link to your GitHub repository with a clear README file and any other details required for us to run the app.
12. Final testing and assessment of your app will be done via Postman
