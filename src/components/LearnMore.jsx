import React from 'react';

const LearnMore = () => {
  return (
    <>
      <h1>Learn More About the Components</h1>

      <section>
        <h2>NavBar Component</h2>
        <p>The <strong>NavBar</strong> component is an essential part of the application that provides navigation links and authentication controls. Here's an explanation of how it functions:</p>
        
        <h3>Key Features of the NavBar:</h3>
        <ul>
          <li><strong>Brand Name:</strong> At the top of the NavBar, there is a brand label <strong>"FULL STRENGTH ACADEMY"</strong>, which serves as a clickable logo or brand name. This is always visible.</li>
          
          <li><strong>Navigation Links:</strong> 
            - The <strong>Home</strong> link is always available for quick access to the homepage.
            - When the user is not logged in, the <strong>Log In</strong> and <strong>Register</strong> links are visible.
            - Once logged in, additional navigation links become available:
              - <strong>Bmi App</strong>: A link to the BMI application.
              - <strong>Meals</strong>: Access to meal-related features.
              - <strong>Exercises</strong>: A section to explore and log exercises.
              - <strong>My Logs</strong>: View personal workout logs.
              - <strong>My Profile</strong>: View and edit the user profile.
          </li>
          
          <li><strong>Log Out Functionality:</strong> 
            - If the user is logged in, a <strong>Log Out</strong> button appears. When clicked, it will:
              1. Remove the authentication token from localStorage (to sign the user out).
              2. Update the `token` state (to reflect the change in authentication status).
              3. Redirect the user to the login page (`/login`).
          </li>
        </ul>

        <h3>How the NavBar Works:</h3>
        <p>The NavBar uses conditional rendering to display different links based on whether the user is logged in or not:</p>
      </section>

      <section>
        <h2>Register Component</h2>
        <p>The <strong>Register</strong> component allows users to create an account. Users can input a username, set a password, and verify it. After registration, they are directed to their profile page for further customization.</p>
        <h3>Server-Side Functionality:</h3>
        <p>The server handles user registration through the <code>/api/auth/register</code> endpoint. Upon successful registration, the server generates a token that is returned to the client. This token is required for authenticated access to protected routes, such as viewing user profiles and logging exercises and meals.</p>
      </section>

      <section>
        <h2>Profile Component</h2>
        <p>The <strong>Profile</strong> component displays the user’s profile data and their most recent log entry (including exercises and meals). Users can view and edit their profile information, track their workouts, and log new exercises and meals.</p>
        <h3>Server-Side Functionality:</h3>
        <p>The server provides functionality for fetching and updating user profiles. The profile can be viewed at <code>/api/auth/me</code> and edited using the endpoint <code>/api/auth/me</code> with the HTTP PUT method. The user must be authenticated via a token to access these routes.</p>
      </section>

      <section>
        <h2>Logs Component</h2>
        <p>The <strong>Logs</strong> component tracks and logs meals and exercises. Users can log their meals and workouts by selecting from fetched meal and exercise data. It also allows users to view a history of their logs and add new ones.</p>
        <h3>Server-Side Functionality:</h3>
        <p>Logs are stored on the server and can be accessed by using the endpoint <code>/api/auth/me/logs</code>. New logs can be added via <code>/api/auth/me/logs</code>, which requires a valid token for authentication. The server will validate the user and log their meal or exercise data.</p>
      </section>

      <section>
        <h2>Meals Component</h2>
        <p>The <strong>Meals</strong> component allows users to view and filter meals based on focus goals and calories. The meals can be fetched from an API and displayed with options to filter meals by their properties such as focus goal and calorie count.</p>
        <h3>Server-Side Functionality:</h3>
        <p>On the server, meals can be fetched using the endpoint <code>/api/meals</code>. Additionally, meals can be filtered by focus goal with the endpoint <code>/api/meals/focusgoal/:focusgoal</code>. Users can also create new meals with the endpoint <code>/api/meals</code>.</p>
      </section>

      <section>
        <h2>Add Meal Form Component</h2>
        <p>The <strong>Add Meal Form</strong> component enables users to add a new meal to the system. Users are prompted to enter details about the meal, including:</p>
        <ul>
          <li><strong>Meal Name</strong>: The name of the meal being added.</li>
          <li><strong>Focus Goal</strong>: The purpose of the meal, such as "Muscle Gain" or "Fat Loss". These options are dynamically fetched from the API.</li>
          <li><strong>Calories</strong>: The caloric content of the meal, which is required for tracking purposes.</li>
          <li><strong>Posted By</strong>: The username of the individual adding the meal, which is pre-filled from the local storage.</li>
        </ul>
        <p>If any of these fields are left blank, the form will not submit, and an error message will appear.</p>
        
        <h3>Server-Side Functionality:</h3>
        <p>Meals can be created using the <code>/api/meals</code> POST endpoint, where meal details are sent to the server. The server stores the meal data and returns a success message upon successful creation.</p>
      </section>

      <section>
        <h2>Exercises Component</h2>
        <p>The <strong>Exercises</strong> component allows users to browse and filter exercises based on muscle group, difficulty, and type. Exercises can be filtered dynamically, and users can select them to log in their workout records.</p>
        <h3>Server-Side Functionality:</h3>
        <p>Exercises can be fetched from the server using the endpoint <code>/api/exercises</code>. They can also be filtered by difficulty with <code>/api/exercises/difficulty/:difficulty</code>, muscle group using <code>/api/exercises/muscle/:muscle</code>, or by type with <code>/api/exercises/type/:type</code>. Additionally, exercises can be filtered using combinations of these parameters, such as <code>/api/exercises/type/:type/muscle/:muscle/difficulty/:difficulty</code>.</p>
      </section>


      <section>
        <h2>BMI Calculator Component</h2>
        <p>The <strong>BMI Calculator</strong> component helps users calculate their Body Mass Index (BMI) based on their height (in feet and inches) and weight (in pounds). This is an important tool for understanding body composition and determining if a person is underweight, normal weight, overweight, or obese. The component also recommends meals and workouts based on BMI categories to help users achieve their health goals.</p>
        
        <h3>Server-Side Functionality:</h3>
        <p>The BMI component integrates with the user profile data, which can be fetched using <code>/api/auth/me</code>. This data (height and weight) is used to calculate the BMI, and the BMI categories are displayed dynamically. Based on the BMI category, the app may recommend certain meals and exercises.</p>
      </section>
    </>
  );
};

export default LearnMore;
