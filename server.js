import express from 'express';

// line added in week1
import { fileURLToPath } from 'url';
import path from 'path';
//Added on week 2
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllCategories } from './src/models/categories.js';
import { getAllProjects } from './src/models/projects.js';


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

// Codes added in week 1
/**
  * Routes
  */
app.get('/', async (req, res) => {
  const title = 'Home';
    res.render('home', { title: 'Home Page' });
});

//app.get('/organizations', async (req, res) => {
    //const title = 'Our Partner Organizations';
    //res.render('organizations', { title });
//});
// Added on week 2
app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    //console.log(organizations); //That line displays the organiations info. 
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations});
});


//app.get('/projects', async (req, res) => {
    //const title = 'Service Projects';
    //res.render('projects', { title });
//});

app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
});


//app.get('/categories', async (req, res) => {
    //const title = 'Project Categories';
    //res.render('categories', { title });
//});
app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Project Categories';

    res.render('categories', { title, categories });
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


app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});