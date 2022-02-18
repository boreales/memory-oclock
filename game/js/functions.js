function saveScore(time){
    $.ajax({
        type: "POST",
        url: 'php/controller/controller.php',
        dataType: 'json',
        data: {function: 'setScore', arguments: [time]},
        success:function(data) {
            console.log(data);
            if(data == 1) {
                alert('Score saved');
            }
        }
    }); 
}