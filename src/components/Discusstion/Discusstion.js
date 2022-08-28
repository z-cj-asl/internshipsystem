import React, { Component } from 'react'

import style from './Discusstion.module.css'

export default class Discusstion extends Component {
    state = {
        discusslist:[]
    }

    componentDidMount(){
        this.obtainDiscuss()  
    }

    obtainDiscuss = () =>{
        //console.log('课题数据',this.props.topicname)
        fetch('/obtaindiscuss',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                topicname: this.props.topicname
            })
        }).then(response =>response.json()).then(data =>{
            this.setState({
                discusslist:data
            })
            console.log(data)
        })
    }
                              
    render() {
    return (
      <div>
        <div className = {style.disscusspage}>
            {
                this.state.discusslist.map(item =>{
                    return (
                        <div className ={style.discussline} key = {item.msgtime} >
                                <div>
                                    <div className = {style.msgtime}>{item.msgtime}</div>
                                    <div className = {style.ownmsg}>
                                        <div>
                                            {item.username}
                                        </div>
                                        <div className = {style.msgbox}>
                                            {item.msg}
                                        </div>  
                                    </div>
                                </div>
                        </div>
                    )
                })
            }
        </div>
      </div>
    )
  }
}
