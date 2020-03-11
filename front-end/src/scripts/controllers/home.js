import homeView from '../views/home.art'

export const home = (req,res)=>{
    res.render(homeView())
}
