<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/chrisxcode/delishare-react-project.git">
    <img src="./public/delishare-logo.png" alt="Logo" width="500">
  </a>

  <h3 align="center">Share Delicious recipes with people around the world!</h3>

  <p align="center">
    <br />
    <br />
    <img width ='46px' src ='https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/reactjs.svg'>
    <img width ='46px' src ='https://github.com/rahulbanerjee26/githubProfileReadmeGenerator/blob/main/icons/firebase.svg'>
    <br />
    <a href="https://delishare-react-project.web.app/">Live Demo</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Key Features</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#local-usage">Local usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![App Screen Shot][app-screenshot]

Delishare is a platform for sharing your unique taste in food. Create, like, and save recipes, and follow other authors to keep up with their newest content.

## Key Features

* **Home**
    * On the homepage, you can see overview of the project functionalities.

* **Recipes**
    * See a list of all the published recipes
    * Use filters to sort out recipes by difficulty
    * Use search bar to sort out recipes by key words
    * Click on a recipe to see more detailed view

* **Recipe Detail View**
    * In detail view, you can see all the basic information, along with the needed ingredients and instructions for the recipe, bigger image, and the author's name, which links to their profile
    * **Like/Unlike Button** (USERS only), which adds/removes the recipe to/from the user's liked recipes
    * **Save/Unsave Button** (USERS only), which adds/removes the recipe to/from the user's saved recipes
    * **Edit Button** (AUTHOR only), which allows the author to edit the recipe
        * Edit view loads up the recipe with its existing information, allowing for easy review and changes
    * **Delete Button** (AUTHOR only), which allows the author to delete the recipe
        * Delete button opens confirmation window, asking the user to confirm their decision to delete the recipe
    
* **Users**
    * See a list of all the registered users
    * Use search bar to sort out users by key words
    * See user information on each user card, such as cover photo, profile picture, username, description, number of authored recipes, number of followers, number of people followed
    * Click on the user card to open the full user profile

* **Create** (USERS only)
    * Opens up a form for new recipe creation

* **Login**
    * Allows existing users to sign in with their email and password
    * Option to redirect to Register form

* **Register**
    * Allows guests to create a profile on the Delishare platform
    * Option to redirect to Login form

* **Profile**
    * Shows all the user information available in the user card, along with the recipes they have authored, liked, saved, and the recipes of the people they follow
    * **Follow/Unfollow** (USERS only), which adds the profile to the users' list of people followed and will show their recipes in the user's profile hub
    * **Edit Profile** (PROFILE OWNER only), which allows the user to customize their cover photo, profile picture, username and description
    * **Change theme** (PROFILE OWNER only), which allows the user to customize the theme of the website. Any time the user is logged in, the platform will be themed according to the preference saved in their profile. Once the user logs out, the platform reverts to the default theme (Blue).
    * **Logout** (PROFILE OWNER only), which allows the user to log out of their profile

The website uses functional components, the **Context API**, **React Router DOM**, and does styling via **CSS modules**. All forms have form validation, and all CRUD requests trigger a loading screen, which allows the user to see their request is being processed.

Architecturally, the **src** folder contains:

* **components**
    * Contains all the components, plus a folder with the components CSS modules.
* **config**
    * Contains the firebase.js file, which makes the connection between the react app and the database hosted on firebase.
* **REST**
    * Contains files, each containing the CRUD operations for its respective database


## Built With

The project is built using:
* [React](https://reactjs.org/)
* [Firebase Auth & Firestore](https://firebase.google.com/)

<!-- GETTING STARTED -->
## Local Usage


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/chrisxcode/delishare-react-project.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the project
   ```sh
   npm start
   ```


<!-- CONTACT -->
## Contact

Hristo Palhutev - christopalhutev@gmail.com

Project Link: [https://github.com/chrisxcode/delishare-react-project.git](https://github.com/chrisxcode/delishare-react-project.git)



[app-screenshot]: public/screenshot.png