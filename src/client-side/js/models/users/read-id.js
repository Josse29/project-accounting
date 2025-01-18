$("tbody#user")
  .off("click", "button#user-detail")
  .on("click", "button#user-detail", function () {
    const user = $(this).closest("tr")[0].dataset;
    const userEmail = user.useremail;
    const userFullname = user.userfullname;
    const userImg = user.userimg;
    const userPosition = user.userposition;
    const userInformation = user.userinfo ? user.userinfo : "-";
    $("#user-detail-modal h1.modal-title").text(userFullname);
    $("#user-detail-modal #email").text(userEmail);
    $("#user-detail-modal #fullname").text(userFullname);
    $("#user-detail-modal #information").text(userInformation);
    if (userImg !== "null") {
      const img = `<img src=${userImg} class="w-100 h-auto mb-3"/>`;
      $("div#photo").html(img);
    }
    if (userImg === "null") {
      const p = `<p class="ms-2 fst-italic fs-5 text-muted">
                    no preview image...
                </p>`;
      $("div#photo").html(p);
    }
    $("#user-detail-modal #position").text(userPosition);
  });
