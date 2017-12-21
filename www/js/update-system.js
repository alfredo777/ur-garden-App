
var domine = "http://192.168.1.82:3000/"

// get products 

function get_products(){
url = domine + 'api/list_products'
console.log(url);
$.ajax({
    url: url,
    cache: true,
    success: function (data) {
      if(data == null){
        console.log(null);
        alert('Error 1 ...');
      }else{
        var sString = JSON.stringify(data);
        $.each(data, function(i, item) {
            $('#products').html(data[i].Id+',');
        });​
      }
    },
    error: function(err) {
      callback(null, err);
    }
  });
}
