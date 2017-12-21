function loadView(data, tpln, divloadtpl, effect=true){
    getTemplate(tpln, data, function(output, err) {
      if(effect){
    	$('#'+divloadtpl).addClass('animated fadeOut');
        var millisecond = 100;
      }else{
        var millisecond = 1300;
      }


    	setTimeout(function(){
    		$("#"+divloadtpl).html(output);
        if(effect){
        $('#'+divloadtpl).addClass('animated slideInDown');
        }
    	}, millisecond);
    });  
}


function appendView(data, tpln, divloadtpl){
    getTemplate(tpln, data, function(output, err) {
      setTimeout(function(){
        $("#"+divloadtpl).append(output);
      }, 200);
    });  
}

function getTemplate(name, context, callback) {
  $.ajax({
    url: 'template/'+name+'.hbs',
    cache: true,
    success: function(data) {
      var tpl = Handlebars.compile(data),
      output = tpl(context);
      callback(output, null);
    },
    error: function(err) {
      callback(null, err);
    }
  });
}

function loadPartial(data, partial,divloadtpl){
  getPartial(partial, data, function(output, err) {
    $('#'+divloadtpl).addClass('animated fadeOut');
    setTimeout(function(){
      $("#"+divloadtpl).html(output);
      $('#'+divloadtpl).addClass('animated slideInDown');
    }, 2);
  }); 
}

function getPartial(name, context, callback){
  $.ajax({
    url: 'partials/'+name+'.hbs',
    cache: true,
    success: function(data) {
      var tpl = Handlebars.compile(data),
      output = tpl(context);
      callback(output, null);
    },
    error: function(err) {
      callback(null, err);
    }
  });
}

Handlebars.registerHelper('favoriteButton', function(producto_id) {
    

});


Handlebars.registerHelper('equalx', function(val,val2,validate,context) {
    if(val == val2){
      validate = true;
    }else{
      validate = false;
    }

    if(validate) {
      return context;
    }else{
      return '';
    }
});


Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});



Handlebars.registerHelper('renderStaticPartial', function(context) {
    return JSON.stringify(context);
});


Handlebars.registerHelper('host', function(url) {
    var host = "https://www.urgarden.com.mx"+ url;
    return host;
});



Handlebars.registerHelper('session_token', function(url) {
    var session_token = window.localStorage.getItem("session_token"); 

    return session_token;
});


Handlebars.registerHelper('link', function(text, url) {
  text = Handlebars.Utils.escapeExpression(text);
  url  = Handlebars.Utils.escapeExpression(url);

  var result = '<a href="' + url + '">' + text + '</a>';

  return new Handlebars.SafeString(result);
});


Handlebars.registerHelper('reverse', function (arr) {
    arr.reverse();
});

  