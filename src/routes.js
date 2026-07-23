//Week03 #3 STEP 4
import express from 'express';

import { showHomePage } from './controllers/index.js';
//Commented to update to import both functions from organizations.js on week03 #3 STEP 3
// import { showOrganizationsPage } from './controllers/organizations.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

//Route for organization details page (uses URL parameter) ADDED ON WEEK03 #4 STEP3
router.get('/organization/:id', showOrganizationDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;