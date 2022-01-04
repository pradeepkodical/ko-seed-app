export interface Menu {
    title: string;
    icon?: string;
    link?: string;
    menu?: Array<Menu>;
    opened?: ko.Observable<boolean>;
    selected?: ko.Observable<boolean>;
}

export const menu: Array<Menu> = [{
    title: 'Home',
    link: '#/dashboard',
    icon: 'bi bi-house-door'
}, {
    title: 'Education',
    icon: 'bi bi-book',
    menu: [{
        title: 'Dashboard',
        link: '#/education/dashboard'
    }, {
        title: 'Course Library',
        link: '#/education/courselibrary'
    }, {
        title: 'Learning Path',
        link: '#/education/learningpath'
    }, {
        title: 'Live Streaming',
        link: '#/education/livestreaming'
    }, {
        title: 'Documents',
        link: '#/education/documents'
    }, {
        title: 'Instructors',
        link: '#/education/instructors'
    }, {
        title: 'Self Assessments',
        link: '#/education/selfassessments'
    }]
}, {
    title: 'Calendar',
    link: '#/calendar/dashboard',
    icon: 'bi bi-calendar',
}, {
    title: 'Orders',
    link: '#/orders/dashboard',
    icon: 'bi bi-cart',
}, {
    title: 'Marketing',
    icon: 'bi bi-megaphone',
    menu: [{
        title: 'Dashboard',
        link: '#/marketing/dashboard'
    }, {
        title: 'My Day',
        link: '#/marketing/myday'
    }, {
        title: 'Leads',
        link: '#/marketing/leads'
    }, {
        title: 'Team',
        link: '#/marketing/team'
    }, {
        title: 'Commissions',
        link: '#/marketing/Commissions'
    }, {
        title: 'Sales Link',
        link: '#/marketing/saleslink'
    }, {
        title: 'Presentations',
        link: '#/marketing/presentations'
    }, {
        title: 'Advertising',
        link: '#/marketing/advertising'
    }, {
        title: 'Documents',
        link: '#/marketing/documents'
    }, {
        title: 'Testimonials',
        link: '#/marketing/testimonials'
    }]
}, {
    title: 'Video Library',
    link: '#/videolibrary/dashboard',
    icon: 'bi bi-camera-reels',
}, {
    title: 'Training',
    icon: 'bi bi-bookshelf',
    menu: [{
        title: '10-Step',
        link: '#/training/10step'
    }, {
        title: 'Leadership',
        link: '#/training/leadership'
    }, {
        title: 'Helios How To',
        link: '#/training/helioshowto'
    }, {
        title: 'Nationals',
        link: '#/training/nationals'
    }, {
        title: 'Regionals',
        link: '#/training/regionals'
    }, {
        title: 'Renatis IOS',
        link: '#/training/renatusios'
    }, {
        title: 'M.O.N.E.Y Matrix',
        link: '#/training/moneymatrix'
    }]
}, {
    title: 'Reports',
    link: '#/reports/dashboard',
    icon: 'bi bi-pie-chart',

}, {
    title: 'Corporate Docs',
    icon: 'bi bi-files',
    menu: [{
        title: 'Compensation Plan',
        link: '#/corporate/compplan'
    }, {
        title: 'Compliance',
        link: '#/corporate/compliance'
    }, {
        title: 'Corporate Documents',
        link: '#/corporate/documents'
    }, {
        title: 'Signed Agreements',
        link: '#/corporate/signedagreements'
    }]
}, {
    title: 'Control',
    icon: 'bi bi-gear',
    menu: [{
        title: 'Users',
        link: '#/control/users'
    }, {
        title: 'Tools',
        link: '#/control/tools'
    }, {
        title: 'Roles',
        link: '#/control/roles'
    }, {
        title: 'Verifications',
        link: '#/control/verifications'
    }, {
        title: 'Bonus Pool',
        link: '#/control/bonuspool'
    }, {
        title: 'Payouts',
        link: '#/control/payouts'
    }, {
        title: 'Speakers',
        link: '#/control/speakers'
    }, {
        title: 'Settings',
        link: '#/control/settings'
    }, {
        title: 'Nationals Attendees',
        link: '#/control/nationalsattendees'
    }]
}];