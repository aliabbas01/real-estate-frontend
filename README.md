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

Screen shorts:

<img width="1357" height="680" alt="Favorite_Buyer" src="https://github.com/user-attachments/assets/54b31175-6f08-48c2-87b9-ca90f7f39a0d" />
<img width="1360" height="669" alt="DetailPage" src="https://github.com/user-attachments/assets/5ebea0dc-47be-4fc4-8ff9-7a567ae2a3d6" />
<img width="1362" height="540" alt="Register" src="https://github.com/user-attachments/assets/8118dee2-f0c2-4fea-85aa-e6f71508a759" />
<img width="1356" height="585" alt="LoginPage" src="https://github.com/user-attachments/assets/a5ef92d6-c8de-4ab6-875f-8e3bd47b0116" />
<img width="1343" height="682" alt="LandingPage" src="https://github.com/user-attachments/assets/92a87aff-016a-4084-b323-563b72b6d6ff" />
<img width="1365" height="475" alt="Filter" src="https://github.com/user-attachments/assets/6154dfd5-4234-4b6f-b947-cfcd711001af" />

