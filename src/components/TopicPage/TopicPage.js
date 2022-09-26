import React, { Component } from 'react'
import NavigationBar from '../NavigationBar/NavigationBar'
import TopicList from '../TopicList/TopicList'
import MyTopicList from '../MyTopicList/MyTopicList'

import User from '../User/User'
import Topic from '../Topic/Topic'
import Topicrelease from '../Topicrelease/Topicrelease'
import style from './TopicPage.module.css'

export default class TopicPage extends Component {
  state = {
    nowDisplay: 'page',
    openTopicmember:{}
  }

  constructor(props){
    super(props)
    this.setmydata =this.setmydata.bind(this)
    this.setPage =this.setPage.bind(this)
    this.setTopicrelease = this.setTopicrelease.bind(this)
    this.setOpentopicdata = this.setOpentopicdata.bind(this)
    this.setTopic = this.setTopic.bind(this)
  }

  setmydata = () =>{
    this.setState({
      nowDisplay: 'mydata'
    })
  }

  setPage = () =>{
    this.setState({
      nowDisplay: 'page'
    })
  }

  setTopicrelease = () =>{
    this.setState({
      nowDisplay: 'releasetopic'
    })
  }

  setTopic = () =>{
    this.setState({
      nowDisplay: 'topic'
    })
  }

  setOpentopicdata = (opentopicmember) =>{
    this.setState({
      openTopicmember: opentopicmember,
      nowDisplay: 'topic'
    })
  }

  setmytopiclist = (list) =>{
    this.setState({
      mytopiclist: list
    })
  }

  render() {
    return (
      <div>
          <div>
            <NavigationBar setmydata = {this.setmydata} setLogin = {this.props.setLogin}  
            setTopicrelease = {this.setTopicrelease} category = {this.props.userdata.category}/>
            
            {
              this.state.nowDisplay === 'page' ?
              <div className ={style.topicdiffer}> 
                <TopicList username = {this.props.userdata.username} mytopiclist = {this.state.mytopiclist}/>
                <MyTopicList username = {this.props.userdata.username} setOpentopicdata = {this.setOpentopicdata} setmytopiclist = {this.setmytopiclist}/>
              </div>
              : ''
            }

            {
              this.state.nowDisplay === 'mydata' ?
              <div>
                <User setselect = {this.setPage} userdata = {this.props.userdata}/>
              </div>
              : ''
            }

            {
              this.state.nowDisplay === 'topic' ?
              <div>
                <Topic setPage = {this.setPage} userdata = {this.props.userdata} topicmember = {this.state.openTopicmember}/>
              </div>
              : ''
            }

            {
              this.state.nowDisplay === 'releasetopic' ?
              <Topicrelease setPage = {this.setPage} username = {this.props.userdata.username}/>
              : ''
            }
          </div>
      </div>
    )
  }
}
