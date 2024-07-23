# PGN Extractor

PGN Extractor is a web application that allows users to upload, extract, and process PGN (Portable Game Notation) files. It provides a user-friendly interface for managing chess game data.

## Project Structure

The project is divided into two main parts:

- Frontend: A React application
- Backend: A Node.js server

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 12 or higher)
- npm (usually comes with Node.js)

## Setup

1. Clone the repository:

   ```
   git clone [repository-url]
   cd pgn-extractor
   ```

2. Install dependencies for both frontend and backend:
   ```
   npm install
   cd backend
   npm install
   cd ..
   ```

## Running the Application

We've provided a convenient .bat file to start both the frontend and backend servers simultaneously.

1. Double-click the `start_app.bat` file in the root directory of the project.

   Or, if you prefer to run it from the command line:

   ```
   start_app.bat
   ```

   This will:

   - Start the React development server for the frontend
   - Start the Node.js server for the backend

2. The application should automatically open in your default web browser. If it doesn't, you can access it at `http://localhost:3000`.

## Using the Application

1. Upload a PGN file using the file input on the main page.
2. Enter a new filename for the extracted file (optional).
3. Click "Upload and Extract File" to process the PGN file.
4. Once processed, you can execute additional commands on the extracted file using the "Execute Command" button.

## Development

- Frontend code is located in the `src` directory.
- Backend code is in the `backend` directory.
- To make changes, edit the relevant files and the changes will be hot-reloaded in your browser.

## Building for Production

To create a production build of the frontend:

```
npm run build
```

This will create a `build` directory with the compiled and optimized files.

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are correctly installed.
2. Check that the required ports (3000 for frontend, 5000 for backend) are not in use.
3. Review the console output for any error messages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Specify your license here]
