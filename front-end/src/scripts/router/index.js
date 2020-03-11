// import homeController from '../controllers/home'
// import indexController from '../controllers/index'

// class Router{
//     constructor(){
//         this.contrlollers ={
//             homeController,
//             indexController,
//         }
//         this.render()
//     }

//     render(){
//         window.addEventListener('hashchange',this.hashchangeHandle.bind(this))
//         window.addEventListener('load',this.loadHandle.bind(this))

//     }

//     hashchangeHandle(){
//         console.log('hashchange')
//         let hash = location.hash.substr(1)
//         this.contrlollers[`${hash}Controller`].render()
//     }

//     loadHandle(){
//         console.log('load')
//         let hash = location.hash.substr(1)
//         // hash = hash || 'index'
//         // this.contrlollers[`${hash}Controller`].render()
//     }

// }


import REMrouter from 'sme-router'
import {home} from '../controllers/home'
import {featured} from '../controllers/featured'

const router = new REMrouter('page-content')

router.use((req)=>{
    let url = req.url.slice(1)
    (`.${url}`).addClass('active-section').siblings().removeClass('active-section')
})

router.route('/')
router.route('/home',home)
router.route('/fearured',featured)