const express = require('express');
const router = express.Router();

const UserData = require('../models/userData');

//on game opens call this api to check if user with userid exist if not create it  in DB
router.post("/checkUser", async (req, res) => {
    try {
        const newUser = new UserData({
            uid: req.body.UserId,
            balance: req.body.Balance,
        });
        const user = await UserData.findOne({ 'userId': uid });

        if (user === null) {
            // console.log(newUser);
            await newUser.save();

            res.status(200);
        } else {
            // console.log(id, newBal);
            const update = await UserData.updateOne({ 'userId': uid }, { '$set': { 'balance': balance } });
            res.status(200).json(update);
        }

    } catch (error) {
        res.status(500).json(error);
    }
});


// get and update balance -----------------------------------
router.put("/updateBalance", async (req, res) => {
    try {
        const id = req.body.UserId;
        const newBal = req.body.Balance;

        // console.log(id, newBal);
        const update = await UserData.updateOne({ 'userId': id }, { '$set': { 'balance': newBal } });

        res.status(200).json(update);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/getBalance/:uid", async (req, res) => {
    try {
        const id = req.params.uid;

        const userBal = await UserData.findOne({ 'userId': id });

        res.status(200).json(userBal.balance);
        // console.log(id , userBal);

    } catch (error) {
        res.status(500).json(error);
    }
});


// bet place api
/// Player history  and  round create
router.put("/updateRoundHistory", async (req, res) => {
    try {
        const uid = req.body.UserId;
        // const roundid = req.body.RoundID;
        const detail = req.body.Details;

        console.log(uid, roundid, detail);

        const update = await UserData.updateOne({ 'userId': uid }, {
            $push: {
                betHistory: {
                    "roundId": detail.roundId,
                    "dateTime": detail.date,
                    "bets": detail.betAmt,
                    "winning": detail.betBtn,
                }
            }
        });

        await RoundData.updateOne({ 'roundId': roundid },
            {
                $push: {
                    "betsDetails": {
                        "userId": detail.userid,
                        "dateTime": detail.date,
                        "bets": detail.betAmt,
                        "winning": detail.betBtn,
                    }
                }
            });

        res.status(200).json(update);

    } catch (error) {
        res.status(500).json(error);
    }
});







