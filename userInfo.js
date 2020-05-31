class UserInfo {
    constructor(name, about, userName, userJob, editForm) {
      this.name = name;
      this.about = about;
      this.userName = userName;
      this.userJob = userJob;
      this.editForm = editForm;
    }
  
    setUserInfo(name, about) {
      this.name = name;
      this.about = about;
      this.editForm.reset();
    }
  
    updateUserInfo() {
      this.userName.textContent = this.name;
      this.userJob.textContent = this.about;
    }
  
  }