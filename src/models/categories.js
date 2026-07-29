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

// NEW: Retrieve all categories for a given service project (for tags)
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

//Added on week04 #6 STEP 1
const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

//ADDED ON WEEK04 AR
// Add these two functions inside src/models/categories.js

/**
 * Inserts a brand new category into the database
 */
const createCategory = async (name) => {
    const query = `
        INSERT INTO category (name)
        VALUES ($1)
        RETURNING category_id;
    `;
    const result = await db.query(query, [name]);
    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }
    return result.rows[0].category_id;
};

/**
 * Updates an existing category's name in the database
 */
const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE category
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;
    const result = await db.query(query, [name, categoryId]);
    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }
    return result.rows[0].category_id;
};


export { 
    getAllCategories,
    getCategoryById, 
    getCategoriesByProjectId,
    //Added on week04 #6 STEP 1
    updateCategoryAssignments,
    //ADDED ON WEEK04 AR
    createCategory,
    updateCategory
 };

// //Commented on week03 new feature step 1
// export { getAllCategories };
