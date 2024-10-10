$("tbody#user")
  .off("click", "button#user-update")
  .on("click", "button#user-update", function () {
    console.log(this);
    const user = this.dataset;
    const userId = user.userid;
    const userEmail = user.useremail;
    const userFullname = user.userfullname;
    const userImg = user.userimg;
    const position = user.userposition;
    const req = {
      userId,
      userEmail,
      userFullname,
      userImg,
      position,
    };
  });
