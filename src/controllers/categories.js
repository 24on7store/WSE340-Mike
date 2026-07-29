//ADDED ON Week04 AR
// 1. Ensure body and validationResult are imported at the top
import { body, validationResult } from 'express-validator';
//Week03 #3 STEP 3
//Commented on week03 new feature step 2
// Import any needed model functions
// import { getAllCategories } from '../models/categories.js';
//Added on week03 new feature step 2 | Updated on week04 #6 STEP2
import { 
    getAllCategories, 
    //ADDED ON WEEK04 AR
    createCategory,
    updateCategory,
    // getCategoryById, 
    getCategoryById, 
    getCategoriesByProjectId, 
    updateCategoryAssignments 
} from '../models/categories.js';

import { getProjectsByCategoryId } from '../models/projects.js';
//Added on week04 #6 step 2
import { getProjectDetails } from '../models/projects.js'; 
const showAssignCategoriesForm = async (req, res) => {
    const { projectId } = req.params;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    //const assignedCategories = await getCategoriesByServiceProjectId(projectId);
    //const Categories = await getCategoriesByServiceProjectId(projectId);
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const { projectId } = req.params;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};



// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

//Added on week03 new feature step 1
const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = category ? category.name : 'Category Details';

    res.render('categoryDetails', { title, category, projects });
};

//ADDED ON WEEK 04 AR
// 2. Define Category validation rules (Max 100 on client, Min 3 and Max 100 on server)
const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters')
];

// 3. GET: Show Create Category Form
const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';
    res.render('new-category', { title });
};

// 4. POST: Process Create Category Form
const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach(error => req.flash('error', error.msg));
        return res.redirect('/new-category');
    }

    const { name } = req.body;
    try {
        await createCategory(name);
        req.flash('success', 'Category created successfully!');
        res.redirect('/categories'); // Or wherever your category list page is
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error creating category.');
        res.redirect('/new-category');
    }
};

// 5. GET: Show Edit Category Form
const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const title = 'Edit Category';
    res.render('edit-category', { title, category });
};

// 6. POST: Process Edit Category Form
const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach(error => req.flash('error', error.msg));
        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;
    try {
        await updateCategory(categoryId, name);
        req.flash('success', 'Category updated successfully!');
        res.redirect('/categories');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error updating category.');
        res.redirect(`/edit-category/${categoryId}`);
    }
};





export { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    //Added on week04 36 step 2
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    //ADDED ON WEEK04 AR
    categoryValidation,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
 };


// //Commented on week03 new feature step 2
// // Export any controller functions
// export { showCategoriesPage };
