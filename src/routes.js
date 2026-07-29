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

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
//Added on week04 #1 step 3 
router.get('/new-organization', showNewOrganizationForm);

//Added on week04 #5 step 7 
// Route for new project page
router.get('/new-project', showNewProjectForm);

//Added on week04 #5 step7
// Route to handle new project form submission with validation attached
router.post('/new-project', projectValidation, processNewProjectForm);
//Added on week04 #1 step 8 and updated on W4 #3 STEP 3
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

//Added on week03 new feature step 3
router.get('/category/:id', showCategoryDetailsPage);

//Added on week03 new feature step 3
router.get('/project/:id', showProjectDetailsPage);

//Added on week04 #5 STEP3
// Route for new project page
router.get('/new-project', showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', processNewProjectForm);



// ADDED ON WEEK03 #4 STEP3 Route for organization details page 
router.get('/organization/:id', showOrganizationDetailsPage);

// ADDED ON WEEK04 #4 STEP4
// Route to handle the edit organization form submission | Updated on week04 #4 STEP 6
//router.post('/edit-organization/:id', processEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);


// error-handling routes
router.get('/test-error', testErrorPage);

// Week04 #4 STEP 2
router.get('/edit-organization/:id', showEditOrganizationForm);

// Added on Week04 #6 STEP3
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);


//ADDED ON WEEK04 TA
// Add these two route handlers to your routes list:
// Routes for editing a service project
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm);

//ADDED ON WEEK03 AR
// Create Category Routes
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);

// Edit Category Routes
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

export default router;