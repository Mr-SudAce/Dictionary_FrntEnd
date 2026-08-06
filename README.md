# Dictionary Frontend Application

The client-side application for the Dictionary System. This project is designed to consume the Django REST Framework API, providing a user interface for searching words, reading blogs, and managing user authentication.

## Features

*   **Word Dictionary**: Interface to search, list, and view detailed definitions of words.
*   **Blog & Posts**: Dedicated sections to browse and read blog posts and categories.
*   **Dynamic UI**: Renders Headers, Footers, and Pages dynamically based on Backend CMS configuration.
*   **User Authentication**: Integrated Login and Registration forms.
*   **Responsive Design**: Layout adapted for desktop and mobile viewing.

## Tech Stack

*   **Environment**: Node.js
*   **Framework**: React (Inferred)
*   **Build Tooling**: Scripts via `npm`/`yarn`
*   **API Integration**: Consumes REST endpoints from the Django Backend.

## Prerequisites

*   **Node.js** (LTS version recommended)
*   **Backend**: The Dictionary Backend must be running (Default: `http://127.0.0.1:8000`).

## Installation & Setup

1.  **Navigate to the directory**
    ```bash
    cd FrontEnd
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Development Server**
    ```bash
    npm start
    ```
    Open http://localhost:3000 to view it in the browser.

## Configuration

The application connects to the backend API. Ensure your API base URL is configured (typically in a generic config file or environment variable):

*   **API Base URL**: `http://127.0.0.1:8000/api/`

## Project Structure

*   **`node_modules/`**: Project dependencies.
*   **`public/`**: Static assets (index.html, favicon).
*   **`src/`**: Application source code.
    *   **`components/`**: Reusable UI components (Header, Footer, WordCard).
    *   **`pages/`**: Main route views (Home, WordDetail, Login).
    *   **`App.js`**: Main application entry point.

## API Integration

This frontend interacts with the following Backend resources:

*   **Content**:
    *   Blogs: `/api/all/blog/`
    *   Posts: `/api/all/post/`
    *   Pages: `/api/all/page/`
*   **Site Config**:
    *   Header: `/api/all/header/`
    *   Footer: `/api/all/footer/`
*   **Auth**: `/api/user/`