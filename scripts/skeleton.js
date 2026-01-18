function loadSkeleton() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log($('#navbarPlaceholder').load('/text/nav_after_login.html'));
        } else {
            console.log($('#navbarPlaceholder').load('/text/nav_before_login.html'));
        }
    });
}
loadSkeleton(); 

//show login dropdown
function showDropDown(){
    if (document.getElementById("profileDropDown").style.display == "block") {
    document.getElementById("profileDropDown").style.display = "none"
    document.getElementById("close-profile").style.display = "none";

    } else {
            document.getElementById("profileDropDown").style.display = "block";
        document.getElementById("close-profile").style.display = "block";

        getNameFromAuth();

    }
};