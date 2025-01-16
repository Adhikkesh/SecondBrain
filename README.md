# Second Brain Project

A personal knowledge management system that helps you save and organize important content like documents, tweets, YouTube videos, and audio files. Think of it as your digital second brain where you can store and easily retrieve your important information.

## Developer

**ADHIKKESH S K**
- GitHub: [github.com/Adhikkesh](https://github.com/Adhikkesh)
- Contact: adhikkesh@gmail.com

## Features

- **Content Management**: Save and organize various types of content:
  - Documents
  - YouTube videos
  - Tweets
  - Audio files
- **Tagging System**: Organize content with custom tags for easy retrieval
- **Secure Authentication**: User authentication with JWT and bcrypt password hashing
- **Content Sharing**: Share your curated content collection with others
- **Clean UI**: Organized interface with dedicated components for different content types

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Custom UI components
- Icon component library

### Backend
- Node.js
- Express.js
- TypeScript
- Zod for input validation
- JWT for authentication

### Database
- MongoDB Atlas Cluster
- Mongoose ODM

## Project Structure

### Backend
```
.
├── db.ts           # Database connection and schemas
├── index.ts        # Server entry point
├── middleware.ts   # Authentication middleware
└── routes
    └── index.ts    # API routes
```

### Frontend
```
.
├── components
│   ├── Body.tsx
│   ├── ContentContainer.tsx
│   ├── CreateContent.tsx
│   ├── LinkContent.tsx
│   ├── SideBar.tsx
│   ├── icons/      # Custom icon components
│   └── ui/         # Reusable UI components
├── pages
│   ├── App.tsx
│   ├── HomePage.tsx
│   ├── Signin.tsx
│   └── SignUp.tsx
└── main.tsx
```

## Database Schema

### User
- username (String, unique)
- password (String, hashed)

### Content
- link (String)
- type (Enum: document, video, tweet, audio)
- title (String)
- tags (Array of Tag references)
- userId (User reference)
- body (String)
- date (Date)

### Tags
- title (String, unique)

### Link
- hash (String)
- userId (User reference)

## API Routes

### Authentication
- POST `/signup`: Create new user account
- POST `/signin`: User login

### Content Management
- POST `/content`: Create new content
- GET `/content`: Retrieve user's content
- DELETE `/content`: Remove content

### Content Sharing
- POST `/brain/share`: Generate share link
- GET `/brain/share/:hash`: Access shared content

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install
   ```
3. Set up environment variables:
   ```
   DB_URL=your_mongodb_url
   JWT_SECRET=your_jwt_secret
   BASE_URL=your_base_url
   ```
4. Start the servers:
   ```bash
   # Backend
   npm run dev

   # Frontend
   npm run dev
   ```

## Future Improvements

1. Enhanced Tag-based Querying
   - Improved search functionality
   - Filter combinations
   - Tag suggestions

2. UI/UX Enhancements
   - Responsive design improvements
   - Dark mode support
   - Better content organization views

3. Content Features
   - Rich text editor for documents
   - Preview thumbnails
   - Bulk operations

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License

Copyright (c) 2025 ADHIKKESH S K

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
