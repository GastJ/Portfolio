// Contact section
/*var card = $(".card-contact");

$(".body").on("mousemove",function(e) {  
  var ax = -($(window).innerWidth()/2- e.pageX)/30;
  var ay = ($(window).innerHeight()*20- e.pageY)/34;
  card.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");
});*/
// Scroll to section on click

$("#accueil, #accueil-res").on('click', function(event){
    if ($(window).width() < 767) {
        $('html, body').animate({
            scrollTop: $("html").offset().top
        }, 500);
        $('#nav-icon').toggleClass('open');
        $(".menu-section").toggle();
    }
    else{
        $('html, body').animate({
            scrollTop: $("html").offset().top
        }, 500);
    }
    /*return false;*/
    /*if (window.matchMedia("(min-width: 600px)").matches) {
        $('html, body').animate({
        scrollTop: $("html").offset().top
        }, 500);
    };*/
});

$("#portfolio, #portfolio-res").on('click', function(event){
    /*$('html, body').animate({
        scrollTop: $(".work").offset().top*0.905
    }, 500);
    if (window.matchMedia("(max-width: 600px)").matches) {
        $('html, body').animate({
        scrollTop: $(".work").offset().top+1
        }, 500);
    };*/
    if ($(window).width() < 767) {
        $('html, body').animate({
            scrollTop: $(".work").offset().top
        }, 500);
        $('#nav-icon').toggleClass('open');
        $(".menu-section").toggle();
    }
    else {
        if ($(window).width() > 767 && $(window).width() < 1025) {
            $('html, body').animate({
                scrollTop: $(".work").offset().top-64
            }, 500);
        }
        else{
            $('html, body').animate({
                scrollTop: $(".work").offset().top-73
            }, 500);
        }
    }
    return false;
});

$("#skills, #skills-res").on('click', function(event){
    /*$('html, body').animate({
        scrollTop: $(".skills").offset().top*0.951
    }, 500);
    if (window.matchMedia("(max-width: 600px)").matches) {
        $('html, body').animate({
        scrollTop: $(".skills").offset().top*1.7
        }, 500);
    };*/
    if ($(window).width() < 767) {
        $('html, body').animate({
            scrollTop: $(".skills").offset().top+1
        }, 500);
        $('#nav-icon').toggleClass('open');
        $(".menu-section").toggle();
    }
    else {
        if ($(window).width() > 767 && $(window).width() < 1025) {
            $('html, body').animate({
                scrollTop: $(".skills").offset().top-62
            }, 500);
        }
        else{
            $('html, body').animate({
                scrollTop: $(".skills").offset().top-73
            }, 500);
        }
    }
    return false;
});

