//Added on week05 #3 STEP3
import bcrypt from 'bcrypt';

import { 
    createUser,
    //Added on week05 #4 STEP 1
    authenticateUser,
    //ADDED ON WEEK05 AR
    getAllUsers
} from '../models/users.js';

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        // Redirect to the home page after successful registration
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

//Added on week05 #4 STEP 2
const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        if (user) {
            // Store user info in session
            req.session.user = user;
            req.flash('success', 'Login successful!');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            //res.redirect('/'); 
            //Updated on week05 #5 STEP 5
            res.redirect('/dashboard'); // Redirect to the dashboard after successful login
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};

//Added on week 05 #5 STEP 1
const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};

//Added on week05 #5 STEP3
const showDashboard = (req, res) => {
    const user = req.session.user;
    res.render('dashboard', { 
        title: 'Dashboard',
        name: user.name,
        email: user.email
    });
};
//Added on week 05 TA STEP 7
const requireRole = (role) => {
    return (req, res, next) => {
        // 1. Ensure the user session exists first
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        // 2. Enforce structural role authorization matching
        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }

        // 3. Authorization verified, proceed down the lifecycle
        next();
    };
};

//ADDED ON WEEK05 AR
const showAllUsersPage = async (req, res) => {
    try {
        const userList = await getAllUsers();
        res.render('users-list', { 
            title: 'Registered Users Management',
            users: userList 
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        req.flash('error', 'Could not load user roster.');
        res.redirect('/dashboard');
    }
};


export { 
    showUserRegistrationForm,
    processUserRegistrationForm,
    //Added on week05 #4 STEP 2
    showLoginForm,
    processLoginForm,
    processLogout,
    //Added on week05 #5 STEP 1
    requireLogin,
    //Added on week05 #5 STEP 3
    showDashboard,
    //Added on week05 TA STEP 7
    requireRole,
    //ADDED ON WEEK05 AR
    showAllUsersPage
};
