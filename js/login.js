$('#btnRequest').click(function(){
    var inputEmail = $('#inputEmail').val();
    var inputPassword = $('#inputPassword').val(); 

    console.log(inputEmail, inputPassword);
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
                console.log(response.data);
                alert('Bien viendo!');        
            }      
        })
        .catch(function(error){
            console.log(error);        
        }); 
});
