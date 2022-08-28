import * as React from 'react'
import style from './User.module.css'

export default class User extends React.Component{
    state = {
        username:'',
        name:'',
        sex: '',
        phonenumber:'',
        unit:'',
        applylist:[],
        evaluatelist:[],
        certificatelist:[]  
    }

    componentDidMount(){
        if(this.props.userdata.category === 'busic'){
            this.applylist()
        }
        else{
            this.obtainEvaluatelist()
            this.obtainCertificatelist()
        }
        this.setState({
            username: this.props.userdata.username,
            name: this.props.userdata.name,
            sex: this.props.userdata.sex,
            phonenumber: this.props.userdata.phonenumber,
            unit: this.props.userdata.unit,
        })
    }

    setName = (e) =>{
        this.setState({
            name: e.target.value
        })
    }

    setSex = (e) =>{
        this.setState({
            sex: e.target.value
        })
    }

    setPhonenumber = (e) =>{
        this.setState({
            phonenumber: e.target.value
        })
    }

    setUnit = (e) =>{
        this.setState({
            unit: e.target.value
        })
    }

    saveUserData = () =>{
        fetch('/saveuserdata',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username:this.props.userdata.username,
                name:this.state.name,
                sex:this.state.sex,
                phonenumber:this.state.phonenumber,
                unit:this.state.unit
            })
        }).then(response =>response.json()).then(data =>{
            console.log(data)
            window.alert('保存成功')
        })
    }

    applylist = () =>{
        fetch('/applylist',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                busername: this.props.userdata.username
            })
        }).then(response =>response.json()).then(data =>{
            this.setState({
                applylist:data
            })
            console.log(data)
        })
    }

    obtainEvaluatelist = () =>{
        fetch('/obtainevaluatelist',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username: this.props.userdata.username
            })
            }).then(response =>response.json()).then(data =>{
                this.setState({
                    evaluatelist:data
                })
                console.log(data)
            })
    }

    obtainCertificatelist = () =>{
        fetch('/obtaincertificatelist',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username: this.props.userdata.username
            })
            }).then(response =>response.json()).then(data =>{
                this.setState({
                    certificatelist:data
                })
                console.log(data)
            })
    }

    applyagree = (topicname,susername,progress) =>{
        return () =>{
            fetch('/applydecide',{
                method: 'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    topicname: topicname,
                    susername: susername,
                    progress: progress
                })
                }).then(response =>response.json()).then(data =>{
                    
                    console.log(data)
                })
        } 
    }

    applyrefuse = (topicname,susername,progress) =>{
        return () =>{
            fetch('/applydecide',{
                method: 'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    topicname: topicname,
                    susername: susername,
                    progress: progress
                })
                }).then(response =>response.json()).then(data =>{
                    
                    console.log(data)
                })
        } 
    }

    render(){
        return(
            <div>
                <div  className ={style.backpage}><button onClick = {this.props.setselect}>返回</button></div>
                <div className ={style.userpage}>
                    <div>账号：{this.state.username}</div> 
                    <div>姓名：<input value={this.state.name} size = '10' onChange ={this.setName}></input></div> 
                    <div>性别：<input value={this.state.sex} size = '4' onChange ={this.setSex}></input></div> 
                    <div>手机号：<input value={this.state.phonenumber} size = '11' onChange ={this.setPhonenumber}></input></div> 
                    <div>单位：<input value={this.state.unit} size = '100' onChange ={this.setUnit}></input></div> 
                    <button onClick = {this.saveUserData}>保存</button>
                </div>
                
                <div className = {style.underpage}>   
                    <div className = {style.applypage}>
                        {
                            this.props.userdata.category === 'busic' ?
                            <div>{/* 企业审核申请人 */}
                                {
                                    this.state.applylist.map((item,index) =>{
                                        return (
                                        <div className = {style.applyinstance} key = {index}>
                                            <div>{item.topicname}</div>
                                            <div>申请人：{item.susername}</div>
                                            <div>申请理由：{item.resumed}</div>
                                            {
                                                item.progress === '审核中' ?
                                                <div>
                                                    <button onClick = {this.applyagree(item.topicname,item.susername,'已同意')}>同意</button>
                                                    <button onClick = {this.applyrefuse(item.topicname,item.susername,'已拒绝')}>拒绝</button></div>
                                                :<div>{item.progress}</div>
                                            }
                                        </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            
                            <div>{/* 学生收到的评价 */}
                                {
                                    this.state.evaluatelist.map((item,index) =>{
                                        return (
                                        <div className = {style.applyinstance} key = {index}>
                                            <div>课题：{item.topicname}</div>
                                            <div>评价：{item.evaluation}</div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        }                      
                    </div>

                    
                    {
                        this.props.userdata.catrgory === 'busic' ?
                        <div></div>
                        :
                        <div className = {style.applypage}>
                            <div>{/* 学生收到的证书和奖状 */}
                                {
                                    this.state.certificatelist.map((item,index) =>{
                                        return (
                                        <div className = {style.applyinstance} key = {index}>
                                            {
                                                item.cate === '证书' ?
                                                <div>
                                                    <div>{item.username}在《{item.topicname}》中完成任务，表现良好</div>
                                                    <div>获得：结业证书{item.cate}</div>
                                                </div>
                                                :
                                                <div>
                                                    
                                                </div>
                                            }
                                            <div>{item.username}在《{item.topicname}》中完成任务良好</div>
                                            <div>获得：结业证书{item.cate}</div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        );
    }
    
}