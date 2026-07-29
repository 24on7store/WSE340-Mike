//Added on Week04 #3 STEP2
import { body, validationResult } from 'express-validator';
//Added on Week04 #1 STEP 8 | Updated on week04 #4 STEP 5
import { createOrganization, updateOrganization } from '../models/organizations.js';
//Still week04 #1 STEP 8 and updated on W4 #3 STEP 4
// 2. Add this function to handle the POST data submission
//Week03 #3 STEP 3
// Import any needed model functions
// import { getAllOrganizations } from '../models/organizations.js';
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';

//Week03 #4 STEP 2
import { getProjectsByOrganizationId } from '../models/projects.js';


const processNewOrganizationForm = async (req, res) => {
    //and updated on W4 #3 STEP 4
     // Check for validation errors 
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/new-organization');
    }


    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    //Added on week4 #2 STEP 3
     // Set a success flash message
    req.flash('success', 'Organization added successfully!');

    res.redirect(`/organization/${organizationId}`);
};

//Added on Week04 #3 STEP 4
const processEditOrganizationForm = async (req, res) => {
    //ADDED ON WEEK04 #4 STEP6.......................
    // Check for validation errors

    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit organization form
        return res.redirect('/edit-organization/' + req.params.id);
    }
        const organizationId = req.params.id;
        const { name, description, contactEmail, logoFilename } = req.body;

        await updateOrganization(organizationId, name, description, contactEmail, logoFilename);
        
        // Set a success flash message
        req.flash('success', 'Organization updated successfully!');

        res.redirect(`/organization/${organizationId}`);
    };

// //Week03 #3 STEP 3
// // Import any needed model functions
// // import { getAllOrganizations } from '../models/organizations.js';
// import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
// //Week03 #4 STEP 2
// import { getProjectsByOrganizationId } from '../models/projects.js';
//Added on week04 #3 STEP2
// Define validation and sanitization rules for organization form
// Define validation rules for organization form
const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),
    body('contactEmail')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
];




// Define any controller functions
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

//Added on Week04 #1 STEP 3
const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
}

//WEEK04 #4 STEP 2
const showEditOrganizationForm = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);

    const title = 'Edit Organization';
    res.render('edit-organization', { title, organizationDetails });
};

//WEEK03 #4 STEP 2
// Renders individual organization profiles and their projects
const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
};

// //Commented on week03 #4 STEP 2
// // Export any controller functions
// export { showOrganizationsPage };

//Added on week03 #4 STEP 2
// Export any controller functions
//Commented on week04 #1 STEP3
// export { showOrganizationsPage, showOrganizationDetailsPage };

//Updated on week 04 #1 STEP 2? AND 8
// Export any controller functions
// Add the function name to your exports at the bottom of the file
export{
    // ... your existing exports ...
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    //Added on week04 #3 STEP 2
    organizationValidation,
    //Added on week04 #4 STEP 2
    showEditOrganizationForm,
    //Added on week04 #4 STEP 4
    processEditOrganizationForm
    
};


