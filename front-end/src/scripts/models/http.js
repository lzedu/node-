export default {
    get({url,type='GET',data=''}){
        return $.ajax({
            dataType:'json',
            url,
            type,
            data,
            // success(result){
            //     console.log(result)
            //     if(result.ret){
            //         location.hash = 'home'
            //     }

            // }
        })
    }

}