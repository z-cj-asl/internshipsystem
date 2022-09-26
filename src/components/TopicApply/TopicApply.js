import React, { Component } from 'react'
import style from './TopicApply.module.css'
export default class TopicApply extends Component {

    state = {
        resumed:'',
        progress:''
    }

    setReseumd = (e) =>{
        this.setState({
            resumed: e.target.value
        })
    }

    Applytopic = () =>{
        fetch('/applytopic',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                topicname: this.props.topicdata.topicname,
                susername: this.props.username,
                busername: this.props.topicdata.creator,
                resumed: this.state.resumed,
                progress: '审核中'
            })
        }).then(response =>response.json()).then(data =>{
            this.setState({
                progress: '审核中'
            })
            console.log(data)
            window.alert(data)
        })
    }

    render() {
        return (
        <div>
            <div className = {style.applypage}>
                <div className ={style.applyclose}><button onClick ={this.props.closeApply}>关闭</button></div>
                <div className ={style.applyline}>课题名：{this.props.topicdata.topicname}</div>
                <div className ={style.applyline}>开始时间：{this.props.topicdata.startime}</div>
                <div className ={style.applyline}>结束时间：{this.props.topicdata.endtime}</div>
                <div className ={style.applyline}>招收人数：{this.props.topicdata.personum}</div>
                <div className ={style.applyline}>简介：{this.props.topicdata.introduction}</div>
                <div className ={style.applyline}>要求：{this.props.topicdata.required}</div>
                <div></div>
                <div className ={style.applybutton}>
                    {
                        !(this.props.init === 0) ?
                        <div>你已在课题中</div>
                        :
                        this.state.progress === '审核中' ?
                        <div>审核中……</div>
                        :
                        <div>
                            <input onChange = {this.setReseumd} placeholder = '申请理由'></input>
                            <button onClick = {this.Applytopic}>申请加入</button>
                        </div>
                    }</div>
            </div>
        </div>
        )
    }
}
