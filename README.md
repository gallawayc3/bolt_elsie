# ELSiE Scenario Generator

An application that allows users to generate detailed educational scenarios using AI. The app transforms user-provided descriptions into structured scenarios with detailed characters, objectives, and guidelines.

## Features

- User-friendly form for entering scenario specifications
- AI-powered scenario generation
- Well-formatted output display
- Copy-to-clipboard functionality
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory based on `.env.example`:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Enter your scenario description in the input form
2. Click "Generate Scenario" to create your scenario
3. View the structured output with all scenario details
4. Use the copy button to copy the formatted text to your clipboard

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- Zustand for state management
- OpenAI API

## License

This project is licensed under the MIT License.