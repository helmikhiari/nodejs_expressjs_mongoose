const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/testdb";
async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to mongodb");
    }
    catch (error) {
        console.log("Error when Connecting to mongodb");
    }
}

connect();
const userSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            unique: true,
        },
        balance: Number
    }
)

const userModel = mongoose.model('user', userSchema);

async function createUser(user) {
    try {
        const newUser = new userModel(user);
        const res = await newUser.save();
        console.log("User Added", res);
    } catch (error) {
        console.log("error " + error);
    }
}

async function updateUser(name, b) {
    try {
        const user = await userModel.findOne({ name })
        if (user) {
            // user.balance+=b;
            user.balance = user.balance + b;
            await user.save();
            console.log("Updated!");
        }
        else {
            console.log("User Not Found")
        }
    } catch (error) {
        console.log(error);
    }
}

async function findUser(id) {
    try {
        const user = await userModel.findById(id);
        console.log(user);
    } catch (error) {
        console.log("Error is " + error)
    }
}
// updateUser("hamaa", 5000);
// createUser({ name: "lobna", balance: 1000 });
// createUser({ name: "hama", balance: 10000 });
// findUser("674d9691dd5715d46cdb88da")

async function transfert(senderName, receiverName, amount) {
    try {
        const sender = await userModel.findOne({ name: senderName });
        const receiver = await userModel.findOne({ name: receiverName });

        if (sender.balance >= amount) {
            sender.balance -= amount;
            receiver.balance += amount;
            await sender.save();
            if (Math.random() < 0.7) {
                console.log("Error Occured");
                return;
            }
            await receiver.save();
            console.log("Transfert  effectué");
        }
        else {
            console.log("Solde Insufficent");
        }
    }
    catch (error) {
        console.log("Error " + error);
    }
}
// transfert("hama", "lobna", 1000);


async function transfertSecure(senderName, receiverName, amount) {
    const session = await mongoose.startSession();
    try {

        session.startTransaction();
        const sender = await userModel.findOne({ name: senderName }).session(session);
        const receiver = await userModel.findOne({ name: receiverName }).session(session);

        if (sender.balance >= amount) {

            sender.balance -= amount;
            receiver.balance += amount;
            await sender.save({ session });
            if (Math.random() < 1) {
                console.log("Error Occured");
                return;
            }
            await receiver.save({ session });
            await session.commitTransaction();
            console.log("Transfert  effectué");
        }
        else {
            console.log("Solde Insufficent");
        }
    }
    catch (error) {
        console.log("Error " + error);
        // await session.abortTransaction();
    }
}

transfertSecure("hama", "lobna", 3000);

