# ORM E-Commerce Back End

## Starter Code

Linked Here: https://github.com/coding-boot-camp/fantastic-umbrella
The 'Root' folder will also contain the starter code that was provided for this application.

## Description

E-commerce, specifically internet retail, holds a commanding position across various sectors such as DIY, retail, and electronics. In the United States alone, it amassed an approximate $637 billion in revenue in 2022. Platforms like Shopify and WooCommerce play a pivotal role by offering a comprehensive range of services to businesses, irrespective of their size. As these platforms are widespread, gaining a profound understanding of their fundamental architecture has become an integral aspect of full-stack web development.

This e-commerce application is crafted using starter code designed for building a back-end application for an e-commerce site. It employs the command line interface (CLI) and object-relational mapping for diverse methods of data manipulation, storage, and retrieval through HTTP methods utilizing a RESTful API.

The application utilizes the Express.js API, incorporating Sequelize to engage with a MySQL database, effectively constructing the backend infrastructure for a shop's website.

## User Story

    AS A manager at an internet retail company
    I WANT a back end for my e-commerce website that uses the latest technologies
    SO THAT my company can compete with other e-commerce companies

## The Challenge

    GIVEN a functional Express.js API
    WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
    THEN I am able to connect to a database using Sequelize
    WHEN I enter schema and seed commands
    THEN a development database is created and is seeded with test data
    WHEN I enter the command to invoke the application
    THEN my server is started and the Sequelize models are synced to the MySQL database
    WHEN I open API GET routes in Insomnia Core for categories, products, or tags
    THEN the data for each of these routes is displayed in a formatted JSON
    WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
    THEN I am able to successfully create, update, and delete data in my database

## Installation

Before sure to install [MySQL2](https://www.npmjs.com/package/mysql2) , [Sequelize](https://www.npmjs.com/package/sequelize) , and [dotenv package](https://www.npmjs.com/package/dotenv)

    npm i mysql2
    npm i sequelize
    npm i dotenv

## Walkthrough Video

Walkthrough video on application's capabilities [HERE](https://drive.google.com/file/d/1T3or4TCf0hHevFEUWY-sqDaBNtmirqBL/view)

## Usage

1. After installing the appropriate softwares, open the integrated terminal in the 'Develop' folder

2. Log into MySQL
   mysql -u root -p

3. Create the schema from the MySQL shell. After successfully creating it, exit MySQL
   SOURCE db/schema.sql;
   exit

4. Seed the application from the command line
   npm run seed

5. Start the application's server. You will receive a "Now listening" message when the application has successfully ran.
   npm start

6. Open Insomnia, and run the GET, POST, UPDATE, and DELETE requests as needed

## Credits

- Please reference the [starter code](#starter-code-httpsgithubcomcoding-boot-campfantastic-umbrella) here
- MSU Bootcamp Class Material
