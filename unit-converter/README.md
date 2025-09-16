# Unit Converter

A web-based unit converter application built with Node.js, Express, and EJS. This application allows users to convert between different units of measurement for length, temperature, and weight.

## Features

- **Length Conversion**: Convert between meters, kilometers, centimeters, millimeters, miles, yards, feet, and inches
- **Temperature Conversion**: Convert between Celsius, Fahrenheit, and Kelvin
- **Weight Conversion**: Convert between grams, kilograms, milligrams, pounds, and ounces
- **User-friendly Web Interface**: Clean and responsive forms for easy unit conversion
- **Input Validation**: Handles invalid inputs gracefully

## Tech Stack

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS
- **Architecture**: MVC pattern with separate routes and controllers
- **Package Manager**: npm/pnpm

## Project Structure

```
unit-converter/
├── index.js                    # Main application entry point
├── package.json               # Project dependencies and scripts
├── controllers/               # Business logic controllers
│   ├── length.controller.js   # Length conversion logic
│   ├── temperature.controller.js # Temperature conversion logic
│   └── weight.controller.js   # Weight conversion logic
├── routes/                    # Route definitions
│   ├── length.route.js        # Length conversion routes
│   ├── temperature.route.js   # Temperature conversion routes
│   └── weight.route.js        # Weight conversion routes
└── views/                     # EJS templates
    ├── length.ejs             # Length conversion form
    ├── temperature.ejs        # Temperature conversion form
    └── weight.ejs             # Weight conversion form
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd unit-converter
```

2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the application:
```bash
npm start
```

2. For development with auto-restart:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

4. Choose the type of conversion you want to perform:
   - **Length**: `/length` - Convert between various length units
   - **Temperature**: `/temperature` - Convert between Celsius, Fahrenheit, and Kelvin
   - **Weight**: `/weight` - Convert between various weight units

## API Endpoints

### Length Conversion
- `GET /length` - Display length conversion form
- `POST /length` - Process length conversion

### Temperature Conversion
- `GET /temperature` - Display temperature conversion form
- `POST /temperature` - Process temperature conversion

### Weight Conversion
- `GET /weight` - Display weight conversion form
- `POST /weight` - Process weight conversion

## Supported Units

### Length
- Meter (base unit)
- Kilometer
- Centimeter
- Millimeter
- Mile
- Yard
- Foot
- Inch

### Temperature
- Celsius
- Fahrenheit
- Kelvin

### Weight
- Gram (base unit)
- Kilogram
- Milligram
- Pound
- Ounce

## Development

The application follows the MVC (Model-View-Controller) pattern:

- **Models**: Conversion logic implemented in controller functions
- **Views**: EJS templates for rendering forms and results
- **Controllers**: Business logic for processing conversions
- **Routes**: Express route handlers that delegate to controllers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Created as part of the [roadmap.sh Backend Projects](https://roadmap.sh/projects) series.
