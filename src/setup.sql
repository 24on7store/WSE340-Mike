-- ============================================
-- organization table 
-- ============================================

CREATE TABLE organization (
     organization_id SERIAL PRIMARY KEY,
	 name VARCHAR(150) NOT NULL,
	 description TEXT NOT NULL,
	 contact_email VARCHAR(255) NOT NULL,
	 logo_filename VARCHAR(255) NOT NULL
	 

);

SELECT * FROM organization 


-- ============================================
-- STEP 3 Insert Sample Data
-- ============================================
INSERT INTO organization (name, description, contact_email, logo_filename) VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- ============================================
-- 3. project table 
-- ============================================

DROP TABLE IF EXISTS project_category CASCADE;
DROP TABLE IF EXISTS project CASCADE;

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE project_category (
    project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO project (title, description) VALUES
('Park Cleanup', 'Join us to clean up local parks and make them beautiful!'),
('Food Drive', 'Help collect and distribute food to those in need.'),
('Community Tutoring', 'Volunteer to tutor students in various subjects.');

INSERT INTO project_category (project_id, category_id) VALUES
(1, 1), 
(2, 2), 
(2, 3), 
(3, 2);

SELECT * FROM project;








-- ============================================
-- 3. category table 
-- ============================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO category (name) VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');



DROP TABLE IF EXISTS project_category CASCADE;
DROP TABLE IF EXISTS project CASCADE;

-- 1. Create the project table with ALL required columns
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    organization_id INT NOT NULL REFERENCES organization(organization_id) ON DELETE CASCADE
);

-- 2. Create the bridge table
CREATE TABLE project_category (
    project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- 3. Insert exactly 5 projects for EACH of your 3 organizations (15 rows total)
INSERT INTO project (title, description, location, date, organization_id) VALUES
-- Organization 1: BrightFuture Builders (ID: 1)
('Park Cleanup', 'Join us to clean up local parks and make them beautiful!', 'Rexburg Central Park', '2026-07-20', 1),
('Community Garden Setup', 'Build raised planting beds and lay soil paths.', 'North Rexburg Allotments', '2026-07-22', 1),
('Library Book Sorting', 'Help organize shelves and catalog incoming donations.', 'Madison County Library', '2026-07-25', 1),
('Tree Planting Initiative', 'Plant native saplings along the pathway green belts.', 'River Walk Trail', '2026-08-01', 1),
('Bus Stop Restoration', 'Repaint and shelter clean local bus transit areas.', 'Main Street Stop B', '2026-08-05', 1),

-- Organization 2: GreenHarvest Growers (ID: 2)
('Food Drive', 'Help collect and distribute food to those in need.', 'Community Food Bank Depot', '2026-07-18', 2),
('Urban Greenhouse Assembly', 'Construct a temporary poly-tunnel hoop greenhouse.', 'Growers Compound Yard', '2026-07-24', 2),
('Harvest Festival Prep', 'Sort and box fresh produce items ahead of the public distribution market.', 'Market Hall West', '2026-07-31', 2),
('Composting Workshop Support', 'Manage visitor logs and distribute educational flyers.', 'Eco Learning Hub', '2026-08-08', 2),
('Seed Packing Drive', 'Label and pack organic seed envelopes for spring distributions.', 'Growers Office Suite', '2026-08-12', 2),

-- Organization 3: UnityServe Volunteers (ID: 3)
('Community Tutoring', 'Volunteer to tutor students in various subjects.', 'Youth Opportunity Center', '2026-07-15', 3),
('Senior Center Help Desk', 'Assist elderly residents with basic mobile phone setup.', 'Autumn Care Day Rooms', '2026-07-19', 3),
('Charity Run Course Marshall', 'Direct runners safely along the path grid junctions.', 'University Stadium Perimeter', '2026-07-26', 3),
('Homeless Shelter Meal Service', 'Chop veggies and plate hot meals during the dinner rush.', 'Downtown Care Kitchen', '2026-08-02', 3),
('Toy Refurbishing Workshop', 'Clean and paint donated wood sets for the upcoming holiday hampers.', 'Unity Operations Barn', '2026-08-10', 3);

-- 4. Insert at least 5 entry links into the bridge table
INSERT INTO project_category (project_id, category_id) VALUES
(1, 1), -- Project 1 linked to Category 1
(2, 1), -- Project 2 linked to Category 1
(6, 2), -- Project 6 linked to Category 2
(6, 3), -- Project 6 ALSO linked to Category 3 (Many-to-many demonstration!)
(11, 2),-- Project 11 linked to Category 2
(12, 4);-- Project 12 linked to Category 4

SELECT * FROM project;
