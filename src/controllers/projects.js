//Added on week06
import {
    isUserVolunteering
    //getUserVolunteeredProjects
} from '../models/users.js';

//Added on week04 #5 STEP7
import { body, validationResult } from 'express-validator';
//Added on week04 #5 STEP2
import { 
    createProject, 
    //Added on week04 TA
    //getProjectDetails,
    updateProject
} from '../models/projects.js';

// //Added on week04 #5 STEP2
// import { createProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';

//Added on week03 TEAM Activity Step 2 = STEP 6 ADD THE CONTROLLER
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

//Added on week04 #5 step 7
const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

// ADDED ON WEEK04 TA
const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    
    const project = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();
    const title = 'Edit Service Project';

    res.render('update-project', { title, project, organizations });
};

// 3. Add the POST function to handle the form data submission
const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const { title, description, location, date, organizationId } = req.body;

    try {
        await updateProject(projectId, title, description, location, date, organizationId);
        req.flash('success', 'Service project updated successfully!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error updating project:', error);
        req.flash('error', 'There was an error updating the service project.');
        res.redirect(`/edit-project/${projectId}`);
    }
};



//Added on week05 #5 STEP 2
const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
}

const processNewProjectForm = async (req, res) => {
    //ADDED ON WEEK04 #5 STEP 7
    // 1. Intercept and evaluate incoming request states
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        // Halt processing and return directly back to the project form page
        return res.redirect('/new-project');
    }
    // Extract form data from req.body
    const { title, description, location, date, organizationId } = req.body;

    try {
        // Create the new project in the database
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
};

//Commented on week 03 TC and NF
// //Week03 #3 STEP 3
// // Import any needed model functions
// import { getAllProjects } from '../models/projects.js';
// //Added on week03 new feature step 2
import { getCategoriesByProjectId } from '../models/categories.js'; 


// Renders the main upcoming service projects page
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};

// // //COMMENTED ON WEEK06
// // Renders individual service project profile pages
// const showProjectDetailsPage = async (req, res) => {
//     const projectId = req.params.id;
//     const project = await getProjectDetails(projectId);
//     //After receiving the feedback on week 03 TC and NF
//     //const title = project ? project.title : 'Project Details';
//     // FIXED: Fetch the tags array from the categories model using await
//     const tags = await getCategoriesByProjectId(projectId);
//     const title = project ? project.title : 'Project Details';

//     res.render('project', { title, project, tags });
// };

//ADDED ON WEEK06
const showProjectDetailsPage = async (req, res) => {
    // 1. Match your original parameter variable name
    const projectId = req.params.id; 

    try {
        // 2. Fetch your original database records and tags
        const project = await getProjectDetails(projectId);
        const tags = await getCategoriesByProjectId(projectId);
        
        // Establish your fallback page title matching your original fallback check
        const title = project ? project.title : 'Project Details';

        // 3. Set a default value so your template view file never crashes
        let isVolunteering = false;

        // 4. If a user session is active, check their database status
        if (req.session && req.session.user) {
            isVolunteering = await isUserVolunteering(projectId, req.session.user.user_id);
        }

        // 5. Render your layout file passing down ALL variable expectations
        res.render('project', {
            title: title,
            project: project, 
            projectDetails: project, // Keeps your new volunteer HTML block happy on line 54
            tags: tags,
            isVolunteering: isVolunteering
        });

    } catch (error) {
        console.error('Error loading project page:', error);
        res.redirect('/projects');
    }
};





export {
    showNewProjectForm,
    processNewProjectForm,
    showProjectsPage,
    showProjectDetailsPage,
    //ADDED WEEK04 #5 STEP 7
    projectValidation,
    //ADDED ON WEEK04 TA
    showEditProjectForm,
    processEditProjectForm
};


//Commented on week 03 TC and NF
// // Define any controller functions
// const showProjectsPage = async (req, res) => {
//     const projects = await getAllProjects();
//     const title = 'Service Projects';

//     //Added on week03 new feature step 2
//     const tags = await getCategoriesByProjectId(projectId); 
//     const title = project ? project.title : 'Project Details';

//     //Added on week03 new feature step 2
//     res.render('projectDetails', { title, project, tags });
//     //Commented on week03 new feature step 2
//     // res.render('projects', { title, projects });
// };  

// // //commented on week03 new feature step 2
// // // Export any controller functions
// // export { showProjectsPage };

// //Added on week03 new feature step 2
// export { showProjectsPage, showProjectDetailsPage };