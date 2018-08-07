

function cardDetails(card_id, card_level) {
    $.ajax({
        url: "http://localhost:5000/cards/" + card_id + "/" +  card_level
    }).then(function(data) {
        $('#card_level').text(data.cardDetail.card_level);
        $('#iron').text(data.cardDetail.iron);
        $('#wood').text(data.cardDetail.wood);
    });
};

function registerxxx() {
    console.log('Register')
    /*$.ajax({
        url: "http://localhost:5000/auth/signup"
    }).then(function() {
        window.location.replace('Welcome.html')
    });*/
}


/*
function cardDetails() {
    $.ajax({
        url: "http://rest-service.guides.spring.io/greeting"
    }).then(function(data) {
        $('#vysledek').text(data.id);
        $('#contentV').text(data.content);
    });
}
*/