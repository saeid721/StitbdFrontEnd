/* ==========================================================================
   STITBD — Data Layer (vanilla JS port of companyData.ts)
   ========================================================================== */

const COMPANY_INFO = {
  name: 'STITBD',
  fullName: 'Software Technology Info Tech BD',
  tagline: 'Empowering Businesses with Cutting-Edge Software & IT Solutions',
  sinceYear: 2014,
  yearsOfExcellence: new Date().getFullYear() - 2014,
  email: 'info@stitbd.com',
  supportEmail: 'shaokat71@gmail.com',
  phonePrimary: '+880 1757-769498',
  phoneSecondary: '+880 11834-163689',
  whatsapp: '+880 1757-769498',
  address: 'Level 5, Software Technology Park, Kawran Bazar, Dhaka-1215, Bangladesh',
  officeHours: '24/7 Technical Support & Customer Service',
  facebook: 'https://facebook.com/stitbd',
  linkedin: 'https://linkedin.com/company/stitbd',
  youtube: 'https://youtube.com/c/stitbd',
  github: 'https://github.com/stitbd',
};

const SERVICES = [
  {
    id: 'software-dev',
    title: 'Software Development',
    description: 'Tailor-made desktop, web, and cloud-based software engineered to streamline complex business workflows, enterprise resource management, and daily operational processes.',
    fullDescription: 'STITBD delivers custom software development services that transform how businesses operate. From enterprise resource planning (ERP) systems to customer relationship management (CRM) platforms, our team builds scalable, secure, and efficient solutions. We specialize in financial accounting software, inventory management systems, and industry-specific applications. Our development process includes requirement analysis, agile development, rigorous testing, deployment, and ongoing maintenance. With over 12 years of experience, we have successfully delivered 1,200+ projects across Bangladesh and international markets.',
    iconName: 'bi-code-slash',
    badge: 'Core Specialty',
    features: [
      'Custom ERP & CRM Architectures',
      'High-Performance Cloud & Local Databases',
      'Automated Billing & Financial Ledger Accounting',
      'Multi-User Role & Access Rights Management',
    ],
    image: 'asset/services/software-development.jpg'
  },
  {
    id: 'web-dev',
    title: 'Website Design & Development',
    description: 'Ultra-fast, responsive corporate portals, custom Web APIs, and high-conversion E-commerce platforms built with modern frontend frameworks and secure backends.',
    fullDescription: 'Our web development team creates stunning, high-performance websites that drive business growth. We build corporate portals, e-commerce platforms, custom web applications, and API-driven solutions. Using modern frameworks like React.js, Next.js, and Laravel, we ensure your website is fast, secure, and mobile-responsive. We integrate local payment gateways (bKash, Nagad), implement SEO best practices, and deliver user-centric designs that convert visitors into customers. Every website we build includes SSL security, regular backups, and 24/7 monitoring.',
    iconName: 'bi-window-stack',
    badge: 'Popular',
    features: [
      'React.js, Next.js & Laravel High-Speed Stack',
      'Mobile-First Responsive Layouts & Sleek UI/UX',
      'Local & Global Payment Gateway Integrations',
      'SEO-Optimized & Speed Audited Codebase',
    ],
    image: 'asset/services/web-development.jpg'
  },
  {
    id: 'app-dev',
    title: 'Android & iOS App Development',
    description: 'Cross-platform Flutter & native mobile applications with sleek user interfaces, offline data sync, push notifications, and real-time backend integration.',
    fullDescription: 'Our mobile app development team builds high-quality Android and iOS applications using Flutter for cross-platform efficiency and native technologies for platform-specific needs. We create apps for e-commerce, healthcare, education, logistics, and enterprise use cases. Our apps feature biometric login, push notifications, offline data synchronization, real-time chat, in-app payments, and robust backend API integration. We handle the entire lifecycle from UI/UX design to Play Store and App Store deployment, ensuring your app meets all platform guidelines and performance standards.',
    iconName: 'bi-phone',
    badge: 'iOS & Android',
    features: [
      'Flutter Cross-Platform Efficiency',
      'Real-Time Firebase & REST API Integration',
      'Biometric Login & In-App Payment Gateways',
      'Play Store & App Store Deployment Support',
    ],
    image: 'asset/services/app-development.jpg'
  },
  {
    id: 'domain-hosting',
    title: 'Domain Registration & Hosting',
    description: 'High-speed BTTB .bd & global TLD domain registration paired with NVMe SSD cloud hosting, cPanel management, SSL certificates, and guaranteed 99.9% uptime.',
    fullDescription: 'STITBD is an authorized BTTB domain registrar for Bangladesh domains (.com.bd, .bd) and also offers all global TLDs (.com, .net, .org, .info, .xyz, etc.). Our cloud hosting solutions feature NVMe SSD storage, LiteSpeed web servers, free Let\'s Encrypt SSL, daily automated backups, and cPanel control panel. We guarantee 99.9% uptime with proactive DDoS protection and 24/7 server health monitoring. Our DNS management includes free email hosting, subdomain creation, and domain forwarding services.',
    iconName: 'bi-hdd-network',
    badge: 'Instant Setup',
    features: [
      'BTTB Authorized .com.bd & .bd Domain Provider',
      'High-Speed NVMe Pure SSD Cloud Servers',
      'Free Let\'s Encrypt SSL & Automated Backups',
      '24/7 Server Health Monitoring & DDoS Defense',
    ],
    image: 'asset/services/domain-hosting.jpg'
  },
  {
    id: 'cctv-solutions',
    title: 'CCTV Camera Solutions',
    description: 'Complete HD IP surveillance systems, remote smartphone monitoring, biometric time-attendance hardware, and enterprise security access control setups.',
    fullDescription: 'We provide end-to-end security solutions including HD IP CCTV cameras, NVR/DVR systems, biometric time-attendance devices, and access control systems. Our team handles site surveys, camera placement optimization, cable network installation, and system configuration. All systems support remote smartphone monitoring, motion detection alerts, and cloud video storage. We integrate biometric fingerprint and face recognition attendance systems that sync with HR and payroll software. Our security solutions are designed for offices, factories, banks, educational institutions, and residential buildings.',
    iconName: 'bi-camera-video',
    badge: 'Hardware & Security',
    features: [
      'High-Definition IP & Analog Surveillance',
      'Remote Live Monitoring via Mobile App',
      'Biometric Fingerprint & Face Recognition Attendance',
      'On-Site Cable Network & NVR/DVR Installation',
    ],
    image: 'asset/services/cctv-security.jpg'
  },
  {
    id: 'access-control',
    title: 'Access Control Services',
    description: 'Access control systems and time attendance solutions including biometric fingerprint and face recognition devices with software integration.',
    fullDescription: 'Our access control services provide secure and efficient management of entry and exit for offices, factories, banks, and commercial buildings. We offer biometric fingerprint and face recognition systems that track employee attendance and control access to restricted areas. All systems integrate with our HR & Payroll software for automated time and attendance management, ensuring accurate record-keeping and streamlined HR operations. Our solutions are reliable, scalable, and designed to enhance workplace security and efficiency.',
    iconName: 'bi-megaphone',
    badge: 'Security & Management',
    features: [
      'Biometric Fingerprint & Face Recognition Attendance',
      'Real-Time Attendance Data Sync with HR Software',
      'Access Control for Restricted Areas',
      'Automated Attendance Reports & Analytics',
    ],
    image: 'asset/services/access-control.jpg'
  },
];

