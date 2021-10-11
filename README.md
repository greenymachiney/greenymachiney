# greenymachiney
Greenfield Project

### overview
This app can be used as a users virtual bar cart, recipe book, shopping list and event planner. Its goal is to be an easy to use interface where users can store information that will help them make cocktails and plan events easily.

### database
We have a mongodb/mongoose database. We have a User schema that holds all the data pertinent to the user. From our google oauth we have their username, googleId, and thumbnail. We also store their liquor list, shopping list, saved recipes, and events. Our database files are in server/database.

### server
We have an express server. It is set up in server/index.js. We use 4 express routers to separate and organize our routes. These can all be found in server/routes. Our auth-routes are our routes for logging a user in and out with passport. drunk-routes handles most of the routing for the bar cart, drink book, and search components. All of these components use the cocktail api. shopping-routes handles the routing for the shopping list. These routes utilize the yelp fusion api to find liquor stores in the area. event-routes handles the events components routing.

### authentication
Our authentication is handled with oauth and passport. Our passport setup can be found in config/passport-setup. We have a google strategy set up so users must log in with their google account. Once logged in, the user has access to the whole site. The user can log out with the log out button at the top right of the screen.
### apis
We user two external apis for this project:

1) Cocktail Api - https://www.thecocktaildb.com/api.php
  This api allows us to search for drink recipes randomly, by name, and by ingredient. We utilize this in our bar cart, drink book, and search components. The api calls are written in the functions located in server/api/getCocktail

2) Yelp Fusion Api - https://www.yelp.com/developers/documentation/v3/get_started
  This api allows us to search for stores in the category 'Beer, Wine, & Spirits' by location. In our shopping list component, we have an input box for the user to put their location and we send this information to the yelp api. The api calls are written in the function located in server/api/getStores

The keys for these apis as well as our google oauth information is located in config/keys
### front end
Our front end is built with React and utilizes React Router. In App.jsx we set up our router and have a switch statement for the log in page, or the users page. When a user logs in with google. they will be redirected to the home page (the users page) we they can see the full nav bar and see all the components. In User.jsx we have additional switch statements to route between the different components.

The bar cart component displays a users saved liquor list. The user can manually add liquors to the their list using the input box. If a user clicks on a specific liquor in the list, the cocktail api is called to search by that liquor and a list of all recipes using that liquor will be displayed. The user can then click on individual recipes to see the specifics. A user can delete a liquor from their list by clicking the trash can.

The drink book component displays the users saved recipes. Since we do not save all the recipe information in our database, the cocktail api is called to retrieve the information based on the names of drinks that are saved in the user schema. Recipes can be added to a users book from the search component and can be deleted from inside the drink book component with the trash can.

The events component allows users to create a cocktail party (or any sort of event). The user can fill out the form with the event name, time and location, and upon clicking submit this information will be added to the database. The user will see the event displayed below the form and will also see a list of people who can be invited to the event. These people are other users stored in the database. The user can click on a persons name to add them to the event.

The shopping list component displays the items saved in a users shopping list. The user can add items to this list manually with the input box or by clicking the add button next to any ingredient when viewing a recipe from the search or bar cart component. The user can cross out an item by clicking on the text in the shopping list or can actually delete the item from their list with the trash can. Below the shopping list their is a second input box where the user can enter their location. Upon clicking the button the yelp fusion api is called and a list of liquor stores in the area will be returned. The user can click on any store in the list to view more details about the store and by clicking on the address of the store a new tab will open the google maps to the stores location.

The search component is where a user can search for new recipes. they can click the get a random drink button to get a random drink from the cocktail api, or they can search using the input box. they can search by a term like 'vodka' or 'margarita' or can search for a specific drink name. If only one drink is returned by the search, it will automatically be shown in detail. If multiple drinks are returned, a list will show up and the user can click on the drinks to spotlight them and show the details. The add buttons next to the ingredients will add the ingredient to a users shopping list, and the heart button at the bottom of the recipe card will add the recipe to the users drink book.

We have eslint Airbnb configured. We are using webpack and babel to compile our code.

### styling
We use bootstrap for our styling with additional styling in client/styles/style.css


### start up
in /config folder, make a file named `keys.js`. The file needs the following information, with the information with the << >> tags filled in. 

`module.exports = {
  google: {
    clientID: << YOUR_GOOGLE_CLIENT_ID >>,
    clientSecret: << YOUR_GOOGLE_CLIENT_SECRET >>
  },
  session: {
    cookieKey: << A_SESSION_KEY (can be any string, it is used to encrpyt a users id into a session id) >>
  },
  api: {
    cocktail: << THE_COCKTAIL_API_KEY (you can use the API without a key, but there are more queries available if you pay and make a key )>>
  },
  yelp: {
    clientID: << YOUR_YELP_FUSION_CLIENT_ID >>,
    APIkey: << YOUR_YELP_FUSION_API_KEY >>
  }
};`

#### start up scripts

`npm run dev` to run webpack<br>
`npm start` to start the server on port 3000<br>
