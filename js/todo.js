$(function(){
    /* Adding task to todo list */
    load();
    $("#todo_input").on("keydown", function(event){
        if(event.keyCode == 13){
            if($(this).val() == ""){
                alert("Please enter your task")
            } else {
                var local = getData();
                local.push({title:$(this).val(), done:false});
                saveData(local);
                load();
                $(this).val("");
            };
        };
    });

    /* Removing task from todo list */
    $("ul").on("click", "a", function(){
        var data = getData();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveData(data);
        load();
    })

    /* Moving checked tasks from todo-list to done-list */
    $("ul").on("click", "input", function(){
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveData(data);
        load();
    })

    /* Read local storage data */
    function getData(){
        var data = localStorage.getItem("todolist");
        if(data != null){
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    /* Save data to local storage */
    function saveData(data){
        localStorage.setItem("todolist", JSON.stringify(data));
    };

    /* Load local storage to webpage */
    function load(){
        var data = getData();
        $("ul").empty();
        $.each(data, function(index, ele){
            if(ele.done){
                $(".done_todo").prepend("<li><input type = 'checkbox' checked = 'chekced'><p>"+ ele.title +"</p><a href = 'javascript:;' id = "+ index +"><i class='fas fa-times'></a></li>");
            } else {
                $(".todolist").prepend("<li><input type = 'checkbox'><p>"+ ele.title +"</p><a href = 'javascript:;' id = "+ index +"><i class='fas fa-times'></a></li>")
            }
        })
    }

})