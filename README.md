# VisualizeMe

**VisualizeMe** is a full-stack SaaS platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js) that allows users to create, manage, and share their portfolios. With two modes for creating portfolios—**full visualize mode** (manual data entry) and **quick visualize mode** (AI-powered resume data extraction)—VisualizeMe offers an easy and efficient way to showcase your professional information.

This project is a personal project and open if anyone wants to contribute, and I will be actively working on new features and improvements. If you're interested in contributing, I will love to have your help!

Try it out now! https://visualize-me.vercel.app/

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

## Overview

VisualizeMe allows users to generate professional portfolios in two ways:

- **Full Visualize Mode**: Manually input details via a form and get a portfolio link.
- **Quick Visualize Mode**: Use AI (powered by the Gemini API) to automatically extract information from resumes.

Once created, users can manage their portfolios through a dashboard where they can edit, delete, and track viewer engagement(this last feature is under work). I will be also working on adding analytics to help users track the performance of their portfolios whenever I have time.

## Features

- **Create Portfolio**: Choose between full visualize mode (manual input) or quick visualize mode (AI-powered extraction from resumes).
- **Portfolio Management**: View, edit, or delete your portfolios through your dashboard.
- **Portfolio Sharing**: Generate a unique URL for each portfolio to share with others.
- **User Authentication**: Secure sign-up and login via JWT.
- **Analytics** (coming soon): Track your portfolio’s performance and view engagement metrics.

## Tech Stack

- **Frontend**: HTML, CSS, JS, React.js, Fontawesome
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: Gemini API (for resume data extraction)
- **Hosting**: Frontend on Vercel and Backend on Render

## Installation

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v20)
- [Git](https://git-scm.com/)

### Steps

1. Clone this repository:
   Start by cloning this repository to your local machine:
   ```
   git clone https://github.com/your-username/visualizeme.git
   cd visualizeme
   
2. Install Dependencies:
   Install the project dependencies for both the backend and frontend:
   ```bash
   npm install
   
3. Set Up Environment Variables
   Create a .env file in the root directory of the project to configure environment variables, such as your MongoDB URI and API keys.
   Example .env file at backend:
    ```
    PORT=4000
    MONGODB_URL=
    CORS_URL=
    CLOUDINARY_CLOUDNAME=
    CLOUDINARY_APIKEY=
    CLOUDINARY_APISECRET=
    GEMINI_API_KEY=
    ACCESS_TOKEN_SECRET=
    EMAIL_ADDRESS=
    EMAIL_PASSWORD=
    ```

   Example .env file at frontend:
    ```
    VITE_SERVER_URI=
    ```
    
    Put the placeholders with your actual values.

## Usage
  To simply access the services use the following deployed project at https://visualize-me.vercel.app/

  To run code on your local machine-
  
  Run the following command to start both the backend and frontend services:
    ```
    npm run dev
    ```
    
  Access the Application
  Open your web browser and navigate to set port.
  
  Eg:
    ```
    http://localhost:3000
    ```
    
  You should see VisualizeMe running locally on your machine.

  __Additional Notes__
  If you are using MongoDB Atlas for your database, you can generate a connection string from the Atlas dashboard.
  Make sure your API keys (e.g., Gemini API) are correctly configured in your .env file.
  Usage
  Once you've set up the project, you can start using the platform by following these steps:
  Sign up or log in to your account.
  Choose between full visualize mode (manual entry) or quick visualize mode (AI-powered extraction from resumes).
  View and manage your portfolios through the dashboard.
  Share your portfolio by copying the generated unique URL.
  Note:
  The analytics feature is under development and will be available soon.
## FAQ
  **What is VisualizeMe?**
  VisualizeMe is a platform for creating professional portfolios either manually (full visualize mode) or by using AI to extract data from resumes (quick visualize mode).

  **How does the full visualize mode work?**
  In full visualize mode, you complete a form with your personal details. A unique link to your generated portfolio is then created for sharing.

  **What is the quick visualize mode?**
  Quick visualize mode uses the Gemini API to extract details from resumes and automatically generate a portfolio, saving you time on manual data entry.

  **Can I edit my portfolio after it's created?**
  Yes! After generating your portfolio, you can edit it anytime through your dashboard.

  **What features does the dashboard provide?**
  The dashboard allows you to manage your portfolios: find, edit, delete, and soon—view portfolio performance analytics.

  **How can I contribute to VisualizeMe?**
  If you'd like to contribute, please reach out to me at aceksaayush@gmail.com, or feel free to open issues and submit pull requests(this will be my first time trying this :) ).

  **Is there any ongoing development for new features?**
  Yes, I will be actively working on new features in free times, including the addition of portfolio performance analytics.

## Contributing
  I welcome contributions to this project! If you'd like to help:
  - Fork the repository.
  - Create a new branch for your feature/bugfix.
  - Make your changes.
  - Push to your forked repository.
  - Open a pull request with a description of your changes.

## License
   MIT License
  
