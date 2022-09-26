import React, { Component } from 'react'

import style from './MyTopicList.module.css'

export default class MyTopicList extends Component {
  state = {
    mytopiclist: []
  }

  componentDidMount(){
    this.obtainMyTopiclist()
  }

  obtainMyTopiclist = () =>{
    fetch('/mytopiclist',{
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        username: this.props.username
      })
      }).then(response =>response.json()).then(data =>{
        this.setState({
          mytopiclist:data
        })
        this.props.setmytopiclist(data)
        console.log(data)
      })
  }

  openTopic = (item) =>{
    return () => {
      this.props.setOpentopicdata(item)
    }
  }

  render() {
    return (
      <div>
        <div className ={style.mytitle}>我的课题</div>
        <div className ={style.mytopiclist}>
          {
            this.state.mytopiclist.map((item) => {
              return (<div key = {item.topicname} className ={style.mytopic} onClick = {this.openTopic(item)}>
                      {item.topicname} </div>)
            })
          }
        </div>
      </div>
    )
  }
}
