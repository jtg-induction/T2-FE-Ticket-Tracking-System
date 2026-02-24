## About Project

A high-performance project and ticket management interface built with React, Vite, and Material UI. This application provides a streamlined UI for managing tasks while maintaining real-time synchronization with the Jira API.

1. **🛠 Tech Stack**

   Framework: React (Vite-powered)

   UI Library: Material UI (MUI)

   State Management: Redux Toolkit

   Styling: Emotion (MUI Default)

2. **Key Features**

   Unified Dashboard: View all active projects.

   Ticket Lifecycle Management: Create, edit, and transition tickets with a customized MUI interface.

   Jira Sync: Synchronization with Jira instances to ensure data consistency.

   Advanced Filtering: Filter tickets by priority, assignee, or etc.

## Getting Started

### Prerequisites

- **yarn**: Version 4.5.0. If Yarn is not installed, you can follow the instruction below in Installing section

### Installing

To set up the project on your local environment, follow these steps:

1. **Clone the Repository**

   First, you need to clone the repository.

2. **nvm (Node Version Manager)**: If the required Node version 24+ is already installed and active, you can skip this step else you can use nvm (Node Version Manager). Here's how to use it:

   - **Switch Node Version**: If the required Node version is already installed, run:

   ```bash
   nvm use
   ```

   - **Install Node Version**: If the required Node version isn’t installed, you can install it by running:

   ```bash
   nvm install
   ```

   > **_Tip:_** If you don't have nvm installed, you can install it by following the instructions on [nvm-sh/nvm](https://github.com/nvm-sh/nvm).

   Alternatively, you can update Node.js directly by downloading the latest version from the official website: nodejs.org.

   - **Yarn Installation**: If Yarn is not installed, you can install it globally with the following command:

   ```bash
   npm install -g yarn
   ```

   - **Switch to correct version**: Switch to yarn latest version

   ```bash
   yarn set version berry
   ```

3. **Install the necessary dependencies using yarn**

   ```bash
   yarn
   ```

4. **Run the Development Server**

   ```bash
   yarn dev
   ```

   The app will typically be available at http://localhost:5173, but check the terminal output for the exact URL.

5. **Format the Code**

   ```bash
   yarn prettier
   ```

6. **Lint the Code**

   ```bash
   yarn lint
   ```

7. **To Fix Lint errors**

   ```bash
   yarn lint:fix
   ```

8. **Build the Project**

   ```bash
   yarn build
   ```

   This command will generate the optimized production build in the dist directory.

9. **Development Build**

   ```bash
   yarn build:dev
   ```

   This command will generate the build for development environment in the dist directory

10. **Preview the build**

    ```bash
    yarn preview
    ```

11. **Setup Husky (If pre-commit hooks are not working)**

    ```bash
    yarn postinstall
    ```
