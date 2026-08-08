//Added on Week05 #3 STEP 4
import {
    showUserRegistrationForm, 
    processUserRegistrationForm,
    //Added on week05 #4 STEP3
    showLoginForm,
    processLoginForm,
    processLogout,
    //Added on week05 #5 STEP 4
    requireLogin,
    showDashboard,
    //Added on week 05 TA STEP 8
    requireRole,
    //ADDED ON WEEK05 AR
    showAllUsersPage,
    //ADDED ON WEEK06
    processVolunteerSignup,
    processCancelVolunteership
} from './controllers/users.js';
//Week03 #3 STEP 4
import express from 'express';

import { showHomePage } from './controllers/index.js';
//Commented to update to import both functions from organizations.js on week03 #3 STEP 3
// import { showOrganizationsPage } from './controllers/organizations.js';
//Updated on week04 #1 STEP 3 to add showNewOrganizationForm | Updated on week04 #3 STEP 4
import { 
    showOrganizationsPage, 
    showOrganizationDetailsPage, 
    showNewOrganizationForm,
    processNewOrganizationForm,
    //Added on week04 #3 STEP 3
    organizationValidation,
    //Added on week04 #4 STEP 2
    showEditOrganizationForm,
    //Added on week04 #4 STEP 4
    processEditOrganizationForm,

} from './controllers/organizations.js';

import { 
    showProjectsPage,
    showProjectDetailsPage,
    //Updated on week04 #5 STEP 3
    showNewProjectForm,
    processEditProjectForm,
    processNewProjectForm,
    //Added on week04 #5 step 7
    projectValidation,
     //ADDED ON WEEK04 TA
    showEditProjectForm
    //processEditOrganizationForm
} from './controllers/projects.js';


import { 
    showCategoriesPage,
    showCategoryDetailsPage,
    //Added on week 04 #6 step 3
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    //ADDED ON WEEK04 AR
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';
//Added on week03 new feature step 3
// ... Keep your other controller imports ...
//import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
//import { showProjectDetailsPage } from './controllers/projects.js'; // From team activity

//Added on week04 #1 step 3
//const { showNewOrganizationForm, /* other controllers */ } = require('./controllers/organizations');

const router = express.Router();
//Updated  all the routes on week 05 TA STEP 8
//router.get('/', showHomePage);
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
//Added on week04 #1 step 3 
//router.get('/new-organization', showNewOrganizationForm);
//Updated on week 05 TA STEP 8
router.get('/new-organization', requireRole('admin'),  showNewOrganizationForm);

//Added on week05 #5 step 5
// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

//Added on week04 #5 step 7 
// Route for new project page
//Updated on week 05 TA STEP 8
router.get('/new-project', requireRole('admin'), showNewProjectForm);

//Added on week04 #5 step7
// Route to handle new project form submission with validation attached
//Updated on week05 TA STEP 8
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
//Added on week04 #1 step 8 and updated on W4 #3 STEP 3
//Updated on week05 TA STEP 8
//router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

//Added on week03 new feature step 3
router.get('/category/:id', showCategoryDetailsPage);

//Added on week03 new feature step 3
router.get('/project/:id', showProjectDetailsPage);

//Added on week04 #5 STEP3
// Route for new project page
//router.get('/new-project', showNewProjectForm);
// Route to handle new project form submission
//router.post('/new-project', processNewProjectForm);



// ADDED ON WEEK03 #4 STEP3 Route for organization details page 
router.get('/organization/:id', showOrganizationDetailsPage);

// ADDED ON WEEK04 #4 STEP4
// Route to handle the edit organization form submission | Updated on week04 #4 STEP 6
//router.post('/edit-organization/:id', processEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);


// error-handling routes
router.get('/test-error', testErrorPage);

// Week04 #4 STEP 2
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Added on Week04 #6 STEP3
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);


//ADDED ON WEEK04 TA
// Add these two route handlers to your routes list:
// Routes for editing a service project
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), processEditProjectForm);

//ADDED ON WEEK03 AR
// Create Category Routes
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

// Edit Category Routes
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

//Added on week05 #3 STEP 4
// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

//Added on week05 #4 STEP 3
// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

//ADDED ON WEEK05 AR
// Admin-Only Users Management Roster
router.get('/admin/users', requireRole('admin'), showAllUsersPage);

//ADDED ON WEEK06
// Volunteering Lifecycle Routes (Protected by requireLogin)
router.get('/project/:projectId/volunteer', requireLogin, processVolunteerSignup);
router.get('/project/:projectId/unvolunteer', requireLogin, processCancelVolunteership);


export default router;