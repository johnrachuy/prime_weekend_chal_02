var classmateArray = [];
var classmateIndex = 0;

$(document).ready(function(){
    $('#next-button').on('click', function() {
        var storedIndex = classmateIndex;

        if (classmateIndex == 18) {
            classmateIndex = 0;
        } else {
            classmateIndex++;
        }
        dislayClassmate(classmateIndex);
        updateSelectedIndex(storedIndex, classmateIndex);
    });

    $('#prev-button').on('click', function() {
        var storedIndex = classmateIndex;

        if (classmateIndex == 0) {
            classmateIndex = 18;
        } else {
            classmateIndex--;
        }
        dislayClassmate(classmateIndex);
        updateSelectedIndex(storedIndex, classmateIndex);
    });

    $('.index-nav').on('click', function(event) {
        var id = event.target.id.slice(5);

        if (id != '') {
            updateSelectedIndex(classmateIndex, id);
            classmateIndex = id;
            dislayClassmate(id);
        }
    });
    
    getData();
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
            processData(data.people);
            createIndexNav();
            dislayClassmate(classmateIndex);
            updateSelectedIndex(classmateIndex, classmateIndex);
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }
    });
}

function processData(peopleData) {
    for (var person in peopleData) {

        var per = peopleData[person];

        classmateArray.push('<div class="insert"><h1>' + per.name + '</h1><br><h3>' + per.favoriteMovie1 + '<br>' +
            per.favoriteMovie2 + '<br>' + per.favoriteSong + '<br>' + '</h3></div>');
    }
}

function dislayClassmate(displayPosition) {
    $('#peopleContainer').children().first().remove();
    $('#peopleContainer').append(classmateArray[displayPosition]);
}

function createIndexNav() {
    for (i = 0; i < classmateArray.length; i++) {
        $('.index-nav').append('<div class="index-point" id="index' + i + '">' + (i+1) + '</div>');
    }

}

function updateSelectedIndex(oldSelectedIndex, newSelectedIndex) {
    $('#index' + oldSelectedIndex).removeClass('index-point-selected');
    $('#index' + newSelectedIndex).addClass('index-point-selected');
}