const READY_SOFTWARE_PRODUCTS = [
  { id: 'hrms', name: 'HR & Payroll Management Software', category: 'Enterprise & ERP', shortDescription: 'Manage employee records, attendance, salary processing, and performance tracking to streamline HR operations.', fullDescription: 'A web-based system designed to manage employee records, attendance, salary processing, and performance tracking. Helps HR departments streamline daily operations and improve workforce management.', features: ['Employee Records & Attendance Tracking', 'Automated Salary Processing', 'Performance Appraisal Tools', 'Workforce Management Dashboard'], icon: 'bi-people', badge: 'Best Seller', rating: 4.9, popular: true, targetUsers: 'Corporate Offices, Factories, Banks, IT Firms', modules: ['Employee Database', 'Attendance Tracking', 'Payroll Processing', 'Performance Appraisal', 'Leave Management', 'HR Reports'], image: 'asset/ready_software/01.jpg' },
  { id: 'courier', name: 'Courier Management System', category: 'Services & Logistics', shortDescription: 'Handle parcel booking, real-time tracking, delivery management, rider assignments, and branch coordination.', fullDescription: 'A platform that handles parcel booking, real-time tracking, delivery management, rider assignments, and branch coordination. Useful for managing both local and national courier services efficiently.', features: ['Real-Time Parcel Tracking', 'Rider Assignment & Dispatch', 'Branch Coordination', 'Delivery Management Tools'], icon: 'bi-truck', badge: 'Popular', rating: 4.8, popular: true, targetUsers: 'Courier Companies, Logistics Firms, Delivery Services', modules: ['Parcel Booking', 'Live Tracking', 'Rider App', 'Branch Management', 'COD Settlement', 'Reports'], image: 'asset/ready_software/02.jpg' },
  { id: 'pos', name: 'Inventory / POS Software', category: 'Retail & POS', shortDescription: 'A smart, user-friendly Point of Sale system to streamline sales, inventory, and customer management.', fullDescription: 'ST POS is a smart and user-friendly Point of Sale (POS) system designed to streamline sales, inventory, and customer management for all types of businesses.', features: ['Fast Barcode Billing', 'Real-Time Inventory Sync', 'Customer Management', 'Sales & Profit Reports'], icon: 'bi-bag-check', badge: 'Essential', rating: 4.9, popular: true, targetUsers: 'Retail Shops, Super Shops, Boutiques', modules: ['POS Terminal', 'Inventory Control', 'Customer CRM', 'Barcode Generator', 'Supplier Ledger', 'VAT Reporting'], image: 'asset/ready_software/03.jpg' },
  { id: 'edu', name: 'Education Management System', category: 'Education & Health', shortDescription: 'Modules for enrollment, attendance, online classes, exams, grading, and teacher-parent communication.', fullDescription: 'ST Edu offers modules for student enrollment, attendance tracking, online classes, exam management, grading, and communication between teachers, students, and parents.', features: ['Student Admission & Enrollment', 'Online Class Integration', 'Exam & Grading System', 'Teacher-Parent Communication'], icon: 'bi-mortarboard', badge: 'Top Rated', rating: 4.9, popular: true, targetUsers: 'Schools, Colleges, Universities, Coaching Centers', modules: ['Admission System', 'Attendance Tracking', 'Online Classes', 'Exam & Marksheet', 'Fees Ledger', 'Parent Portal'], image: 'asset/ready_software/04.jpg' },
  { id: 'website', name: 'Dynamic Website Development', category: 'Services & Logistics', shortDescription: 'Custom website and application solutions with responsive, scalable designs tailored to business goals.', fullDescription: 'A full-service web development platform that provides custom website and application solutions for businesses of all sizes. ST Website specializes in creating responsive, user-friendly, and scalable websites tailored to meet unique business goals.', features: ['Responsive Custom Design', 'Scalable Web Architecture', 'SEO-Friendly Codebase', 'Content Management Integration'], icon: 'bi-window-stack', badge: 'Custom Build', rating: 4.8, popular: false, targetUsers: 'Businesses, Startups, Institutions', modules: ['Custom Design', 'CMS Integration', 'SEO Optimization', 'Hosting Setup', 'Domain Integration', 'Maintenance'], image: 'asset/ready_software/05.jpg' },
  { id: 'restaurant-pos', name: 'Restaurant Point of Sale System', category: 'Retail & POS', shortDescription: 'A smart POS tailored for restaurants with billing, inventory, table management, and kitchen coordination.', fullDescription: 'A smart point-of-sale system tailored for restaurants, cafes, and food outlets. ST Restaurant POS streamlines order taking, billing, inventory, table management, and kitchen coordination—ensuring faster service and smoother operations.', features: ['Fast Order Taking & Billing', 'Table Reservation Management', 'Kitchen Order Coordination', 'Inventory Control'], icon: 'bi-cup-hot', badge: 'Popular', rating: 4.8, popular: true, targetUsers: 'Restaurants, Cafes, Bakeries, Cloud Kitchens', modules: ['POS Terminal', 'Kitchen Display System', 'Inventory Control', 'Table Reservation', 'Recipe Costing', 'Customer Loyalty'], image: 'asset/ready_software/11.jpg' },
  { id: 'ecommerce', name: 'E-Commerce Solution', category: 'Retail & POS', shortDescription: 'Launch and manage online stores with product management, secure payments, and order tracking.', fullDescription: 'A complete e-commerce solution for launching and managing online stores. ST e-Commerce supports product management, secure payments, order tracking, and customer engagement—empowering businesses.', features: ['Product Catalog Management', 'Secure Payment Integration', 'Order Tracking', 'Customer Engagement Tools'], icon: 'bi-cart4', badge: 'High Conversion', rating: 4.9, popular: true, targetUsers: 'Online Brands, Retailers, Wholesale Marketplaces', modules: ['Storefront UI', 'Product Management', 'Payment Gateways', 'Order Management', 'Coupons & Promos', 'Customer Portal'], image: 'asset/ready_software/13.jpg' },
  { id: 'crm', name: 'Customer Relationship Management', category: 'Enterprise & ERP', shortDescription: 'Track leads, manage sales pipelines, and strengthen client interactions for better retention.', fullDescription: 'A user-friendly customer relationship management system designed to track leads, manage sales pipelines, and strengthen client interactions. ST CRM helps businesses improve customer retention, and streamline communication.', features: ['Lead Tracking & Pipeline Management', 'Client Interaction History', 'Sales Automation Tools', 'Communication Streamlining'], icon: 'bi-person-lines-fill', badge: 'Customer Focused', rating: 4.8, popular: false, targetUsers: 'Sales Teams, Agencies, Service Businesses', modules: ['Lead Management', 'Sales Pipeline', 'Client Database', 'Task & Follow-up', 'Reports & Analytics', 'Communication Log'], image: 'asset/ready_software/12.jpg' },
  { id: 'real-estate', name: 'Real Estate Management System', category: 'Real Estate & Infrastructure', shortDescription: 'A smart web platform for property listings, sales, rentals, and client interactions.', fullDescription: 'A smart web platform for property listings, sales, rentals, and client interactions—designed to simplify real estate operations and boost efficiency.', features: ['Property Listing Management', 'Sales & Rental Tracking', 'Client Interaction Tools', 'Efficiency-Boosting Dashboards'], icon: 'bi-building', badge: 'Industry Standard', rating: 4.7, popular: false, targetUsers: 'Real Estate Developers, Agencies, Property Managers', modules: ['Property Registry', 'Listing Management', 'Booking & Sales', 'Client CRM', 'Installment Schedule', 'Reports'], image: 'asset/ready_software/06.jpg' },
  { id: 'agro-erp', name: 'Agro Business ERP', category: 'Enterprise & ERP', shortDescription: 'Manage farming operations, procurement, sales, and finances with traceability and data-driven insights.', fullDescription: 'A specialized ERP solution for the agriculture industry, designed to manage farming operations, procurement, sales, and finances. ST Agro ERP helps agribusinesses improve productivity, ensure traceability, and make data-driven decisions.', features: ['Farm Operations Management', 'Procurement & Sales Tracking', 'Financial Management', 'Traceability & Reporting'], icon: 'bi-flower1', badge: 'Specialized', rating: 4.7, popular: false, targetUsers: 'Agro Businesses, Farms, Agricultural Traders', modules: ['Farm Management', 'Procurement', 'Sales & Distribution', 'Inventory Tracking', 'Financial Accounts', 'Traceability Reports'], image: 'asset/ready_software/07.jpg' },
  { id: 'accounts-erp', name: 'Accounting Software', category: 'Enterprise & ERP', shortDescription: 'Streamline bookkeeping, invoicing, budgeting, and reporting with real-time financial insights.', fullDescription: 'A powerful accounting and financial management system designed to streamline bookkeeping, invoicing, budgeting, and reporting. ST Accounts ERP helps maintain financial records and make informed decisions with real-time insights.', features: ['Automated Bookkeeping', 'Invoicing & Billing', 'Budgeting Tools', 'Real-Time Financial Reports'], icon: 'bi-calculator', badge: 'Core Finance', rating: 4.8, popular: false, targetUsers: 'Businesses, Accounting Firms, Enterprises', modules: ['General Ledger', 'Invoicing', 'Budgeting', 'Accounts Payable/Receivable', 'Financial Reports', 'Audit Trail'], image: 'asset/ready_software/08.jpg' },
  { id: 'garments-erp', name: 'Garment Management System', category: 'Enterprise & ERP', shortDescription: 'An all-in-one ERP for garments covering production planning, inventory, orders, and payroll.', fullDescription: 'An all-in-one ERP solution for the garments and apparel industry, covering production planning, inventory, order management, and payroll. ST Garments ERP helps streamline operations, ensure quality control, and boost efficiency.', features: ['Production Planning', 'Inventory & Order Management', 'Payroll Integration', 'Quality Control Tracking'], icon: 'bi-scissors', badge: 'RMG Specialized', rating: 5.0, popular: true, targetUsers: 'Garment Factories, Buying Houses, Textile Mills', modules: ['Merchandising', 'Production Planning', 'Fabric Inventory', 'Order Management', 'Payroll', 'Quality Control'], image: 'asset/ready_software/09.jpg' },
  { id: 'hospital', name: 'Hospital Management', category: 'Education & Health', shortDescription: 'A comprehensive ERP for patient records, appointments, billing, inventory, and HR.', fullDescription: 'A comprehensive ERP system that manages patient records, appointments, billing, inventory, HR, and more. ST Hospital ERP streamlines healthcare operations.', features: ['Patient Records Management', 'Appointment Scheduling', 'Billing & Inventory', 'HR & Staff Management'], icon: 'bi-hospital', badge: 'Medical Grade', rating: 4.9, popular: true, targetUsers: 'Hospitals, Clinics, Diagnostic Centers', modules: ['Patient Registration', 'Doctor Appointments', 'Pathology & Radiology', 'Bed Management', 'Pharmacy Sales', 'Billing'], image: 'asset/ready_software/10.jpg' },
  { id: 'rental-erp', name: 'Rental Management ERP', category: 'Real Estate & Infrastructure', shortDescription: 'Manage asset tracking, bookings, contracts, invoicing, and maintenance for rental businesses.', fullDescription: 'A dedicated ERP system for managing rental businesses, covering asset tracking, bookings, contracts, invoicing, and maintenance. ST Rental Management ERP simplifies operations, improves efficiency, and ensures better control over rental assets.', features: ['Asset Tracking', 'Booking & Contract Management', 'Invoicing & Payments', 'Maintenance Scheduling'], icon: 'bi-house-gear', badge: 'Asset Control', rating: 4.6, popular: false, targetUsers: 'Rental Businesses, Equipment Renters, Property Managers', modules: ['Asset Registry', 'Booking Management', 'Contract Ledger', 'Invoicing', 'Maintenance Log', 'Reports'], image: 'asset/ready_software/14.jpg' },
  { id: 'rice-mill', name: 'Auto Rice Mill Management', category: 'Enterprise & ERP', shortDescription: 'Automate paddy procurement, production, inventory, sales, and accounting for rice mills.', fullDescription: 'A specialized software solution for automating rice mill operations, including paddy procurement, production, inventory, sales, and accounting. ST Auto Rice Mill Management helps streamline workflows, reduce waste, and improve overall efficiency.', features: ['Paddy Procurement Tracking', 'Production Line Automation', 'Inventory & Sales Management', 'Accounting Integration'], icon: 'bi-basket3', badge: 'Industrial', rating: 4.7, popular: false, targetUsers: 'Rice Mills, Grain Processors, Agro Traders', modules: ['Procurement', 'Production Tracking', 'Inventory Control', 'Sales & Distribution', 'Accounting', 'Wastage Reports'], image: 'asset/ready_software/15.jpg' },
  { id: 'furniture-mfg', name: 'Furniture Manufacturing Management', category: 'Enterprise & ERP', shortDescription: 'End-to-end software for furniture production, from material sourcing to sales.', fullDescription: 'An end-to-end software solution for managing furniture production, from raw material sourcing to design, manufacturing, inventory, and sales. ST Furniture Manufacturing Management boosts productivity, ensures quality control.', features: ['Raw Material Sourcing', 'Design & Manufacturing Tracking', 'Inventory Management', 'Quality Control'], icon: 'bi-tools', badge: 'Manufacturing', rating: 4.6, popular: false, targetUsers: 'Furniture Manufacturers, Workshops, Showrooms', modules: ['Material Sourcing', 'Production Planning', 'Inventory Control', 'Order Management', 'Quality Control', 'Sales Ledger'], image: 'asset/ready_software/16.jpg' },
  { id: 'dairy-farm', name: 'Dairy Farm Management', category: 'Enterprise & ERP', shortDescription: 'Manage livestock tracking, milk production, feeding schedules, health records, and sales.', fullDescription: 'A comprehensive software solution for managing dairy farm operations, including livestock tracking, milk production, feeding schedules, health records, and sales. ST Dairy Farm Management helps improve productivity.', features: ['Livestock Tracking', 'Milk Production Records', 'Feeding Schedule Management', 'Health Record Tracking'], icon: 'bi-cup-straw', badge: 'Farm Tech', rating: 4.6, popular: false, targetUsers: 'Dairy Farms, Livestock Managers, Cooperatives', modules: ['Livestock Registry', 'Milk Production', 'Feeding Schedule', 'Health Records', 'Sales Ledger', 'Reports'], image: 'asset/ready_software/17.jpg' },
  { id: 'isp-dish', name: 'ISP & Dish Billing Software', category: 'Services & Logistics', shortDescription: 'Billing and management for internet service providers and dish TV operators.', fullDescription: 'A specialized billing and management system for internet service providers and dish TV operators. ST ISP & Dish Billing Software handles subscriber management, package billing, payments, complaints tracking.', features: ['Subscriber Management', 'Package Billing', 'Online Payment Collection', 'Complaints Tracking'], icon: 'bi-broadcast', badge: 'Billing System', rating: 4.7, popular: false, targetUsers: 'ISPs, Dish TV Operators, Cable Networks', modules: ['Subscriber Registry', 'Package Billing', 'Payment Collection', 'Complaints Log', 'Network Reports', 'Accounts'], image: 'asset/ready_software/18.jpg' },
  { id: 'digital-up-sheba', name: 'Digital UP/Word Sheba', category: 'Services & Logistics', shortDescription: 'Digital service platform for Union Parishads and Wards to provide citizen services efficiently.', fullDescription: 'A digital service platform tailored for Union Parishads and Wards to provide citizen services efficiently. ST Digital UP/Word Sheba supports certificate issuance, tax collection, service requests.', features: ['Certificate Issuance', 'Digital Tax Collection', 'Citizen Service Requests', 'Ward-Level Record Keeping'], icon: 'bi-file-earmark-text', badge: 'Govt. Digital', rating: 4.6, popular: false, targetUsers: 'Union Parishads, Ward Offices, Local Government', modules: ['Certificate Issuance', 'Tax Collection', 'Service Requests', 'Citizen Database', 'Notice Board', 'Reports'], image: 'asset/ready_software/19.jpg' },
  { id: 'launch-ticket', name: 'Launch Ticket Management System', category: 'Services & Logistics', shortDescription: 'Manage launch ticket booking, passenger records, schedules, and payments.', fullDescription: 'A web-based system designed to manage launch ticket booking, passenger records, schedules, and payments. ST Launch Ticket Management System streamlines operations and offers a smooth, hassle-free experience for passengers.', features: ['Online Ticket Booking', 'Passenger Record Management', 'Schedule Management', 'Payment Processing'], icon: 'bi-ticket-perforated', badge: 'Travel Tech', rating: 4.6, popular: false, targetUsers: 'Launch Operators, Ferry Services, Travel Agencies', modules: ['Ticket Booking', 'Passenger Records', 'Schedule Management', 'Payment Gateway', 'Boarding Pass', 'Reports'], image: 'asset/ready_software/20.jpg' },
  { id: 'medicine-delivery', name: 'Medicine Delivery System', category: 'Retail & POS', shortDescription: 'Manage online medicine orders, prescriptions, and doorstep delivery for pharmacies.', fullDescription: 'An efficient platform for managing online medicine orders, prescriptions, and doorstep delivery. ST Medicine Delivery System helps pharmacies streamline operations and provide fast, reliable healthcare access to customers.', features: ['Online Medicine Ordering', 'Prescription Management', 'Doorstep Delivery Tracking', 'Pharmacy Inventory Sync'], icon: 'bi-capsule', badge: 'Healthcare', rating: 4.7, popular: false, targetUsers: 'Pharmacies, Medicine Delivery Services', modules: ['Order Management', 'Prescription Upload', 'Delivery Tracking', 'Inventory Sync', 'Payment Gateway', 'Customer Support'], image: 'asset/ready_software/21.jpg' },
  { id: 'cheque-printing', name: 'Cheque Printing Software', category: 'Enterprise & ERP', shortDescription: 'Generate and print cheques accurately with multi-bank templates and detailed logs.', fullDescription: 'A user-friendly solution for generating and printing cheques accurately and efficiently. ST Cheque Printing Software supports multiple banks, custom templates, and detailed cheque logs and reduces manual errors.', features: ['Multi-Bank Cheque Templates', 'Accurate Auto-Fill Printing', 'Detailed Cheque Logs', 'Error Reduction Tools'], icon: 'bi-cash-stack', badge: 'Finance Tool', rating: 4.6, popular: false, targetUsers: 'Businesses, Accounting Departments, Banks', modules: ['Bank Templates', 'Cheque Printing', 'Cheque Log Register', 'Batch Printing', 'Approval Workflow', 'Reports'], image: 'asset/ready_software/22.jpg' },
  { id: 'hardware-shop', name: 'Hardware Shop Management Software', category: 'Retail & POS', shortDescription: 'Manage hardware store sales, purchases, accounts, and billing operations.', fullDescription: 'A complete solution for managing hardware store operations, including sales, purchases, accounts, and billing. ST Hardware Shop Management Software helps streamline day-to-day tasks and boost overall business efficiency.', features: ['Sales & Purchase Tracking', 'Accounts & Billing', 'Inventory Management', 'Supplier Ledger'], icon: 'bi-tools', badge: 'Retail Tool', rating: 4.6, popular: false, targetUsers: 'Hardware Shops, Building Material Stores', modules: ['POS Billing', 'Purchase Ledger', 'Inventory Control', 'Supplier Accounts', 'VAT Reporting', 'Sales Reports'], image: 'asset/ready_software/23.jpg' },
  { id: 'lms', name: 'Learning Management System', category: 'Education & Health', shortDescription: 'Manage courses, online classes, exams, results, and student-teacher communication.', fullDescription: 'A powerful learning management system designed for schools, colleges, and training centers to manage courses, online classes, exams, results, and student-teacher communication.', features: ['Course & Curriculum Management', 'Online Class Delivery', 'Exam & Result Management', 'Student-Teacher Communication'], icon: 'bi-mortarboard', badge: 'E-Learning', rating: 4.8, popular: false, targetUsers: 'Schools, Colleges, Training Centers', modules: ['Course Management', 'Online Classes', 'Exam & Grading', 'Result Publishing', 'Attendance', 'Communication Portal'], image: 'asset/ready_software/24.jpg' },
];

