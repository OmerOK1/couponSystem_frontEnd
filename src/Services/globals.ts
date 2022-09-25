class Globals {
}

class DevelopmentGlobals extends Globals {
    public urls = {
        admin: "http://localhost:8080/admin/",
        company: "http://localhost:8080/companies/", 
        customer: "http://localhost:8080/customers/",
        login: "http://localhost:8080/login/"
    }
}

class ProductionGlobals extends Globals {
    public urls = {
        admin: "admin/",
        company: "companies/",
        customer: "customers/",
        login: "login/"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;