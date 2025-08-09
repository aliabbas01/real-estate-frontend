# Real Estate Portal

A full-stack application for property search, favorites management, and user authentication.

## Features

- **User Authentication**
  - JWT-based registration/login
  - Protected routes
  - Role-based access (Buyer/Agent/Admin)

- **Property Management**
  - Browse properties with filters
  - View property details
  - Save favorites
  - Recently viewed properties

- **Technical Stack**
  - Frontend: React, TypeScript, Material-UI
  - Backend: .NET Core, Entity Framework Core
  - Database: SQL Server

## Setup Instructions

### Backend

1. **Requirements**
   - .NET 6 SDK
   - SQL Server

2. **Configuration**
   - Update `appsettings.json` with your database connection string
   - Set JWT secret key in `AppSettings:Token`

3. **Database Setup**
   ```bash
   dotnet ef database update


4. **Project Structure**
real-estate-portal/
├── client/               # Frontend React app
├── server/               # Backend .NET app
│   ├── Controllers/
│   ├── Data/
│   ├── Migrations/
│   ├── Models/
│   └── Services/
└── README.md

Key points included:
- Clear feature overview
- Setup instructions for both frontend and backend
- API endpoint documentation
- Deployment guidance
- Troubleshooting common issues
- Project structure visualization

You can expand this with additional sections like:
- Screenshots
- Contribution guidelines
- Testing instructions
- Roadmap/planned features
- Acknowledgements