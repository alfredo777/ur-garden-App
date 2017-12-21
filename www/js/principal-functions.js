//var domine = "http://192.168.1.82:3000/"
//var domine = "http://172.20.10.8:3000/"
var domine = "https://www.urgarden.com.mx/"
console.log = function() {}

var h = $(window).height();
/*$('#back').height(h);
setTimeout(function() {
    $('#back').show();
    $('#back').addClass('animated zoomIn');
}, 300);*/

$(document).ready(function() {
    var sesc = window.localStorage.getItem("session_token");
    console.log('<<<<<<<>>>>>>>>>>>' + sesc);
    setTimeout(function() {
        show_ajax('Cargando productos recomendados');
    }, 50);
    setTimeout(function() {
        $('#back').hide();
        $('#bodyx').show();
        setTimeout(function() {
            loadPartial('', 'botmenu', 'menu-bottom');
        }, 850);
        setTimeout(function() {
            loadPartial('', 'menu', 'menu-top');
        }, 500);
        setTimeout(function() {
            get_products();
        }, 300);
    }, 1000);
});
// get products
function get_index() {
    url = domine + 'api/best_produtcs';
    console.log(url);
    show_ajax();
    $.ajax({
        url: url,
        cache: true,
        success: function(data) {
            console.log('Respuesta satisfactoria');
            loadView(data, 'index', 'layout-div');
            hide_ajax();
        },
        error: function(err) {
            console.log(err);
        }
    });
}


function get_products(clear = true) {

    

    if (clear == true) {
        show_ajax('Cargando productos');
        var page = 1
        window.localStorage.setItem("PageProducts", page);
        var page = window.localStorage.getItem("PageProducts");
        window.localStorage.setItem("AllProducts", false);

        $('.select').removeClass('rubberBand');
        $('.select').removeClass('select');
        $('.tab-bott').first().addClass('animated rubberBand');
        $('.tab-bott').first().addClass('select');
    } else {
        show_ajax('Descargando productos');
        page = parseInt(window.localStorage.getItem("PageProducts")) + 1;
        window.localStorage.setItem("PageProducts", page);
    }

    var statLoadProducts = window.localStorage.getItem("AllProducts");


    if (statLoadProducts == "false") {
        url = domine + 'api/list_products?page=' + page;
        console.log(url);
        $.ajax({
            url: url,
            cache: true,
            success: function(data) {
                console.log('Respuesta satisfactoria');
                if (clear == true) {
                    loadView(data, 'products', 'layout-div');
                } else {
                    if (parseInt(data.paginas) >= parseInt(page)) {
                        appendView(data, 'paginate_products', 'productos');
                    } else {
                        window.localStorage.setItem("AllProducts", true);
                    }
                }
                hide_ajax();
            },
            error: function(err) {
                console.log(err);
            }
        });
    } else {
        $('#no-products').show();
    }

}

function add_product_selection_to_data_base(producto_id, color, name) {
    var sesc = window.localStorage.getItem("session_token");
    if(sesc == null || sesc == 'null' ){
        var mathXY = Math.floor((Math.random() * 100000000000000000) + 1);
        var devicex = 'dispositivo'+ String(mathXY);
        console.log(devicex);
        window.localStorage.setItem("session_token", devicex);
        sesc = window.localStorage.getItem("session_token");
    }

    if(color == null){
      var color = 'Natural';
    }

    var compose_data = [producto_id, color, sesc];
    var insertinCART = insertData(compose_data, 'carrito', myDataBase, Schema, false);
    alert('Se ha agregado el producto ' + name + ' al carrito');
}

function add_product_to_favorite(producto_id) {
    var sesc = window.localStorage.getItem("session_token");
    var compose_data = [producto_id, sesc];
    var insertinCART = insertData(compose_data, 'favoritos', myDataBase, Schema, false);
    var button = '<div id="button_favorite' + producto_id + '"><a class="button-bordered red-button-inverse button-90" onclick="remove_product_favorite(' + producto_id + ')">' + '<i class="fa fa-heart"></i> Favorito </a></div>';
    $('#button_favorite' + producto_id).html(button);

    findQueryRequest('favoritos', 'producto_id', producto_id, function(data) {
        var json = JSON.stringify(data);
        console.log(json);
    });
}

function remove_product_favorite(producto_id) {
    deleteRegisterQueryAcces('favoritos', 'producto_id', producto_id, function(data) {
        var button = '<a class="button-bordered red-button-no-inverse button-90" onclick="add_product_to_favorite(' + producto_id + ')">' + '<i class="fa fa-heart"></i> Favorito</a>';

        $('#button_favorite' + producto_id).html(button);
    });
}


function my_products(div, effect = true) {
    var str = window.localStorage.getItem("AllCar");
    url = domine + 'api/my_products';
    console.log(url);
    $.ajax({
        url: url,
        cache: true,
        method: 'POST',
        data: {
            "productos": str
        },
        success: function(data) {
            console.log('Respuesta satisfactoria');
            loadView(data, 'my_products_side_right', div, effect);
        },
        error: function(err) {
            console.log(err);
        }
    });
}


function PaginageProducts(paginateALL){
    if(paginateALL == 'ARX'){
      alert('sin paginación');
      $(window).scrollTop(0);
    }else{
      $(window).scroll(function () {
         if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
           get_products(false);
          }
      });
    }
}

function all_categories(div) {

    url = domine + 'api/categorias';
    console.log(url);
    show_ajax();
    $.ajax({
        url: url,
        cache: true,
        method: 'GET',
        success: function(data) {
            console.log('Respuesta satisfactoria');
            console.log(data);
            loadView(data, 'categories', div);
            hide_ajax();
        },
        error: function(err) {
            console.log(err);
        }
    });

}

function get_favorites() {
    var url = domine + 'api/favoritos';
    show_ajax();
    callAllQuery('favoritos', function(callback) {
        var idsX = [];
        $.each(callback, function(i, item) {
            idsX.push(callback[i].producto_id);
        });

        $.ajax({
            url: url,
            cache: true,
            method: 'POST',
            data: {
                "ids": idsX
            },
            success: function(data) {
                console.log('Respuesta satisfactoria');
                console.log(JSON.stringify(data));
                loadView(data, 'favorites', 'layout-div');
                hide_ajax();
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
}

function search_result(tosearch) {
    url = domine + 'api/search';
    console.log(url);
    show_ajax();
    $.ajax({
        url: url,
        cache: true,
        method: 'GET',
        data: {
            "search": tosearch
        },
        success: function(data) {
            console.log('Respuesta satisfactoria');
            console.log(data);
            loadView(data, 'products', 'layout-div');
            hide_ajax();
        },
        error: function(err) {
            console.log(err);
        }
    });
}




function open_search() {
    show_ajax();
    loadView('', 'search', 'layout-div');
    hide_ajax();
}


function open_pedidos() {
    show_ajax();
    callAllQuery('pedido_realizado', function(data){
        var data = {'pedidos': data}
        loadView(data, 'pedidos', 'layout-div');
    });
    hide_ajax();
}



function hide_ajax() {
    setTimeout(function() {
        $('.blur-load').hide();
        $('#blur').hide();
    }, 800);
}

function show_ajax(message = "Procesando ...") {
    var wh = $(window).height();
    var wh2 = wh / 2;
    $('.blur-load').height(wh);
    $('#blur').css({
        'margin-top': wh2 + 'px'
    });
    $(document).ajaxStart(function() {
        $('#blur-msg').html('<h4>' + message + '</h4>');
        $('.blur-load').show();
        $('#blur').show();
    });
}