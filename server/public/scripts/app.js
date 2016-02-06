var classmateArray = [];
var classmateIndex = 0;

$(document).ready(function(){
    $('#next-button').on('click', function() {
        if (classmateIndex == 18) {
            classmateIndex = 0;
        } else {
            classmateIndex++;
        }
        dislayClassmate(classmateIndex);
    });

    $('#prev-button').on('click', function() {
        if (classmateIndex == 0) {
            classmateIndex = 18;
        } else {
            classmateIndex--;
        }
        dislayClassmate(classmateIndex);
    });

    getData();
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
            processData(data.people);
            dislayClassmate(classmateIndex);
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }
    });
}

function processData(peopleData) {
    for (var person in peopleData) {

        var per = peopleData[person];

        classmateArray.push('<div class="insert">' + per.name + '<br>' + per.favoriteMovie1 + '<br>' +
            per.favoriteMovie2 + '<br>' + per.favoriteSong + '<br>' + '</div>');
    }
}

function dislayClassmate(displayPosition) {
    $('#peopleContainer').children().first().remove();
    $('#peopleContainer').append(classmateArray[displayPosition]);
}