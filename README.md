# Backend Licores - Inventory Management System

A comprehensive React-based inventory management system for liquor store operations, featuring Firebase authentication, real-time data management, and modern UI components.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Security Features](#security-features)
- [Contributing](#contributing)
- [License](#license)

## Overview

Backend Licores is a modern web application designed to streamline inventory management for liquor retail operations. The system provides comprehensive CRUD operations for products, categories, and client management with secure authentication and real-time data synchronization.

## Features

### Core Functionality
- **Product Management**: Complete CRUD operations for inventory items
- **Category Management**: Organize products by categories with dynamic creation
- **Client Management**: Customer database with detailed information tracking
- **User Authentication**: Secure Firebase-based authentication system
- **Protected Routes**: Role-based access control for sensitive operations
- **Real-time Updates**: Live data synchronization across all components

### User Interface
- **Responsive Design**: Bootstrap-based responsive layout
- **Material-UI Components**: Modern UI with Material Design principles
- **Interactive Alerts**: SweetAlert2 integration for user notifications
- **Error Handling**: Comprehensive error boundary implementation
- **Progressive Web App**: PWA capabilities for enhanced user experience

## Technology Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and functional components
- **React Router DOM 6.4.0** - Client-side routing and navigation
- **Material-UI 5.10.6** - Component library and design system
- **Bootstrap 5.2.1** - CSS framework for responsive design
- **Styled Components 5.3.5** - CSS-in-JS styling solution

### Backend Services
- **Firebase 9.10.0** - Backend-as-a-Service platform
  - Firestore - NoSQL document database
  - Authentication - User management and security
  - Hosting - Web application deployment

### Development Tools
- **Create React App** - Build toolchain and development server
- **ESLint** - Code linting and quality assurance
- **Jest** - Testing framework
- **Web Vitals** - Performance monitoring

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 16.0.0 or higher)
- **npm** (version 8.0.0 or higher)
- **Firebase CLI** (for deployment)
- **Git** (for version control)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend_licores
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Generate web app configuration

4. **Set up environment variables** (see [Environment Variables](#environment-variables))

5. **Start the development server**
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

**Security Note**: Never commit environment variables to version control. Add `.env` to your `.gitignore` file.

## Usage

### Development Commands

```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Deploy to Firebase (requires Firebase CLI)
firebase deploy
```

### Application Access

- **Development**: http://localhost:3000
- **Authentication**: Register new users or login with existing credentials
- **Protected Routes**: All main features require authentication

## Project Structure

```
backend_licores/
├── public/                 # Static assets and HTML template
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Alert.js       # Notification system
│   │   ├── Categorias.js  # Category management
│   │   ├── Clientes.js    # Client management
│   │   ├── Create.js      # Product creation
│   │   ├── CreateCategory.js # Category creation
│   │   ├── Edit.js        # Product editing
│   │   ├── ErrorBoundary.js # Error handling
│   │   ├── Footer.js      # Page footer
│   │   ├── Header.js      # Navigation header
│   │   ├── Productos.js   # Product management
│   │   ├── ProtectedRoute.js # Route protection
│   │   ├── Register.js    # User registration
│   │   └── Sidebar.js     # Navigation sidebar
│   ├── context/           # React Context providers
│   │   └── authContext.js # Authentication context
│   ├── firebaseConfig/    # Firebase configuration
│   │   └── firebase.js    # Firebase initialization
│   ├── pages/             # Page components
│   │   ├── Home.js        # Dashboard/landing page
│   │   └── Login.js       # Authentication page
│   ├── styles/            # CSS stylesheets
│   ├── App.js             # Main application component
│   └── index.js           # Application entry point
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## API Integration

### Firestore Collections

The application uses the following Firestore collections:

- **products** - Product inventory data
- **categories** - Product categorization
- **users** - Client/customer information
- **auth** - User authentication data (managed by Firebase Auth)

### Data Models

```javascript
// Product Model
{
  id: string,
  name: string,
  category: string,
  price: number,
  stock: number,
  description: string,
  isActive: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}

// Category Model
{
  id: string,
  name: string,
  description: string,
  isActive: boolean,
  createdAt: timestamp
}

// Client Model
{
  id: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  isActive: boolean,
  createdAt: timestamp
}
```

## Security Features

- **Firebase Authentication**: Secure user registration and login
- **Protected Routes**: Authenticated access to sensitive operations
- **Environment Variables**: Secure configuration management
- **Error Boundaries**: Graceful error handling and recovery
- **Input Validation**: Client-side and server-side data validation
- **HTTPS**: Secure data transmission (production)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow React best practices and hooks patterns
- Maintain consistent code style with ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation for significant changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Maintained by**: Ivan Duarte  
**Last Updated**: August 2025  
**Version**: 0.1.0
