jQuery(function(){
	jQuery('#myCarousel').carousel({ interval: false });  
}());

jQuery(function(){
	jQuery('.carousel-showmanymoveone .item').each(function(){
		var itemToClone = jQuery(this);

		for (var i=1;i<4;i++) {
			itemToClone = itemToClone.next();

		if (!itemToClone.length) {
			itemToClone = jQuery(this).siblings(':first');
		}

		itemToClone.children(':first-child').clone()
			.addClass("cloneditem-"+(i))
			.appendTo(jQuery(this));
		}
	});
}());
  
jQuery(".c-image-wrapper a").on("click", function() {
	var max_win_width,win_width,win_height,v_id,html,src;
    if(jQuery(this).attr('v_id')) {
		win_width = (jQuery(window).width() <= 849) ? jQuery(window).width() - 70 : 780;
      	win_height = win_width/16*9;
        max_win_width = win_width;
		v_id = jQuery(this).attr('v_id');
		html = '<iframe width="' + win_width + '" height="' + win_height + '" src="https://www.youtube.com/embed/' + v_id + '" frameborder="0" allowfullscreen></iframe>';
	} else {
		src = jQuery(this).find('img').attr('src');
		//jQuery('#imgtitle').text(title);
		html = '<img src="' + src + '" style="width:auto; height: auto;" >';
      	win_width = (jQuery(window).width() <= 849) ? jQuery(window).width() - 70 : jQuery(this).find('img').get(0).naturalWidth;
      	max_win_width = jQuery(window).width()*0.75;
        win_height = 'auto';
	}
  	jQuery('.modal-body').parent().parent().css('width', win_width).css('height', win_height).css('max-width', max_win_width);
  	jQuery('.modal-body').parent().css('width', win_width).css('height', win_height).css('max-width', max_win_width);
	jQuery('.modal-body').append(html);
	jQuery('#modal').modal('show').on('hidden.bs.modal', function () {
        jQuery('.modal-body').empty();
	});   
});