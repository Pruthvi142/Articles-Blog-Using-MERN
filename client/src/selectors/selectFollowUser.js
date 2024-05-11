export const selectFollowUsers = (users, loginId) => {
  let follow;
  console.log("likesss", likes, "userid", user._id);
  follow = users.follwers.find((id) => {
    if (id == loginId) {
      console.log("select", id);
      return id;
    }
  });
  return follow;
};
