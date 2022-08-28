import * as React from 'react';
import style from './Login.module.css'

export default class Login extends React.Component {
    state = {
        username: '',
        password: '',
        category: 'study',

        userdata: {}
    }

    usernameChange = (e) =>{
        const username = e.target.value;

        this.setState({
            username: username
        })
    }

    passwordChange = (e) =>{
        const password = e.target.value;

        this.setState({
            password: password
        })
    }

    setStudent = (e) => {
        this.setState ({
            category: e.target.name
        })
    }

    setBusiness = (e) =>{
        this.setState ({
            category: e.target.name
        })
    }

    login = () =>{
        const username = this.state.username;
        const password = this.state.password;
        if(!username){
            alert('请输入用户名')
            return
        }
        if(!password){
            alert('请输入密码')
            return
        }

        const result = fetch('/login',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username:this.state.username,
                password:this.state.password
            })
        }).then(response=>response.json()).then(data=>{
            //window.alert(data)
            console.log('登录用户数据',data)
            this.props.setUserdata(data)
            if(data.username === this.state.username){
                this.setState({
                    userdata: data
                })
                window.alert('登录成功')
                this.props.setTopicPage()
            }
            else{
                window.alert(data)
            }
        })    
        console.log(result)
    }

    sign = () =>{
        const username = this.state.username;
        const password = this.state.password;
        if(!username){
            alert('请输入用户名')
            return
        }
        if(!password){
            alert('请输入密码')
            return
        }

        const result = fetch('/sign',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                category: this.state.category
            })
        }).then(response => response.json()).then(data =>{
            console.log('登录用户数据',data)
            window.alert(data)
        })

        console.log(result)
    }

    render() {
        return (
            <div>
            <div className={style.login_frame}>
                <div className={style.login_tip}>登录或注册</div>
                <div>
                    <div>
                        <div  className={style.login_aside}>账号：</div>
                            <input type="text" size = '20' onChange= {this.usernameChange} />
                        <div  className={style.login_aside}>密码：</div>
                            <input type="text" size = '20' onChange= {this.passwordChange}/> 
                    </div>
                    <input  type='radio' checked = {this.state.category === 'study'? 'checked': '' } name='study' onChange = {this.setStudent}/>
                    学生
                    <input  type='radio' checked = {this.state.category === 'study'? '': 'checked' } name='busic' onChange = {this.setBusiness}/>
                    企业
                    <div>
                        <button  className={style.button_login} onClick ={this.login}>登录</button>
                        <button  className={style.button_sign} onClick ={this.sign}>注册</button>
                    </div> 
                </div>   
            </div>
            </div>
        );
    }
}
