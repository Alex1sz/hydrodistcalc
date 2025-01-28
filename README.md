# Hydrodistcalc

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# Deployment instructions

The app is deployed to [Hydrogen Distribution Price Calculator](https://hydrodist.web.app/).

Its runs on free tier firebase hosting.

To deploy:

```bash
ng build --prod
firebase deploy
```

# Hydrogen Distribution Price Calculator 

## Goal
Build a front-end Angular application that calculates the cost of distributing hydrogen between two sites using different trailer models and scenario inputs.

## 1. Scope & Deliverables
- Create an Angular app that:
  - Displays a list of Sites and a list of Trailer Models (both from hard-coded JSON data, simulating an API).
  - Lets the user select:
    - Supplier Site (origin)
    - Offtaker Site (destination)
  - Lets the user add multiple distribution scenarios, each with:
    - Trailer model (picklist)
    - Number of vehicles
    - Time to fill a trailer (days)
    - Time to offload a trailer (days)
    - Hauler price ($/mile)
    - Trailer price ($/month)
  - Calculates for each scenario:
    - Trailer price per kg of H₂
    - Hauler price per kg of H₂
    - Total price per kg of H₂
  - Deploy the finished app to a free-tier service (e.g., Netlify, Vercel, GitHub Pages, etc.).
  - Submit:
    - A link to the Git repository with source code.
    - A link to the deployed application.

You have one week to complete this challenge.

## 2. Data Requirements

### Site Resource
Create 3 Sites with the following fields (names are flexible, but must store this data):
- Site name
- Coordinates (latitude, longitude)
- Production rate (kg/day) – for suppliers
- Production storage pressure (bar[g]) – for suppliers
- Consumption rate (kg/week) – for offtakers

### Trailer Model Resource
Create 3 Trailer Models, each with:
- Model name
- Design capacity (kg)
- Design pressure (bar[g])
- Design volume (m³)

## 3. Application Inputs
- **Global (Applies to All Scenarios)**
  - Supplier Site (pick from Site Resource)
  - Offtaker Site (pick from Site Resource)
- **Scenario-Specific (One row/form per scenario)**
  - Trailer model
  - Number of vehicles
  - Time required to fill (days)
  - Time required to offload (days)
  - Hauler price ($/mile)
  - Trailer price ($/month)

## 4. Calculations & Output
Use logic adapted from the provided Excel reference to derive:
- Trailer price per kg of H₂
- Hauler price per kg of H₂
- Total price per kg of H₂

Intermediate values (e.g., total trips per month, distance, capacity usage, etc.) should be derived in the front end.

