# Slang Dictionary

This is a backend project for a slang dictionary application in russian language. The application allows users to view and search slangs, while administrators are able t omanage a collection of slangs, including adding new slangs, updating and deleting existing ones.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd slang-dictionary
   ```
3. Install dependencies and start the server:
   ```
   npm install
   npm run dev
   ```

## Technologies used
- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- Nodemon

Endpoints:
- GET /slangs: Get all slangs
- POST /slangs: Add a new slang
- GET /slangs/:id: Get a single slang by ID
- PUT /slangs/:id: Update a slang
- DELETE /slangs/:id: Delete a slang

## Usage
Opening page meets user with two options - regular user or administrator. 
First option does not require any registration or logging in, so user is able to easily access the dictionary by browsing every slang by scrolling or searching for the slangs that user wants to know about.
Second option shows a prompt with request to enter a password for obtaining administrator rights (password is 'admin'). Administrator is able to see, modify and delete every 'slang card' by pressing respective buttons.
Hopefully, you enjoy this experience!


## Contributing
Contributions are welcome! Feel free to open a pull request or submit suggestions via issues.

## Author
- Zhan Kazikhanov (Astana IT)
