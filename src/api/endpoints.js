const endpoints = {
    auth: {
        login: '/api/auth/login',
        logout: '/api/auth/logout',
    },
    clients: {
        create: '/api/clients/create',
        me: '/api/clients/me',
        update: (id) => `/api/clients/update/${id}`,
        delete: (id) => `/api/clients/delete/${id}`,
        // list: '/api/clients/list', // Probably admin only
    },
    products: {
        all: '/api/products/all',
        create: '/api/products/create',
        getById: (id) => `/api/products/${id}`,
        update: (id) => `/api/products/${id}`, // PUT
        delete: (id) => `/api/products/delete/${id}`,
    },
    orders: { // 'commandes'
        create: '/api/commandes/create',
        confirm: (id) => `/api/commandes/${id}/confirm`,
        cancel: (id) => `/api/commandes/${id}/cancel`,
    },
    payments: {
        process: '/api/payments/process',
        confirm: (id) => `/api/payments/${id}/comfirm`, // Note: typo 'comfirm' in image, keeping faithful or fixing?
        // Let's assume the backend might assume 'comfirm' based on image, but 'confirm' is standard. 
        // I will use the image's spelling to be safe, but add a comment.
        // Image says: /api/payments/{id}/comfirm
    },
    codePromo: {
        all: '/api/code-promo/all',
        create: '/api/code-promo/create',
        update: (id) => `/api/code-promo/update/${id}`,
        delete: (id) => `/api/code-promo/delete/${id}`,
    }
};

export default endpoints;
