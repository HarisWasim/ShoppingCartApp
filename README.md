This project was bootstrapped with Create React App

To run project:

Step 1: Move to 'GOPUFF-INTERVIEW' directory
Step 2: Execute command 'npm install'
Step 3: Execute command 'npm run'
Step 4: In your browser, Open http://localhost:3000 to view it in the browser.

Tip:

- Click on 'My Cart' to execute API fetch and view all elements in shopping cart
- Click back on 'Welcome to goPuff' to go back to home screen.

Technical Choices:

Some of the choices I made throughout the implementation of this project include:

- Separated components into isolated pieces based on functionality and purpose. This architect allows for seamless modification and maintenance of code to ensure scalability and ease of development:
  - App.js is the parent component that renders the HomePage.
  - HomePage.js serves as the landing page that renders the entire front screen.
  - ListCartItems.js serves as the shopping cart screen that renders all of the metadata associated with the shopping experience.
- Leveraged react-bootstrap and material-ui to ensure clean css styling and ease of implementation due to time constraint. Initial focus was to get functionality in place with the alloted time. Afterwards, focused on how to delineate from libraries. This could be considered an improvement I would make if given the chance.
- Rendered each cart element into its own card. Used javascript's map function on array of JSON response to return unique JSX component for each item in shopping cart, while following design patterns.
- Included toolbar that renders navigation features throughout the entire version of the goPuff website. Main features are, clickable home button and clickable My Cart button, which both serve navigational purposes.
- When the description of certain cart elements is too long, the component automatically allows for scrolling through the description in the vertical direction.
- Added the 'By: {Brand Name}' underneath title of product.
- Title of product also includes whether there is a sale, if there is a sale price.
- Leveraged flex container to flexibly display elements in the shopping cart with a vertical scrollable view.
- Cart items render quantity associated with each element.

Improvements/Optimizations:

- Would add functionality to view more info to grab metadata associated with each item in the shopping cart.
- Implement a distinguishable design pattern to easily separate each cart element (border, different background color, etc.).
- Fully-implement search bar to filter through cart elements on page the moment keyPressed = enter. At the moment, search bar input is only present. Maybe begin this feature by just having a simple console.log() in place to return all elements that have the substring matching the one inputted in the search bar. Additionally, complete the side navigation menu button to allow for additional navigation features, if desired.
- Beautify entire screen with a bit more alignment optimizations
- Make home screen more welcoming and 'homey'
- Functionality to update cart and the quantity of elements within it. Additionally, have any changes to the cart change the sale total and subtotal that is calculated.
- Have this data persist on the backend.
