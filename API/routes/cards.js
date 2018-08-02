const express = require('express');
const router = express.Router();


// GET localhost:5000/cards/ -->



// GET localhost:5000/cards/card_id/card_level  --> slouží na načtení detailu
//----------------------------------------------------------------------------------
router.get('/:card_id/:card_level', function (req, res, next) {
    const cardDetail = {
        card_id: req.params.card_id,
        card_level: req.params.card_level,
        iron: 1000,
        wood: 3000
    };

    res.status(200).json({
        cardDetail: cardDetail
    });
});


module.exports = router;


