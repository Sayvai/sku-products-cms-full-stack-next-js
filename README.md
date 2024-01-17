# SKU CMS - Product Management

The SKU CMS is a product management system for managing the SKU products, such as persisting the SKU IDs, descriptions, quantities, and stores held in.

The data persistence is managed within a local SQLite database, which is created and populated on the first creation of an SKU product, either through manual form entry or a CSV upload.

Here is a short frontend UI demonstration of the web application, below:

https://github.com/Sayvai/Sayvai/assets/7581546/5be23a3e-4550-4846-ba00-8f05c86afd28

## Tech Stack

Below is a list of the main technologies used to build this application:

- [Next.js](https://nextjs.org/) - A full stack React meta-framework for building server-side rendered and static web applications
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - A super-set of JavaScript that provides static typing
- [Zod](https://zod.dev/) - A TypeScript-first schema validation library
- [SQLite](https://www.sqlite.org/index.html) - A lightweight, serverless, relational database
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - A modern and accessible React component library, typically used on the CLI to import modular and composable components
- [react-hook-form](https://react-hook-form.com/) - A performant, flexible, and extensible forms library for React

## Getting Started

### Prerequisites:

- You must have Node.js installed on your machine. If you do not have Node.js installed, you can download it from [here](https://nodejs.org/en/download/). The currently supported version for this project is `v20.10.0`

### Setup and Run:

1. Clone the repository
2. CD into to cloned repository
3. Install the dependencies; `npm install`
4. Run the development server; `npm run dev`
5. Open [http://localhost:3000/sku-cms](http://localhost:3000/sku-cms) with your browser to see the result.

## Future Improvements and Considerations

- Add unit, e2e, and integration tests
- Add frontend data table pagination. Currently, the API is ready to handle pagination, but the frontend is not
- Add an API (e.g. `DELETE /delete/all`) to simply clear the data to allow for easier and repeatable testing
- Add a CI/CD pipeline, to run the tests and deploy the application

## Deployment Strategies

Since this is a Next.js application, it can be deployed to a serverless environment, such as Vercel. This would be the efficient and most optimal platform to deploy the application. Vercel also uses AWS Lambda under the hood, so it would be a good choice for a production deployment.

Alternatively, deploy the application to a cloud provider, such as AWS, Azure, or GCP, which would require further configuration and setup, such as setting up a CI/CD pipeline, and configuring the cloud provider to host the application. For example, creating an EC2 instance on AWS, setting up the environment, scaling to demand, configuring IAM and security groups, etc.
