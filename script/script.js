// Using jQuery to generate listings based on the quantity of the products in the "products.txt"


// Generate Slider ----------------------------
    $(function(){
        $.get("../products/products.txt", function(data) {

            var data = JSON.parse(data);
            var auto_width = $('#autoWidth');
            var carousel_container = $('.carousel_container');  
            if(data != null){
                var items = [];
                $.each(data, function(key, val) {

                    var carousel_box = $('<div />').attr({
                        'class': 'carousel_box'
                    }).appendTo(auto_width);

                    var carousel_image_box = $('<div />').attr({
                        'class': 'carousel_image_box'
                    }).appendTo(carousel_box);
                    
                    var img = $('<img />').attr({
                        'id': 'myImage',
                        'src': val["Main_Image"]
                    }).appendTo(carousel_image_box);

                    var overlay = $('<div />').attr({
                        'class': 'overlay'
                    }).appendTo(carousel_image_box);

                    var a_button = $('<div />').attr({
                        'class': 'details_button'
                    }).appendTo(overlay);
                    $(a_button).html("Details Button");
                    
                        $(a_button).on('click',function(){

                       
                            // ------------------------------------------    Generate Popup with the Images, Description, Price and InStock Detail
                            var popup_overlay = $('<div />').attr({
                                'class': 'popup-overlay'
                            }).appendTo(carousel_container);

                            var pop_up_window = $('.popup-overlay');

                            pop_up_window.removeClass('.popup-overlay');
                            pop_up_window.addClass('show_details');

                            var popup_content = $('<div />').attr({
                                'class': 'popup-content'
                            }).appendTo(popup_overlay);

                            var pop_u_back_button = $('<img />').attr({
                                'class': 'pop_u_back_button',
                                'src': './images/close-button.png'
                            }).appendTo(popup_content);

                            var slider_outer = $('<div />').attr({
                                'class': 'slider-outer'
                            }).appendTo(popup_content);

                            var prev = $('<img />').attr({
                                'class': 'prev',
                                'src': "images/arrow-left.png"
                            }).appendTo(slider_outer);

                            var next = $('<img />').attr({
                                'class': 'next',
                                'src': "images/arrow-right.png"
                            }).appendTo(slider_outer);

                            var slider_inner = $('<div />').attr({
                                'class': 'slider-inner'
                            }).appendTo(slider_outer);
                            $.each(val["Gallery"], function(key, val) {

                                    var active = $('<img />').attr({
                                        'src': val
                                    }).appendTo(slider_inner);
                                
                                    if(key == 0){
                                        $(active).addClass('active');
                                    }
                                
                            });
                            var popup_title = $('<p />').attr({
                                'class': 'popup_title'
                            }).appendTo(popup_content);
                            $(popup_title).html(val["Title"]);
                    
                            var popup_description = $('<p />').attr({
                                'class': 'popup_description'
                            }).appendTo(popup_content);
                            $(popup_description).html(val["Description"]);

                            var units_in_stock = $('<p />').attr({
                                'class': 'units_in_stock'
                            }).appendTo(popup_content);
                            $(units_in_stock).html("In Stock: " + val["UnitsInStock"]);


                            var pop_up_price = $('<p />').attr({
                                'class': 'pop_up_price'
                            }).appendTo(popup_content);
                            $(pop_up_price).html("Price: "+"$" + val["UnitPrice"]);
                    
                            var buy_listing = $('<a />').attr({
                                'class': 'buy_listing'
                            }).appendTo(popup_content);
                            $(buy_listing).html("Buy");

                            $(pop_u_back_button).on('click',function(){

                                $(popup_overlay).remove('div');
                              
                             

                            });
                            // ------------------------------------------

                                $('.next').on('click', function(){
                                  var currentImg = $('.active');
                                  var nextImg = currentImg.next();
                              
                                  if(nextImg.length){
                                    currentImg.removeClass('active').css('z-index', -10);
                                    nextImg.addClass('active').css('z-index', 10);
                                  }
                                });
                              
                                $('.prev').on('click', function(){
                                  var currentImg = $('.active');
                                  var prevImg = currentImg.prev();
                              
                                  if(prevImg.length){
                                    currentImg.removeClass('active').css('z-index', -10);
                                    prevImg.addClass('active').css('z-index', 10);
                                  }
                                });

                        });
                
                    var detail_box = $('<div />').attr({
                        'class': 'detail_box'
                    }).appendTo(carousel_box);

                    var type = $('<div />').attr({
                        'class': 'type'
                    }).appendTo(detail_box);

                    var a_details = $('<a />').attr({
                        'class': 'a_details'
                    }).appendTo(type);
                    $(a_details).html(val["Title"]);
                    
                    var price = $('<span />').attr({
                        'class': 'price'

                    }).appendTo(type);
                    $(price).html("$" + val["UnitPrice"]);
            
                });
                   
            }else{
                console.log("no data");
            }
            
            
         });

        $('#autoWidth').lightSlider({
            autoWidth:true,
            loop:true,
            onSliderLoad: function(){
                $('#autoWidth').removeClass('cS-hidden');
            }
        });
    })

