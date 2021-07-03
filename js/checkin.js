$(function(){

    /* An error I'm trying to solve: 
    if I employ loadStatus() as soon as the webpage loads,
    if the user havn't checked in, data is undefined */
    loadStatus();

    /* Click on button to check in */
    $(".checkInBtn").on("click", function(){
        var data = getStatus();
        data.push({status:true});
        saveStatus(data);
        loadStatus();
    });

    /* Read local storage status data */
    function getStatus(){
        var status = localStorage.getItem("status");
        if (status != null){
            return JSON.parse(status);
        } else {
            return [];
        };
    };

    /* Save status to local storage */
    function saveStatus(status){
        localStorage.setItem("status", JSON.stringify(status));
    }


    /* Load local storage status to webpage */
    function loadStatus(){
        var data = getStatus();
        $(".checkInBtn").empty();
        if (data[0].status){
            $(".checkInBtn").text("Checked In");
        } 
        
    }
})