class Users {
    constructor(){
        this.users = [];
    }

    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return this.users;
    }

    removeUser(id){
        const item = this.getUser(id);
        if(item){
            this.users = this.users.filter((user)=> user.id !== id);
        }
        return item;
    }

    getUser(id){
        return this.users.filter((user)=> user.id === id)[0];
    }

    getUserList(room){
        const users = this.users.filter((user)=> user.room === room);
        const arrayUser = users.map((user) => user.name);
        return arrayUser;
    }
}

module.exports = {Users};