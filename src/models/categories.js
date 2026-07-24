import db from './db.js';
//Added on week03 #4 STEP 1


const getAllCategories = async () => {
    const query = `SELECT category_id, name FROM public.category;`;
    const result = await db.query(query);
    return result.rows;
};

//Added on week03 new feature step 1
//  NEW: Retrieve a single category by its ID
const getCategoryById = async (categoryId) => {
    const query = 'SELECT * FROM category WHERE category_id = $1;';
    const result = await db.query(query, [categoryId]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// 🟢 NEW: Retrieve all categories for a given service project (for tags)
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.name 
        FROM category c
        JOIN project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId };

// //Commented on week03 new feature step 1
// export { getAllCategories };
