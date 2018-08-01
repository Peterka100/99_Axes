

function cardDetails(card_id, card_level) {
    $.ajax({
        url: "http://127.0.0.1:5000/cards/" + card_id + "/" +  card_level
    }).then(function(data) {
        $('#card_level').text(data.cardDetail.card_level);
        $('#iron').text(data.cardDetail.iron);
        $('#wood').text(data.cardDetail.wood);
    });
};


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