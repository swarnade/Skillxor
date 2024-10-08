

const {verifyToken} = require('../../Short_Hand/JWT');
const { Freelancers } = require('../../Models');

// Check if the user is authenticated or not using the jwt cookie
const Auth = async (cook) => {
    try {
        
        // check if the cookie is present or not    
        if (cook) {
            // verify the token
            const obj = verifyToken(cook);
            if (obj) {
                // check if the token is valid or not by checking the options
                if (obj.iss == "SIH2024") {
                    const profileID = obj.id;
                    const user1 = await Freelancers.findOne({_id:profileID});
                    // if the user is found using the cookie and the log is same as the log in the database the return the user obj
                    if (user1) {
                        if (user1.Log == obj.Log) {
                            return user1;
                        }else{
                            return null;
                        }
                    }else{
                        return null;
                    }
                }else{
                    return null;
                }
            }else{
                return null;
            }
        }else{
            return null;
        }
        
    } catch (error) {
     return null;
    }
}
module.exports = Auth;