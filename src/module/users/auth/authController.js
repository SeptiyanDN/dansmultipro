const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../users.models');
const auth = require('../auth/auth.models')
const dotenv = require('dotenv')
dotenv.config()
const response = require('../../../helpers/response')
const { userRefreshToken} = require('../../../helpers/global.helpers')

exports.Register =  async (req, res) => {
    try{
    const user = req.body
    const takenUsername = await User.findOne({ username: user.username })
    if (takenUsername){
        res.json({message: 'Username or email already taken'})
    } else {
        const hashPassword = await bcrypt.hash(user.password, 10)
        const users = new User({
            username : user.username,
            full_name : user.full_name,
            password: hashPassword,
        })
        await users.save()
        return response.successData(users,res,201)}
} catch (err) {
    return response.errorService(false, err.message, 500)
}
}

exports.Login = async (req, res) => {
    const login = req.body
    await User.findOne({username: login.username})
    .then(users => {
        if(!users){
            return res.json({message: 'Username or password is incorrect'})
        }
        bcrypt.compare(login.password, users.password)
        .then(isCorrect => {
            if(isCorrect){
                const payload = {
                    id : users._id,
                    username : users.username
                }
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    async(err,token, )=>{
                        if(err) return res.json({message : err})
                        const findToken = await auth.findOne({author: users._id})
                        let refreshToken = userRefreshToken(users._id)
                        
                        if(!findToken){
                        const dataAuth = new auth({
                            accessToken : token,
                            refreshToken : refreshToken,
                            author: users._id,
                            authorModel: 'User',
                        })
                        dataAuth.save()
                    }
                    else{
                        token = findToken.accessToken
                        refreshToken = findToken.refreshToken
                    }
                        return res.json({
                            status:200,
                            accessToken: token,
                            refreshToken : refreshToken
                        })
                    }
                 )
            }else{
                return res.json({
                    message: "Username or password is incorrect"
                })
            }
        })
    })

}

exports.refreshTokenUser = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).send({
                message: 'No refresh token provided',
            });
        }

        await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH);
        const user = await auth.findOne( {refreshToken} ).exec();

        if (!user) {
            return res.status(401).send({
                message: 'User not found',
            });
        }
        const newRefreshToken = userRefreshToken(user._id);
        await auth.findOneAndUpdate({refreshToken}, {refreshToken: newRefreshToken}).exec();
        const data = ({
            accessToken : user.accessToken,
            newRefreshToken: newRefreshToken,

        })
        res.json({
            status: 201,
            message: 'Refresh token successful',
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error,
        });
    }
}

exports.logoutUser = async (req, res) => {
    try {

        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).send({
                message: 'No refresh token provided',
            });
        }
        const user = await auth.findOneAndRemove({ refreshToken }).exec();

        if (!user) {
            return res.status(401).send({
                message: 'User not found',
            });
        }

        return response.successResult({
            message:"Logout Successful",
        },
        res,201)
    } catch (error) {
        res.status(500).send({
            error,
        });
    }
}