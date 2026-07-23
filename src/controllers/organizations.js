//Week03 #3 STEP 3
// Import any needed model functions
// import { getAllOrganizations } from '../models/organizations.js';
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
//Week03 #4 STEP 2
import { getProjectsByOrganizationId } from '../models/projects.js';

// Define any controller functions
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
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
export { showOrganizationsPage, showOrganizationDetailsPage };

