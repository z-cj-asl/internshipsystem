var mysql = require('mysql');
var express =require('express');
//var connection  = require('express-myconnection'); 
const bodyParser = require('body-parser');
//const { JavascriptModulesPlugin } = require('webpack');
//var router = express.Router();
const app = express();

const connectDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9364',
    database: 'internshipDB'
})

connectDB.connect(err => { 
        if (err) 
        throw err; console.log('mysql is connected ')    
});

app.use(bodyParser.json());

//登录
app.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    let sql = 'select * from user where user.username =?' 
    let data = [username]

    connectDB.query(sql,data,(err, result) => {
            if(err){
                console.log(err);
                return 
            }
            else{
                if(result[0]){
                    console.log('@登录用户数据',result[0])
                    if(result[0].password === password)
                    {
                        res.status(200).json(result[0])
                    }
                    else{
                        res.status(404).json('密码错误')
                    }
                }
                else{
                    res.status(404).json('账号未注册')
                }
            }

        })

});

//注册
app.post('/sign',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const category = req.body.category
    let sql1 = 'select * from user where user.username =?' 
    let data1 = [username]

    connectDB.query(sql1,data1,(err, result) => {
            if(err){
                console.log(err);
                return 
            }
            else{
                if(!result[0]){
                    //console.log(result[0].username)
                    let sql = 'insert into user (username,password,category) values (?,?,?)'
                    let data = [username,password,category]

                    connectDB.query(sql,data,(err,result) =>{
                        if(err){
                            console.log(err)
                            return
                        }
                        res.status(200).json('注册成功')
                    })
                }
                else{
                    res.status(200).json('账号已注册')
                }
            }
        })

});

//保存用户信息
app.post('/saveuserdata',(req,res)=>{
    const username = req.body.username
    const name = req.body.name
    const sex = req.body.sex
    const phonenumber = req.body.phonenumber
    const unit = req.body.unit

    let sql = ' update user set name = ?, unit =?, sex =?, phonenumber=? where username =? '
    let data =[name,unit,sex,phonenumber,username]

    connectDB.query(sql, data, (err, result) => {
    if(err){
        console.log(err);
        res.status(200).json('保存失败')
        return 
    }
    else{
        console.log(result);
        res.status(200).json('保存成功')
    }
    })
});

//发布课题
app.post('/releasetopic',(req,res)=>{
    const username = req.body.username
    const topicname = req.body.topicname
    const startime = req.body.starttime
    const endtime = req.body.endtime
    const personum = req.body.personum
    const introduction = req.body.introduction
    const required = req.body.required
    let sql1 = 'insert into topicmember (topicname,username,authority) values (?,?,?) ' 
    let sql2 = 'insert into topicinfor (topicname,startime,endtime,personum,introduction,required,creator) values (?,?,?,?,?,?,?) '
    let data1 = [topicname,username,'creator']
    let data2 = [topicname,startime,endtime,personum,introduction,required,username]

    let state = false
    connectDB.query(sql1,data1,(err, result) => {
        if(err){
            console.log('发布失败: topicmember')
            console.log(err)
            state = true
            return 
        }
    })

    if(!state){
        connectDB.query(sql2,data2,(err, result) => {
            if(err){
                console.log('发布失败: topicinfor')
                console.log(err);
                state = true
                return 
            }
            else{
               
            }
        })
    }
    
    if(state){
        res.status(404).json('发布失败')
    }
    else{
        console.log(username,': 发布课题')
        res.status(200).json('发布成功')
    }
});
 
//获取所以已发布的课题列表
app.post('/obtaintopiclist',(req,res)=>{
    let sql = ' select distinct * from topicinfor'

    connectDB.query(sql,(err, result) => {
        if(err){
            console.log(err);
            return 
        }
        
        console.log('@发布课题列表',result)
        res.status(200).json(result)
    })
});

