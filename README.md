# Wannajam
WDI Seattle 02 Project

Wannajam is a web-app that allows musicians to find other musicians in their area. After signing up, a user is shown a map of their area which can display other musicians by instrument played.

It is an app created on node that uses a number of technologies including:

bcrypt,
body-parser,
connect-flash,
express,
express-sessions,
geocoder,
pg,
pg-hstore,
request,
sequelize,
sequelize-cli,
bootstrap,
google-fonts,

The two APIs currently being used by the app are Google's Geocoding API (through geocoder) and Leaflet

Geocoder sends the address a user provides during sign-up process to the Google Geocoding API and returns JSON data, which is used to store latitude and longtitude for each user. These locations are then plotted on a map using Leaflet.

Current Problems:

-Form validations don't work on the edit profile page
-No way to communicate within the app (have to list email addresses with user bio which is not ideal)
-The map should automatically plot the logged in user on the map with a different color marker