import { environment } from "../environment";

export const setHeaders = ({ token }) => {
  return {
    "Content-Type": "application/json",
    "x-access-token": token,
  };
};

export const setHeaders2 = ({ token }) => {
  return {
    "Content-Type": `application/x-www-form-urlencoded`,
    "x-access-token": token,
  };
};

export const login = (phone, password) => {
  var data = {
    phone: phone,
    password: password,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(environment + "login", data)
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        Alert.alert(errorMessage);
        reject(err);
      });
  });
};
