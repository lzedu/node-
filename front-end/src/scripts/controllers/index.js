const indexView = require('../views/layout.art')
import httpModel from '../models/http'
// import mainJs from '../../assets/libs/main'

class Layout{
    constructor(){
        this.render()
        this.status = ''
        this.isSignin = false
        this.username = ''
    }

    async auth(){
        let url = '/api/user/isSignin'
        // console.log(url)
        let type = 'get'
        let result = await httpModel.get({
            url,type
        })
        console.log(result)
        if(result.ret){
            this.isSignin = true
            this.username = result.data.username
        }else{
            this.isSignin = false
        }
    }

    async render(){
        await this.auth()
        // let html = layoutView()
        let html = indexView({
            isSignin:this.isSignin,
            username:this.username
        })
        $('#root').html(html)

        // let main = document.getElementById('page-content')
        // console.log(main)

        if(!this.isSignin){
            $('.page-content').css('width','100%')
        }else{
            $('.page-content').css('width','77.5%')
        }
        this.displayBox()
        $('#btn-submit').on('click',this.handleSubmit.bind(this))
        $('#btn-signout').on('click',this.handleSignout.bind(this))
    }

    displayBox(){
        let that = this;
        $('.btn-item').on('click',function(){
            $('.btns-whatyoudo').css('display','none')
            $('.login-box').css('display','block')
            // console.log($(this).attr('data-id'))
            that.status = $(this).attr('data-id')
            // console.log(that.status)
        })

        $('.login-cancel').on('click',function(){
            $('.btns-whatyoudo').css('display','flex')
            $('.login-box').css('display','none')
        })
    }
    async handleSubmit(){
        let data = $('.inputs-box').serialize()
        let url = '/api/user/'+(this.status == '1'?'signin':'signup')
        // console.log(url)
        let type = 'POST'
        let result = await httpModel.get({
            url,type,data
        })
        if(result.ret && this.status == '1'){
            this.isSignin = true
            location.hash = 'home'
            console.log(result)
            console.log(result.username)
            this.render()
        }
    }

    async handleSignout(){
        console.log('signout')
        let url = '/api/user/signout'
        // console.log(url)
        let type = 'get'
        let result = await httpModel.get({
            url,type
        })
        console.log(result)
        if(result.ret){
            location.hash='';
            this.isSignin = false
            // this.render()
            location.reload()
        }
    }
}

export default new Layout()