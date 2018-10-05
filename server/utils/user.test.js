const expect = require('expect');

const {Users} = require('./user');

describe("User",()=>{
    var users;

    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: '1',
            name: 'Champ',
            room: 'AB'
        },{
            id: '2',
            name: 'Jan',
            room: 'NestJs'
        },{
            id: '3',
            name: 'Chow',
            room: 'AB'
        }]
    })
    it('should add new user',()=>{
        var users = new Users();
        var user = {
            id : '123',
            name: 'Champ',
            room: 'Game'
        };
        var res = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);

    });

    it('should remove a user',() => {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should remove not a user',() => {
        var userId = '99';
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user',() => {
        var userId = '1';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should find not a user',() => {
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });

    it('should return name for AB',() => {
        var userList = users.getUserList('AB');
        expect(userList).toEqual(['Champ','Chow']);
    });

    it('should return name for NestJs',() => {
        var userList = users.getUserList('NestJs');
        expect(userList).toEqual(['Jan']);
    });
});