const PRODUCT_DEMO_FIELDS = {
  default: [
    { id: 'demoBranches', label: 'Number of Branches / Locations', type: 'number', placeholder: 'e.g. 1' },
    { id: 'demoUsers', label: 'Number of Users', type: 'number', placeholder: 'e.g. 10' },
  ],
  hrms: [
    { id: 'demoBranches', label: 'Number of Branches', type: 'number', placeholder: 'e.g. 3' },
    { id: 'demoEmployees', label: 'Number of Employees', type: 'number', placeholder: 'e.g. 150' },
  ],
  courier: [
    { id: 'demoBranches', label: 'Number of Branches / Hubs', type: 'number', placeholder: 'e.g. 5' },
    { id: 'demoParcels', label: 'Daily Parcel Volume', type: 'number', placeholder: 'e.g. 500' },
  ],
  pos: [
    { id: 'demoBranches', label: 'Number of Outlets / Shops', type: 'number', placeholder: 'e.g. 2' },
    { id: 'demoCounters', label: 'Number of POS Counters', type: 'number', placeholder: 'e.g. 4' },
  ],
  edu: [
    { id: 'demoStudents', label: 'Number of Students', type: 'number', placeholder: 'e.g. 800' },
    { id: 'demoBranches', label: 'Number of Campuses / Branches', type: 'number', placeholder: 'e.g. 1' },
  ],
  website: [
    { id: 'demoPages', label: 'Approx. Number of Pages', type: 'number', placeholder: 'e.g. 10' },
    { id: 'demoEcommerce', label: 'Need E-Commerce?', type: 'select', options: ['No', 'Yes'] },
  ],
  'real-estate': [
    { id: 'demoProperties', label: 'Number of Properties to List', type: 'number', placeholder: 'e.g. 50' },
    { id: 'demoBranches', label: 'Number of Offices / Branches', type: 'number', placeholder: 'e.g. 1' },
  ],
  'agro-erp': [
    { id: 'demoFarms', label: 'Number of Farms / Locations', type: 'number', placeholder: 'e.g. 3' },
    { id: 'demoUsers', label: 'Number of Users', type: 'number', placeholder: 'e.g. 10' },
  ],
  'accounts-erp': [
    { id: 'demoBranches', label: 'Number of Branches', type: 'number', placeholder: 'e.g. 2' },
    { id: 'demoUsers', label: 'Number of Accounting Users', type: 'number', placeholder: 'e.g. 5' },
  ],
  'garments-erp': [
    { id: 'demoLines', label: 'Number of Production Lines', type: 'number', placeholder: 'e.g. 8' },
    { id: 'demoEmployees', label: 'Number of Employees', type: 'number', placeholder: 'e.g. 500' },
  ],
  hospital: [
    { id: 'demoBeds', label: 'Number of Beds', type: 'number', placeholder: 'e.g. 50' },
    { id: 'demoDoctors', label: 'Number of Doctors', type: 'number', placeholder: 'e.g. 15' },
  ],
  'restaurant-pos': [
    { id: 'demoBranches', label: 'Number of Branches', type: 'number', placeholder: 'e.g. 2' },
    { id: 'demoTables', label: 'Number of Tables', type: 'number', placeholder: 'e.g. 20' },
  ],
  crm: [
    { id: 'demoReps', label: 'Number of Sales Reps', type: 'number', placeholder: 'e.g. 10' },
    { id: 'demoUsers', label: 'Number of Users', type: 'number', placeholder: 'e.g. 15' },
  ],
  ecommerce: [
    { id: 'demoOrders', label: 'Expected Monthly Orders', type: 'number', placeholder: 'e.g. 1000' },
    { id: 'demoProducts', label: 'Number of Products', type: 'number', placeholder: 'e.g. 200' },
  ],
  'rental-erp': [
    { id: 'demoAssets', label: 'Number of Rental Assets', type: 'number', placeholder: 'e.g. 100' },
    { id: 'demoBranches', label: 'Number of Branches', type: 'number', placeholder: 'e.g. 1' },
  ],
  'rice-mill': [
    { id: 'demoCapacity', label: 'Daily Processing Capacity (Tons)', type: 'number', placeholder: 'e.g. 20' },
    { id: 'demoBranches', label: 'Number of Mills / Branches', type: 'number', placeholder: 'e.g. 1' },
  ],
  'furniture-mfg': [
    { id: 'demoWorkshops', label: 'Number of Workshops', type: 'number', placeholder: 'e.g. 2' },
    { id: 'demoEmployees', label: 'Number of Employees', type: 'number', placeholder: 'e.g. 40' },
  ],
  'dairy-farm': [
    { id: 'demoCattle', label: 'Number of Cattle', type: 'number', placeholder: 'e.g. 100' },
    { id: 'demoBranches', label: 'Number of Farm Locations', type: 'number', placeholder: 'e.g. 1' },
  ],
  'isp-dish': [
    { id: 'demoSubscribers', label: 'Number of Subscribers', type: 'number', placeholder: 'e.g. 500' },
    { id: 'demoBranches', label: 'Number of Branches', type: 'number', placeholder: 'e.g. 1' },
  ],
  'digital-up-sheba': [
    { id: 'demoWards', label: 'Number of Wards', type: 'number', placeholder: 'e.g. 9' },
    { id: 'demoUsers', label: 'Number of Staff Users', type: 'number', placeholder: 'e.g. 5' },
  ],
  'launch-ticket': [
    { id: 'demoVessels', label: 'Number of Launches / Vessels', type: 'number', placeholder: 'e.g. 5' },
    { id: 'demoBranches', label: 'Number of Ticket Counters', type: 'number', placeholder: 'e.g. 3' },
  ],
  'medicine-delivery': [
    { id: 'demoBranches', label: 'Number of Pharmacy Branches', type: 'number', placeholder: 'e.g. 2' },
    { id: 'demoOrders', label: 'Expected Daily Orders', type: 'number', placeholder: 'e.g. 100' },
  ],
  'cheque-printing': [
    { id: 'demoAccounts', label: 'Number of Bank Accounts', type: 'number', placeholder: 'e.g. 5' },
    { id: 'demoUsers', label: 'Number of Users', type: 'number', placeholder: 'e.g. 3' },
  ],
  'hardware-shop': [
    { id: 'demoBranches', label: 'Number of Branches', type: 'number', placeholder: 'e.g. 2' },
    { id: 'demoCounters', label: 'Number of Sales Counters', type: 'number', placeholder: 'e.g. 3' },
  ],
  lms: [
    { id: 'demoStudents', label: 'Number of Students', type: 'number', placeholder: 'e.g. 300' },
    { id: 'demoCourses', label: 'Number of Courses', type: 'number', placeholder: 'e.g. 12' },
  ],
};

