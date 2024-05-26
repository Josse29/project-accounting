const { getUsers } = require("../../../serverless-side/functions/users.js");

// get alluser
getUsers((status, response) => {
    if (status) {
        let li = ``;
        response.forEach((element) => {
            li += `<li data-id=${element.id}>${element.fullname}</li>`;
        });
        $("#testData").html(li);
    }
    if (!status) {
        console.error(response);
        throw response;
    }
});