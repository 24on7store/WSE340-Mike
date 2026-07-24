import db from './db.js';
//Added on week03 TEAm Activity Step 1 = STEP 5
// Get upcoming projects with organization names (joined tables)
const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM project p
        INNER JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1;
    `;
    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

// Get single project details by ID with organization names
const getProjectDetails = async (id) => {
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM project p
        INNER JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Keeping your other assignment model function untouched
const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT project_id, organization_id, title, description, location, date
        FROM project WHERE organization_id = $1 ORDER BY date;
    `;
    const result = await db.query(query, [organizationId]);
    return result.rows;
};

// /** Commented on week03 TEAM ACT AND NEW FEATURE
//  * Fetches all service projects from the database.
//  * Orders them by their unique project ID so they always display in a clean order.
//  */

// const getAllProjects = async () => {
//       const query = 'SELECT * FROM project ORDER BY project_id ASC;';
//     // const query = `
//     //     SELECT project_id, title, description, location, date, organization_id 
//     //     FROM public.project 
//     //     ORDER BY project_id ASC;
//     // `;
//     const result = await db.query(query);
//     return result.rows;
// };
// ////commented on week03 #4 STEP 1
// // export { getAllProjects };

// // // Week 03 #4 STEP 2
// const getProjectsByOrganizationId = async (organizationId) => {
//     const query = `
//         SELECT
//         project_id,
//         organization_id,
//         title,
//         description,
//         location,
//         date
//         FROM project
//         WHERE organization_id = $1
//         ORDER BY date;
//     `;
    
//     const queryParams = [organizationId];
//     const result = await db.query(query, queryParams);

//     return result.rows;
// };




// //Added on week03 new feature step 1
// //  NEW: Retrieve all service projects for a given category
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.location, p.date
        FROM project p
        JOIN project_category pc ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.date;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
};

export { getUpcomingProjects, getProjectDetails, getProjectsByOrganizationId, getProjectsByCategoryId };

// // Ensure your exports include your team activity's getProjectById if used
// export { getAllProjects, getProjectsByOrganizationId, getProjectsByCategoryId };


// // Export the model functions
// //Commented on week03 #4 STEP 2
// //export { getAllProjects, getProjectsByOrganizationId };

// //Added on week03 #4 STEP 2

// // //Commented on week03 new feature step 1
// // // Export any controller functions
// // export { getAllProjects, getProjectsByOrganizationId };

