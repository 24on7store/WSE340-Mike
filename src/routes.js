//Week03 #3 STEP 4
import express from 'express';

import { showHomePage } from './controllers/index.js';
//Commented to update to import both functions from organizations.js on week03 #3 STEP 3
// import { showOrganizationsPage } from './controllers/organizations.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
//Added on week03 new feature step 3
// ... Keep your other controller imports ...
//import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
//import { showProjectDetailsPage } from './controllers/projects.js'; // From team activity

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
//Added on week03 new feature step 3
router.get('/category/:id', showCategoryDetailsPage);

//Added on week03 new feature step 3
router.get('/project/:id', showProjectDetailsPage);

//Route for organization details page (uses URL parameter) ADDED ON WEEK03 #4 STEP3
router.get('/organization/:id', showOrganizationDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;