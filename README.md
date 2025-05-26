# Diagnal Movies

A modern, responsive movie listing application built with React and TypeScript. This application provides a seamless browsing experience for movies with features like infinite scrolling, search functionality, and responsive design.

## Features

- 🎬 Responsive movie grid layout (3 columns in portrait, 5 columns in landscape)
- 🔍 Real-time client-side search functionality
- ♾️ Infinite scrolling with lazy loading
- 🖼️ Optimized image loading with placeholders
- ⌨️ Keyboard navigation support
  - Arrow keys (↑, ↓, ←, →) for grid navigation
  - Adapts to orientation (3/5 columns)
  - Focus management with visual feedback
- 🎯 Focus and hover effects on movie cards
- 📱 Responsive design for all screen sizes

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **API Client:** Axios
- **Build Tool:** Vite
- **Package Manager:** npm

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd diagnal
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── assets/         # Static assets like images
├── components/     # React components
│   ├── layout/    # Layout components
│   ├── shared/    # Shared components
│   ├── template/  # Template components
│   └── ui/        # UI components
├── constants/      # Constants and configuration
├── hooks/         # Custom React hooks
├── services/      # API services
├── store/         # State management
├── utils/         # Utility functions
└── @types/        # TypeScript type definitions
```

## API Integration

The application uses the following API endpoints:

- Base URL: `https://test.create.diagnal.com/`
- Data API: `/data/page{number}.json`
- Images API: `/images/{image-name}`

## Key Features Implementation

### Responsive Grid

- Implements a responsive grid layout that adapts to screen orientation
- Portrait mode: 3 columns
- Landscape mode: 5 columns

### Search Functionality

- Real-time client-side search
- Debounced search input
- Instant results without page reload

### Infinite Scroll

- Lazy loading of content
- Smooth loading transitions
- Optimized performance with pagination

### Image Loading

- Lazy loading of images
- Placeholder images for loading states
- Error handling for failed image loads

### Keyboard Navigation

- Full keyboard support for grid navigation
- Arrow keys (↑, ↓, ←, →) for moving between items
- Adapts to current orientation (3/5 columns)
- Prevents default arrow key behavior
- Visual feedback on focused items
- Maintains focus within grid bounds
- Smooth focus transitions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style

The project uses ESLint for code linting and follows TypeScript best practices. Make sure to run the linter before committing changes:

```bash
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Debounced search operations
- Optimized keyboard navigation