const INDUSTRIES = [
  { name: 'Garments', icon: 'bi-scissors', color: '#f59e0b' },
  { name: 'Real Estate', icon: 'bi-building-fill', color: '#0ea5e9' },
  { name: 'Hospitality', icon: 'bi-cup-hot-fill', color: '#60a5fa' },
  { name: 'RMG', icon: 'bi-bag-fill', color: '#22c55e' },
  { name: 'Education', icon: 'bi-mortarboard-fill', color: '#10b981' },
  { name: 'Pharmacy', icon: 'bi-capsule', color: '#14b8a6' },
  { name: 'Automotive', icon: 'bi-car-front-fill', color: '#ec4899' },
  { name: 'E-commerce', icon: 'bi-cart-fill', color: '#3b82f6' },
  { name: 'UI/UX', icon: 'bi-palette-fill', color: '#f59e0b' },
  { name: 'Health Care', icon: 'bi-heart-pulse-fill', color: '#f472b6' },
  { name: 'Agro', icon: 'bi-tree-fill', color: '#22c55e' },
  { name: 'Many More', icon: 'bi-grid-3x3-gap-fill', color: '#6366f1' },
];

const TECH_STACK = [
  // Frontend
  { name: 'React.js', category: 'Frontend', iconClass: 'devicon-react-original colored', description: 'Component-based UI library for ultra-fast web interfaces.' },
  { name: 'Next.js', category: 'Frontend', iconClass: 'devicon-nextjs-original-wordmark colored', description: 'Server-side rendering & static site generation framework.' },
  { name: 'jQuery', category: 'Frontend', iconClass: 'devicon-jquery-plain colored', description: 'Lightweight JavaScript library for DOM manipulation and event handling.' },
  { name: 'HTML5', category: 'Frontend', iconClass: 'devicon-html5-plain colored', description: 'Modern semantic web structure and markup standard.' },
  { name: 'CSS3 / SCSS', category: 'Frontend', iconClass: 'devicon-sass-original colored', description: 'Advanced responsive styling, animations, and SASS preprocessor.' },
  { name: 'Tailwind CSS', category: 'Frontend', iconClass: 'devicon-tailwindcss-sharp colored', description: 'Utility-first CSS framework for rapid modern UI development.' },
  { name: 'Bootstrap', category: 'Frontend', iconClass: 'devicon-bootstrap-plain colored', description: 'Responsive mobile-first component grid system.' },

  // Backend
  { name: 'Node.js', category: 'Backend', iconClass: 'devicon-nodejs-plain colored', description: 'Scalable event-driven JavaScript server runtime.' },
  { name: 'Express.js', category: 'Backend', iconClass: 'devicon-express-original colored', description: 'Minimalist and fast web API backend framework for Node.' },
  { name: 'Laravel (PHP)', category: 'Backend', iconClass: 'devicon-laravel-original colored', description: 'Robust, elegant PHP MVC framework for enterprise web apps.' },
  { name: 'CodeIgniter (PHP)', category: 'Backend', iconClass: 'devicon-codeigniter-plain colored', description: 'Lightweight and high-speed PHP framework for quick applications.' },
  { name: 'WordPress', category: 'Backend', iconClass: 'devicon-wordpress-plain colored', description: 'Content Management System for blogs and websites.' },

  // Mobile
  { name: 'Flutter', category: 'Mobile', iconClass: 'devicon-flutter-plain colored', description: 'Google cross-platform SDK for iOS and Android apps.' },

  // Databases
  { name: 'MySQL', category: 'Databases', iconClass: 'devicon-mysql-plain colored', description: 'High-performance relational database management system.' },
  { name: 'Firebase', category: 'Databases', iconClass: 'devicon-firebase-plain colored', description: 'Google cloud real-time NoSQL database & authentication platform.' },

  // Languages & Tools
  { name: 'TypeScript', category: 'Languages & Tools', iconClass: 'devicon-typescript-plain colored', description: 'Strongly typed JavaScript superset for scalable codebase.' },
  { name: 'JavaScript (ES6+)', category: 'Languages & Tools', iconClass: 'devicon-javascript-plain colored', description: 'Modern dynamic web programming language.' },
  { name: 'REST API', category: 'Languages & Tools', iconClass: 'bi bi-arrow-repeat text-primary fs-2', description: 'Standardized JSON web API communication protocol.' },
  { name: 'AWS', category: 'Languages & Tools', iconClass: 'devicon-amazonwebservices-plain-wordmark colored', description: 'Amazon Cloud Infrastructure, EC2, S3 & RDS deployment.' },
  { name: 'Git & GitHub', category: 'Languages & Tools', iconClass: 'devicon-github-original colored', description: 'Version control system and code collaboration platform.' },
  { name: 'GitLab', category: 'Languages & Tools', iconClass: 'devicon-gitlab-plain colored', description: 'DevOps lifecycle and CI/CD automated deployment pipelines.' },
  { name: 'Vercel', category: 'Languages & Tools', iconClass: 'devicon-vercel-original colored', description: 'Instant serverless web hosting & edge deployment.' },
  { name: 'Netlify', category: 'Languages & Tools', iconClass: 'devicon-netlify-plain colored', description: 'Modern static web publishing & continuous integration.' },
  { name: 'Nginx', category: 'Languages & Tools', iconClass: 'devicon-nginx-original colored', description: 'High-performance web server, reverse proxy & load balancer.' },
  { name: 'Apache', category: 'Languages & Tools', iconClass: 'devicon-apache-plain colored', description: 'Reliable cross-platform HTTP web server.' },
  { name: 'Redux', category: 'Languages & Tools', iconClass: 'devicon-redux-plain colored', description: 'Predictable state container for JavaScript apps.' },
  { name: 'Figma', category: 'Languages & Tools', iconClass: 'devicon-figma-plain colored', description: 'Collaborative interface design and prototyping tool.' },
  { name: 'Trello', category: 'Languages & Tools', iconClass: 'devicon-trello-plain colored', description: 'Visual project management and task tracking tool.' },
  { name: 'Jira', category: 'Languages & Tools', iconClass: 'devicon-jira-plain colored', description: 'Agile project management and issue tracking software.' },

  // AI Tools & Assistants
  { name: 'GitHub Copilot', category: 'Languages & Tools', iconClass: 'bi bi-github text-primary fs-2', description: 'AI-powered code completion and suggestion tool.' },
  { name: 'Antigravity', category: 'Languages & Tools', iconClass: 'bi bi-rocket-takeoff text-primary fs-2', description: 'AI-powered development environment and code generation.' },
  { name: 'Claude', category: 'Languages & Tools', iconClass: 'bi bi-cpu text-primary fs-2', description: 'Anthropic\'s AI assistant for complex tasks and reasoning.' },
  { name: 'ChatGPT', category: 'Languages & Tools', iconClass: 'bi bi-chat-dots text-primary fs-2', description: 'OpenAI\'s conversational AI for content creation and analysis.' },
  { name: 'Gemini', category: 'Languages & Tools', iconClass: 'bi bi-stars text-primary fs-2', description: 'Google\'s multimodal AI model for diverse tasks.' },
  { name: 'Deepseek', category: 'Languages & Tools', iconClass: 'bi bi-search text-primary fs-2', description: 'Advanced AI model for deep reasoning and analysis.' },
];

