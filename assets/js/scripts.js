/*
  javascript file.
* Author URI: https://themeforest.net/user/colorfuldesign
*/

(function ($) {
    "use strict";

    $(document).ready(function () {
        // Basice Code keep it 
        $(document).ready(function () {
            $(document).on("scroll", onScroll);

            //smoothscroll
            $('a[href^="#"]').on('click', function (e) {
                e.preventDefault();
                $(document).off("scroll");

                $('a').each(function () {
                    $(this).removeClass('active');
                })
                $(this).addClass('active');

                var target = this.hash,
                  //  menu = target;
                $target = $(target);
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top + 2
                }, 500, 'swing', function () {
                    window.location.hash = target;
                    $(document).on("scroll", onScroll);
                });
            });
        });

        // Use Your Class or ID For Selection 

        function onScroll(event) {
            var scrollPos = $(document).scrollTop();
            $('#top-menu > ul > li > a').each(function () {
                var currLink = $(this);
                console.log(currLink.get(0).innerHTML);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('#top-menu ul li a').removeClass("active");
                    currLink.addClass("active");
                }
                else {
                    currLink.removeClass("active");
                }
            });
        }
        // Page Loader // --------------------------
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 3000);

        // Mobile Menu Title // --------------------------

        var trigger = $('.nav-mobile-btn'),
            overlay = $('.overlay'),
            isClosed = false;

        trigger.click(function () {
            navmobilebtn_cross();
        });

        function navmobilebtn_cross() {

            if (isClosed == true) {
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
            } else {
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
            }
        }

        $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
        });

        var $NavSection = $('#nav-section');
        $NavSection.waypoint('sticky');
        $('.home-page').waypoint(function (dir) {
            if (dir === "down") {
                $NavSection.addClass('navshrink');
            } else {
                $NavSection.removeClass('navshrink');
            }
        }, { offset: -250 });
        $('.default-page').waypoint(function (dir) {
            if (dir === "down") {
                $NavSection.addClass('navshrink');
            } else {
                $NavSection.removeClass('navshrink');
            }
        }, { offset: -150 });


        // Pasta Price Item Slide  // --------------------------
        //     START   //
        var sync1 = $("#item-images");
        var sync2 = $("#item-thumbs");
        var slidesPerPage = 4; //globaly define number of elements per page
        var syncedSecondary = true;

        sync1.owlCarousel({
            items: 1,
            loop: true,
            smartSpeed: 1000,
            nav: true,
            dots: false,
            responsiveRefreshRate: 200,
            responsive: {
                0: { items: 1 },
            },
            navText: ["<i class='owl-prev-icon owl-button-icons'></i>", "<i class='owl-next-icon owl-button-icons'></i>"],
        }).on('changed.owl.carousel', syncPosition);

        sync2
            .on('initialized.owl.carousel', function () {
                sync2.find(".owl-item").eq(0).addClass("current");
            })

            .owlCarousel({
                items: slidesPerPage,
                nav: false,
                dots: false,
                smartSpeed: 600,
                slideSpeed: 500,
                responsive: {
                    0: { items: 4 },
                    479: { items: 4 },
                    768: { items: 4 },
                    979: { items: 5 },
                    1199: { items: 5 },
                },
                responsiveRefreshRate: 100,

            }).on('changed.owl.carousel', syncPosition2);

        function syncPosition(el) {
            //if you set loop to false, you have to restore this next line
            //var current = el.item.index;

            //if you disable loop you have to comment this block
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - (el.item.count / 2) - .5);

            if (current <= 0) {
                current = count;
            }
            if (current >= count) {
                current = 0;
            }

            //end block

            sync2
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = sync2.find('.owl-item.active').length - 1;
            var start = sync2.find('.owl-item.active').first().index();
            var end = sync2.find('.owl-item.active').last().index();

            if (current >= end) {
                sync2.data('owl.carousel').to(current, 300, true);
            }
            if (current <= start) {
                sync2.data('owl.carousel').to(current - onscreen, 300, true);
            }
        }

        function syncPosition2(el) {
            if (syncedSecondary) {
                var number = el.item.index;
                sync1.data('owl.carousel').to(number, 400, true);
            }
        }

        sync2.on("click", ".owl-item", function (e) {
            e.preventDefault();
            var number = $(this).index();
            sync1.data('owl.carousel').to(number, 600, true);
        });
        //  END  //


        // Old School Clock // --------------------------
        // https://css-tricks.com/css3-clock/
        setInterval(function () {
            var seconds = new Date().getSeconds();
            var sdegree = seconds * 6;
            var srotate = "rotate(" + sdegree + "deg)";

            $("#sec").css({ "-moz-transform": srotate, "-webkit-transform": srotate, "transform": srotate });

        }, 1000);

        setInterval(function () {
            var hours = new Date().getHours();
            var mins = new Date().getMinutes();
            var hdegree = hours * 30 + (mins / 2);
            var hrotate = "rotate(" + hdegree + "deg)";

            $("#hour").css({ "-moz-transform": hrotate, "-webkit-transform": hrotate, "transform": hrotate });

        }, 1000);

        setInterval(function () {
            var mins = new Date().getMinutes();
            var mdegree = mins * 6;
            var mrotate = "rotate(" + mdegree + "deg)";

            $("#min").css({ "-moz-transform": mrotate, "-webkit-transform": mrotate, "transform": mrotate });

        }, 1000);


        //  TABS // --------------------------
        $('.tabs .tab-links a').on('click', function (e) {
            var currentAttrValue = $(this).attr('href');

            // Show/Hide Tabs
            $('.tabs ' + currentAttrValue).show().siblings().hide();

            // Change/remove current tab to active
            $(this).parent('li').addClass('active').siblings().removeClass('active');

            e.preventDefault();
        });


        // Adds ios class to html tag // --------------------------
        var deviceAgent = navigator.userAgent.toLowerCase();
        var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
        if (agentID) {

            $('.video-background').addClass('ios');

        };


        // Progress bars // --------------------------
        $('.progress .progress-bar').progressbar({ display_text: 'fill' });


        // Datepiker: Format Date Time
        ///  https://eonasdan.github.io/bootstrap-datetimepicker/
        $('#dp-time').datetimepicker({
            format: 'LT'
        });
        $('#dp-date').datetimepicker({

            format: 'DD/MM/YYYY'
        });

        // Footer Button to Top // --------------------------
        //
        $('.scrollTopButton').on("click", function () {
            $("body,html").animate({ scrollTop: 0 }, 1200);
            return false;
        });

        // Special Menu// --------------------------
        $(".special-menu-slider").owlCarousel({
            loop: true,
            nav: true,
            dots: false,
            autoplay: true,
            smartSpeed: 800,
            navText: ["<i class='owl-prev-icon owl-button-icons'></i>", "<i class='owl-next-icon owl-button-icons'></i>"],
            responsive: {
                0: { items: 1 },
                479: { items: 2 },
                768: { items: 2 },
                979: { items: 3 },
                1199: { items: 3 }
            },
        });


        // Thef Team // --------------------------
        $(".owl-chef-team-slider").owlCarousel({
            loop: true,
            nav: true,
            dots: false,
            autoplay: true,
            smartSpeed: 800,
            navText: ["<i class='owl-prev-icon owl-button-icons'></i>", "<i class='owl-next-icon owl-button-icons'></i>"],
            responsive: {
                0: { items: 1 },
                479: { items: 2 },
                768: { items: 2 },
                979: { items: 3 },
                1199: { items: 4 }
            },
        });

        // Testimonials // --------------------------
        $(".owl-testimonials").owlCarousel({
            loop: true,
            nav: false,
            dots: true,
            autoplay: true,
            smartSpeed: 800,
            autoplayTimeout: 8000,
            navText: ["<i class='owl-prev-icon owl-button-icons'></i>", "<i class='owl-next-icon owl-button-icons'></i>"],
            responsive: {
                0: { items: 1 },
            },
        });

        // Featured Recipe // --------------------------
        $(".owl-featured-recipe").owlCarousel({
            loop: true,
            nav: true,
            dots: false,
            autoplay: true,
            smartSpeed: 800,
            slideSpeed: 800,
            navText: ["<i class='owl-prev-icon owl-button-icons'></i>", "<i class='owl-next-icon owl-button-icons'></i>"],
            responsive: {
                0: { items: 1 },
                479: { items: 2 },
                768: { items: 2 },
                979: { items: 2 },
                1199: { items: 2 }
            },
        });

        // ISOTOPE//--------------------------

        if ($('.menu-items-list').length) {
            var defaultFilter = $('.tagsort-active')
                .attr('data-filter');

            var $grid = $('.menu-items-list')

                .isotope({ itemSelector: '.menu-item', layoutMode: 'fitRows', filter: defaultFilter });

            $('.menu-button-filter').on('click', 'li', function () {

                $('.menu-button-filter li').removeClass('tagsort-active');

                var temp = $(this).parent().closest('li')['context'];
                //console.log(temp.innerHTML);

                if (temp.innerHTML.includes('All')) {
                    $('#all-up').addClass('tagsort-active');
                    $('#all-down').addClass('tagsort-active');
                }
                else if (temp.innerHTML.includes('Cakes')) {
                    $('#cakes-up').addClass('tagsort-active');
                    $('#cakes-down').addClass('tagsort-active');
                }
                else if (temp.innerHTML.includes('Brownies')) {
                    $('#brownies-up').addClass('tagsort-active');
                    $('#brownies-down').addClass('tagsort-active');
                }
                else if (temp.innerHTML.includes('Cheesecakes')) {
                    $('#cheese-up').addClass('tagsort-active');
                    $('#cheese-down').addClass('tagsort-active');
                }
                else if (temp.innerHTML.includes('Cookies')) {
                    $('#cookies-up').addClass('tagsort-active');
                    $('#cookies-down').addClass('tagsort-active');
                }
                else if (temp.innerHTML.includes('Vegan')) {
                    $('#vegan-up').addClass('tagsort-active');
                    $('#vegan-down').addClass('tagsort-active');
                }
                else if (temp.innerHTML.includes('Gluten')) {
                    $('#glutenfree-up').addClass('tagsort-active');
                    $('#glutenfree-down').addClass('tagsort-active');
                }
                else if (temp.innerHTML.includes('Cannolies')) {
                    $('#cannolies-up').addClass('tagsort-active');
                    $('#cannolies-down').addClass('tagsort-active');
                }
                else if (temp.innerHTML.includes('Cards')) {
                    $('#cards-up').addClass('tagsort-active');
                    $('#cards-down').addClass('tagsort-active');
                }

                //$(this).toggleClass('tagsort-active');

                var filterValue = $(this).attr('data-filter');

                $grid.isotope({ filter: filterValue });

                $('html, body').animate({
                    scrollTop: $("#menu").offset().top
               });
            }
            );
        };

        $("#troy").click(function() {
            $("#troy-contact").show();
            $("#canton-contact").hide();
            $("#canton").removeClass('tagsort-contact-active');
            $("#troy").addClass('tagsort-contact-active');
            $('html, body').animate({
                scrollTop: $("#contact").offset().top
           }); 
        });

        $("#canton").click(function() {
            $("#troy-contact").hide();
            $("#canton-contact").show();
            $("#troy").removeClass('tagsort-contact-active');
            $("#canton").addClass('tagsort-contact-active');
            $('html, body').animate({
                scrollTop: $("#contact").offset().top
           }); 
        });

        // Header background image //
        $(".header-background").each(function () {
            var attr = $(this).attr('data-image-src');
            var $item = $(this);

            if (typeof attr !== typeof undefined && attr !== false) {
                $(this).css('background', 'url(' + attr + ') no-repeat');
            }
            $item.css({ 'background-position': 'center', 'background-size': 'cover' });
        });

        // Adverst image background //
        $(".advert-image").each(function () {
            var attr = $(this).attr('data-image-src');
            var $item = $(this);

            if (typeof attr !== typeof undefined && attr !== false) {
                $(this).css('background', 'url(' + attr + ') no-repeat');
            }
            $item.css({ 'background-position': 'center', 'background-size': 'cover' });
        });


        // About frame images //

        $(".frame-image").each(function () {
            var attr = $(this).attr('data-image-src');
            var $item = $(this);
            if (typeof attr !== typeof undefined && attr !== false) {
                $(this).css('background', 'url(' + attr + ') no-repeat');
            }
            $item.css({ 'background-position': 'top center', 'background-size': 'cover', 'min-height': '600px', 'height': '100%' });

        });


        // Item image //
        $(".view-image").each(function () {
            var attr = $(this).attr('data-image-src');
            var $item = $(this);

            if (typeof attr !== typeof undefined && attr !== false) {
                $(this).css('background', 'url(' + attr + ') no-repeat');
            }
            $item.css({ 'background-position': 'center', 'background-size': 'cover' });
        });


        // Mobile Menu Overlay Background //

        $(".overlay").each(function () {
            var attr = $(this).attr('data-image-src');
            var $item = $(this);

            if (typeof attr !== typeof undefined && attr !== false) {
                $(this).css('background', 'url(' + attr + ') no-repeat');
            }
            $item.css({ 'background-position': 'center', 'background-size': 'cover' });
        });

        // Accordion // --------------------------
        function toggleIcon(e) {
            $(e.target)
                .prev('.panel-heading')
                .find(".more-less")
                .toggleClass('glyphicon-plus glyphicon-minus');
        }
        $('.panel-group').on('hidden.bs.collapse', toggleIcon);
        $('.panel-group').on('shown.bs.collapse', toggleIcon);

    });
}(jQuery));


