const mongoose = require('mongoose');


const roundDataSchema = new mongoose.Schema({
    roundId : {
        type: String,
        required: true,
    },
    totalBets: {
            type: Number,
        },
    result: {
        type: String,
    },
    betsDetails: [
        {
            userId: String,
            dateTime: String,
            bets: [
                {
                    selectedNo: String,
                    amountBet: Number,
                }
            ],
            winning: String,
        }
    ],
    
});

const RoundData = mongoose.model('roundData', roundDataSchema);
module.exports = RoundData;