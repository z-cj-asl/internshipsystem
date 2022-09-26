import React, { Component } from 'react'
import style from './Topicrelease.module.css'

export default class Topicrelease extends Component {
    state ={
        topicname: '',
        starttime: '',
        endtime: '',
        personum: '',
        introduction: '',
        required: ''
    }

    setTopicname = (e) =>{
        this.setState({
            topicname: e.target.value
        })
    }

    setStarttime = (e) =>{
        this.setState({
            starttime: e.target.value
        })
    }

    setEndtime = (e) =>{
        this.setState({
            endtime: e.target.value
        })
    }

    setPersonum = (e) => {
        this.setState({
            personum: e.target.value
        })
    }

    setIntroduction = (e) =>{
        this.setState({
            introduction: e.target.value
        })
    }

    setRequired = (e) =>{
        this.setState({
            required: e.target.value
        })
    }

    releaseTopic = () =>{
        //console.log('@',this.state.topicname)
        fetch('/releasetopic',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username: this.props.username,
                topicname: this.state.topicname,
                starttime: this.state.starttime,
                endtime: this.state.endtime,
                personum: this.state.personum,
                introduction: this.state.introduction,
                required: this.state.required
            })
        }).then(response => response.json()).then(data =>{
            console.log(data)
            window.alert(data)
            this.props.setPage()
        })
    }

    render() {
        return (
        <div>
            <div>
                <div className = {style.releaseiframe}>
                    <div className = {style.releaseclose}><button onClick = {this.props.setPage}>关闭</button></div>
                    <div className ={style.releaseline}>课题名：<input size = '20' onChange ={this.setTopicname}/></div>
                    <div className ={style.releaseline}>开始时间：<input size = '20' onChange ={this.setStarttime}/></div>
                    <div className ={style.releaseline}>结束时间：<input size = '20' onChange ={this.setEndtime}/></div>
                    <div className ={style.releaseline}>招收人数：<input size = '10'onChange ={this.setPersonum}/></div>
                    <div className ={style.releaseline}>简介：<textarea rows = '6' cols='40' maxLength= '200' onChange ={this.setIntroduction}/></div>
                    <div className ={style.releaseline}>要求：<textarea rows = '6' cols='40' maxLength= '200' onChange ={this.setRequired}/></div>
                    <div className ={style.releasebutton}> <button onClick ={this.releaseTopic}> 发布</button> </div>
                </div>
            </div>
        </div>
        )
    }
}
