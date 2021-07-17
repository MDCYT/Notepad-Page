const bcrypt = require("bcryptjs");

const helpers = {};

helpers.encryptPassword = async (password) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;

};

helpers.matchPassword = async (password, savedPasword) => {

    try {
        
        return await bcrypt.compare(password, savedPasword)

    } catch (error) {

        console.log(error)
        
    }

}

module.exports = helpers;
