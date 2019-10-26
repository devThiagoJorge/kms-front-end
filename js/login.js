$('#btnRequest').click(function(){
    var inputEmail = $('#inputEmail').val();
    var inputPassword = $('#inputPassword').val(); 

    axios.post('http://localhost:3001/login/', {email: inputEmail , password: inputPassword})
    .then(function(response){            
            if (response.data.error != undefined) {

                if (response.data.errorId == '1') {
                    //Troca cor do campo email para vermelho
                    alert('E-mail inválido.');
                } else {
                    //Troca cor do campo senha para vermelho
                    alert('Senha inválida.');
                }
            }else{
               
                alert('Bien viendo!');        
            }      
        })
        .catch(function(error){
            alert(error);        
        }); 
});