const COMPANY_STATS = [
  {
    id: 'projects',
    label: 'Projects Completed',
    value: '1200+',
    icon: 'bi-check-circle-fill',
    description: 'Custom software, web applications, and mobile apps successfully delivered.'
  },
  {
    id: 'clients',
    label: 'Satisfied Clients',
    value: '1000+',
    icon: 'bi-emoji-smile-fill',
    description: 'Businesses, educational institutes, and healthcare organizations served.'
  },
  {
    id: 'employees',
    label: 'Expert Team Members',
    value: '36+',
    icon: 'bi-people-fill',
    description: 'Skilled software engineers, UI/UX designers, and network specialists.'
  },
  {
    id: 'support',
    label: 'Technical Support',
    value: '24/7',
    icon: 'bi-clock-history',
    description: 'Round-the-clock server monitoring, technical troubleshooting, and maintenance.'
  },
  {
    id: 'success-rate',
    label: 'Success Rate',
    value: '95%',
    icon: 'bi-award-fill',
    description: 'On-time delivery, high client satisfaction, and long-term retainer partnerships.'
  },
];

const CLIENT_PROJECTS = [
  // Row 1
  { name: 'Ispahani Agro Limited', logo: 'asset/clients/01.png', category: ['ERP', 'Private'], projectName: 'ST ERP', products: ['ST ERP', 'ST Plan'], totalUnit: '05', features: ['Human Capital Management', 'Accounts & Financial Management', 'Purchase Management', 'Material Management', 'Sales & Billing Management', 'Inventory Management'], status: 'Ongoing' },
  { name: 'SGS', logo: 'asset/clients/02.png', category: ['Private'], projectName: 'ST Quality', products: ['ST ERP'], totalUnit: '02', features: ['Quality Management', 'Compliance Tracking', 'Audit Management'], status: 'Ongoing' },
  { name: 'Studio 32', logo: 'asset/clients/03.webp', category: ['Private', 'Media'], projectName: 'ST Media', products: ['ST ERP'], totalUnit: '01', features: ['Content Management', 'Production Workflow', 'Client Billing'], status: 'Ongoing' },
  { name: 'Walton', logo: 'asset/clients/04.png', category: ['ERP', 'Private'], projectName: 'ST ERP', products: ['ST ERP'], totalUnit: '08', features: ['Human Capital Management', 'Accounts & Financial Management', 'Purchase Management', 'Production Management', 'Inventory Management'], status: 'Ongoing' },
  { name: 'Sader', logo: 'asset/clients/05.png', category: ['Private'], projectName: 'ST Logistics', products: ['ST ERP'], totalUnit: '02', features: ['Fleet Management', 'Order Tracking', 'Delivery Management'], status: 'Ongoing' },
  { name: 'ISC', logo: 'asset/clients/06.png', category: ['Private', 'Technology'], projectName: 'ST Tech', products: ['ST ERP'], totalUnit: '03', features: ['IT Asset Management', 'Service Desk', 'Project Management'], status: 'Ongoing' },
  { name: 'Malek Spinning Mills Ltd.', logo: 'asset/clients/07.jpg', category: ['ERP', 'Private'], projectName: 'ST Garments ERP', products: ['ST ERP', 'ST HRMS'], totalUnit: '03', features: ['Merchandising', 'Production Planning', 'Fabric Inventory', 'Order Management', 'Payroll', 'Quality Control'], status: 'Ongoing' },
  { name: 'BEACON', logo: 'asset/clients/08.jpg', category: ['Private'], projectName: 'ST Beacon', products: ['ST ERP'], totalUnit: '02', features: ['HR Management', 'Attendance System', 'Payroll'], status: 'Ongoing' },
  { name: 'Bangladesh Land', logo: 'asset/clients/09.jpg', category: ['Private', 'Real Estate'], projectName: 'ST Land', products: ['ST ERP'], totalUnit: '02', features: ['Property Management', 'Customer Database', 'Sales Tracking'], status: 'Completed' },
  { name: 'United Group', logo: 'asset/clients/10.jpg', category: ['ERP', 'Private'], projectName: 'ST ERP', products: ['ST ERP', 'ST Plan'], totalUnit: '10', features: ['Human Capital Management', 'Accounts & Financial Management', 'Purchase Management', 'Sales & Billing Management'], status: 'Ongoing' },
  { name: 'CCI', logo: 'asset/clients/11.jpg', category: ['Private'], projectName: 'ST CCI', products: ['ST ERP'], totalUnit: '01', features: ['Compliance Management', 'Document Control', 'Audit Trail'], status: 'Ongoing' },
  { name: 'Seamark', logo: 'asset/clients/12.jpg', category: ['Private', 'Logistics'], projectName: 'ST Shipping', products: ['ST ERP'], totalUnit: '03', features: ['Ship Tracking', 'Container Management', 'Port Operations'], status: 'Ongoing' },
  { name: 'Foring', logo: 'asset/clients/13.png', category: ['Private'], projectName: 'ST Foring', products: ['ST ERP'], totalUnit: '01', features: ['Order Management', 'Inventory Control', 'Billing'], status: 'Completed' },
  { name: 'MGI', logo: 'asset/clients/14.png', category: ['Private'], projectName: 'ST MGI', products: ['ST ERP'], totalUnit: '02', features: ['Manufacturing Execution', 'Quality Control', 'Inventory'], status: 'Ongoing' },
  { name: 'BAT', logo: 'asset/clients/15.png', category: ['Private', 'FMCG'], projectName: 'ST FMCG', products: ['ST ERP'], totalUnit: '04', features: ['Distribution Management', 'Sales Force Automation', 'Inventory Control'], status: 'Ongoing' },
  { name: 'PLCS', logo: 'asset/clients/16.png', category: ['Private'], projectName: 'ST PLCS', products: ['ST ERP'], totalUnit: '01', features: ['Customer Management', 'Service Delivery', 'Billing'], status: 'Ongoing' },
  { name: 'ASCEND', logo: 'asset/clients/17.jpg', category: ['Private', 'Technology'], projectName: 'ST Ascend', products: ['ST ERP'], totalUnit: '02', features: ['Project Management', 'Resource Allocation', 'Time Tracking'], status: 'Ongoing' },
  { name: 'Zisan', logo: 'asset/clients/18.gif', category: ['Private'], projectName: 'ST Zisan', products: ['ST ERP'], totalUnit: '01', features: ['HR & Payroll', 'Leave Management', 'Attendance'], status: 'Ongoing' },

  // Row 2
  { name: 'BASIS', logo: 'asset/clients/19.jpg', category: ['Private', 'Technology'], projectName: 'ST BASIS', products: ['ST ERP'], totalUnit: '01', features: ['Member Management', 'Event Management', 'Billing'], status: 'Ongoing' },
  { name: 'Texvista', logo: 'asset/clients/20.png', category: ['Private', 'Textile'], projectName: 'ST Textile', products: ['ST ERP'], totalUnit: '02', features: ['Fabric Management', 'Production Planning', 'Inventory Control'], status: 'Ongoing' },
  { name: 'Channel I', logo: 'asset/clients/21.png', category: ['Private', 'Media'], projectName: 'ST Media', products: ['ST ERP'], totalUnit: '02', features: ['Content Management', 'Broadcast Scheduling', 'Ad Sales'], status: 'Ongoing' },
  { name: 'Expressway', logo: 'asset/clients/22.png', category: ['Private', 'Infrastructure'], projectName: 'ST Expressway', products: ['ST ERP'], totalUnit: '02', features: ['Project Management', 'Toll Management', 'Maintenance Tracking'], status: 'Ongoing' },
  { name: 'Sachatan', logo: 'asset/clients/23.webp', category: ['Private'], projectName: 'ST Sachatan', products: ['ST ERP'], totalUnit: '01', features: ['Member Management', 'Facility Booking', 'Billing'], status: 'Ongoing' },
  { name: 'FASTER', logo: 'asset/clients/24.jpg', category: ['Private', 'Logistics'], projectName: 'ST Logistics', products: ['ST ERP'], totalUnit: '03', features: ['Fleet Tracking', 'Delivery Optimization', 'Driver Management'], status: 'Ongoing' },
  { name: 'Nagarbajzar', logo: 'asset/clients/25.jpg', category: ['Private', 'Real Estate'], projectName: 'ST Real Estate', products: ['ST ERP'], totalUnit: '02', features: ['Property Listing', 'Client Management', 'Sales Tracking'], status: 'Ongoing' },
  { name: 'Bobby', logo: 'asset/clients/26.jpg', category: ['Private'], projectName: 'ST Bobby', products: ['ST ERP'], totalUnit: '01', features: ['Inventory Management', 'POS System', 'Customer Database'], status: 'Completed' },
  { name: 'Kazi Farms', logo: 'asset/clients/27.png', category: ['ERP', 'Private'], projectName: 'ST Agro ERP', products: ['ST ERP'], totalUnit: '04', features: ['Farm Management', 'Procurement', 'Sales & Distribution', 'Inventory Tracking', 'Financial Accounts'], status: 'Ongoing' },
  { name: 'Tiger', logo: 'asset/clients/28.png', category: ['Private'], projectName: 'ST Tiger', products: ['ST ERP'], totalUnit: '01', features: ['Inventory Control', 'Sales Management', 'Billing'], status: 'Ongoing' },
  { name: "Chef's Cuisine", logo: 'asset/clients/29.png', category: ['Private', 'Food'], projectName: 'ST Restaurant', products: ['ST ERP', 'ST POS'], totalUnit: '02', features: ['Order Management', 'Inventory Control', 'Table Reservation', 'Billing'], status: 'Ongoing' },
  { name: 'CCU IMP', logo: 'asset/clients/30.jpg', category: ['Private'], projectName: 'ST CCU', products: ['ST ERP'], totalUnit: '01', features: ['Inventory Management', 'Procurement', 'Billing'], status: 'Ongoing' },
  { name: 'SEBL', logo: 'asset/clients/31.jpg', category: ['ERP', 'Private'], projectName: 'ST Accounts ERP', products: ['ST ERP'], totalUnit: '02', features: ['General Ledger', 'Invoicing', 'Accounts Payable/Receivable', 'Financial Reports'], status: 'Completed' },
  { name: 'Urea', logo: 'asset/clients/32.png', category: ['Private', 'Agro'], projectName: 'ST Urea', products: ['ST ERP'], totalUnit: '02', features: ['Distribution Management', 'Inventory Control', 'Sales Tracking'], status: 'Ongoing' },
  { name: 'Jhakor', logo: 'asset/clients/33.jpg', category: ['Private'], projectName: 'ST Jhakor', products: ['ST ERP'], totalUnit: '01', features: ['HR Management', 'Payroll', 'Attendance'], status: 'Ongoing' },
  { name: 'Azad Printers', logo: 'asset/clients/34.jpg', category: ['Private'], projectName: 'ST Printing', products: ['ST ERP'], totalUnit: '02', features: ['Order Management', 'Production Planning', 'Inventory Control'], status: 'Ongoing' },
  { name: 'Kazi Farm', logo: 'asset/clients/35.jpg', category: ['Private', 'Agro'], projectName: 'ST Agro', products: ['ST ERP'], totalUnit: '02', features: ['Poultry Management', 'Feed Management', 'Sales Tracking'], status: 'Ongoing' },

  // Row 3
  { name: 'Cafe 71', logo: 'asset/clients/36.jpg', category: ['Private', 'Food'], projectName: 'ST Cafe', products: ['ST ERP', 'ST POS'], totalUnit: '01', features: ['Order Management', 'Inventory Control', 'Billing'], status: 'Ongoing' },
  { name: 'Eat & Eat', logo: 'asset/clients/37.jpg', category: ['Private', 'Food'], projectName: 'ST Restaurant', products: ['ST ERP', 'ST POS'], totalUnit: '02', features: ['Order Management', 'Kitchen Management', 'Table Reservation', 'Billing'], status: 'Ongoing' },
  { name: 'Indian Restaurant', logo: 'asset/clients/38.jpg', category: ['Private', 'Food'], projectName: 'ST Restaurant', products: ['ST ERP', 'ST POS'], totalUnit: '01', features: ['Order Management', 'Inventory Control', 'Billing'], status: 'Ongoing' },
  { name: 'Tasty Foods', logo: 'asset/clients/39.png', category: ['Private', 'Food'], projectName: 'ST Food', products: ['ST ERP'], totalUnit: '01', features: ['Production Management', 'Inventory Control', 'Distribution'], status: 'Ongoing' },
  { name: 'Mr. Manik', logo: 'asset/clients/40.jpg', category: ['Private', 'Food'], projectName: 'ST Restaurant', products: ['ST ERP', 'ST POS'], totalUnit: '01', features: ['Order Management', 'Inventory Control', 'Billing'], status: 'Completed' },
  { name: 'Mackee Baby', logo: 'asset/clients/41.jpg', category: ['Private', 'FMCG'], projectName: 'ST FMCG', products: ['ST ERP'], totalUnit: '02', features: ['Distribution Management', 'Sales Tracking', 'Inventory Control'], status: 'Ongoing' },
  { name: 'Panta Fresh', logo: 'asset/clients/42.jpg', category: ['Private', 'Food'], projectName: 'ST Food', products: ['ST ERP'], totalUnit: '01', features: ['Inventory Management', 'Sales Tracking', 'Billing'], status: 'Ongoing' },
  { name: 'Frego Cafe', logo: 'asset/clients/43.png', category: ['Private', 'Food'], projectName: 'ST Cafe', products: ['ST ERP', 'ST POS'], totalUnit: '01', features: ['Order Management', 'Inventory Control', 'Customer Management'], status: 'Ongoing' },
  { name: 'State of Foods', logo: 'asset/clients/44.jpg', category: ['Private', 'Food'], projectName: 'ST Food', products: ['ST ERP'], totalUnit: '02', features: ['Production Management', 'Quality Control', 'Distribution'], status: 'Ongoing' },
  { name: 'Expressway', logo: 'asset/clients/45.png', category: ['Private', 'Infrastructure'], projectName: 'ST Expressway', products: ['ST ERP'], totalUnit: '01', features: ['Project Management', 'Maintenance Tracking', 'Billing'], status: 'Completed' },
  { name: 'K Family', logo: 'asset/clients/46.png', category: ['Private'], projectName: 'ST Family', products: ['ST ERP'], totalUnit: '01', features: ['HR Management', 'Payroll', 'Attendance'], status: 'Ongoing' },
  { name: 'Akanda', logo: 'asset/clients/47.jpg', category: ['Private', 'Real Estate'], projectName: 'ST Real Estate', products: ['ST ERP'], totalUnit: '02', features: ['Property Management', 'Customer Database', 'Sales Tracking'], status: 'Ongoing' },
  { name: 'Paradise Restaurant', logo: 'asset/clients/48.jpg', category: ['Private', 'Food'], projectName: 'ST Restaurant', products: ['ST ERP', 'ST POS'], totalUnit: '02', features: ['Order Management', 'Inventory Control', 'Billing', 'Reservation'], status: 'Ongoing' },
  { name: 'Peri-Peri Grill', logo: 'asset/clients/49.png', category: ['Private', 'Food'], projectName: 'ST Restaurant', products: ['ST ERP', 'ST POS'], totalUnit: '01', features: ['Order Management', 'Inventory Control', 'Billing'], status: 'Ongoing' },
  { name: 'FastTv.com', logo: 'asset/clients/50.jpg', category: ['Private', 'Media'], projectName: 'ST Media', products: ['ST ERP'], totalUnit: '02', features: ['Content Management', 'Ad Management', 'Subscription Management'], status: 'Ongoing' },
  { name: 'FBL', logo: 'asset/clients/51.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'TAANZ', logo: 'asset/clients/52.png', category: ['Private'], projectName: 'ST TAANZ', products: ['ST ERP'], totalUnit: '01', features: ['HR Management', 'Payroll', 'Compliance'], status: 'Ongoing' },

  // Row 4
  { name: 'Charuni', logo: 'asset/clients/53.jpg', category: ['Private'], projectName: 'ST Charuni', products: ['ST ERP'], totalUnit: '01', features: ['Inventory Management', 'Sales Tracking', 'Billing'], status: 'Ongoing' },
  { name: 'GCCI', logo: 'asset/clients/54.jpg', category: ['Private'], projectName: 'ST GCCI', products: ['ST ERP'], totalUnit: '01', features: ['Member Management', 'Event Management', 'Billing'], status: 'Ongoing' },
  { name: 'Good America', logo: 'asset/clients/55.jpg', category: ['Private', 'FMCG'], projectName: 'ST FMCG', products: ['ST ERP'], totalUnit: '02', features: ['Distribution Management', 'Sales Force Automation', 'Inventory Control'], status: 'Ongoing' },
  { name: 'SPL', logo: 'asset/clients/56.jpg', category: ['Private'], projectName: 'ST SPL', products: ['ST ERP'], totalUnit: '01', features: ['Project Management', 'Resource Management', 'Billing'], status: 'Ongoing' },
  { name: 'MF Foods', logo: 'asset/clients/57.jpg', category: ['Private', 'Food'], projectName: 'ST Food', products: ['ST ERP'], totalUnit: '02', features: ['Production Management', 'Inventory Control', 'Distribution'], status: 'Ongoing' },
  { name: 'MK', logo: 'asset/clients/58.jpg', category: ['Private'], projectName: 'ST MK', products: ['ST ERP'], totalUnit: '01', features: ['HR Management', 'Payroll', 'Attendance'], status: 'Completed' },
  { name: 'Xiaomi', logo: 'asset/clients/59.png', category: ['International', 'Private'], projectName: 'ST POS', products: ['ST ERP', 'ST POS'], totalUnit: '12', features: ['POS Terminal', 'Inventory Control', 'Customer CRM', 'Barcode Generator'], status: 'Ongoing' },
  { name: 'ACME', logo: 'asset/clients/60.jpg', category: ['Private'], projectName: 'ST ACME', products: ['ST ERP'], totalUnit: '02', features: ['Quality Management', 'Compliance Tracking', 'Audit Management'], status: 'Ongoing' },
  { name: 'Bangla Insider', logo: 'asset/clients/61.png', category: ['Private', 'Media'], projectName: 'ST Media', products: ['ST ERP'], totalUnit: '01', features: ['Content Management', 'Ad Management', 'Subscription Management'], status: 'Ongoing' },
  { name: 'Mong', logo: 'asset/clients/62.jpg', category: ['Private', 'Agro'], projectName: 'ST Agro', products: ['ST ERP'], totalUnit: '02', features: ['Farm Management', 'Distribution', 'Sales Tracking'], status: 'Ongoing' },
  { name: 'Tilottoma', logo: 'asset/clients/63.jpg', category: ['Private', 'Agro'], projectName: 'ST Agro', products: ['ST ERP'], totalUnit: '01', features: ['Farm Management', 'Procurement', 'Sales'], status: 'Ongoing' },
  { name: 'Evince', logo: 'asset/clients/64.jpg', category: ['Private', 'Textile'], projectName: 'ST Textile', products: ['ST ERP'], totalUnit: '03', features: ['Fabric Management', 'Production Planning', 'Inventory Control', 'Quality Control'], status: 'Ongoing' },
  { name: 'Metro Express', logo: 'asset/clients/65.jpg', category: ['Private', 'Logistics'], projectName: 'ST Logistics', products: ['ST ERP'], totalUnit: '02', features: ['Fleet Management', 'Delivery Tracking', 'Route Optimization'], status: 'Ongoing' },
  { name: 'Cocomaya', logo: 'asset/clients/66.jpg', category: ['Private', 'Food'], projectName: 'ST Restaurant', products: ['ST ERP', 'ST POS'], totalUnit: '01', features: ['Order Management', 'Inventory Control', 'Billing'], status: 'Ongoing' },
  { name: 'Eastern', logo: 'asset/clients/67.png', category: ['Private'], projectName: 'ST Eastern', products: ['ST ERP'], totalUnit: '02', features: ['HR Management', 'Payroll', 'Attendance'], status: 'Ongoing' },
  { name: 'IBN', logo: 'asset/clients/68.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Simco', logo: 'asset/clients/69.png', category: ['Private'], projectName: 'ST Simco', products: ['ST ERP'], totalUnit: '01', features: ['Inventory Management', 'Sales Tracking', 'Billing'], status: 'Ongoing' },

  // Row 5 - Banks
  { name: 'Sonali Bank', logo: 'asset/clients/70.png', category: ['Government', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '05', features: ['Core Banking', 'Loan Management', 'Customer Management', 'Treasury Management'], status: 'Ongoing' },
  { name: 'Agrani Bank', logo: 'asset/clients/71.png', category: ['Government', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '04', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'ICB', logo: 'asset/clients/72.png', category: ['Government', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '03', features: ['Investment Management', 'Portfolio Tracking', 'Customer Management'], status: 'Ongoing' },
  { name: 'AFC', logo: 'asset/clients/73.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'ICS', logo: 'asset/clients/74.png', category: ['Private', 'Technology'], projectName: 'ST Tech', products: ['ST ERP'], totalUnit: '01', features: ['IT Service Management', 'Project Management', 'Billing'], status: 'Ongoing' },
  { name: 'Prime Bank', logo: 'asset/clients/75.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'JBL', logo: 'asset/clients/76.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'China Bank', logo: 'asset/clients/77.png', category: ['International', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Trade Finance', 'Customer Management'], status: 'Ongoing' },
  { name: 'Bangladesh Bank', logo: 'asset/clients/78.png', category: ['Government'], projectName: 'ST Digital Sheba', products: ['ST ERP'], totalUnit: '06', features: ['Certificate Issuance', 'Digital Tax Collection', 'Citizen Service Requests', 'Notice Board'], status: 'Ongoing' },
  { name: 'DBC', logo: 'asset/clients/79.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'BCL', logo: 'asset/clients/80.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'DBBL', logo: 'asset/clients/81.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '03', features: ['Core Banking', 'Loan Management', 'Islamic Banking'], status: 'Ongoing' },
  { name: 'Premier Bank', logo: 'asset/clients/82.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Bangla Bank', logo: 'asset/clients/83.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Dhaka Bank', logo: 'asset/clients/84.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Rupali Bank', logo: 'asset/clients/85.png', category: ['Government', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '03', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Karmasangsthan', logo: 'asset/clients/86.png', category: ['Government', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },

  // Row 6 - More Banks
  { name: 'Krishak Bank', logo: 'asset/clients/87.png', category: ['Government', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Agricultural Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Rajshahi Bank', logo: 'asset/clients/88.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'SIBL', logo: 'asset/clients/89.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Islamic Banking', 'Customer Management'], status: 'Ongoing' },
  { name: 'Social Bank', logo: 'asset/clients/90.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'NRB Bank', logo: 'asset/clients/91.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Remittance Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Standard Bank', logo: 'asset/clients/92.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Trade Finance', 'Customer Management'], status: 'Ongoing' },
  { name: 'Global Bank', logo: 'asset/clients/93.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'International Banking', 'Customer Management'], status: 'Ongoing' },
  { name: 'NCC Bank', logo: 'asset/clients/94.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Trust Bank', logo: 'asset/clients/95.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Trust Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Midland Bank', logo: 'asset/clients/96.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Shahjalal Bank', logo: 'asset/clients/97.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Islamic Banking', 'Customer Management'], status: 'Ongoing' },
  { name: 'IFIC Bank', logo: 'asset/clients/98.jpg', category: ['Private', 'ERP'], projectName: 'ST Cheque Printing', products: ['ST ERP'], totalUnit: '03', features: ['Bank Templates', 'Cheque Printing', 'Cheque Log Register', 'Approval Workflow'], status: 'Ongoing' },
  { name: 'Southeast Bank', logo: 'asset/clients/99.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'EWU', logo: 'asset/clients/100.png', category: ['Private', 'Education'], projectName: 'ST Edu', products: ['ST ERP'], totalUnit: '01', features: ['Student Management', 'Faculty Management', 'Course Management'], status: 'Ongoing' },
  { name: 'BAF', logo: 'asset/clients/101.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '01', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Uttara Bank', logo: 'asset/clients/102.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Commercial Bank', logo: 'asset/clients/103.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Commercial Lending', 'Customer Management'], status: 'Ongoing' },
  { name: 'Padma Bank', logo: 'asset/clients/104.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },

  // Row 7 - Education & Others
  { name: 'BUET', logo: 'asset/clients/105.jpg', category: ['Government', 'International'], projectName: 'ST Edu', products: ['ST ERP'], totalUnit: '01', features: ['Student Admission & Enrollment', 'Online Class Integration', 'Exam & Grading System'], status: 'Ongoing' },
  { name: 'Green Delta', logo: 'asset/clients/106.jpg', category: ['Private'], products: ['ST ERP'], projectName: 'ST HRMS', totalUnit: '01', features: ['Employee Database', 'Attendance Tracking', 'Payroll Processing', 'Leave Management'], status: 'Ongoing' },
  { name: 'DU (Dhaka University)', logo: 'asset/clients/107.jpg', category: ['Government'], projectName: 'ST Edu', products: ['ST ERP'], totalUnit: '01', features: ['Admission System', 'Attendance Tracking', 'Fees Ledger', 'Parent Portal'], status: 'Completed' },
  { name: 'DIU', logo: 'asset/clients/108.png', category: ['Private', 'Education'], projectName: 'ST Edu', products: ['ST ERP'], totalUnit: '01', features: ['Student Management', 'Online Class Integration', 'Exam & Grading System'], status: 'Ongoing' },
  { name: 'Sylhet Bank', logo: 'asset/clients/109.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'UFS', logo: 'asset/clients/110.jpg', category: ['Private'], projectName: 'ST UFS', products: ['ST ERP'], totalUnit: '01', features: ['HR Management', 'Payroll', 'Attendance'], status: 'Ongoing' },
  { name: 'Nobin Bank', logo: 'asset/clients/111.png', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '01', features: ['Core Banking', 'Customer Management'], status: 'Ongoing' },
  { name: 'Shimanto Bank', logo: 'asset/clients/112.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Grameen Bank', logo: 'asset/clients/113.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '03', features: ['Core Banking', 'Microfinance', 'Customer Management'], status: 'Ongoing' },
  { name: 'FRI', logo: 'asset/clients/114.jpg', category: ['Private'], projectName: 'ST FRI', products: ['ST ERP'], totalUnit: '01', features: ['Research Management', 'Project Management', 'Billing'], status: 'Ongoing' },
  { name: 'GU', logo: 'asset/clients/115.png', category: ['Private', 'Education'], projectName: 'ST Edu', products: ['ST ERP'], totalUnit: '01', features: ['Student Management', 'Faculty Management', 'Course Management'], status: 'Ongoing' },
  { name: 'UBL', logo: 'asset/clients/116.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' },
  { name: 'Kishoreganj Bank', logo: 'asset/clients/117.jpg', category: ['Private', 'Banking'], projectName: 'ST Banking', products: ['ST ERP'], totalUnit: '02', features: ['Core Banking', 'Loan Management', 'Customer Management'], status: 'Ongoing' }
];

const BLOG_POSTS = [
  {
    id: 'why-erp-matters-2026',
    title: 'Why Every Growing Business Needs an ERP System in 2026',
    excerpt: 'Discover how a unified ERP eliminates data silos, automates workflows, and gives leadership real-time visibility across every department.',
    category: 'ERP & Software',
    date: 'July 12, 2026',
    readTime: '6 min read',
    author: 'STITBD Editorial Team',
    image: 'asset/blog/01.png',
  },
  {
    id: 'bkash-nagad-integration-guide',
    title: 'A Practical Guide to Integrating bKash & Nagad Into Your Website',
    excerpt: 'Step-by-step insight into how local payment gateway integration boosts checkout conversion for Bangladeshi e-commerce businesses.',
    category: 'Web Development',
    date: 'June 28, 2026',
    readTime: '5 min read',
    author: 'STITBD Editorial Team',
    image: 'asset/blog/02.png',
  },
  {
    id: 'biometric-attendance-hr-2026',
    title: 'Biometric Attendance: The Smartest Upgrade for Modern HR Teams',
    excerpt: 'Explore how fingerprint and face recognition attendance systems cut payroll errors and save hundreds of manual HR hours every month.',
    category: 'HR & Payroll',
    date: 'June 15, 2026',
    readTime: '4 min read',
    author: 'STITBD Editorial Team',
    image: 'asset/blog/03.png',
  },
];

const TEAM_MEMBERS = [
  { id: 'shaokat-hossain', order: 1, name: 'Shaokat Hossain', designation: 'Founder & CEO', image: 'asset/team/Shaokat-Hossain.jpg', facebook: '#', linkedin: '#' },
  { id: 'haider-hossain', order: 2, name: 'Md. Haider Hossain', designation: 'Business Developer', image: 'asset/team/Haider-Hossain.jpg', facebook: '#', linkedin: '#' },
  { id: 'humayun-farid', order: 3, name: 'Md. Humayun Farid', designation: 'CTO', image: 'asset/team/Humayun-Farid.jpg', facebook: '#', linkedin: '#' },
  { id: 'khondoker-eftakhar-jubayer', order: 4, name: 'Khondoker Eftakhar Jubayer', designation: 'Lead Software Architect', image: 'asset/team/Khondoker-Eftakhar-Jubayer.jpg', facebook: '#', linkedin: '#' },
  { id: 'asraf-mridha', order: 5, name: 'Asraf Mridha', designation: 'Senior DevOps Engineer', image: 'asset/team/Asraf-Mridha.jpg', facebook: '#', linkedin: '#' },
  { id: 'sazal-abdullah', order: 6, name: 'Sazal Abdullah', designation: 'DevOps Engineer', image: 'asset/team/Sazal-Abdullah.jpg', facebook: '#', linkedin: '#' },
  { id: 'pranta-das', order: 7, name: 'Pranta Das', designation: 'Jr. Web Application Developer', image: 'asset/team/Pranta-Das.jpg', facebook: '#', linkedin: '#' },
  { id: 'minhazul-islam-saeid', order: 8, name: 'Minhazul Islam Saeid', designation: 'Mobile Apps Developer (Flutter)', image: 'asset/team/Minhazul-Islam-Saeid.jpg', facebook: '#', linkedin: '#' },
  { id: 'nazrul-islam-patowary-rakib', order: 9, name: 'Nazrul Islam Patowary Rakib', designation: 'Senior Mobile Apps Developer', image: 'asset/team/Nazrul-Islam-Patowary-Rakib.jpg', facebook: '#', linkedin: '#' },
  { id: 'naymur-rahaman', order: 10, name: 'Naymur Rahaman', designation: 'Mobile Apps Developer (Flutter)', image: 'asset/team/Naymur-Rahaman.jpg', facebook: '#', linkedin: '#' },
  { id: 'iftekher-rafti', order: 11, name: 'Iftekher Rafti', designation: 'Jr. Node JS Developer', image: 'asset/team/Iftekher-Rafti.jpg', facebook: '#', linkedin: '#' },
  { id: 'riaz', order: 12, name: 'Riaz', designation: 'Software Engineer', image: 'asset/team/Riaz.jpg', facebook: '#', linkedin: '#' },
  { id: 'leaya-sultana', order: 13, name: 'Leaya Sultana', designation: 'DevOps Engineer', image: 'asset/team/Leaya-Sultana.jpg', facebook: '#', linkedin: '#' },
  { id: 'jannatun-naim-mitu', order: 14, name: 'Jannatun Naim Mitu', designation: 'QA Engineer', image: 'asset/team/Jannatun-Naim-Mitu.jpg', facebook: '#', linkedin: '#' },
  { id: 'arpita-ghosh', order: 15, name: 'Arpita Ghosh', designation: 'UI/UX Designer', image: 'asset/team/Arpita-Ghosh.jpg', facebook: '#', linkedin: '#' },
  { id: 'shikhor-soyon', order: 16, name: 'Shikhor Soyon', designation: 'Graphic Designer', image: 'asset/team/Shikhor-Soyon.jpg', facebook: '#', linkedin: '#' },
  { id: 'apu-sardar', order: 17, name: 'Apu Sardar', designation: 'Web Application Developer', image: 'asset/team/Apu-Sardar.jpg', facebook: '#', linkedin: '#' },
  { id: 'masud-rana', order: 18, name: 'Masud Rana', designation: 'Jr. Node JS Developer', image: 'asset/team/Masud-Rana.jpg', facebook: '#', linkedin: '#' },
  { id: 'fokrul-islam-mehedi', order: 19, name: 'Fokrul Islam Mehedi', designation: 'Jr. Node JS Developer', image: 'asset/team/FOKRUL-ISLAM-MEHEDI.jpg', facebook: '#', linkedin: '#' },
  { id: 'rashedul-islam', order: 20, name: 'Rashedul Islam', designation: 'DevOps Engineer', image: 'asset/team/Rashedul-Islam.jpg', facebook: '#', linkedin: '#' },
  { id: 'ridoy-islam-nasim', order: 21, name: 'Ridoy Islam Nasim', designation: 'Software Engineer', image: 'asset/team/Ridoy-Islam-Nasim.jpg', facebook: '#', linkedin: '#' },
  { id: 'ricky-david-gomes', order: 22, name: 'Ricky David Gomes', designation: 'Marketing Executive', image: 'asset/team/Ricky-David-Gomes.jpg', facebook: '#', linkedin: '#' },
  { id: 'sharaf-uddin', order: 23, name: 'Sharaf Uddin', designation: 'Senior Marketing Executive', image: 'asset/team/Sharaf-Uddin.jpg', facebook: '#', linkedin: '#' },
  { id: 'rashed-khan', order: 24, name: 'Rashed Khan', designation: 'Marketing Executive', image: 'asset/team/Rashed-Khan.jpg', facebook: '#', linkedin: '#' },

];

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Engr. Rafiqul Islam',
    role: 'Managing Director',
    company: 'Apex Garments & Textile Ltd.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    text: 'STITBD developed our enterprise Garments ERP and HR Payroll system. The biometric attendance sync and automated export documentation saved us hundreds of manual hours every month.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Dr. Sharmin Akter',
    role: 'Chief Medical Officer',
    company: 'Care Diagnostic & Hospital',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    text: 'The Hospital & Diagnostic Management software from STITBD is remarkably smooth. Pathologists can sync machine data directly, and patients receive SMS download links for lab reports.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Mahmudul Hasan',
    role: 'Head of Operations',
    company: 'QuickCourier BD',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    text: 'Our nationwide courier tracking system built by STITBD handles over 10,000 daily parcel bookings effortlessly. The merchant portal and rider app are fast and foolproof.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Principal M. A. Karim',
    role: 'Founder & Principal',
    company: 'Green Valley International School',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    text: 'We have been using STITBD\u2019s School Management System since 2018. Online bKash fee collection and instant exam result publishing transformed our parent communication.',
    rating: 5,
  }
];

const CULTURE_GALLERY = [
  { image: 'asset/culture/01.jpg', caption: 'Team collaboration session' },
  { image: 'asset/culture/02.jpg', caption: 'On-site client deployment' },
  { image: 'asset/culture/03.jpg', caption: 'Engineering huddle' },
  { image: 'asset/culture/04.jpg', caption: 'Product planning sprint' },
  { image: 'asset/culture/05.jpg', caption: 'Design workshop' },
  { image: 'asset/culture/06.jpg', caption: 'Company milestone celebration' },
  { image: 'asset/culture/07.jpg', caption: 'Cross-team standup' },
  { image: 'asset/culture/08.jpg', caption: 'Client handover day' },
  { image: 'asset/culture/09.jpg', caption: 'Quality assurance review' },
  { image: 'asset/culture/10.jpg', caption: 'Award recognition' },
  { image: 'asset/culture/11.jpg', caption: 'Team building event' },
  { image: 'asset/culture/12.jpg', caption: 'STITBD annual gathering' },
];

const DOMAIN_PRICING = [
  { tld: '.com', priceBdt: '\u09f31,400', period: '/year', tag: 'Most Popular', popular: true },
  { tld: '.com.bd', priceBdt: '\u09f32,500', period: '/year', tag: 'Official BD', popular: true },
  { tld: '.edu.bd', priceBdt: '\u09f3810', period: '/year', tag: 'Educational', popular: false },
  { tld: '.net', priceBdt: '\u09f31,650', period: '/year', tag: 'Tech Standard', popular: false },
  { tld: '.org', priceBdt: '\u09f31,550', period: '/year', tag: 'Non-Profit', popular: false },
  { tld: '.info', priceBdt: '\u09f31,100', period: '/year', tag: 'Information', popular: false },
  { tld: '.xyz', priceBdt: '\u09f3450', period: '/year', tag: 'Generic', popular: false },
  { tld: '.me', priceBdt: '\u09f3450', period: '/year', tag: 'Personal Brand', popular: false },
  { tld: '.ai', priceBdt: '\u09f3450', period: '/year', tag: 'AI & Tech', popular: false },
  { tld: '.pro', priceBdt: '\u09f3450', period: '/year', tag: 'Professional', popular: false },
  { tld: '.live', priceBdt: '\u09f3450', period: '/year', tag: 'Streaming & Events', popular: false },
  { tld: '.news', priceBdt: '\u09f3450', period: '/year', tag: 'News & Media', popular: false },
  { tld: '.online', priceBdt: '\u09f3450', period: '/year', tag: 'General Web', popular: false },
  { tld: '.today', priceBdt: '\u09f3450', period: '/year', tag: 'Blog & Magazine', popular: false },
  { tld: '.site', priceBdt: '\u09f3450', period: '/year', tag: 'Startup', popular: false },
];