$("#contact, #contact-res").on('click', function(event){
    /*$('html, body').animate({
        scrollTop: $(".contact").offset().top
    }, 500);*/
    /*if (window.matchMedia("(min-width: 600px)").matches) {
        $('html, body').animate({
        scrollTop: $("html").offset().top
    }, 500);
    };*/
    if ($(window).width() < 767) {
        $('html, body').animate({
            scrollTop: $(".contact").offset().top
        }, 500);
        $('#nav-icon').toggleClass('open');
        $(".menu-section").toggle();
    }
    else {
        if ($(window).width() > 767 && $(window).width() < 1025) {
            $('html, body').animate({
                scrollTop: $(".contact").offset().top-64
            }, 500);
        }
        else{
            $('html, body').animate({
                scrollTop: $(".contact").offset().top-73
            }, 500);
        }
    }
    return false;
});
if (window.matchMedia("(max-width: 600px)").matches) {
    $(".logojg").attr("src","images/logoGJ_white.png");
}
// CANVAS 
if (window.matchMedia("(min-width: 600px)").matches) { // for responsive
    // Animated background
    $(".logojg").attr("src","images/logoGJ.png");
    var canvasDots = function() {
    var canvas = document.querySelector('canvas'),
            ctx = canvas.getContext('2d'),
            colorDot = '#eee',
            color = "#eee";

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.display = 'block';
        ctx.fillStyle = colorDot;
        ctx.lineWidth = .2;
        ctx.strokeStyle = color;
        var mousePosition = {
            x: 30 * canvas.width / 100,
            y: 30 * canvas.height / 100
        };

        var dots = {
            nb: 600,
            distance: 60,
            d_radius: 100,
            array: []
        };

        function Dot(){
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.vx = -.5 + Math.random();
            this.vy = -.5 + Math.random();

            this.radius = Math.random();
        }

        Dot.prototype = {
            create: function(){
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
            },

            animate: function(){
                for(i = 0; i < dots.nb; i++){

                    var dot = dots.array[i];

                    if(dot.y < 0 || dot.y > canvas.height){
                        dot.vx = dot.vx;
                        dot.vy = - dot.vy;
                    }
                    else if(dot.x < 0 || dot.x > canvas.width){
                        dot.vx = - dot.vx;
                        dot.vy = dot.vy;
                    }
                    dot.x += dot.vx;
                    dot.y += dot.vy;
                }
            },

            line: function(){
                for(i = 0; i < dots.nb; i++){
                    for(j = 0; j < dots.nb; j++){
                        i_dot = dots.array[i];
                        j_dot = dots.array[j];

                        if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
                            if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                                ctx.beginPath();
                                ctx.moveTo(i_dot.x, i_dot.y);
                                ctx.lineTo(j_dot.x, j_dot.y);
                                ctx.stroke();
                                ctx.closePath();
                            }
                        }
                    }
                }
            }
        };

        function createDots(){
            if (dots.array.length > 50000) { dots.array = dots.array.slice(0, 40000); }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for(i = 0; i < dots.nb; i++){
                dots.array.push(new Dot());
                dot = dots.array[i];

                dot.create();
            }

            dot.line();
            dot.animate();
        }

        window.onmousemove = function(parameter) {
            mousePosition.x = parameter.pageX;
            mousePosition.y = parameter.pageY;
        }

        mousePosition.x = window.innerWidth / 2;
        mousePosition.y = window.innerHeight / 2;

        setInterval(createDots, 1000/30);
    };

    window.onload = function() {
        canvasDots();
    };
}
// Tooltip display
var tooltiptext;
$(".tooltip").mouseenter(function(){
  // Get elements:
  var thisStat = $(this);
  var thisTooltip = thisStat.find(".tooltiptext");
  var thisTooltipInner = thisTooltip.find("span");
  // Get data attributes:
  var dataPercentage = thisStat.attr("data-stat");
  var dataSoftware = thisStat.attr("data-soft");
  var dataColor = thisStat.attr("data-color");
  // Rewrite tooltip:
  thisTooltipInner.text(dataSoftware + " " + dataPercentage + "%");
  thisTooltip.css({"background":dataColor, "color":dataColor});
});

// Stat Trigger
//Get Stroke Path length:
var path = document.querySelector('.stat-path');
var dashLength = path.getTotalLength();
//Set Stat Path: Initial styles:
$('.stat-path').css({
  "stroke-dasharray": dashLength,
  "stroke-dashoffset": dashLength
});

//Stats Handler:
$(document).mouseenter(function(){
  triggerStats();
});

function triggerStats(){
  //Add transition:
  $(".stat-path").css({"transition": "ease 2s"});
  //Loop items:
  $(".stat-item").each(function(){
    //This item select:
    var thisStat = $(this);
    var thisPath = $(this).find("svg .stat-path");
    //Get this Stat Item data percentage attribute:
    var dataPercentage = thisStat.attr("data-stat");
    //Convert "dataPercentage" to absolute length:
    var statLength = (dataPercentage/100) * dashLength;
    //Set Stat Path (new styles):
    thisPath.css({
      "stroke-dasharray": dashLength,
      "stroke-dashoffset": (dashLength - statLength)
    });
  });
};

/* Menu Responsive */
$(document).ready(function(){
    $('#nav-icon').click(function(){
        $(this).toggleClass('open');
        $('div#nav-icon span').toggleClass('menuOpenChange');
        $(".menu-section").toggle();
    });
});
if($(window).width() < 400){
    var section = $(".skills");
    var sectionOffSet = section.offset().top +300;
    var sectionHeight = section.height();
    var $w = $(window).scroll(function(){
      if ($w.scrollTop() >= sectionOffSet && $w.scrollTop() <= (sectionOffSet + sectionHeight + 1000)) {
        $('div#nav-icon span').addClass('menuChange');
      }else{
        $('div#nav-icon span').removeClass('menuChange');
      }
    });
}else{
    var section = $(".skills");
    var sectionOffSet = section.offset().top;
    var sectionHeight = section.height();
    var $w = $(window).scroll(function(){
      if ($w.scrollTop() >= sectionOffSet && $w.scrollTop() <= (sectionOffSet + sectionHeight + 2000)) {
        $('div#nav-icon span').addClass('menuChange');
      }else{
        $('div#nav-icon span').removeClass('menuChange');
      }
    });
}