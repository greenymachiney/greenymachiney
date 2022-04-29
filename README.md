# OPSPARK LEGACY PROJECT APRIL 2022

### overview

This app can be used as a users virtual bar cart, recipe book, shopping list, event planner, and general all-things-alcohol assistant. Its goal is to be an easy to use interface where users can store information that will help them make cocktails, find supplies, plan events, and organize bar crawls easily.

### database

We have a mongodb/mongoose database. We have a User schema that holds all the data pertinent to the user. From our google oauth we have their username, googleId, and thumbnail. We also store their liquor list, shopping list, saved recipes, and events. Our database files are in server/database.

### server

We have an express server. It is set up in server/index.js. We use 8 express routers to separate and organize our routes. These can all be found in server/routes. Our auth-routes are our routes for logging a user in and out with passport. drunk-routes handles most of the routing for the bar cart, drink book, create recipe, and search components. All of these components use the cocktail api. shopping-routes handles the routing for the shopping list. These routes utilize the yelp fusion api to find liquor stores in the area. event-routes handles the events components routing. The videos in drink book utilize the YouTube API and OpenWeather API is used for the weather component in events. Pictures are routed from Cloudinary API to upload in recipe book.

### authentication

Our authentication is handled with oauth and passport. Our passport setup can be found in config/passport-setup. We have a google strategy set up so users must log in with their google account. Once logged in, the user has access to the whole site. The user can log out with the log out button at the top right of the screen.

### apis

We used two external apis for this project:

1. Cocktail Api - https://www.thecocktaildb.com/api.php
   This api allows us to search for drink recipes randomly, by name, and by ingredient. We utilize this in our bar cart, drink book, and search components. The api calls are written in the functions located in server/api/getCocktail

2. Yelp Fusion Api - https://www.yelp.com/developers/documentation/v3/get_started
   This api allows us to search for stores in the category 'Beer, Wine, & Spirits' by location. In our shopping list component, we have an input box for the user to put their location and we send this information to the yelp api. The api calls are written in the function located in server/api/

3. YouTube API - https://developers.google.com/youtube/v3
   This api allows us to search YouTube based on user input for drink recipes and embed videos of actual cocktails being created. The api calls are written in the function located in server/api/getYouTube

4. Cloudinary API - https://cloudinary.com/documentation/image_upload_api_reference
   This api allows user to upload images to their recipe book and events through Cloudinary. The api calls are written in the function located in client/components/CreateRecipes

5. OpenWeather API - This api allows users to input their current location and return the current weather conditions. The api calls are written in the function located in server/api/getWeather.

6. Google Maps Platform API

The keys for these apis as well as our google oauth & cloudinary credentials are located in .env in the root directory with the exception of the cocktail api key which can be found in the /config/keys.js file.

### .env keys required

1. GOOGLE_CLIENT_ID=
2. GOOGLE_CLIENT_SECRET=
3. YELP_CLIENT_ID=
4. YELP_API_KEY=
5. NEXT_PUBLIC_GOOGLE_MAP_SERVICES_API_KEY=
6. MONGO_URI=
7. YOUTUBE_API_KEY=
8. WEATHER_API_KEY=

### front end

Our front end is built with React and utilizes React Router. In App.jsx we set up our router and have a switch statement for the log in page, or the users page. When a user logs in with google. they will be redirected to the home page (the users page) we they can see the full nav bar and see all the components. In User.jsx we have additional switch statements to route between the different components.

The bar cart component displays a users saved liquor list. The user can manually add liquors to the their list using the input box. If a user clicks on a specific liquor in the list, the cocktail api is called to search by that liquor and a list of all recipes using that liquor will be displayed. The user can then click on individual recipes to see the specifics. A user can delete a liquor from their list by clicking the trash can.

The drink book component displays the users saved recipes. Since we do not save all the recipe information in our database, the cocktail api is called to retrieve the information based on the names of drinks that are saved in the user schema. Recipes can be added to a users book from the search component and can be deleted from inside the drink book component with the trash can.

The create recipes component displays a form that users fill out the name, ingredients, instructions, category, and image upload and saves the created recipe to the drink book. Users can delete recipes from the drink book.

The events component allows users to create a cocktail party (or any sort of event). The user can fill out the form with the event name, time and location, and upon clicking submit this information will be added to the database. The user will see the event displayed below the form and will also see a list of people who can be invited to the event. These people are other users stored in the database. The user can click on a persons name to add them to the event.

The shopping list component displays the items saved in a users shopping list. The user can add items to this list manually with the input box or by clicking the add button next to any ingredient when viewing a recipe from the search or bar cart component. The user can cross out an item by clicking on the text in the shopping list or can actually delete the item from their list with the trash can. Below the shopping list their is a second input box where the user can enter their location. Upon clicking the button the yelp fusion api is called and a list of liquor stores in the area will be returned. The user can click on any store in the list to view more details about the store and by clicking on the address of the store a new tab will open the google maps to the stores location.

The search component is where a user can search for new recipes. they can click the get a random drink button to get a random drink from the cocktail api, or they can search using the input box. they can search by a term like 'vodka' or 'margarita' or can search for a specific drink name. If only one drink is returned by the search, it will automatically be shown in detail. If multiple drinks are returned, a list will show up and the user can click on the drinks to spotlight them and show the details. The add buttons next to the ingredients will add the ingredient to a users shopping list, and the heart button at the bottom of the recipe card will add the recipe to the users drink book.

The Weather feature is where a user can click the check weather button to obtain the current weather conditions of their location before they go on a Bar Crawl.

The Switch Theme (dark mode) feature was created using "styled-components." It injects a global theme throughout all the components to display a dark or light mode upon clicking the Switch Theme button.

We have eslint Airbnb configured. We are using webpack and babel to compile our code.

### styling

We use bootstrap for our styling with additional styling in client/styles/style.css
We use styled-components for dark mode

### start up

in /config folder, make a file named `keys.js`. The file needs the following information, with the information with the << >> tags filled in.

`module.exports = { api: { cocktail: << THE_COCKTAIL_API_KEY (you can use the API without a key, but there are more queries available if you pay and make a key )>> } };`

#### start up scripts

`npm run dev` to run webpack<br>
`npm start` to start the server on port 3000<br>

### **KNOWN BUGS, ISSUES, UNFINISHED FEATURES**

1. When hovering over the Floating Action Button on the events page to expose the 3 smaller option buttons, be aware the bar crawl page has no implemented functionality

2. The dark mode theme isn't fully implemented. Known elements that are not affected by the dark mode switch are the navbar, most or all text fields, most or all display cards (for events, recipes, saved drinks, etc...). Also, the profile page text is the same color as the current dark mode background; as a result the user can't view profile text in dark mode. This is likely an issue elsewhere.
