# PC Price Estimator

PC Price Estimator is a web application that helps users estimate the value of their computer components or entire PC builds. By leveraging real-time data from UserBenchmark and eBay's Browse API, it provides accurate and up-to-date pricing information for a wide range of PC parts.

## Features

- Interactive PC builder interface
- Real-time component selection with up-to-date options
- Price estimation based on current market values
- Responsive design for desktop and mobile use

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- jQuery
- Select2 for enhanced dropdowns

### Backend
- Node.js
- Express.js
- MySQL for component database

### APIs
- eBay Browse API for pricing data
- UserBenchmark for component information

### Infrastructure
- Cloudflare Reverse Proxy for enhanced security and performance

## How It Works

1. Users select PC components from dropdown menus populated with the latest parts data from UserBenchmark.
2. Upon completing the selection, the frontend sends the data to the Express.js backend.
3. The backend queries eBay's Browse API to fetch current pricing data for the selected components.
4. The application calculates and returns an estimated price based on the average of the mid-range results.

## Future Enhancements

- UI/UX improvements for a more intuitive user experience
- Automated updating of the MySQL database with the latest PC components
- Refactoring of some code that was either written in haste or poorly

## Acknowledgments

- UserBenchmark for providing up-to-date component data
- eBay for their Browse API, enabling real-time pricing information

## Project Purpose

This project was built with the primary purpose of learning and practicing full-stack development using the technologies mentioned in the Tech Stack section. As such, please note:

- Some parts of the codebase may be inconsistent as they reflect the learning journey and the adoption of better practices over time.
- The project serves as a practical application of various web development concepts and may not adhere to all best practices found in production-level applications, I have tried my absolute     best to adhere to the best practices, but there may still be some issues in code efficiency or security that my lack of experience has yet to identify.