/*btn-effect*/


$.fn.boom = function(e) {
    var colors = [
        '#ffb3f6',
        '#7aa0ff',
        '#333',
        // '#FFD100',
        // '#FF9300',
        // '#FF7FA4'
    ];
    var shapes = [
        '<polygon class="star" points="21,0,28.053423027509677,11.29179606750063,40.97218684219823,14.510643118126104,32.412678195541844,24.70820393249937,33.34349029814194,37.989356881873896,21,33,8.656509701858067,37.989356881873896,9.587321804458158,24.70820393249937,1.0278131578017735,14.510643118126108,13.94657697249032,11.291796067500632"></polygon>', 
        // '<path class="circle" d="m 20 1 a 1 1 0 0 0 0 25 a 1 1 0 0 0 0 -25"></path>',
        '<polygon class="other-star" points="18,0,22.242640687119284,13.757359312880714,36,18,22.242640687119284,22.242640687119284,18.000000000000004,36,13.757359312880716,22.242640687119284,0,18.000000000000004,13.757359312880714,13.757359312880716"></polygon>',
        '<polygon class="diamond" points="18,0,27.192388155425117,8.80761184457488,36,18,27.19238815542512,27.192388155425117,18.000000000000004,36,8.807611844574883,27.19238815542512,0,18.000000000000004,8.80761184457488,8.807611844574884"></polygon>'
    ];

    var btn = $(this);
    var group = [];
    var num = Math.floor(Math.random() * 50) + 30;

    for(i = 0; i < num; i++) {
        var randBG = Math.floor(Math.random() * colors.length);
        var getShape = Math.floor(Math.random() * shapes.length);
        var c = Math.floor(Math.random() * 10) + 5;
        var scale = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
        var x = Math.floor(Math.random() * (150 + 100)) - 100;
        var y = Math.floor(Math.random() * (150 + 100)) - 100;
        var sec = Math.floor(Math.random() * 1700) + 1000;
        var cir = $('<div class="cir"></div>');
        var shape = $('<svg class="shape">'+shapes[getShape]+'</svg>');
        
        shape.css({
            top: e.pageY - btn.offset().top - 100,
            left: e.pageX - btn.offset().left,
            'transform': 'scale(0.'+scale+')',
            'transition': sec + 'ms',
            'fill': colors[randBG]
        });

        btn.siblings('.btn-particles').append(shape);

        group.push({shape: shape, x: x, y: y});
    }
    
    for (var a = 0; a < group.length; a++) {
        var shape = group[a].shape;
        var x = group[a].x, y = group[a].y;
        shape.css({
            left: x,
            top: y,
            'transform': 'scale(0)'
        });
    }
    
    setTimeout(function() {
        for (var b = 0; b < group.length; b++) {
            var shape = group[b].shape;
            shape.remove();
        }
        group = [];
    }, 2000);

}   

$(function() {
    $(document).on('click', '.btn-special', function(e) {
        $(this).boom(e);
    });

});
