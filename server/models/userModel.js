class User {
    constructor(email, password, displayName, role) {
      this.email = email;
      this.password = password;
      this.displayName = displayName;
      this.role = role;
    }
  }
  
  module.exports = User;