# Spaces: IITK's Lecture Hall, Labs and Auditorium Booking System
# Course Project - CS315, Prof. Arnab Bhattacharya

> **_NOTE:_** If you are trying and testing out the live version at https://spaces-iitk.vercel.app/ you will not be able to do necessary stuff like login, signup, making bookings, etc because the deployed app is not connected to a cloud MySQL instance. We tried doing that but couldn't properly configure CORS and thus fetch request is being blocked because of the improper configuration. We highly appreciate help from community to do the required config and create a pull request.

## Getting Started

Install Nodejs, npm and MySQL for your platform (Windows, Linux, Mac)

Clone this repo
```bash
git clone git@github.com:Divyanshu23/spaces.git
```

Install the dependencies:
```bash
npm i
```

Create .env.local file in root directory of project and add the following environment variable into the file
```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:3001
```

Create .env file in backend directory inside root directory and add the following environment variables into the file
```bash
PORT=${Port for running backend app}
MYSQL_HOST=localhost
MYSQL_USER=${Your MySQL user}
MYSQL_PASSWORD=${Your MySQL password}
MYSQL_DB=${Your MySQL database}
JWT_SECRET=${Your secret key to sign the data and generate JSON web tokens. Choose any strong pattern of string for this.}
MAIL_ID=${Email Id for sending out OTP and cancellation notifications}
MAIL_PASSWORD=${Email Id's password}
```

Run the development server:
```bash
npm run dev
```

Run the backend server:
```bash
npm run backend-dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app live.


## Deployed on Vercel

The live version of the projects is deployed on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) at this [link](https://spaces-iitk.vercel.app/).


## Database Schema
![Database Schema](public\schema.png)