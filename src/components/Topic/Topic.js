import React, { Component } from 'react'
import Discusstion from '../Discusstion/Discusstion'
import Task from '../Task/Task'
import moment from 'moment'
import style from './Topic.module.css'

export default class Topic extends Component {
  state = {
    topicdata:{},
    discuss:'',
    taskinfor: '',
    taskmember: '',
    deletemember:'',
    evaluatemember:'',
    evaluation:'',
    certificatemember:'',
    certificate:'证书',

    displayEvaluate:false,
    displayCertificate:false,
    displayDeletemember:false,
    displaymemberEvaluate:false,

    topicmembers: [],
    tasklist:[]
  }

  componentDidMount(){
    this.topicnameTOtopicdata()
    this.topicmembers()
    this.obtaintasklist()
  }

  setDiscuss = (e) =>{
    this.setState({
      discuss: e.target.value
    })
  }

  setTaskinfor = (e) =>{
    this.setState({
      taskinfor: e.target.value
    })
  }

  setTaskmember = (e) =>{
    this.setState({
      taskmember: e.target.value
    })
  }

  setdeletemember = (e) =>{
    this.setState({
      deletemember: e.target.value
    })
  }

  setevaluatemember = (e) =>{
    this.setState({
      evaluatemember: e.target.value
    })
  }

  setEvaluation = (e) =>{
    this.setState({
      evaluation: e.target.value
    })
  }

  setcertificatemember = (e) =>{
    this.setState({
      certificatemember: e.target.value
    })
  }

  setcertificate = (e) =>{
    this.setState({
      certificate: e.target.value
    })
  }

  displayDeletemember = () =>{
    this.setState({
      displayDeletemember: !this.state.displayDeletemember
    })
  }

  displayEvaluate = () =>{
    this.setState({
      displayEvaluate: !this.state.displayEvaluate
    })
  }

  displaymemberEvaluate = () =>{
    this.setState({
      displaymemberEvaluate:!this.state.displaymemberEvaluate
    })
  }

  displayCertificate = () =>{
    this.setState({
      displayCertificate:!this.state.displayCertificate
    })
  }