//申请加入课题
app.post('/applytopic',(req,res)=>{
    const topicname = req.body.topicname
    const susername = req.body.susername
    const busername = req.body.busername
    const resumed = req.body.resumed
    const progress = req.body.progress
    let sql = ' insert into apply (topicname,susername,busername,resumed,progress) values (?,?,?,?,?) '
    let data = [topicname, susername, busername, resumed, progress]

    connectDB.query(sql,data,(err, result) => {
    if(err){
        console.log(err);
        res.status(404).json('申请失败')
        return 
    }
    else{
        res.status(200).json('申请成功')
    }
    })
});

//获取我的课题列表
app.post('/mytopiclist',(req,res)=>{
    const username =req.body.username
    let sql = ' select distinct * from topicmember where topicmember.username = ?'
    let data = [username]

    connectDB.query(sql,data,(err, result) => {
        if(err){
            console.log(err);
            return 
        }
        
        console.log('@我的课题列表',result)
        res.status(200).json(result)
    })
});

//获取审核列表
app.post('/applylist',(req,res)=>{
    const busername = req.body.busername
    let sql = ' select * from apply where apply.busername = ?'
    let data =[busername]

    connectDB.query(sql,data,(err, result) => {
    if(err){
        console.log(err);
        res.status(404).json('错误')
        return 
    }
    else{
        console.log('@审核列表',result)
        res.status(200).json(result)
    }
    })
});

//决定是否同意加入课题
app.post('/applydecide',(req,res)=>{
    const topicname =req.body.topicname
    const susername =req.body.susername
    const progress =req.body.progress
    let sql = ' update apply set progress =? where topicname =? and susername =? '
    let data = [progress,topicname,susername]
    let sql2 = 'insert into topicmember (topicname,username,authority) values (?,?,?)'
    let data2 = [topicname,susername,'member']

    connectDB.query(sql,data,(err, result) => {
        if(err){
            console.log(err);
            res.status(404).json('apply错误')
            return 
        }
        else{
            if(progress==='已同意'){
                connectDB.query(sql2,data2,(err, result) => {
                if(err){
                    console.log(err);
                    res.status(404).json('topicmember错误')
                    return 
                }
                else{
                    res.status(200).json('已同意')
                }
                })
            }
            else{
                res.status(200).json('已拒绝')
            } 
        }
    })
});

//用topicname获取课题信息
app.post('/topicnameToTopicdata',(req,res)=>{
    const topicname = req.body.topicname
    let sql = ' select * from topicinfor where topicinfor.topicname = "' + topicname + '" '

    connectDB.query(sql,(err, result) => {
    if(err){
        console.log(err);
        res.status(200).json('获取此课题数据失败')
        return 
    }

    console.log('@打开的课题的数据',result)
    res.status(200).json(result)
    })
});

//获取讨论
app.post('/obtaindiscuss',(req,res)=>{
    const topicname = req.body.topicname
    console.log(topicname)
    let sql = ' select * from discuss where topicname = ?'
    let data = [topicname]

    connectDB.query(sql,data,(err, result) => {
    if(err){
        console.log(err);
        res.status(200).json(result)
        return 
    }
    else{
        console.log('此课题讨论数据',result)
        res.status(200).json(result)
    }
    })
});

//发送评论
app.post('/discussrelease',(req,res)=>{
    const topicname =req.body.topicname
    const username = req.body.username
    const msg = req.body.msg
    const msgtime = req.body.msgtime
    let sql = ' insert into discuss (topicname,username,msg,msgtime) values (?,?,?,?) ' 
    let data = [topicname, username, msg, msgtime]

    connectDB.query(sql,data,(err, result) => {
    if(err){
        console.log(err);
        res.status(404).json('发送失败')
        return 
    }
    else{
        res.status(200).json('发送成功')
    }
    })
});

//topicname获取课题成员列表
app.post('/obtaintopicmembers',(req,res)=>{
    const topicname = req.body.topicname
    let sql = 'select * from topicmember where topicname = ?'
    let data = [topicname]

    connectDB.query(sql,data,(err, result) => {
    if(err){
        console.log(err);
        res.status(404).json('获取成员失败')
        return 
    }
    else{
        res.status(200).json(result)
    }
})
});

