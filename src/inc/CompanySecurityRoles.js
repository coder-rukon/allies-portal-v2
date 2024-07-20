class CompanySecurityRoles{
    constructor({roles,company_access}){
        this.roles = roles;
        this.companyAccess = company_access;
    }
    getRole(roleId){
        let role = this.roles.find(role => { return role.company_access_role_id == roleId})
        if(role){
            return role;
        }
        return {}
    }
    getCompanyAccess(companyId){
        let compnayAccess = this.companyAccess.find(companyAcess => { return companyAcess.ca_company_id == companyId})
        if(compnayAccess){
            return compnayAccess;
        }
        return {};
    }
    canViewCompany(companyId){
        let companyAccess = this.getCompanyAccess(companyId);
        let role = this.getRole(companyAccess?.ca_role_id);
        if(role?.company_access === 'full' || role?.company_access === 'readonly' ){
            return true;
        }
        return false;
    }
    canEditCompany(companyId){
        let companyAccess = this.getCompanyAccess(companyId);
        let role = this.getRole(companyAccess?.ca_role_id);
        if(role?.company_access === 'full' ){
            return true;
        }
        return false;
    }
    
}
export default CompanySecurityRoles;