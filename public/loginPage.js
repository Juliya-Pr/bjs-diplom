"use strict"

const userForm = new UserForm();
userForm.loginFormCallback = data => {
  ApiConnector.login(data, resp => {
    if(resp.success){
      location.reload();
    } else {
      userForm.setLoginErrorMessage(resp.error)
    }
  });
};

userForm.registerFormCallback = data => {
  ApiConnector.register(data, resp => {
    if(resp.success){
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(resp.error)
    }
  });
};
