# Campus Rally – Responsive Event Management Website

**Campus Rally** is a responsive event management website developed as part of the **K Explore – Web Designing (SA38003)** coursework at **KIIT – Kalinga Institute of Industrial Technology**, for the academic year **2026**.

The project focuses on applying core web development concepts using HTML5, CSS3, and vanilla JavaScript to create an interactive, responsive, and user-friendly event discovery and registration platform.

## Project Overview

Campus Rally provides a centralized platform where students can explore upcoming campus events, view event details, and register for their preferred activities.

The website features a clean interface with event discovery, category-based filtering, interactive registration forms, and client-side data persistence.

## Features

### Core Features
- **Responsive Interface:** Layout adapts to desktop, tablet, and mobile screens.
- **Hero Section:** Introduces the platform and displays a live countdown to the next upcoming event.
- **Event Listings:** Displays events with their names, dates, venues, categories, and descriptions.
- **Search Functionality:** Search events by name, venue, category, or description.
- **Category Filters:** Dynamically generated filters to browse events by category.
- **Event Details:** Interactive modal displaying detailed event information.
- **Event Registration:** Registration form collects participant name, email, phone number, and selected event.
- **Form Validation:** JavaScript-based validation provides feedback for invalid inputs.
- **Registration Confirmation:** Displays a confirmation message after successful registration.

### Additional Features (Bonus)
- **Dark/Light Theme:** Supports manual theme switching and system-preferred color schemes.
- **Live Countdown:** Updates the countdown to the next upcoming event every second.
- **Animations & Transitions:** Smooth interactions and visual transitions throughout the interface.
- **Local Storage:** Saves registration information and theme preferences in the browser.
- **My Registrations:** Allows users to view and cancel their registrations.
- **Duplicate Prevention:** Prevents the same email address from registering for the same event multiple times.

## Technologies Used

| Technology | Usage |
|---|---|
| HTML5 | Page structure and semantic elements |
| CSS3 | Styling, responsive layouts, animations, and theme variables |
| JavaScript (Vanilla) | DOM manipulation, event handling, filtering, countdown, and validation |
| Local Storage API | Client-side persistence of registrations and theme preferences |

The project uses no frontend frameworks or build tools.

## Project Structure

```text
Campus-Rally/
│
├── index.html      # Main webpage structure
├── style.css       # Styling and responsive design
├── script.js       # Event data and application logic
└── README.md       # Project documentation
```

## Implementation Details

### 1. Event Management

Event information is maintained in an `EVENTS` array in `script.js`. Each event contains:
- Unique event ID
- Event name and category
- Date and time
- Venue
- Gradient color configuration for event artwork
- Short and detailed descriptions

The event cards are dynamically generated from this data.

### 2. Search and Category Filtering

JavaScript handles search input and category selection. The event grid is dynamically re-rendered based on the selected category and search query.

Search supports event names, venues, categories, and descriptions.

### 3. Event Registration and Validation

Selecting an event opens a modal containing its details and registration form.

JavaScript validates the following fields:

| Field | Validation |
|---|---|
| Full Name | At least two characters; alphabetic characters with common name punctuation |
| Email | Must follow a valid email format |
| Phone Number | Must contain a valid 10-digit Indian mobile number |
| Event | Must correspond to a selected event |

The application also checks existing registrations using the combination of event ID and email address.

After successful validation, the registration is saved and a confirmation message is displayed.

### 4. Local Storage

The browser's Local Storage API is used to persist data between sessions.

| Storage Key | Purpose |
|---|---|
| `kx-regs` | Stores participant registration records |
| `kx-theme` | Stores the selected theme preference |

Users can view or cancel individual registrations through the **My Registrations** section. They can also clear all saved registrations.

**Note:** Registration data is stored locally in the user's browser. The application does not use a backend server or centralized database.

### 5. Theme Management

The website supports dark and light themes through CSS custom properties. Users can manually switch themes, and the initial appearance can follow the operating system's preferred color scheme.

## Running Locally

The project does not require any installation, dependencies, or build process.

1. Clone the repository:

   ```bash
   git clone https://github.com/aayush-aryan-0/campus-rally
   ```

2. Navigate to the project directory:

   ```bash
   cd Campus-Rally
   ```

3. Open `index.html` in a modern web browser.

Alternatively, use the **Live Server** extension in Visual Studio Code.

## Live Demo

**[Visit Campus Rally](https://campus-rally.vercel.app/)**

## Academic Information

| Detail | Information |
|---|---|
| Project | Campus Rally |
| Assignment | K Explore – Web Designing |
| Course | Web Designing |
| Course Code | SA38003 |
| Institution | KIIT – Kalinga Institute of Industrial Technology |
| Academic Year | 2026 |
| Project Type | Academic Web Development Assignment |
| Technologies | HTML5, CSS3, JavaScript |

## Learning Outcomes

This project demonstrates the practical application of:

- Semantic HTML and structured webpage development.
- CSS layouts, custom properties, and responsive design.
- JavaScript DOM manipulation and event handling.
- Dynamic rendering and client-side filtering.
- Form validation and input handling.
- Browser Local Storage for client-side data persistence.
- UI/UX principles, animations, and theme management.
- Git/GitHub-based project management and deployment.

## Acknowledgement

Developed as part of the **K Explore – Web Designing (SA38003)** coursework at KIIT, 2026.

---

*Campus Rally – Find an event. Take a seat.*
