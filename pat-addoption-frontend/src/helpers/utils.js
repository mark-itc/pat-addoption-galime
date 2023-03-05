import axios from "axios";

export function deletePet(petId) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };
  axios
    .delete(`http://localhost:3010/pet/${petId}`, config)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function postData({ newPet, isEdit, petId }) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };
  if (!isEdit) {
    axios
      .post("http://localhost:3010/pet", newPet, config)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } else {
    axios
      .put(`http://localhost:3010/pet/${petId}`, newPet, config)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}

export function getUserById(userId) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };
  axios
    .get(`http://localhost:3010/user/${userId}`, config)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateUser(user) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };
  axios
    .put(`http://localhost:3010/user/${user.id}`, user, config)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
