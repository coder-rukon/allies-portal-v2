class User{
    
    constructor(user){
        this.user = user;
    }
    isAdministrator(){
        if(this.user.user_role == 'administrator'){
            return true;
        }
        return false;
    }
    isBroker(){
        if(this.user.user_role == 'broker'){
            return true;
        }
        return false;
    }
}

export default User;