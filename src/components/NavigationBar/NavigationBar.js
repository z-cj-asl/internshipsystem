/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import style from './NavigationBar.module.css'

export default class NavigationBar extends Component {
  state = {
    category: this.props.category,
    
  }
  render() {
    return (
      <div>
        <div className = {style.header}>
          <a onClick = {this.props.setLogin}>返回登录</a>
          {
          this.state.category === 'busic' ? 
          <label onClick = {this.props.setTopicrelease}>发布课题</label> 
          : ''
          }
          <a onClick = {this.props.setmydata}>我的</a>
        </div>
      </div>
    )
  }
}
