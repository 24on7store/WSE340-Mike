//Added on week05 #4 STEP 1
import bcrypt from 'bcrypt';

//Added on week05 #3 STEP 2
import db from './db.js'

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const queryParams = [name, email, passwordHash, default_role];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

//Added on week05 #4 STEP 1
const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const queryParams = [email];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};
//Extra codes
const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    // 1. Attempt to find the user by their email
    const user = await findUserByEmail(email);
    if (!user) {
        return null; 
    }

    // 2. Check if the plain text password matches the hashed password
    const isPasswordCorrect = await verifyPassword(password, user.password_hash);
    if (!isPasswordCorrect) {
        return null;
    }

    // 3. Remove the sensitive password hash before returning the profile data
    delete user.password_hash;
    return user;
};
//ADDED ON WEEK 05  AR
const getAllUsers = async () => {
    const query = `
        SELECT u.user_id, u.name, u.email, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        ORDER BY u.name ASC
    `;
    const result = await db.query(query);
    return result.rows;
};


// Added on week 06
const volunteerForProject = async (projectId, userId) => {
    const query = `
        INSERT INTO project_volunteer (project_id, user_id) 
        VALUES ($1, $2) ON CONFLICT DO NOTHING
    `;
    await db.query(query, [projectId, userId]);
};

const removeVolunteership = async (projectId, userId) => {
    const query = `
        DELETE FROM project_volunteer 
        WHERE project_id = $1 AND user_id = $2
    `;
    await db.query(query, [projectId, userId]);
};

const isUserVolunteering = async (projectId, userId) => {
    const query = `
        SELECT 1 FROM project_volunteer 
        WHERE project_id = $1 AND user_id = $2
    `;
    const result = await db.query(query, [projectId, userId]);
    return result.rows.length > 0;
};

const getUserVolunteeredProjects = async (userId) => {
    const query = `
        SELECT p.project_id, p.title, p.location, p.date 
        FROM project p
        JOIN project_volunteer pv ON p.project_id = pv.project_id
        WHERE pv.user_id = $1
        ORDER BY p.date ASC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
};


export { 
    createUser,
    //Added on week05 #4 STEP 1
    authenticateUser,
    //ADDED ON WEEK 05  AR
    getAllUsers,
    //Added on week 06
    volunteerForProject,
    removeVolunteership,
    isUserVolunteering,
    getUserVolunteeredProjects
};