const UserModel = require('../models/users')
const {hash,compare} = require('../utils/tools')

const signup = async function(req,res,next){
    res.set('Content-Type','application/json; charset=utf-8')
    let {username,password} = req.body;
    let hashPass = await hash(password)
    let result = await UserModel.signup({username,password:hashPass})
    // console.log(result)
    res.render('succ',{
        data:JSON.stringify({
            message:'success'
        })
    })
}

const hasUser = async function(req,res,next){
    res.set('Content-Type','application/json; charset=utf-8')
    let {username,password} = req.body
    // let hashPass = await hash(password)
    let result = await UserModel.findOne({username})
    if(result){
        res.render('fail',{
            data:JSON.stringify({
                message:'已注册'
            })
        })
    }else{
        next()
    }

}

const signin = async function(req,res,next){
    res.set('Content-Type','application/json; charset=utf-8')
    let {username,password} = req.body
    let hashPass = await hash(password)
    let result = await UserModel.findOne({username})
    let hashPassd = await compare(password,hashPass)
    let session1 =  req.session
    // console.log(session1)
    if(result && hashPassd){
        req.session.username = username
        res.render('succ',{
            data:JSON.stringify({
                username,
                message:'登陆成功'
            })
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'用户名或密码不正确',
                
            })
        })
    }
}

const signout = async function(req,res,next){
    req.session = null;
    console.log(req.session)
    res.render('succ', {
        data: JSON.stringify({
          message: '注销成功.'
        })
    })
}

const isSignin = async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    // console.log(req.session)
    req.session
    if(req.session.username){
        res.render('succ', {
            data: JSON.stringify({
             username:req.session.username,
              message: '有权限.'
            })
        })
    }else{
        res.render('fail', {
            data: JSON.stringify({
              message: '没有权限.'
            })
        })
    }
    
}

module.exports = {
    signup,
    hasUser,
    signin,
    signout,
    isSignin
  }