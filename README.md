![logo](/images/logo.png?raw=true "forage")

# Forage
> a recipe finder app based on ingredients


Link to [live site](https://forage.toantran.io)

## Overview

As I've been trying to learn to cook for myself more, I've been getting tired of going through recipe website.
The sites I find are typically bloated with ads, unnecessary images and videos, 
and takes too many clicks to get to an actualy recipe.

The Forage app is a minimal viable product that aims to help those who are just trying to find discover 
new recipes without all the hassle. The goal is to have users just enter ingredients into the search 
bar and quickly find recipes. By making a search off of ingredients, users can find recipes with ingredients 
they already have in their house.

## Technologies

### Overview
This app was built using the MERN stack architecture.  
Client: React.js, Apollo-client  
Server: Node.js - Express, GraphQL, Mongoose  
Databse: MongoDB  

Note that this app could have been implemented using traditional REST API endpoints.
However, GraphQL was chosen for this project based on general preference. 
I simply wanted to avoid "over-fetching" and minimize API endpoints.

### Backend
- Server: Node.js, Mongoose, Express, GraphQL
- Database: MongoDB
- Firebase is used to host images

---
Forage utilizes two models:  
  
**Recipes**  
This model contains all data relevant to a recipe:
1. Name
2. Description
3. Instructions
4. Ingredients
5. View counts
6. Rating
7. Author/Owner
8. Image

**Users**    
Users are related to Recipes only in terms of authorship and ratings.  
  
---

The GraphQL API server is connected using ``express``.  
The ``express-graphql`` midddleware is used in order to setup the GraphQL HTTP Server and schema on the "/graphql" endpoint.
  
The GraphQL API is used for:
1. Searching of recipes
2. Submission of recipes
3. Tracking view counts
4. Rating recipes
5. User authentification and restrictions

### Frontend
The UI was built using React.js, with the goal of building a single-page, seamless application.

To handle the fetching between the Frontend and GraphQL server, I chose to use the GraphQL client, Apollo.
To cache the data of our requests, I'm using the ``InMemoryCache`` module from ``apollo-cache-inmemory``.

## Functionality

- [x] Ability to search for recipes by ingredients
- [x] Infinite scrolling of results
- [x] Authentification, including oAuth with Facebook.
- [x] Recipe uploads, including image hosting
- [x] Mobile-ready

### Search & Infinite Scrolling
A user is able to search for recipes based on specified ingredients. They can choose to find recipes that match
**all** or **any** of the ingredients specified. The query itself relies on regex in order to search for ingredients within each recipe, agnostic of placement and casing.

Inifinite scrolling of the results is achieved through pagination and the ``fetchMore`` function within Apollo.
1. Pagination uses the standard offset/limit strategy.
2. The ``fetchMore`` function is returned from the Query. 
This function allows us to return an updated query that can append its results to our previous results (stored in the cache).

### Recipe submissions
Because the recipe "Cooking instructions" and "Ingredients" are stored in the DB as an Array of Strings,
this created quite a challenge to implement a good form with React Hooks.

The standard implementation for handling a form input to an Array is using the spread ("...") operator.
However, this doesn't work because order matters. If a user wants to change the first step, 
then they will have to start over.

Thus in order to create a dynamic form that can handle changes to the local state at **any** point in the array, I had to be a little more creative.
See my solution below:

```
  
  const [steps, setSteps] = useState({ 0: "" });
    // The steps are stored in an object, the keys represent its index in the array.
    
  const [stepsFormHelper, setStepsFormHelper] = useState([0]);
    // This array is used to build out the input itself. Values here do not matter. 
    // The number of items correlate to the number of input fields we generate   
  
  const handleStepsChange = (e, id) => {
    setSteps(Object.assign({}, steps, { [id]: e.target.value }));
  };
    // By tracking the relative index of the array, we can edit the steps object without losing order.
  
  
  const addAnotherListItem = (e, type) => {
    e.preventDefault();
    if (type === "ingredient") {
      setIngredientsFormHelper([...ingredientFormHelper, 1]);
    } else {
      setStepsFormHelper([...stepsFormHelper, 1]);
    }
  };

return (
 <form> ... 
  
  {stepsFormHelper.map((el, idx) => (
    <input
      title="Step"
      key={idx}
      value={steps[idx]}
      onChange={e => handleStepsChange(e, idx)}
      placeholder="Enter a step"
    />
  ))}
  
  <button
    title="add another step"
    onClick={e => addAnotherListItem(e, "step")}
  >
```

### Authentifcation 

Authentification is built without reliance of ``passport.js``

Registration/Login flow: 
1. Front-end: User signs up and sends a request to the server
2. The user's inputs are passed to server-side validations
3. If validations pass, the user's password is then encrypted using ``bcryptjs`` and stored on the server
4. The server responds with
(a) a JSON Web Token ("JWT"), encrypting the user's id and a secret token, which is then stored in the user's local storage.
and (b) a "logged in" status, which is stored in the client's cache.

Whenever a user tries to access a restricted portion of the website, the JWT is passed back to the server for authentification and an updated "logged in" status is returned.
The JWT is destroyed once the user logs out.

oAuth: Implementing Facebook ("FB") login functionality was challenging as there was no good documentation on implementing one with GraphQL.
Thus I created a simple authentification flow as described below:
1. Upon a successful login to FB, the callback sends the user's Facebook ID. 
2. The ID is passed back to our server to validate if the user has logged in before. If not, then an account is automatically created.
3. We continue to keep track of the users login status with the strategy discussed above.

## UI/UX Preview

### Search
![Search](https://firebasestorage.googleapis.com/v0/b/recipeapp-258123.appspot.com/o/search.gif?alt=media&token=4911918e-efb1-477d-a9b7-9febba08389c)

### Recipe submission
![Submission](https://firebasestorage.googleapis.com/v0/b/recipeapp-258123.appspot.com/o/submit.gif?alt=media&token=cfae34bc-8510-466c-a73e-1e28c0b29f32)

## Attribution
The sample data used to populate the app was web-scraped from [allrecipes.com](allrecipes.com/).
