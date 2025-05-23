# Holidaze
![Screenshot 2025-05-24 at 17-36-22 Holidaze Discover Unique Accommodations](https://github.com/user-attachments/assets/6dfa3adf-7b60-4cce-89d5-b6f4432a73f9)

Holidaze is an accommodation booking platform I developed as part of my Project Exam 2. The site features both customer-facing booking functionality and venue management capabilities for registered users, built according to the Noroff API specifications.

## Features

This Airbnb-style platform was created with the following feature requirements

#### Customer Features:

- Browse and search venues
- View venue details and availability calendars
- Register and book accommodations
- Manage personal bookings and profile

#### Venue Manager Features:

- Create and manage venues
- Handle bookings for owned properties
- Update venue details and media

## Built With

- [Next.js](https://nextjs.org/)
- [Tailwind](https://v3.tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Shadcn](https://ui.shadcn.com/)
- [Zod](https://zod.dev/)

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone git@github.com:martekn/holidaze.git
```

2. Install the dependencies:

```
npm install
```

### Environment Variable Setup

To run the application, you only need to set up the `API_KEY` variable.

#### 1. Copy `.env.example`

Copy the contents of the `.env.example` file into a new file named `.env`.

#### 2. Generate API Key

Visit the [Noroff API Documentation](https://docs.noroff.dev/docs/v2/auth/api-key) to learn how to generate an API key.

#### 3. Environment Variables

Fill out the following environment variables in the `.env` file:

- `API_KEY`: Your API key generated from Noroff.

### Running

To run the app, run the following commands:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

If you have any feedback or suggestions to make the project better, please fork the repo and create a pull request.

## Contact

You can contact me on [linkedIn](https://www.linkedin.com/in/martekn/) or send an email to marte.mk@hotmail.com
