$(document).on('ready', function () {
  'use strict'
  /* -------------------------------------
			NAVIGATION TOGGLE
	-------------------------------------- */
  $('.bt-btntogglemenu').on('click', function (event) {
    event.preventDefault()
    $('#bt-nav').slideToggle('slow')
    $('body.bt-homeone').toggleClass('bt-pagescrolldiable')
    $('body.bt-hometwo').toggleClass('bt-pagescrolldiable')
  })
  /* -------------------------------------
			SHARE ICONS TOGGLE
	-------------------------------------- */
  var _bt_btnshare = $('.bt-btnshare')
  _bt_btnshare.on('click', function (event) {
    event.preventDefault()
    var _bt_shapreicons = $('.bt-shapreicons')
    $(this).parent('li').toggleClass('bt-showicon')
  })
  /* -------------------------------------
			HOME BANNER SLIDER				
	-------------------------------------- */
  var _bt_homeslidervone = $('#bt-homeslidervone')
  _bt_homeslidervone
    .pogoSlider({
      pauseOnHover: false,
      autoplay: true,
      generateNav: false,
      generateButtons: true,
      displayProgess: false,
      autoplayTimeout: 6000,
      responsive: true,
      onSlideStart: function () {
        var _slideslength = $('.pogoSlider-slide').length
        var _currentSlide = this.currentSlideIndex + 1
        $('#bt-totalslides').text(_slideslength)
        $('#bt-currentslides').text(_currentSlide)
      },
    })
    .data('plugin_pogoSlider')
  /* -------------------------------------
			ALBUMBS GALLERY
	-------------------------------------- */
  var _tg_categoryAlbumbs = $(
    '[id="bt-weddingalbum"],[id="bt-kidsalbum"], [id="bt-twinssisteralbum"], [id="bt-halloweenalbum"], [id="bt-stationphotographyalbum"], [id="bt-femalemodelalbum"], [id="bt-femalemodeltwoalbum"], [id="bt-randomclickalbum"]'
  )
  if (_tg_categoryAlbumbs.hasClass('bt-album')) {
    _tg_categoryAlbumbs.jGallery({
      textColor: '#fff',
      mode: 'full-screen',
      canChangeMode: false,
      browserHistory: false,
      backgroundColor: '#000',
    })
  }
  $('.bt-callalbum').on('click', function (event) {
    event.preventDefault()
    var clickedValue = $(this).attr('data-number')
    // console.log(clickedValue)
    $('.jgallery').each(function () {
      $(this).hide()
      if ($(this).attr('data-jgallery-id') == clickedValue) {
        $(this).show()
      }
    })
    $('body.bt-homevalbums').toggleClass('bt-showalbum')
  })
  $('#bt-btnclosealbum').on('click', function (event) {
    $('body.bt-homevalbums').toggleClass('bt-showalbum')
  })
  /* -------------------------------------
			BANNER FADEOUT
	-------------------------------------- */
  function bannerFadeout() {
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop()
      /*if (scroll > 1) {
				$('.bt-homevtwo').addClass('bt-fixed');
			}
			if (scroll === 0){
				$('.bt-homevtwo').removeClass('bt-fixed');
			}*/
      var mainPosition = $('.bt-main').offset().top
      if (scroll >= mainPosition) {
        $('.bt-homevtwo').addClass('bt-fixed')
      } else {
        $('.bt-homevtwo').removeClass('bt-fixed')
      }
    })
  }
  bannerFadeout()
  /* -------------------------------------
			PRETTY PHOTO GALLERY
	-------------------------------------- */
  $('a[data-rel]').each(function () {
    $(this).attr('rel', $(this).data('rel'))
  })
  $("a[data-rel^='prettyPhoto']").prettyPhoto({
    animation_speed: 'normal',
    theme: 'dark_square',
    slideshow: 3000,
    autoplay_slideshow: false,
    social_tools: false,
  })
  /*--------------------------------------
			PADDING EQUEL TO WINDOW HEIGHT
	--------------------------------------*/
  function paddingequlheight() {
    var $_height = $(window).height()
    $('body.bt-homevthree .bt-wrapper').css({
      'padding-top': $_height + 'px',
    })
  }
  paddingequlheight()
  /* -------------------------------------
			HOME BANNER SLIDER				
	-------------------------------------- */
  var mySlider = $('#bt-homeslidervthree')
  mySlider
    .pogoSlider({
      generateButtons: true,
      autoplayTimeout: 6000,
      displayProgess: false,
      pauseOnHover: false,
      generateNav: false,
      responsive: true,
      autoplay: false,
      onSlideStart: function (current) {
        var currentSlide = $(this)[0].currentSlideIndex + 1
        $('.bt-albumpost').each(function () {
          $(this).removeClass('active').fadeOut()
          var dataSlide = $(this).data('slide')
          if (currentSlide == dataSlide) {
            $(this).addClass('active').delay(300).fadeIn()
          }
        })
      },
    })
    .data('plugin_pogoSlider')
  /*--------------------------------------
			HOME PAGE FOUR SLIDER
	--------------------------------------*/
  // var _bt_sliderfour = $('#bt-sliderfour')
  // _bt_sliderfour.slick({
  //   infinite: true,
  //   slidesToShow: 1,
  //   dots: true,
  //   arrows: false,
  //   dotsClass: 'bt-slidernav',
  // })
  /*--------------------------------------
			HOME PAGE FIVE SLIDER
	--------------------------------------*/
  function slickSlider() {
    var _status = $('.tg-bannerfullwidthslidecount')
    var _slider = $('#tg-postfullslider')
    _slider.on(
      'init reInit afterChange',
      function (event, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1
        _status.html(
          '<span>' + i + '</span><span>' + slick.slideCount + '</span>'
        )
      }
    )
    _slider.slick({
      fade: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '#tg-postthumbnail',
    })
    $('#tg-postthumbnail').slick({
      dots: false,
      arrows: false,
      vertical: true,
      infinite: true,
      slidesToShow: 9,
      centerMode: true,
      slidesToScroll: 1,
      focusOnSelect: true,
      asNavFor: _slider,
    })
    $('#bt-togglethumbnails').on('click', function () {
      $('body.bt-homevfive').toggleClass('bt-hidethumbnail')
    })
  }
  slickSlider()
  /* --------------------------------------
			LOAD MORE GALLERY
	-------------------------------------- */
  function loadMoregallery() {
    $('.bt-loaditem').slice(0, 9).show()
    $('#bt-btnloadmore').on('click', function (e) {
      e.preventDefault()
      $('.bt-loaditem:hidden').slice(0, 2).slideDown()
      if ($('.bt-loaditem:hidden').length == 0) {
        $('#bt-btnloadmore').fadeOut('slow')
      }
      $('html,body').animate(
        {
          scrollTop: $(this).offset().top - 30,
        },
        1500
      )
    })
  }
  loadMoregallery()
  function indexsixloadMoregallery() {
    $('.bt-indexsixloaditem').slice(0, 11).show()
    $('#bt-indexsixbtnloadmore').on('click', function (e) {
      e.preventDefault()
      $('.bt-indexsixloaditem:hidden').slice(0, 2).slideDown()
      if ($('.bt-indexsixloaditem:hidden').length == 0) {
        $('#bt-indexsixbtnloadmore').fadeOut('slow')
      }
      $('html,body').animate(
        {
          scrollTop: $(this).offset().top - 30,
        },
        1500
      )
    })
  }
  indexsixloadMoregallery()
  function loadmorephotographer() {
    $('.bt-loadmorephotographer').slice(0, 8).show()
    $('#bt-btnloadmorephotographer').on('click', function (e) {
      e.preventDefault()
      $('.bt-loadmorephotographer:hidden').slice(0, 2).slideDown()
      if ($('.bt-loadmorephotographer:hidden').length == 0) {
        $('#bt-btnloadmorephotographer').fadeOut('slow')
      }
      $('html,body').animate(
        {
          scrollTop: $(this).offset().top - 30,
        },
        1500
      )
    })
  }
  loadmorephotographer()
  /* ---------------------------------------
			HOME EIGHT SLIDER
	-------------------------------------- */
  // var homeEightSlider = $('#bt-homesliderveight')
  // homeEightSlider.slick({
  //   dots: false,
  //   arrows: true,
  //   slidesToShow: 3,
  //   infinite: false,
  //   slidesToScroll: 1,
  //   prevArrow:
  //     '<span class="tg-btnprev"><i class="fa fa-angle-left"></i></span>',
  //   nextArrow:
  //     '<span class="tg-btnnext"><i class="fa fa-angle-right"></i></span>',
  //   responsive: [
  //     {
  //       breakpoint: 1080,
  //       settings: { slidesToShow: 2 },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: { slidesToShow: 2 },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: { slidesToShow: 1 },
  //     },
  //   ],
  // })
  /* -------------------------------------
			COUNTER
	-------------------------------------- */
  // var _bt_counters = $('.bt-counters')
  // _bt_counters.appear(function () {
  //   var _bt_timer = $('.bt-count h3')
  //   _bt_timer.countTo()
  // })
  /* -------------------------------------
			PROGRESS BAR
	-------------------------------------- */
  // var _bt_memberskills = $('#bt-memberskills')
  // _bt_memberskills.appear(function () {
  //   var _bt_memberskillholder = $('.bt-memberskillholder')
  //   _bt_memberskillholder.each(function () {
  //     $(this)
  //       .find('.bt-memberskillbar')
  //       .animate(
  //         {
  //           width: $(this).attr('data-percent'),
  //         },
  //         2500
  //       )
  //   })
  // })
  /*--------------------------------------
			HOME PAGE FOUR SLIDER
	--------------------------------------*/
  // var _bt_portfolioslider = $('#bt-portfolioslider')
  // _bt_portfolioslider.slick({
  //   infinite: true,
  //   slidesToShow: 1,
  //   arrows: true,
  //   prevArrow:
  //     '<span class="tg-btnprev"><i class="fa fa-angle-left"></i></span>',
  //   nextArrow:
  //     '<span class="tg-btnnext"><i class="fa fa-angle-right"></i></span>',
  // })
  /* -------------------------------------
			TOGGLE CONTACT US
	-------------------------------------- */
  $('#bt-btnplus').on('click', function () {
    $('#bt-contactinfo').toggle('slow')
  })
  /* -------------------------------------
			TOGGLE CONTACT US
	-------------------------------------- */
  var _bt_btnheadertoggle = $('#bt-btnheadertoggle')
  _bt_btnheadertoggle.on('click', function () {
    $('body').toggleClass('bt-showheader')
  })

  /* -------------------------------------
			SCROLL TO SECTION
	-------------------------------------- */
  $('#bt-btnscrollto').click(function (event) {
    event.preventDefault()
    $.scrollTo('#bt-main', 800)
  })
  /* -------------------------------------
			CUBE GALLERY
	-------------------------------------- */
  if ($('#bt-threecolumnscubegallery').length > 0) {
    $('#bt-threecolumnscubegallery').cubeportfolio({
      layoutMode: 'grid',
      sortToPreventGaps: true,
      animationType: 'fadeOutTop',
      gapHorizontal: 0,
      gapVertical: 0,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 768,
          cols: 3,
        },
        {
          width: 480,
          cols: 2,
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
      plugins: {
        loadMore: {
          selector: '#bt-loadMore',
          action: 'click',
          loadItems: 3,
        },
      },
    })
  }
  if ($('#bt-threecolumnscubevonegallery').length > 0) {
    $('#bt-threecolumnscubevonegallery').cubeportfolio({
      layoutMode: 'grid',
      sortToPreventGaps: true,
      animationType: 'fadeOutTop',
      gapHorizontal: 0,
      gapVertical: 0,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 768,
          cols: 3,
        },
        {
          width: 480,
          cols: 2,
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
      plugins: {
        loadMore: {
          selector: '#bt-loadMore',
          action: 'click',
          loadItems: 3,
        },
      },
    })
  }
  if ($('#bt-threecolumnscubegalleryvtwo').length > 0) {
    $('#bt-threecolumnscubegalleryvtwo').cubeportfolio({
      layoutMode: 'grid',
      sortToPreventGaps: true,
      animationType: 'fadeOutTop',
      gapHorizontal: 30,
      gapVertical: 30,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 768,
          cols: 3,
        },
        {
          width: 480,
          cols: 2,
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
      plugins: {
        loadMore: {
          selector: '#bt-loadMore',
          action: 'click',
          loadItems: 3,
        },
      },
    })
  }
  if ($('#bt-threecolumnscubegallery').length > 0) {
    $('#bt-threecolumnscubegallery').cubeportfolio({
      layoutMode: 'grid',
      sortToPreventGaps: true,
      animationType: 'fadeOutTop',
      gapHorizontal: 0,
      gapVertical: 30,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 768,
          cols: 3,
        },
        {
          width: 480,
          cols: 2,
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
      plugins: {
        loadMore: {
          selector: '#bt-loadMore',
          action: 'click',
          loadItems: 3,
        },
      },
    })
  }
  if ($('#bt-threecolumnscubegallery').length > 0) {
    $('#bt-threecolumnscubegallery').cubeportfolio({
      layoutMode: 'grid',
      sortToPreventGaps: true,
      animationType: 'fadeOutTop',
      gapHorizontal: 30,
      gapVertical: 30,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 768,
          cols: 3,
        },
        {
          width: 480,
          cols: 2,
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
      plugins: {
        loadMore: {
          selector: '#bt-loadMore',
          action: 'click',
          loadItems: 3,
        },
      },
    })
  }
  if ($('#bt-indexfourphotogallery').length > 0) {
    $('#bt-indexfourphotogallery').cubeportfolio({
      layoutMode: 'grid',
      sortToPreventGaps: true,
      animationType: 'fadeOutTop',
      gapHorizontal: 30,
      gapVertical: 30,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 768,
          cols: 2,
        },
        {
          width: 767,
          cols: 1,
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
      plugins: {
        loadMore: {
          selector: '#bt-loadMore',
          action: 'click',
          loadItems: 3,
        },
      },
    })
  }
  if ($('#js-grid-agency').length > 0) {
    $('#js-grid-agency').cubeportfolio({
      filters: '#js-filters-agency',
      layoutMode: 'grid',
      defaultFilter: '*',
      animationType: 'slideLeft',
      gapHorizontal: 30,
      gapVertical: 30,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 1100,
          cols: 3,
        },
        {
          width: 480,
          cols: 2,
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
      plugins: {
        loadMore: {
          selector: '#bt-loadMore',
          action: 'click',
          loadItems: 3,
        },
      },
    })
  }
  if ($('#bt-threecolumnscubegallery').length > 0) {
    $('#bt-threecolumnscubegallery').cubeportfolio({
      layoutMode: 'grid',
      sortToPreventGaps: true,
      animationType: 'fadeOutTop',
      gapHorizontal: 30,
      gapVertical: 30,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 768,
          cols: 3,
        },
        {
          width: 480,
          cols: 2,
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
    })
  }
  if ($('#bt-portfoliovfourgallery').length > 0) {
    $('#bt-portfoliovfourgallery').cubeportfolio({
      layoutMode: 'grid',
      sortToPreventGaps: true,
      animationType: 'fadeOutTop',
      gapHorizontal: 30,
      gapVertical: 30,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 768,
          cols: 3,
        },
        {
          width: 480,
          cols: 2,
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
    })
  }
  if ($('#bt-portfoliovonegallery').length > 0) {
    $('#bt-portfoliovonegallery').cubeportfolio({
      layoutMode: 'grid',
      sortToPreventGaps: true,
      animationType: 'fadeOutTop',
      gapHorizontal: 30,
      gapVertical: 30,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 768,
          cols: 3,
        },
        {
          width: 480,
          cols: 2,
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
      plugins: {
        loadMore: {
          selector: '#bt-loadMore',
          action: 'click',
          loadItems: 3,
        },
      },
    })
  }
  if ($('#bt-cubegallery').length > 0) {
    $('#bt-cubegallery').cubeportfolio({
      layoutMode: 'mosaic',
      sortToPreventGaps: true,
      animationType: 'fadeOutTop',
      gapHorizontal: 20,
      gapVertical: 20,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 1500,
          cols: 6,
        },
        {
          width: 1100,
          cols: 4,
        },
        {
          width: 800,
          cols: 3,
        },
        {
          width: 480,
          cols: 2,
          options: {
            caption: '',
            gapHorizontal: 10,
            gapVertical: 10,
          },
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
      plugins: {
        loadMore: {
          selector: '#bt-loadMore',
          action: 'click',
          loadItems: 3,
        },
      },
    })
  }
  if ($('#bt-freephotosgallery').length > 0) {
    $('#bt-freephotosgallery').cubeportfolio({
      filters: '#js-filters-agency',
      layoutMode: 'mosaic',
      defaultFilter: '*',
      animationType: 'slideLeft',
      gapHorizontal: 20,
      gapVertical: 20,
      gridAdjustment: 'responsive',
      mediaQueries: [
        {
          width: 1500,
          cols: 6,
        },
        {
          width: 1100,
          cols: 4,
        },
        {
          width: 800,
          cols: 3,
        },
        {
          width: 480,
          cols: 2,
          options: {
            caption: '',
            gapHorizontal: 10,
            gapVertical: 10,
          },
        },
      ],
      caption: 'zoom',
      displayType: 'fadeIn',
      displayTypeSpeed: 100,
      plugins: {
        loadMore: {
          selector: '#bt-loadMore',
          action: 'click',
          loadItems: 3,
        },
      },
    })
  }
})
/* -------------------------------------
		THEME PRELOADER
-------------------------------------- */
$(window).on('load', function () {
  var $preloader = $('#bt-preloader'),
    $spinner = $preloader.find('.bt-preloadericon')
  $spinner.fadeOut()
  $preloader.delay(350).fadeOut('slow')
})
