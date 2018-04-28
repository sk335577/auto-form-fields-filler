function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        dummy_emails: document.querySelector("#dummy_emails").value,
        dummy_names: document.querySelector("#dummy_names").value,
        dummy_password: document.querySelector("#dummy_password").value,
    });
//    var messageElement=document.getElementById('message');
//    messageElement.innerHTML='<strong>Saved!!</strong>';
    browser.runtime.reload();
//    setTimeout(function(){messageElement.innerHTML='';},3000);
}

function restoreOptions() {

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var dummy_emails = browser.storage.local.get("dummy_emails");
    dummy_emails.then(function (result) {
        document.querySelector("#dummy_emails").value = result.dummy_emails || "";
    }, onError);

    var dummy_names = browser.storage.local.get("dummy_names");
    dummy_names.then(function (result) {
        document.querySelector("#dummy_names").value = result.dummy_names || "";
    }, onError);

    var dummy_password = browser.storage.local.get("dummy_password");
    dummy_password.then(function (result) {
        document.querySelector("#dummy_password").value = result.dummy_password || "";
    }, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);