//发布任务
app.post('/taskrelease',(req,res)=>{
    const topicname = req.body.topicname
    const username = req.body.username
    const taskinfor = req.body.taskinfor
    let sql = 'insert into task (topicname, username, taskinfor) values (?,?,?)'
    let data = [topicname, username, taskinfor]

    connectDB.query(sql,data,(err, result) => {
    if(err){
    console.log(err);
    res.status(404).json('发布任务失败')
    return 
    }
    else{
        res.status(404).json('发布任务成功')
    }
    })
});

//获取课题任务
app.post('/obtaintasklist',(req,res)=>{
    const topicname = req.body.topicname
    let sql = 'select * from task where topicname =?'
    let data = [topicname]

    connectDB.query(sql,data,(err, result) => {
    if(err){
        console.log(err);
        res.status(200).json('获取任务列表失败')
        return 
    }
    else{
        res.status(200).json(result)
    }
    })
});

//踢出课题成员
app.post('/deletemember',(req,res)=>{
    const topicname = req.body.topicname
    const username = req.body.username
    let sql = 'delete from topicmember where topicname =? and username =?'
    let data = [topicname,username]

    connectDB.query(sql,data,(err, result) => {
    if(err){
        console.log(err);
        res.status(404).json('踢出课题失败')
        return 
    }
    else{
        res.status(200).json('踢出课题成功')
    }
    })
});

//课题评价成员
app.post('/evaluatetelease',(req,res)=>{
    const topicname = req.body.topicname
    const username = req.body.username
    const evaluation = req.body.evaluation
    let sql = 'insert into evaluate (topicname, username, evaluation) values (?,?,?)'
    let data = [topicname, username, evaluation] 

    connectDB.query(sql,data,(err, result) => {
    if(err){
        console.log(err);
        res.status(404).json('评价失败')
        return 
    }
    else{
        res.status(200).json('评价成功')
    }
    })
});

//颁奖
app.post('/certificaterelease',(req,res)=>{
    const topicname = req.body.topicname
    const username = req.body.username
    const cate = req.body.certificate
    let sql = 'insert into certificate (topicname, username, cate) values (?,?,?)'
    let data = [topicname, username, cate]

    connectDB.query(sql,data,(err, result) => {
    if(err){
        console.log(err);
        res.status(404).json('颁发失败')
        return 
    }
    else{
        res.status(200).json('颁发成功')
    }
    })
});

//获取评价列表
app.post('/obtainevaluatelist',(req,res)=>{
    const username = req.body.username
    let sql = 'select * from evaluate where username =?'
    let data = [username]

    connectDB.query(sql,data,(err, result) => {
    if(err){
        console.log(err);
        res.status(404).json('获取评价列表失败')
        return 
    }
    else{
        res.status(200).json(result)
    }
    })
});

//获取颁奖
app.post('/obtaincertificatelist',(req,res)=>{
    const username = req.body.username
    let sql = 'select * from certificate where username =?'
    let data = [username]

    connectDB.query(sql,data,(err, result) => {
    if(err){
        console.log(err);
        res.status(404).json('获取颁奖列表失败')
        return 
    }
    else{
        res.status(200).json(result)
    }
    })
});

//#region 
//topicname to creator(username)
// app.post('/findcreator',(req,res)=>{
//     const topicname = req.body.topicname
//     let sql = ' select * from topicmember where topicname =? and authority =? '
//     let data = [topicname,'creator']

//     connectDB.query(sql,data,(err,result) => {
//     if(err){
//         console.log(err);
//         return 
//     }
//     else{
//         console.log(result)
//         res.status(200).json(result)
//     }
//     })
// });
//#endregion

app.listen(3001, ()=>{
    console.log('server on localhost:3001')
});

