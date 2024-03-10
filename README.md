# Employee Book

## Description

This is a employee tracker that provides companies a way to view and manage departments, roles, and employees so that they can organize and plan schedules better.

## Usage

1. Use the MySQL NPM package to connect to your MySQL database and perform queries.

    npm install

2. Use InquirerJs NPM package to interact with the user via the command-line.

    npm install mysql inquirer

3. Use console.table to print MySQL rows to the console. There is a built-in version of console.table, but the NPM package formats the data a little better for our purposes.

    npm install console.table --save

## Installation
- Repo: [GitHub Repo](https://github.com/ninabuscemi/employee-book)
- Video walkthrough: [GoogleDrive link](./assets/SQL_demo_video.mp4)

## Usage
To run: 
 1. Run 'npm i inquirer@8.2.4' from the command line
 2. Open mysql and type in your username/password.
 3. Type 'SOURCE db/schema.sql', then 'SOURCE db/seeds.sql' to create and seed the database.
 4. Run 'node index' to begin application interface.
 5. Arrow up and down to see all menu options and make selections. Press the Enter key to select an option.
 6. Select EXIT to quit the program.


## Contributing

Contributions to the Employee Book are welcome! If you find any issues or have suggestions for improvements, please submit a pull request. Make sure to follow the repository's code style and guidelines.

## License
MIT License