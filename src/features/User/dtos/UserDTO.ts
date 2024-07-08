export class UserDTO {
    constructor(public id: string, public name: string, public email: string) {}
  
    static fromDomain(user: any): UserDTO {
      return new UserDTO(user.id, user.name, user.email);
    }
  }
  