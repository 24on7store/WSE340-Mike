//Added on week03 TEAM Activity Step 2 = STEP 6 ADD THE CONTROLLER
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

//Commented on week 03 TC and NF
// //Week03 #3 STEP 3
// // Import any needed model functions
// import { getAllProjects } from '../models/projects.js';
// //Added on week03 new feature step 2
// import { getCategoriesByProjectId } from '../models/categories.js'; 


// Renders the main upcoming service projects page
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};
// Renders individual service project profile pages
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const title = project ? project.title : 'Project Details';

    res.render('project', { title, project });
};
export { showProjectsPage, showProjectDetailsPage };


//Commnented on week 03 TC and NF
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