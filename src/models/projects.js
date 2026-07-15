import db from './db.js';

/**
 * Fetches all service projects from the database.
 * Orders them by their unique project ID so they always display in a clean order.
 */
const getAllProjects = async () => {
    const query = `
        SELECT project_id, title, description 
        FROM public.project 
        ORDER BY project_id ASC;
    `;
    const result = await db.query(query);
    return result.rows;
};

export { getAllProjects };
