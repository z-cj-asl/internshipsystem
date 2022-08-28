import React, { Component } from 'react'
import TopicApply from '../TopicApply/TopicApply'
import style from './TopicList.module.css'
export default class TopicList extends Component {
  state = {
    topiclist:[],
    topicapply:false,
    applydata:{},
    init: 0
  }

  constructor(props){
    super(props)
    this.closeApply = this.closeApply.bind(this)
  }

  componentDidMount(){
    this.obtainTopiclist()
  }

  setApplydata = (item) =>{
    return () => {
      this.setState({
        applydata:item,
        topicapply: true,
        init: 0
      })
      
      this.props.mytopiclist.map(itemer => { 
        if(item.topicname === itemer.topicname)
          this.setState({
            init: this.state.init + 1
          })
      })
    }
  }

  closeApply = () =>{
    this.setState({
      topicapply: false
    })
  }

  obtainTopiclist = () =>{
    fetch('/obtaintopiclist',{
      method: 'post',
      header:{'Content-Type':'application/json'},
      body:{}
    }).then(response =>response.json()).then(data =>{
      this.setState({
        topiclist:data
      })
      console.log(data)
    })
  }

//   findcreator = (topicname) =>{
//     fetch('/findcreator',{
//         method: 'post',
//         headers:{'Content-Type':'application/json'},
//         body:JSON.stringify({
//             topicname: topicname
//         })
//     }).then(response =>response.json()).then(data =>{
//         console.log(data)
//         this.setState({
//           applycreator:data[0].username
//         })
//     })
// }

  render() {
    return (
      <div>
        <div className ={style.listtitle}>发布的课题</div>
        <div className ={style.topiclist}>
          {
          this.state.topiclist.map((item) => {
            return (<div key = {item.topicname} className ={style.sigletopic} onClick = {this.setApplydata(item)}>
                    {item.topicname} </div>)
          })
          }
        </div>

        {
          this.state.topicapply ?
          <TopicApply topicdata = {this.state.applydata} closeApply = {this.closeApply} username = {this.props.username} init = {this.state.init}/>
          :''
        }
      </div>
    )
  }
}
