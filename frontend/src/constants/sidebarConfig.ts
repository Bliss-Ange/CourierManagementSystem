export const drawerWidth : number = 350;

export const sidebarItemList = [
    {
        'title' : 'Dashboard',
        'items' : [
            {
                'haveDropdown' : false,
                'icon' : 'home',
                'text' : 'Home',
                'url': '/systemsetting/subscriptions',
            },
        ]
    },
    {
        'title' : 'Item Registration',
        'items' : [
            {
                'haveDropdown' : false,
                'icon': 'farmhouse',
                'text': 'Farm & House Registration',
                'url' : "/item-registration/farm-house",
            },
            {
                'haveDropdown' : false,
                'icon' : 'doc',
                'text' : 'DOC Registration',
                'url' : '/item-registration/doc-register',
            },
            {
                'haveDropdown' : false,
                'icon': 'feed',
                'text': 'Feed Registration',
                'url' : "/item-registration/feed-register",
            },
        ]
    },
    {
        'title' : 'Item Management',
        'items' : [
            {
                'haveDropdown' : false,
                'icon' : 'farmhouse',
                'text': 'Farm & House Management',
                'url' : "/item-registration/farm-house-management",
            },
            {
                'haveDropdown' : false,
                'icon' : 'doc',
                'text' : 'DOC Management',
                'url' : '/item-registration/doc-management',
            },
            {
                'haveDropdown' : false,
                'icon': 'feed',
                'text': 'Feed Management',
                'url' : "/item-registration/feed-management",
            },
        ]
    },
    {
        'title' : 'User Settings',
        'items' : [
            {
                'haveDropdown' : false,
                'icon' : 'person',
                'text' : 'User Profile',
                'url' : '/user/user-profile'
            },
            {
                'haveDropdown' : false,
                'icon': 'AddUser',
                'text': 'Add User',
                'url' : "user/add-user",
            },
        ]
    },
    {
        'title' : 'Company Settings',
        'items' : [
            {
                'haveDropdown' : false,
                'icon' : 'Assistant',
                'text' : 'Feedback',
                'url' : 'systemsetting/feedbacks'
            },
            {
                'haveDropdown' : false,
                'icon' : 'Feedback',
                'text' : 'Feedback Submissions',
                'url' : 'systemsetting/feedback-list'
            },
        ]
    },
    
]