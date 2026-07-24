//Week03 #3 STEP 3
//Commented on week03 new feature step 2
// Import any needed model functions
// import { getAllCategories } from '../models/categories.js';
//Added on week03 new feature step 2
import { getAllCategories, getCategoryById } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';


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

export { showCategoriesPage, showCategoryDetailsPage };


// //Commented on week03 new feature step 2
// // Export any controller functions
// export { showCategoriesPage };
