import db from './db.js';

/**
 * Fetches all service projects from the database.
 * Orders them by their unique project ID so they always display in a clean order.
 */

const getAllProjects = async () => {
      const query = 'SELECT * FROM project ORDER BY project_id ASC;';
    // const query = `
    //     SELECT project_id, title, description, location, date, organization_id 
    //     FROM public.project 
    //     ORDER BY project_id ASC;
    // `;
    const result = await db.query(query);
    return result.rows;
};
////commented on week03 #4 STEP 1
// export { getAllProjects };

// // Week 03 #4 STEP 2
const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
        project_id,
        organization_id,
        title,
        description,
        location,
        date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
    `;
    
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Export the model functions
//Commented on week03 #4 STEP 2
//export { getAllProjects, getProjectsByOrganizationId };

//Added on week03 #4 STEP 2

// Export any controller functions
export { getAllProjects, getProjectsByOrganizationId };
