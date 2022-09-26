import React, { Component } from 'react'
import style from './Task.module.css'

export default class Task extends Component {
  render() {
    return (
      <div>
        <div className = {style.taskpage }>
          {
            this.props.tasklist.map((item,index) =>{
              return(
                <div key = {index} className = {style.taskinstance}>
                  <div className= {style.tasktitle}>{item.taskinfor}</div>
                  <div className= {style.taskusername}>处理人：{item.username}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
