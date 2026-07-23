
import express from 'express';

// line added in week1
import { fileURLToPath } from 'url';
import path from 'path';
//Added on week 2
import { testConnection } from './src/models/db.js';
//Week03 #3 STEP 5
import router from './src/routes.js';
// //Week03 #3 STEP 3 | I comment these 3 line because I have moved these functions to your controller files
// import { getAllOrganizations } from './src/models/organizations.js';
// import { getAllCategories } from './src/models/categories.js';
// import { getAllProjects } from './src/models/projects.js';


// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

// codes added in week 1??
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//app.get('/', (req, res) => {
  //res.send('Hello from Express!');
//});

// codes added in week 1
/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

//Codes added in week 1
// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

// //Week 03 #1 STEP 1
// //Middleware to log all incoming requests
app.use((req, res, next) => {
  if (NODE_ENV === 'development') {
    console.log(`${req.method} ${req.url}`);
  }
  next (); // Pass control to the next middleware or route
});
//#1 STEP 2 - Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
  res.locals.NODE_ENV = NODE_ENV;
  next();
});

// Use the imported router to handle routes
app.use(router);


// Week03 #3 STEP5 | REMOVE these from server.js because Next, 
// you can replace all of the route definitions from server.js with a single line: 
// app.use(router);. You will no longer need all the individual route definitions 
// since they are now in src/routes.js.

// //// Comment done on week03 #3 STEP 5
// // Codes added in week 1
// /**
//   * Routes
//   */

// app.get('/', async (req, res) => {
//   const title = 'Home';
//     res.render('home', { title: 'Home Page' });
// });

// // app.get('/organizations', async (req, res) => {
// //     const title = 'Our Partner Organizations';
// //     res.render('organizations', { title });
// // });
// //Added on week 2
// app.get('/organizations', async (req, res) => {
//     const organizations = await getAllOrganizations();
//     //console.log(organizations); //That line displays the organizations info. 
//     const title = 'Our Partner Organizations';

//     res.render('organizations', { title, organizations});
// });



// // app.get('/projects', async (req, res) => {
// //     const title = 'Service Projects';
// //     res.render('projects', { title });
// // });
// app.get('/projects', async (req, res) => {
//     const projects = await getAllProjects();
//     const title = 'Upcoming Service Projects';

//     res.render('projects', { title, projects });
// });



// // app.get('/categories', async (req, res) => {
// //     const title = 'Project Categories';
// //     res.render('categories', { title });
// // });
// app.get('/categories', async (req, res) => {
//     const categories = await getAllCategories();
//     const title = 'Project Categories';

//     res.render('categories', { title, categories });
// });


// //Commented on week03 #3 STEP 5
// //Week 03 #2 STEP 5
// //Test route for 500 errors
// app.get('/test-error', (req, res, next) => {
//   const err = new Error('This a test error');
//   err.status = 500;
//   next(err);
// });

//Week03 #3 STEP 5
// Use the imported router to handle routes
//app.use('/', router);


// Week03 #2 STEP 3
// Catch-all route for 404 errors
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// Still Week03 #2 STEP 4
// Global error handler
app.use ((err, req, res, next) => {
  //Log error details for debugging
  console.error('Error occurred:', err.message);
  console.error('Stack trace:', err.stack);

  //Determine status and template
  const status = err.status || 500;
  const template = status === 404 ? '404' : '500';

  //Prepare data for the template
  const context = {
    title: status === 404 ? 'Page Not Found' : 'Server Error',
    error: err.message,
    stack: err.stack
  };

  //Render the appropriate error template
  res.status(status).render(`errors/${template}`, context);
    //res.status(status).render('errors/' + template, context);
});



// Added on week 2
app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});


// app.listen(PORT, () => {
//   console.log(`Server is running at http://127.0.0.1:${PORT}`);
//   console.log(`Environment: ${NODE_ENV}`);
// });