  topicnameTOtopicdata = () =>{
    fetch('/topicnameToTopicdata',{
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        topicname: this.props.topicmember.topicname
      })
      }).then(response =>response.json()).then(data =>{
        this.setState({
          topicdata: data[0]
        })
      console.log(data)
      })
  }
 
  topicmembers = () =>{
    fetch('/obtaintopicmembers',{
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        topicname: this.props.topicmember.topicname
      })
      }).then(response =>response.json()).then(data =>{
        this.setState({
          topicmembers:data,
          taskmember: data[0].username,
          deletemember: data[0].username,
          evaluatemember: data[0].username,
          certificatemember: data[0].username
        })
      console.log(data)
      })
  }

  discussRelease = () =>{
    if(!this.state.discuss){
      window.alert('输入框为空')
    }
    else{
      let msgtime = moment().format('YYYY-MM-DD HH:mm:ss dddd')
      console.log(msgtime)
      fetch('/discussrelease',{
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        topicname:this.state.topicdata.topicname,
        username: this.props.userdata.username,
        msg: this.state.discuss,
        msgtime: msgtime
      })
      }).then(response =>response.json()).then(data =>{
        console.log(data)
      })
    }
  }

  taskrelease = () =>{
    if(!this.state.taskinfor){
      window.alert('任务内容为空')
    }
    else{
      fetch('/taskrelease',{
        method: 'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          topicname: this.props.topicmember.topicname,
          username: this.state.taskmember,
          taskinfor: this.state.taskinfor
        })
        }).then(response =>response.json()).then(data =>{
          window.alert(data)
          console.log(data)
        })
    } 
  }

  obtaintasklist = () =>{
    fetch('/obtaintasklist',{
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        topicname: this.props.topicmember.topicname
      })
      }).then(response =>response.json()).then(data =>{
        this.setState({
          tasklist:data
        })
        console.log('@tasklist',data)
      })
  }

  deleteMember = () =>{
    if(this.props.userdata.username === this.state.deletemember){
      window.alert('你不能踢除你自己')
    }
    else{
      fetch('/deletemember',{
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        topicname: this.props.topicmember.topicname,
        username: this.state.deletemember
      })
      }).then(response =>response.json()).then(data =>{
        window.alert(data)
        console.log(data)
      })
    }    
  }

  evaluatetelease = () =>{
    if(!this.state.evaluation){
      window.alert('评价为空')
    }
    else{
      fetch('/evaluatetelease',{
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        topicname: this.props.topicmember.topicname,
        username: this.state.evaluatemember,
        evaluation: this.state.evaluation
      })
      }).then(response =>response.json()).then(data =>{
        window.alert(data)
        console.log(data)
      })
    }   
  }

  certificaterelease = () =>{
    fetch('/certificaterelease',{
    method: 'post',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      topicname: this.props.topicmember.topicname,
      username: this.state.certificatemember,
      certificate: this.state.certificate
    })
     }).then(response =>response.json()).then(data =>{
      window.alert(data)
      console.log(data)
     })
  }

  render() {
    return (
      <div>
        <div className = {style.closebutton}><button onClick ={this.props.setPage}>关闭</button></div>
        <div className ={style.topicpage}>
            <div className = {style.topicleft}>
                <div className = {style.topicinfor}>
                  <div className = {style.topictitle}>{this.state.topicdata.topicname}</div>
                  <div className ={style.lineintroducion}>
                    <div className = {style.topicline}>简介：</div>
                    <div className = {style.introduction}>{this.state.topicdata.introduction}</div>
                  </div>
                </div>
                <br/>
                <div className = {style.topicinfor}>
                  <div className = {style.topictitle}>任务</div>
                  <div className = {style.taskpage}>
                    <Task tasklist = {this.state.tasklist}/>
                    <div>任务内容<textarea maxLength='200' rows='3' cols= '67' onChange = {this.setTaskinfor}></textarea></div>
                    <div className= {style.memberselect}>指派成员 
                      <select onClick={this.setTaskmember}>
                        {
                        this.state.topicmembers.map(item =>{
                          return(
                            <option key = {item.username}>{item.username}</option>
                          )
                        })
                        } 
                      </select>
                      <button onClick = {this.taskrelease}>发布</button>
                    </div>
                  </div>
                </div>
                
                {
                  this.props.userdata.username === this.state.topicdata.creator ?
                  <div className = {style.underbutton}>
                    <button onClick = {this.displayDeletemember}>管理成员</button>
                    <button onClick = {this.displayEvaluate}>评价成员</button>
                    <button onClick = {this.displayCertificate}>颁奖</button>
                  </div>
                  :''
                }
                
            </div>

            <div className = {style.topicright}>
              <div className ={style.disscuss}>
                    讨论
                    <Discusstion userdata = {this.props.userdata} topicname ={this.props.topicmember.topicname}/>
                    <div className = {style.sendmsg}>
                      <textarea maxLength='200' rows='3' cols= '80' className ={style.input} onChange = {this.setDiscuss}></textarea>
                      <button onClick = {this.discussRelease}>发送</button>
                    </div>
              </div>    
            </div>
        </div>

        {
          this.state.displayDeletemember ?
          <div className ={style.delememberpage}>
            <button onClick = {this.displayDeletemember}>关闭</button>
            <div className= {style.deletememberselect}>成员 
                    <select onClick={this.setdeletemember}>
                      {
                      this.state.topicmembers.map(item =>{
                        return(
                          <option key = {item.username}>{item.username}</option>
                        )
                      })
                      } 
                    </select>
                    <button onClick = {this.deleteMember}>踢出课题</button>
              </div>
          </div>
          :''
              
        }

        {
          this.state.displayEvaluate ?
          <div className ={style.evaluatepage}>
            <button onClick = {this.displayEvaluate}>关闭</button>
            <div className = {style.deletememberselect}>
              <div>
                <textarea rows='5' cols='50' maxLength='200' onChange = {this.setEvaluation}></textarea>
              </div>
              成员
              <select onClick={this.setevaluatemember}>
                {
                this.state.topicmembers.map(item =>{
                  return(
                    <option key = {item.username}>{item.username}</option>
                  )
                })
                } 
              </select>
              <div><button onClick = {this.evaluatetelease}>发送评价</button></div>
            </div>
          </div>
          :''
              
        }

        {
          this.state.displayCertificate ?
          <div className ={style.certificatepage}>
              <button onClick = {this.displayCertificate}>关闭</button>
              <div className = {style.deletememberselect}>成员

              <select onClick={this.setcertificatemember}>
                  {
                  this.state.topicmembers.map(item =>{
                    return(
                      <option key = {item.username}>{item.username}</option>
                    )
                  })
                  } 
                </select>

              <select onClick={this.setcertificate}> 
                <option>证书</option>
                <option>奖状</option>
              </select>

              <div><button onClick = {this.certificaterelease}>颁发</button></div>
             </div>
          </div>
          :''
        }

      </div>
    )
  }
}
